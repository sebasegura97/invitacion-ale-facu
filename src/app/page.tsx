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
import { Invitation } from "@/lib/db";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const musicRef = useRef<BackgroundMusicRef>(null);

  const handleCodeSubmit = async (code: string) => {
    try {
      const response = await fetch(`/api/guests?code=${code}`);

      if (!response.ok) {
        throw new Error("Código de invitación inválido");
      }

      const data = await response.json();
      setInvitation(data);
      handleNext();
    } catch (error) {
      console.error("Error fetching invitation:", error);
      throw error;
    }
  };

  const handleConfirm = async (data: {
    confirmed: number;
    message?: string;
  }) => {
    if (!invitation) return;

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: invitation.code,
          confirmed: data.confirmed,
          message: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm invitation");
      }

      const result = await response.json();
      console.log("Invitation confirmed:", result);
    } catch (error) {
      console.error("Error confirming invitation:", error);
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
            onCodeSubmit={handleCodeSubmit}
            onStartMusic={handleStartMusic}
          />
        );
      case 1:
        return <WelcomeStep onNext={handleNext} userName={invitation?.name} />;
      case 2:
        return <DateTimeStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return (
          <ConfirmationStep
            onConfirm={handleConfirm}
            maxGuests={invitation?.guests || 1}
          />
        );
      case 4:
        return <GiftsStep />;
      default:
        return (
          <InitialStep
            onCodeSubmit={handleCodeSubmit}
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
