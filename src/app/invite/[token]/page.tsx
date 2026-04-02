import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Guest } from "@/lib/types/database";
import { InvitationContent } from "./InvitationContent";

type InvitePageProps = {
  params: Promise<{ token: string }>;
};

const InvitePage = async ({ params }: InvitePageProps) => {
  const { token } = await params;

  const supabase = await createClient();
  const { data: guest } = await supabase
    .from("guests")
    .select("*")
    .eq("unique_token", token)
    .single<Guest>();

  if (!guest) {
    notFound();
  }

  return <InvitationContent guest={guest} />;
};

export default InvitePage;
