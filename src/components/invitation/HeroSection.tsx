"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { WEDDING } from "@/lib/constants";

type HeroSectionProps = {
  guestName: string;
};

const EASE_OUT_QUART: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.35, delayChildren: 0.6 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_OUT_QUART },
  },
};

const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: EASE_OUT_QUART },
  },
};

const HeroSection = ({ guestName }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.7]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          y: bgY,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80')",
        }}
      />

      <motion.div
        className="absolute inset-0 bg-charcoal"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center text-white"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="mb-4 text-sm tracking-[0.35em] uppercase text-gold-light font-body"
        >
          Together with their families
        </motion.p>

        <motion.h1
          variants={scaleFade}
          className="font-heading text-5xl leading-tight sm:text-7xl md:text-8xl"
        >
          {WEDDING.couple.partner1}
          <motion.span
            className="mx-3 inline-block text-gold font-body text-3xl italic sm:text-5xl md:text-6xl"
            variants={fadeUp}
          >
            &amp;
          </motion.span>
          {WEDDING.couple.partner2}
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-gold-light/60" />
          <p className="text-lg tracking-[0.25em] uppercase text-gold-light sm:text-xl">
            {WEDDING.displayDate}
          </p>
          <span className="h-px w-12 bg-gold-light/60" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-10 max-w-md text-xl italic text-white/90 sm:text-2xl font-body"
        >
          We can&apos;t wait to celebrate with you,{" "}
          <span className="font-semibold text-gold-light not-italic">
            {guestName}
          </span>
          !
        </motion.p>

        <motion.div variants={fadeUp} className="mt-16">
          <motion.a
            href="#rsvp"
            className="inline-block rounded-full border border-gold/60 px-10 py-3 text-sm tracking-[0.2em] uppercase text-gold-light backdrop-blur-sm transition-colors hover:bg-gold/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            RSVP Now
          </motion.a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-white/50"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export { HeroSection };
