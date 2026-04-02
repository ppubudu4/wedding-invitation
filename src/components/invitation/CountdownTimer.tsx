"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { WEDDING } from "@/lib/constants";

type TimeUnit = {
  value: number;
  label: string;
};

const calculateTimeLeft = (): TimeUnit[] => {
  const difference = WEDDING.date.getTime() - Date.now();

  if (difference <= 0) {
    return [
      { value: 0, label: "Days" },
      { value: 0, label: "Hours" },
      { value: 0, label: "Minutes" },
      { value: 0, label: "Seconds" },
    ];
  }

  return [
    { value: Math.floor(difference / (1000 * 60 * 60 * 24)), label: "Days" },
    {
      value: Math.floor((difference / (1000 * 60 * 60)) % 24),
      label: "Hours",
    },
    { value: Math.floor((difference / 1000 / 60) % 60), label: "Minutes" },
    { value: Math.floor((difference / 1000) % 60), label: "Seconds" },
  ];
};

const digitVariants = {
  enter: { y: -20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const tick = useCallback(() => {
    setTimeLeft(calculateTimeLeft());
  }, []);

  useEffect(() => {
    setIsMounted(true);
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [tick]);

  if (!isMounted) return null;

  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      {timeLeft.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-gold/20 bg-white/80 shadow-sm backdrop-blur-sm sm:h-24 sm:w-24">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={unit.value}
                variants={digitVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="font-heading text-3xl text-charcoal sm:text-4xl"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="mt-2 text-xs tracking-[0.2em] uppercase text-charcoal-light font-body">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export { CountdownTimer };
