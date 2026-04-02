"use client";

import type { Guest } from "@/lib/types/database";
import { HeroSection } from "@/components/invitation/HeroSection";
import { CountdownTimer } from "@/components/invitation/CountdownTimer";
import { EventDetails } from "@/components/invitation/EventDetails";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Divider } from "@/components/ui/Divider";
import { RsvpForm } from "@/components/rsvp/RsvpForm";
import { RosePetalsShower } from "@/components/ui/RosePetalsShower";

type InvitationContentProps = {
  guest: Guest;
};

const InvitationContent = ({ guest }: InvitationContentProps) => (
  <main className="relative">
    <RosePetalsShower />
    <HeroSection guestName={guest.full_name} />

    <section className="bg-white px-6 py-20">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <p className="text-sm tracking-[0.25em] uppercase text-gold">
          Counting Down
        </p>
        <h2 className="mt-2 font-heading text-3xl text-charcoal sm:text-4xl">
          Until We Say &ldquo;I Do&rdquo;
        </h2>
        <div className="mt-10">
          <CountdownTimer />
        </div>
      </AnimatedSection>
    </section>

    <EventDetails />

    <section id="rsvp" className="scroll-mt-10 bg-white px-6 py-20">
      <AnimatedSection className="mx-auto max-w-lg text-center">
        <p className="text-sm tracking-[0.25em] uppercase text-gold">
          Respond
        </p>
        <h2 className="mt-2 font-heading text-3xl text-charcoal sm:text-4xl">
          Will You Be Joining Us?
        </h2>
        <p className="mt-4 text-charcoal-light">
          Please let us know by August 1, 2026
        </p>
      </AnimatedSection>

      <div className="mx-auto mt-10 max-w-md">
        <RsvpForm guest={guest} />
      </div>
    </section>

    <Divider />

    <footer className="bg-cream py-12 text-center">
      <p className="font-heading text-2xl text-charcoal">
        We can&apos;t wait to celebrate with you!
      </p>
      <p className="mt-2 text-sm text-charcoal-light">
        With love, Alexander &amp; Victoria
      </p>
    </footer>
  </main>
);

export { InvitationContent };
