import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export const proxy = async (request: NextRequest) => updateSession(request);

export const config = {
  matcher: ["/admin/:path*"],
};
