"use client";

import { motion } from "framer-motion";
import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";

type SuccessAnimationProps = {
  guestName: string;
  isAttending: boolean;
};

const SuccessAnimation = ({
  guestName,
  isAttending,
}: SuccessAnimationProps) => {
  const fireConfetti = useCallback(() => {
    const defaults = {
      spread: 360,
      ticks: 80,
      gravity: 0.6,
      decay: 0.94,
      startVelocity: 20,
      colors: ["#c9a96e", "#d4a0a0", "#9caf88", "#dcc89b", "#e8c5c5"],
    };

    const shoot = () => {
      confetti({ ...defaults, particleCount: 30, origin: { x: 0.3, y: 0.6 } });
      confetti({ ...defaults, particleCount: 30, origin: { x: 0.7, y: 0.6 } });
    };

    shoot();
    setTimeout(shoot, 200);
    setTimeout(shoot, 400);
  }, []);

  useEffect(() => {
    if (isAttending) {
      fireConfetti();
    }
  }, [isAttending, fireConfetti]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center rounded-2xl border border-gold/20 bg-white p-10 text-center shadow-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10"
      >
        <Heart className="h-8 w-8 text-gold" fill="currentColor" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="font-heading text-2xl text-charcoal sm:text-3xl"
      >
        {isAttending ? "Thank You!" : "We'll Miss You!"}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-3 text-charcoal-light"
      >
        {isAttending
          ? `We're thrilled you'll be joining us, ${guestName}! We can't wait to celebrate together.`
          : `We understand, ${guestName}. You'll be in our hearts on our special day.`}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 text-sm text-charcoal-light/70"
      >
        Your response has been recorded. You can revisit this page to update it
        anytime.
      </motion.p>
    </motion.div>
  );
};

export { SuccessAnimation };
