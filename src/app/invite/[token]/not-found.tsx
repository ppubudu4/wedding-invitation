import Link from "next/link";

const InviteNotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
    <h1 className="font-heading text-5xl text-charcoal">
      Invitation Not Found
    </h1>
    <p className="mt-4 max-w-md text-lg text-charcoal-light">
      We couldn&apos;t find your invitation. Please check the link you received
      and try again.
    </p>
    <Link
      href="/"
      className="mt-8 inline-block rounded-full border border-gold/60 px-8 py-3 text-sm tracking-[0.2em] uppercase text-gold-dark transition-colors hover:bg-gold/10"
    >
      Go Home
    </Link>
  </div>
);

export default InviteNotFound;
