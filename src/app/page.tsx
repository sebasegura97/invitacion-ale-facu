"use client";

import { useState } from "react";
import StepContainer from "@/components/StepContainer";
import WelcomeStep from "@/components/steps/WelcomeStep";
import DateTimeStep from "@/components/steps/DateTimeStep";
import LocationStep from "@/components/steps/LocationStep";
import DressCodeStep from "@/components/steps/DressCodeStep";
import GiftsStep from "@/components/steps/GiftsStep";
import ConfirmationStep from "@/components/steps/ConfirmationStep";
import { WEDDING_CONFIG } from "@/lib/wedding-config";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleConfirm = async (data: {
    name: string;
    guestCount: number;
    message?: string;
    giftMessage?: string;
  }) => {
    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm guest");
      }

      const result = await response.json();
      console.log("Guest confirmed:", result);
    } catch (error) {
      console.error("Error confirming guest:", error);
      throw error;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return <DateTimeStep config={WEDDING_CONFIG} />;
      case 2:
        return <LocationStep config={WEDDING_CONFIG} />;
      case 3:
        return <DressCodeStep config={WEDDING_CONFIG} />;
      case 4:
        return <GiftsStep config={WEDDING_CONFIG} />;
      case 5:
        return <ConfirmationStep onConfirm={handleConfirm} />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <StepContainer
      currentStep={currentStep}
      totalSteps={6}
      onNext={handleNext}
      onPrevious={handlePrevious}
    >
      {renderCurrentStep()}
    </StepContainer>
  );
}
