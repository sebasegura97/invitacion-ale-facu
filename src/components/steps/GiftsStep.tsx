"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Wallet, Mail } from "lucide-react";
import TextDraw from "../TextDraw";
import AnimatedIcon from "../AnimatedIcon";
import Button from "../ui/Button";
import BankAccountsView from "../BankAccountsView";
import InvitationView from "../InvitationView";

type View = "main" | "accounts" | "invitation";

interface GiftStepProps {
  confirmed: boolean;
  declined: boolean;
}

export default function GiftsStep({ confirmed, declined }: GiftStepProps) {
  const [currentView, setCurrentView] = useState<View>("main");

  const invitationData = {
    name: "Juan Pérez",
    quantity: 2,
  };

  const renderView = () => {
    switch (currentView) {
      case "accounts":
        return (
          <BankAccountsView
            key="accounts"
            onBack={() => setCurrentView("main")}
          />
        );
      case "invitation":
        return (
          <InvitationView
            key="invitation"
            invitation={invitationData}
            onBack={() => setCurrentView("main")}
          />
        );
      default:
        return (
          <motion.div
            key="gifts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8 rounded-lg  flex flex-col gap-4"
          >
            {confirmed && (
              <TextDraw
                delay={0.5}
                duration={2}
                size="md"
                className="text-center gray-300"
              >
                Gracias por confirmar
              </TextDraw>
            )}

            {declined && (
              <TextDraw
                delay={0.5}
                duration={2}
                size="md"
                className="text-center gray-300"
              >
                Lamentamos que no puedas venir
              </TextDraw>
            )}

            <AnimatedIcon
              Icon={Gift}
              delay={1.5}
              className="w-8 h-8 mx-auto "
            />

            {confirmed && (
              <TextDraw
                delay={2.5}
                duration={2}
                size="3xl"
                className="text-center"
              >
                Tu presencia es nuestro mejor regalo
              </TextDraw>
            )}

            <TextDraw
              delay={5.5}
              duration={1}
              size="md"
              className=" text-center"
            >
              Sientete libre de aportar lo que quieras a nuestra boda.
            </TextDraw>

            <TextDraw
              delay={6}
              duration={1.5}
              size="md"
              className="text-center mb-6"
            >
              Si se preguntan, preferimos efectivo 🤭
            </TextDraw>

            <Button
              onClick={() => setCurrentView("invitation")}
              size="md"
              className="flex justify-center items-center mx-auto h-12 "
              icon={Mail}
              delayIconAnimation={6.5}
              variant="secondary"
              backgroundAnimationDelay={7}
            >
              <TextDraw delay={6.5} duration={1} size="lg">
                Ver invitación
              </TextDraw>
            </Button>
            <Button
              onClick={() => setCurrentView("accounts")}
              size="md"
              className="flex justify-center items-center mx-auto h-12 "
              icon={Wallet}
              delayIconAnimation={7.5}
            >
              <TextDraw delay={8} duration={1} size="lg">
                Cuentas bancarias
              </TextDraw>
            </Button>
          </motion.div>
        );
    }
  };

  return <AnimatePresence mode="wait">{renderView()}</AnimatePresence>;
}
