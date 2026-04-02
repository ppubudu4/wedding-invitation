"use client";

import { useState, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import type { Guest } from "@/lib/types/database";
import { RSVP_STATUS } from "@/lib/types/database";
import {
  rsvpFormSchema,
  type RsvpFormValues,
} from "@/lib/validations/rsvp-schema";
import { submitRsvp } from "@/app/actions/rsvp";
import { SuccessAnimation } from "./SuccessAnimation";

type RsvpFormProps = {
  guest: Guest;
};

const RsvpForm = ({ guest }: RsvpFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(
    guest.rsvp_status !== RSVP_STATUS.PENDING,
  );
  const [submittedAttending, setSubmittedAttending] = useState(
    guest.rsvp_status === RSVP_STATUS.ATTENDING,
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      rsvpStatus:
        guest.rsvp_status === RSVP_STATUS.PENDING
          ? undefined
          : (guest.rsvp_status as "attending" | "declined"),
      numberOfPeople: guest.number_of_people ?? 1,
      dietaryRequirements: guest.dietary_requirements ?? "",
    },
  });

  const rsvpStatus = watch("rsvpStatus");
  const isAttending = rsvpStatus === RSVP_STATUS.ATTENDING;

  const handleRsvpToggle = useCallback(
    (status: "attending" | "declined") => {
      setValue("rsvpStatus", status, { shouldValidate: true });
    },
    [setValue],
  );

  const onSubmit = useCallback(
    (data: RsvpFormValues) => {
      setServerError(null);
      startTransition(async () => {
        const result = await submitRsvp(guest.unique_token, data);
        if (result.success) {
          setSubmittedAttending(data.rsvpStatus === RSVP_STATUS.ATTENDING);
          setIsSubmitted(true);
        } else {
          setServerError(result.error ?? "An unexpected error occurred.");
        }
      });
    },
    [guest.unique_token],
  );

  if (isSubmitted) {
    return (
      <SuccessAnimation
        guestName={guest.full_name}
        isAttending={submittedAttending}
      />
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-2xl border border-gold/20 bg-white p-8 shadow-sm sm:p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Attending / Declining Toggle */}
      <div>
        <label className="mb-3 block text-center text-sm tracking-[0.15em] uppercase text-charcoal-light">
          Will you attend?
        </label>
        <div className="flex gap-3">
          {(["attending", "declined"] as const).map((status) => {
            const isSelected = rsvpStatus === status;
            return (
              <motion.button
                key={status}
                type="button"
                onClick={() => handleRsvpToggle(status)}
                className={`relative flex-1 rounded-xl border py-4 text-center text-sm tracking-wider uppercase transition-colors ${
                  isSelected
                    ? status === "attending"
                      ? "border-sage bg-sage/10 text-sage"
                      : "border-rose bg-rose/10 text-rose"
                    : "border-gold/20 text-charcoal-light hover:border-gold/40"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSelected && (
                  <motion.div
                    layoutId="rsvp-toggle"
                    className={`absolute inset-0 rounded-xl ${
                      status === "attending"
                        ? "border-2 border-sage"
                        : "border-2 border-rose"
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {status === "attending" ? "Joyfully Accept" : "Regretfully Decline"}
                </span>
              </motion.button>
            );
          })}
        </div>
        {errors.rsvpStatus && (
          <p className="mt-2 text-center text-sm text-rose">
            Please select your response
          </p>
        )}
      </div>

      {/* Number of People (conditional) */}
      <AnimatePresence>
        {isAttending && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-1">
              <label
                htmlFor="numberOfPeople"
                className="mb-2 block text-sm tracking-wider uppercase text-charcoal-light"
              >
                Number of People
              </label>
              <input
                id="numberOfPeople"
                type="number"
                min={1}
                max={20}
                {...register("numberOfPeople", { valueAsNumber: true })}
                className="w-full rounded-xl border border-gold/20 bg-cream/50 px-4 py-3 text-charcoal outline-none transition-colors placeholder:text-charcoal-light/50 focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dietary Requirements (conditional on attending) */}
      <AnimatePresence>
        {isAttending && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-1">
              <label
                htmlFor="dietaryRequirements"
                className="mb-2 block text-sm tracking-wider uppercase text-charcoal-light"
              >
                Dietary Requirements
              </label>
              <textarea
                id="dietaryRequirements"
                rows={3}
                placeholder="Any allergies or dietary preferences?"
                {...register("dietaryRequirements")}
                className="w-full resize-none rounded-xl border border-gold/20 bg-cream/50 px-4 py-3 text-charcoal outline-none transition-colors placeholder:text-charcoal-light/50 focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {serverError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-rose"
        >
          {serverError}
        </motion.p>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isPending || !rsvpStatus}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-charcoal px-6 py-4 text-sm tracking-[0.2em] uppercase text-white transition-colors hover:bg-charcoal/90 disabled:cursor-not-allowed disabled:opacity-50"
        whileHover={{ scale: isPending ? 1 : 1.02 }}
        whileTap={{ scale: isPending ? 1 : 0.98 }}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Send size={14} />
            Send RSVP
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export { RsvpForm };
