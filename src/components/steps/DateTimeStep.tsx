"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Shirt } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import TextDraw from "@/components/TextDraw";
import Button from "@/components/ui/Button";
import AnimatedIcon from "@/components/AnimatedIcon";

interface DateTimeStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function DateTimeStep({ onNext }: DateTimeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-2 text-center"
    >
      <TextDraw delay={0.5} duration={2} size="4xl" className="mb-8">
        El día y el lugar
      </TextDraw>

      <div className="space-y-8 px-4 flex items-center  flex-col relative">
        <div className="flex flex-col justify-center px-4  space-y-2">
          <div className="flex items-center ">
            <AnimatedIcon Icon={Calendar} delay={2.5} />
            <TextDraw delay={2.5} duration={1.5} size="xl">
              {WEDDING_CONFIG.date}
            </TextDraw>
          </div>

          <div className="flex items-center ">
            <AnimatedIcon Icon={Clock} delay={4} />
            <TextDraw delay={4} duration={1.5} size="xl">
              {WEDDING_CONFIG.time}
            </TextDraw>
          </div>

          <div className="flex items-center ">
            <AnimatedIcon Icon={Shirt} delay={5.5} />
            <TextDraw delay={5.5} duration={1.5} size="xl">
              {WEDDING_CONFIG.dressCode}
            </TextDraw>
          </div>

          <div className="space-y-1 flex flex-col items-start">
            <div className="flex items-center ">
              <AnimatedIcon Icon={MapPin} delay={7} />
              <TextDraw delay={7} duration={1.5} size="xl">
                {WEDDING_CONFIG.location}
              </TextDraw>
            </div>
            <TextDraw
              delay={8}
              duration={1}
              size="lg"
              className="text-gray-400 ml-7 text-left"
            >
              {WEDDING_CONFIG.address}
            </TextDraw>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={onNext}
          autoProgress={true}
          autoProgressDelay={8000}
          autoProgressDuration={6000}
          onAutoComplete={onNext}
          variant="primary"
          size="md"
        >
          <TextDraw delay={9} duration={1.5} size="lg" className="">
            Continuar
          </TextDraw>
        </Button>
      </div>
    </motion.div>
  );
}
