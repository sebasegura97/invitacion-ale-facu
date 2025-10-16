"use client";

import { motion } from "framer-motion";
import TextDraw from "@/components/TextDraw";
import HeartDraw from "@/components/HeartDraw";
import Button from "@/components/ui/Button";
import { useTranslation } from "@/i18n/context";

interface WelcomeStepProps {
  onNext: () => void;
  userName?: string;
}

export default function WelcomeStep({ onNext, userName }: WelcomeStepProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-lg text-center"
    >
      <div className="mb-8">
        {/* Subtítulo con efecto de dibujo */}
        <TextDraw
          delay={userName ? 2 : 0.5}
          duration={2}
          size="2xl"
          className="mb-2"
        >
          {t("welcome.title")}
        </TextDraw>

        {/* Título principal con efecto de dibujo */}
        <TextDraw
          delay={userName ? 3.5 : 2}
          duration={2}
          size="6xl"
          className="mb-4"
        >
          {t("common.names")}
        </TextDraw>

        <div className="flex justify-center">
          <HeartDraw delay={userName ? 5 : 3} />
        </div>
      </div>

      <TextDraw delay={userName ? 6.5 : 5} duration={2} size="xl">
        {t("welcome.message")}
      </TextDraw>

      {/* Botón de navegación con efecto de dibujo */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={onNext}
          autoProgress={true}
          autoProgressDelay={userName ? 7500 : 6000}
          autoProgressDuration={6000}
          onAutoComplete={onNext}
          variant="primary"
          size="md"
        >
          <TextDraw
            delay={userName ? 8.5 : 7}
            duration={1.5}
            size="lg"
            className=""
          >
            {t("common.continue")}
          </TextDraw>
        </Button>
      </div>
    </motion.div>
  );
}
