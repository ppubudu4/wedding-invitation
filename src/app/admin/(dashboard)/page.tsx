import { createClient } from "@/lib/supabase/server";
import type { Guest } from "@/lib/types/database";
import { GuestTable } from "@/components/admin/GuestTable";

const AdminPage = async () => {
  const supabase = await createClient();
  const { data: guests } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: true })
    .returns<Guest[]>();

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-2xl text-charcoal">Guest List</h2>
        <p className="mt-1 text-sm text-charcoal-light">
          Manage your wedding guests and track RSVPs
        </p>
      </div>
      <GuestTable initialGuests={guests ?? []} />
    </div>
  );
};

export default AdminPage;
