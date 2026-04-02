"use client";

import { motion } from "framer-motion";

type DividerProps = {
  className?: string;
};

const Divider = ({ className = "" }: DividerProps) => (
  <motion.div
    className={`flex items-center justify-center gap-4 py-8 ${className}`}
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    <span className="h-px w-16 bg-gold/40" />
    <span className="text-gold text-xl">&#10048;</span>
    <span className="h-px w-16 bg-gold/40" />
  </motion.div>
);

export { Divider };
