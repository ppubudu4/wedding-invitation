"use client";

import { motion, type Variants } from "framer-motion";
import {
  Heart,
  Wine,
  UtensilsCrossed,
  Music,
  MapPin,
  Shirt,
  Clock,
} from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Divider } from "@/components/ui/Divider";
import { type ReactNode } from "react";

const ICON_MAP = {
  heart: Heart,
  wine: Wine,
  utensils: UtensilsCrossed,
  music: Music,
} as const;

const timelineItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const SectionHeading = ({ children }: { children: ReactNode }) => (
  <h2 className="text-center font-heading text-3xl text-charcoal sm:text-4xl">
    {children}
  </h2>
);

const EventDetails = () => (
  <div className="bg-cream px-6 py-20">
    {/* Timeline Section */}
    <AnimatedSection className="mx-auto max-w-2xl">
      <div className="mb-2 flex items-center justify-center gap-2 text-gold">
        <Clock size={18} />
        <span className="text-sm tracking-[0.25em] uppercase">Schedule</span>
      </div>
      <SectionHeading>The Timeline</SectionHeading>

      <div className="relative mt-12">
        <div className="absolute left-6 top-0 h-full w-px bg-gold/30 sm:left-1/2" />

        {WEDDING.timeline.map((item, index) => {
          const Icon = ICON_MAP[item.icon];
          return (
            <motion.div
              key={item.time}
              variants={timelineItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative mb-10 flex items-center gap-6 sm:gap-0"
            >
              <div className="hidden sm:block sm:w-1/2 sm:pr-12 sm:text-right">
                {index % 2 === 0 && (
                  <>
                    <p className="font-heading text-lg text-charcoal">
                      {item.event}
                    </p>
                    <p className="mt-1 text-sm text-charcoal-light">
                      {item.time}
                    </p>
                  </>
                )}
              </div>

              <div className="absolute left-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-gold/30 bg-cream sm:static sm:translate-x-0 sm:shrink-0">
                <Icon size={20} className="text-gold" />
              </div>

              <div className="ml-14 sm:ml-0 sm:w-1/2 sm:pl-12">
                <div className="sm:hidden">
                  <p className="font-heading text-lg text-charcoal">
                    {item.event}
                  </p>
                  <p className="mt-1 text-sm text-charcoal-light">
                    {item.time}
                  </p>
                </div>
                {index % 2 !== 0 && (
                  <div className="hidden sm:block">
                    <p className="font-heading text-lg text-charcoal">
                      {item.event}
                    </p>
                    <p className="mt-1 text-sm text-charcoal-light">
                      {item.time}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>

    <Divider />

    {/* Venue Section */}
    <AnimatedSection className="mx-auto max-w-2xl text-center" delay={0.1}>
      <div className="mb-2 flex items-center justify-center gap-2 text-gold">
        <MapPin size={18} />
        <span className="text-sm tracking-[0.25em] uppercase">Location</span>
      </div>
      <SectionHeading>The Venue</SectionHeading>

      <div className="mt-8 space-y-4">
        <p className="text-xl font-medium text-charcoal font-body">
          {WEDDING.venue.name}
        </p>
        <div className="space-y-1 text-charcoal-light">
          <p>Ceremony: {WEDDING.venue.ceremony}</p>
          <p>Reception: {WEDDING.venue.reception}</p>
        </div>
        <p className="text-charcoal-light">{WEDDING.venue.address}</p>
        <motion.a
          href={WEDDING.venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm tracking-wider text-gold-dark underline underline-offset-4 transition-colors hover:text-gold"
          whileHover={{ scale: 1.03 }}
        >
          <MapPin size={14} />
          View on Map
        </motion.a>
      </div>
    </AnimatedSection>

    <Divider />

    {/* Dress Code Section */}
    <AnimatedSection className="mx-auto max-w-2xl text-center" delay={0.15}>
      <div className="mb-2 flex items-center justify-center gap-2 text-gold">
        <Shirt size={18} />
        <span className="text-sm tracking-[0.25em] uppercase">Attire</span>
      </div>
      <SectionHeading>Dress Code</SectionHeading>

      <p className="mt-6 text-xl text-charcoal font-body">
        {WEDDING.dressCode}
      </p>
      <p className="mt-3 text-charcoal-light">
        We kindly request guests dress in elegant formal attire. Please avoid
        wearing white.
      </p>
    </AnimatedSection>
  </div>
);

export { EventDetails };
