using UnrealBuildTool;

public class Verification : ModuleRules
{
    public Verification(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
        PrivateDependencyModuleNames.AddRange(new string[] {
            "Core", "CoreUObject", "Engine", "UnrealEd", "BlueprintGraph", "Kismet", "KismetCompiler", "Json"
        });
    }
}
