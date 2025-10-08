"use client";

import { useState, useRef } from "react";
import StepContainer from "@/components/StepContainer";
import InitialStep from "@/components/steps/InitialStep";
import WelcomeStep from "@/components/steps/WelcomeStep";
import DateTimeStep from "@/components/steps/DateTimeStep";
import GiftsStep from "@/components/steps/GiftsStep";
import ConfirmationStep from "@/components/steps/ConfirmationStep";
import BackgroundMusic, {
  BackgroundMusicRef,
} from "@/components/BackgroundMusic";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const musicRef = useRef<BackgroundMusicRef>(null);

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

  const handleStartMusic = () => {
    musicRef.current?.play();
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <InitialStep
            userName="Sebastián Segura"
            onNext={handleNext}
            onStartMusic={handleStartMusic}
          />
        );
      case 1:
        return <WelcomeStep onNext={handleNext} />;
      case 2:
        return <DateTimeStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <ConfirmationStep onConfirm={handleConfirm} />;
      case 4:
        return <GiftsStep />;
      default:
        return (
          <InitialStep
            userName="Sebastián Segura"
            onNext={handleNext}
            onStartMusic={handleStartMusic}
          />
        );
    }
  };

  return (
    <>
      <StepContainer currentStep={currentStep}>
        {renderCurrentStep()}
      </StepContainer>
      <BackgroundMusic ref={musicRef} />
    </>
  );
}
