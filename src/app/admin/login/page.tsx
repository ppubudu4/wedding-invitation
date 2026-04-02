"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const AdminLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);

      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Invalid email or password.");
        setIsLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    },
    [email, password, router],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <h1 className="mb-2 text-center font-heading text-3xl text-charcoal">
          Wedding Admin
        </h1>
        <p className="mb-8 text-center text-sm text-charcoal-light">
          Sign in to manage your guest list
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs tracking-wider uppercase text-charcoal-light"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-charcoal outline-none transition-colors placeholder:text-charcoal-light/50 focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs tracking-wider uppercase text-charcoal-light"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-charcoal outline-none transition-colors placeholder:text-charcoal-light/50 focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-rose"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-charcoal px-6 py-3.5 text-sm tracking-[0.15em] uppercase text-white transition-colors hover:bg-charcoal/90 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <LogIn size={14} />
                Sign In
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
