"use client";

import { type ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type AdminShellProps = {
  children: ReactNode;
  userEmail: string;
};

const AdminShell = ({ children, userEmail }: AdminShellProps) => {
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }, [router]);

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-gold/15 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-heading text-xl text-charcoal">
              Wedding Admin
            </h1>
            <p className="text-xs text-charcoal-light">{userEmail}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-lg border border-gold/20 px-4 py-2 text-xs tracking-wider uppercase text-charcoal-light transition-colors hover:bg-cream"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
};

export { AdminShell };
