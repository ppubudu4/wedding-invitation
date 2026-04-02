"use client";

import { useState, useCallback, useTransition, useMemo } from "react";
import { motion } from "framer-motion";
import { Trash2, Loader2, Users, Check, X, Clock } from "lucide-react";
import type { Guest } from "@/lib/types/database";
import { RSVP_STATUS } from "@/lib/types/database";
import { deleteGuest, fetchAllGuests } from "@/app/actions/guests";
import { CopyLinkButton } from "./CopyLinkButton";
import { AddGuestForm } from "./AddGuestForm";

type GuestTableProps = {
  initialGuests: Guest[];
};

const STATUS_CONFIG = {
  [RSVP_STATUS.ATTENDING]: {
    label: "Attending",
    className: "bg-sage/15 text-sage border-sage/30",
    icon: Check,
  },
  [RSVP_STATUS.DECLINED]: {
    label: "Declined",
    className: "bg-rose/15 text-rose border-rose/30",
    icon: X,
  },
  [RSVP_STATUS.PENDING]: {
    label: "Pending",
    className: "bg-gold/15 text-gold-dark border-gold/30",
    icon: Clock,
  },
} as const;

const GuestTable = ({ initialGuests }: GuestTableProps) => {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const stats = useMemo(
    () => ({
      total: guests.length,
      attending: guests.filter((g) => g.rsvp_status === RSVP_STATUS.ATTENDING)
        .length,
      declined: guests.filter((g) => g.rsvp_status === RSVP_STATUS.DECLINED)
        .length,
      pending: guests.filter((g) => g.rsvp_status === RSVP_STATUS.PENDING)
        .length,
    }),
    [guests],
  );

  const refreshGuests = useCallback(() => {
    startTransition(async () => {
      const updated = await fetchAllGuests();
      setGuests(updated);
    });
  }, []);

  const handleDelete = useCallback(
    (guestId: string) => {
      setDeletingId(guestId);
      startTransition(async () => {
        const result = await deleteGuest(guestId);
        if (result.success) {
          setGuests((prev) => prev.filter((g) => g.id !== guestId));
        }
        setDeletingId(null);
      });
    },
    [],
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Guests", value: stats.total, icon: Users, color: "text-charcoal" },
          { label: "Attending", value: stats.attending, icon: Check, color: "text-sage" },
          { label: "Declined", value: stats.declined, icon: X, color: "text-rose" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "text-gold-dark" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="rounded-xl border border-gold/15 bg-white p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2">
              <stat.icon size={14} className={stat.color} />
              <span className="text-xs tracking-wider uppercase text-charcoal-light">
                {stat.label}
              </span>
            </div>
            <p className={`mt-1 font-heading text-2xl ${stat.color}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Add Guest Form */}
      <AddGuestForm onGuestAdded={refreshGuests} />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gold/15 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gold/10">
              <th className="px-4 py-3 text-xs tracking-wider uppercase text-charcoal-light font-medium">
                Name
              </th>
              <th className="px-4 py-3 text-xs tracking-wider uppercase text-charcoal-light font-medium">
                Status
              </th>
              <th className="hidden px-4 py-3 text-xs tracking-wider uppercase text-charcoal-light font-medium sm:table-cell">
                People
              </th>
              <th className="hidden px-4 py-3 text-xs tracking-wider uppercase text-charcoal-light font-medium md:table-cell">
                Dietary
              </th>
              <th className="px-4 py-3 text-xs tracking-wider uppercase text-charcoal-light font-medium">
                Invite Link
              </th>
              <th className="px-4 py-3 text-xs tracking-wider uppercase text-charcoal-light font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => {
              const statusConfig = STATUS_CONFIG[guest.rsvp_status];
              const StatusIcon = statusConfig.icon;

              return (
                <motion.tr
                  key={guest.id}
                  className="border-b border-gold/5 last:border-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                >
                  <td className="px-4 py-3 font-medium text-charcoal">
                    {guest.full_name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs ${statusConfig.className}`}
                    >
                      <StatusIcon size={10} />
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-charcoal-light sm:table-cell">
                    {guest.number_of_people}
                  </td>
                  <td className="hidden px-4 py-3 text-charcoal-light md:table-cell">
                    {guest.dietary_requirements || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <CopyLinkButton token={guest.unique_token} />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(guest.id)}
                      disabled={deletingId === guest.id}
                      className="rounded-lg p-1.5 text-charcoal-light transition-colors hover:bg-rose/10 hover:text-rose disabled:opacity-50"
                      aria-label={`Delete ${guest.full_name}`}
                    >
                      {deletingId === guest.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </td>
                </motion.tr>
              );
            })}

            {guests.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-charcoal-light"
                >
                  No guests added yet. Use the form above to add your first
                  guest.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { GuestTable };
