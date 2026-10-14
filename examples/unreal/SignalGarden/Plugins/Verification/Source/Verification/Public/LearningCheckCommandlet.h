#pragma once

#include "Commandlets/Commandlet.h"
#include "LearningCheckCommandlet.generated.h"

UCLASS()
class ULearningCheckCommandlet : public UCommandlet
{
    GENERATED_BODY()

public:
    ULearningCheckCommandlet();
    virtual int32 Main(const FString& Params) override;
};
