"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";

type CopyLinkButtonProps = {
  token: string;
};

const CopyLinkButton = ({ token }: CopyLinkButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const url = `${window.location.origin}/invite/${token}`;
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [token]);

  return (
    <button
      onClick={handleCopy}
      className="relative flex items-center gap-1.5 rounded-lg border border-gold/20 px-3 py-1.5 text-xs text-charcoal-light transition-colors hover:bg-cream"
    >
      <AnimatePresence mode="wait">
        {isCopied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1 text-sage"
          >
            <Check size={12} />
            Copied!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1"
          >
            <Copy size={12} />
            Copy Link
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export { CopyLinkButton };
