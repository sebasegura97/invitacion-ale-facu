"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import TextDraw from "@/components/TextDraw";
import AnimatedIcon from "@/components/AnimatedIcon";
import ConfirmationForm from "@/components/ConfirmationForm";
import InvitationView from "@/components/InvitationView";
import { useTranslation } from "@/i18n/context";
import { Invitation } from "@/lib/db";

interface ConfirmationStepProps {
  onConfirm: (data: { confirmed: number; message?: string }) => Promise<void>;
  invitation: Invitation | null;
}

export default function ConfirmationStep({
  onConfirm,
  invitation,
}: ConfirmationStepProps) {
  const { t } = useTranslation();
  const [showInvitationView, setShowInvitationView] = useState(false);

  if (showInvitationView) {
    return (
      <InvitationView
        invitation={{
          name: invitation?.name || "",
          quantity: invitation?.guests || 0,
        }}
        onBack={() => setShowInvitationView(false)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-2 text-center"
    >
      <div className="flex items-center justify-center mb-6">
        <AnimatedIcon Icon={Calendar} delay={0.5} />
        <TextDraw
          delay={0.5}
          duration={1.5}
          size="md"
          className="text-gray-400"
        >
          {`${t("confirmation.expiresOn")} ${t("confirmation.deadline")}`}
        </TextDraw>
      </div>

      <TextDraw delay={2} duration={1.5} size="4xl" className="mb-8">
        {t("confirmation.title")}
      </TextDraw>

      <ConfirmationForm
        onConfirm={onConfirm}
        maxGuests={invitation?.guests || 0}
        onShowInvitation={() => setShowInvitationView(true)}
      />
    </motion.div>
  );
}
