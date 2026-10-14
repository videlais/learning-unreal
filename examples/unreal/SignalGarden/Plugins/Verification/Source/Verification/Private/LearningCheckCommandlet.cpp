#include "LearningCheckCommandlet.h"
#include "Components/BoxComponent.h"
#include "EdGraph/EdGraph.h"
#include "EdGraph/EdGraphNode.h"
#include "EdGraphUtilities.h"
#include "Engine/Blueprint.h"
#include "Engine/Engine.h"
#include "Engine/World.h"
#include "GameFramework/Actor.h"
#include "Kismet2/BlueprintEditorUtils.h"
#include "Kismet2/KismetEditorUtilities.h"
#include "KismetCompiler.h"
#include "Misc/FileHelper.h"
#include "Misc/OutputDevice.h"
#include "Misc/OutputDeviceRedirector.h"
#include "Misc/Parse.h"
#include "Misc/Paths.h"

DEFINE_LOG_CATEGORY_STATIC(LogLearningCheck, Log, All);

class FMessageCapture : public FOutputDevice
{
public:
    int32 Messages = 0;
    virtual void Serialize(const TCHAR* Text, ELogVerbosity::Type Verbosity, const FName& Category) override
    {
        if (Category == TEXT("LogBlueprintUserMessages") && FString(Text).Contains(TEXT("LEARNING_CHECK")))
        {
            ++Messages;
        }
    }
};

static UBlueprint* ImportAndCompile(const FString& Text, const FName Name, int32 ExpectedNodes, int32 ExpectedLinks)
{
    UPackage* Package = CreatePackage(*(TEXT("/Game/Verification/") + Name.ToString()));
    UBlueprint* Blueprint = FKismetEditorUtilities::CreateBlueprint(AActor::StaticClass(), Package, Name, BPTYPE_Normal);
    UEdGraph* Graph = FBlueprintEditorUtils::FindEventGraph(Blueprint);
    if (!Graph)
    {
        UE_LOG(LogLearningCheck, Error, TEXT("No event graph: %s"), *Name.ToString());
        return nullptr;
    }
    const TArray<TObjectPtr<UEdGraphNode>> DefaultNodes = Graph->Nodes;
    for (UEdGraphNode* Node : DefaultNodes)
    {
        Graph->RemoveNode(Node);
    }
    TSet<UEdGraphNode*> Imported;
    FEdGraphUtilities::ImportNodesFromText(Graph, Text, Imported);
    if (Imported.Num() != ExpectedNodes)
    {
        UE_LOG(LogLearningCheck, Error, TEXT("%s imported %d nodes, expected %d"), *Name.ToString(), Imported.Num(), ExpectedNodes);
        return nullptr;
    }
    FBlueprintEditorUtils::RefreshAllNodes(Blueprint);
    int32 Links = 0;
    for (UEdGraphNode* Node : Graph->Nodes)
    {
        for (UEdGraphPin* Pin : Node->Pins)
        {
            if (Pin->Direction == EGPD_Output)
            {
                Links += Pin->LinkedTo.Num();
            }
        }
    }
    if (Links != ExpectedLinks)
    {
        UE_LOG(LogLearningCheck, Error, TEXT("%s has %d links, expected %d"), *Name.ToString(), Links, ExpectedLinks);
        return nullptr;
    }
    FCompilerResultsLog Results;
    FKismetEditorUtilities::CompileBlueprint(Blueprint, EBlueprintCompileOptions::None, &Results);
    if (Results.NumErrors != 0 || Blueprint->Status == BS_Error || !Blueprint->GeneratedClass)
    {
        UE_LOG(LogLearningCheck, Error, TEXT("%s failed compilation (%d errors)"), *Name.ToString(), Results.NumErrors);
        return nullptr;
    }
    UE_LOG(LogLearningCheck, Display, TEXT("%s imported and compiled: %d nodes, %d links, %d warnings"), *Name.ToString(), ExpectedNodes, Links, Results.NumWarnings);
    return Blueprint;
}

ULearningCheckCommandlet::ULearningCheckCommandlet()
{
    IsClient = false;
    IsServer = false;
    IsEditor = true;
    LogToConsole = true;
}

