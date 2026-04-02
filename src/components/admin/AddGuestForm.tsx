"use client";

import { useState, useCallback, useTransition } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2 } from "lucide-react";
import { addGuest } from "@/app/actions/guests";

type AddGuestFormProps = {
  onGuestAdded: () => void;
};

const AddGuestForm = ({ onGuestAdded }: AddGuestFormProps) => {
  const [fullName, setFullName] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!fullName.trim()) return;

      setError(null);
      startTransition(async () => {
        const result = await addGuest(fullName.trim(), numberOfPeople);
        if (result.success) {
          setFullName("");
          setNumberOfPeople(1);
          onGuestAdded();
        } else {
          setError(result.error ?? "Failed to add guest.");
        }
      });
    },
    [fullName, numberOfPeople, onGuestAdded],
  );

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-3 rounded-xl border border-gold/15 bg-white p-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex-1 min-w-[200px]">
        <label
          htmlFor="guestName"
          className="mb-1 block text-xs tracking-wider uppercase text-charcoal-light"
        >
          Guest Name
        </label>
        <input
          id="guestName"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full name"
          className="w-full rounded-lg border border-gold/20 px-3 py-2 text-sm text-charcoal outline-none focus:border-gold/50"
        />
      </div>

      <div className="w-24">
        <label
          htmlFor="numberOfPeople"
          className="mb-1 block text-xs tracking-wider uppercase text-charcoal-light"
        >
          People
        </label>
        <input
          id="numberOfPeople"
          type="number"
          min={1}
          max={20}
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(Math.max(1, Number(e.target.value)))}
          className="w-full rounded-lg border border-gold/20 px-3 py-2 text-sm text-charcoal outline-none focus:border-gold/50"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-1.5 rounded-lg bg-charcoal px-4 py-2 text-xs tracking-wider uppercase text-white transition-colors hover:bg-charcoal/90 disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Plus size={14} />
        )}
        Add Guest
      </button>

      {error && <p className="w-full text-xs text-rose">{error}</p>}
    </motion.form>
  );
};

export { AddGuestForm };
