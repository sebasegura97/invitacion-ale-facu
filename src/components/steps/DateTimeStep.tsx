"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Shirt, Glasses } from "lucide-react";
import TextDraw from "@/components/TextDraw";
import Button from "@/components/ui/Button";
import AnimatedIcon from "@/components/AnimatedIcon";
import { useTranslation } from "@/i18n/context";

interface DateTimeStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function DateTimeStep({ onNext }: DateTimeStepProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-2 text-center"
    >
      <TextDraw delay={0.5} duration={2} size="4xl" className="mb-8">
        {t("dateTime.title")}
      </TextDraw>

      <div className="space-y-8 px-4 flex items-center  flex-col relative">
        <div className="flex flex-col justify-center px-4  space-y-2">
          <div className="flex items-center ">
            <AnimatedIcon Icon={Calendar} delay={2.5} />
            <TextDraw delay={2.5} duration={1.5} size="xl">
              {t("dateTime.date")}
            </TextDraw>
          </div>

          <div className="flex items-center ">
            <AnimatedIcon Icon={Clock} delay={4} />
            <TextDraw delay={4} duration={1.5} size="xl">
              {t("dateTime.time")}
            </TextDraw>
          </div>

          <div className="flex items-center ">
            <AnimatedIcon Icon={Shirt} delay={5.5} />
            <TextDraw delay={5.5} duration={1.5} size="xl">
              {t("dateTime.dressCode")}
            </TextDraw>
          </div>

          <div className="flex items-center ml-4 ">
            <AnimatedIcon Icon={Glasses} delay={7} />
            <TextDraw delay={7} duration={1.5} size="xl">
              {t("dateTime.sunglasses")}
            </TextDraw>
          </div>

          <div className="space-y-1 flex flex-col items-start">
            <div className="flex items-center ">
              <AnimatedIcon Icon={MapPin} delay={8.5} />
              <TextDraw delay={8.5} duration={1.5} size="xl">
                {t("dateTime.location")}
              </TextDraw>
            </div>
            <TextDraw
              delay={9.5}
              duration={1}
              size="lg"
              className="text-gray-400 ml-7 text-left"
            >
              {t("dateTime.address")}
            </TextDraw>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={onNext}
          autoProgress={true}
          autoProgressDelay={9500}
          autoProgressDuration={6000}
          onAutoComplete={onNext}
          variant="primary"
          size="md"
        >
          <TextDraw delay={11} duration={1.5} size="lg" className="">
            {t("common.continue")}
          </TextDraw>
        </Button>
      </div>
    </motion.div>
  );
}