int32 ULearningCheckCommandlet::Main(const FString& Params)
{
    FString Fixtures;
    if (!FParse::Value(*Params, TEXT("Fixtures="), Fixtures))
    {
        UE_LOG(LogLearningCheck, Error, TEXT("Supply -Fixtures=<directory>"));
        return 1;
    }
    for (int32 Index = 0; Index < 2; ++Index)
    {
        const FString Key = Index == 0 ? TEXT("beginplay") : TEXT("overlap");
        const int32 Nodes = Index == 0 ? 2 : 4;
        const int32 Links = Index == 0 ? 1 : 4;
        FString Text;
        if (!FFileHelper::LoadFileToString(Text, *FPaths::Combine(Fixtures, Key + TEXT("-candidate.txt"))))
        {
            UE_LOG(LogLearningCheck, Error, TEXT("Missing fixture: %s"), *Key);
            return 1;
        }
        UBlueprint* Blueprint = ImportAndCompile(Text, FName(*(Key + TEXT("Original"))), Nodes, Links);
        if (!Blueprint)
        {
            return 1;
        }
        TSet<UObject*> ExportNodes;
        for (UEdGraphNode* Node : FBlueprintEditorUtils::FindEventGraph(Blueprint)->Nodes)
        {
            ExportNodes.Add(Node);
        }
        FString RoundTrip;
        FEdGraphUtilities::ExportNodesToText(ExportNodes, RoundTrip);
        UBlueprint* Reimported = ImportAndCompile(RoundTrip, FName(*(Key + TEXT("RoundTrip"))), Nodes, Links);
        if (!Reimported)
        {
            return 1;
        }
        if (!FFileHelper::SaveStringToFile(RoundTrip, *FPaths::Combine(Fixtures, Key + TEXT("-engine-export.txt"))))
        {
            UE_LOG(LogLearningCheck, Error, TEXT("Cannot save engine round-trip fixture"));
            return 1;
        }
        UWorld* World = UWorld::CreateWorld(EWorldType::Game, false);
        FWorldContext& Context = GEngine->CreateNewWorldContext(EWorldType::Game);
        Context.SetCurrentWorld(World);
        World->InitializeActorsForPlay(FURL());
        FMessageCapture Capture;
        GLog->AddOutputDevice(&Capture);
        GLog->FlushThreadedLogs();
        Capture.Messages = 0;
        AActor* Actor = World->SpawnActor<AActor>(Reimported->GeneratedClass);
        if (!Actor)
        {
            UE_LOG(LogLearningCheck, Error, TEXT("Could not spawn compiled Actor"));
            GLog->RemoveOutputDevice(&Capture);
            GEngine->DestroyWorldContext(World);
            World->DestroyWorld(false);
            return 1;
        }
        bool Passed = false;
        if (Index == 0)
        {
            Actor->DispatchBeginPlay();
            AActor* Second = World->SpawnActor<AActor>(Reimported->GeneratedClass);
            if (Second)
            {
                Second->DispatchBeginPlay();
            }
            GLog->FlushThreadedLogs();
            Passed = Capture.Messages == 2;
        }
        else
        {
            AActor* Visitor = World->SpawnActor<AActor>();
            UFunction* Event = Actor->FindFunction(TEXT("ReceiveActorBeginOverlap"));
            if (Visitor && Event)
            {
                struct { AActor* OtherActor; } Arguments { Visitor };
                Actor->ProcessEvent(Event, &Arguments);
                GLog->FlushThreadedLogs();
                const bool UntaggedRejected = Capture.Messages == 0;
                UBoxComponent* Component = NewObject<UBoxComponent>(Visitor);
                Component->ComponentTags.Add(TEXT("visitor"));
                Actor->AddInstanceComponent(Component);
                Actor->ProcessEvent(Event, &Arguments);
                GLog->FlushThreadedLogs();
                const bool ComponentTagRejected = Capture.Messages == 0;
                Visitor->Tags.Add(TEXT("visitor"));
                Actor->ProcessEvent(Event, &Arguments);
                GLog->FlushThreadedLogs();
                Passed = UntaggedRejected && ComponentTagRejected && Capture.Messages == 1;
            }
        }
        GLog->RemoveOutputDevice(&Capture);
        GEngine->DestroyWorldContext(World);
        World->DestroyWorld(false);
        if (!Passed)
        {
            UE_LOG(LogLearningCheck, Error, TEXT("%s execution checks failed; %d messages"), *Key, Capture.Messages);
            return 1;
        }
        UE_LOG(LogLearningCheck, Display, TEXT("%s execution checks passed"), *Key);
    }
    UE_LOG(LogLearningCheck, Display, TEXT("LEARNING_UNREAL_CHECKS_PASSED"));
    return 0;
}
