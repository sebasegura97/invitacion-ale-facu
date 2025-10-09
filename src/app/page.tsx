"use client";

import { useState, useRef, useEffect } from "react";
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
import { useSearchParams } from "next/navigation";

export default function Home() {
  const code = useSearchParams().get("code");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const musicRef = useRef<BackgroundMusicRef>(null);

  useEffect(() => {
    if (code) {
      handleCodeSubmit(code);
    }
  }, [code]);

  const handleCodeSubmit = async (code: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/guests?code=${code}`);

      if (!response.ok) {
        setError("Código de invitación inválido");
        throw new Error("Código de invitación inválido");
      }

      const data = await response.json();
      setInvitation(data);
      if (data.confirmed_at !== null) {
        setCurrentStep(4);
      }
    } catch (error) {
      console.error("Error fetching invitation:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (data: {
    confirmed: number;
    message?: string;
    declined?: boolean;
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
          declined: data.declined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm invitation");
      }

      const result = await response.json();
      console.log("Invitation confirmed:", result);

      setCurrentStep(4);
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
            onNext={handleNext}
            name={invitation?.name || ""}
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
            guestName={invitation?.name || ""}
          />
        );
      case 4:
        return <GiftsStep />;
      default:
        return (
          <InitialStep
            onNext={handleNext}
            name={invitation?.name || ""}
            onStartMusic={handleStartMusic}
          />
        );
    }
  };

  if (isLoading) {
    return <div className="fixed inset-0 bg-black/50 z-50" />;
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <p className="text-white text-center">Código de invitación inválido</p>
      </div>
    );
  }

  return (
    <>
      <StepContainer currentStep={currentStep}>
        {renderCurrentStep()}
      </StepContainer>
      <BackgroundMusic ref={musicRef} />
    </>
  );
}
