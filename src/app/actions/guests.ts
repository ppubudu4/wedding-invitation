"use server";

import { createClient } from "@/lib/supabase/server";
import type { Guest } from "@/lib/types/database";

export const fetchAllGuests = async (): Promise<Guest[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: true })
    .returns<Guest[]>();

  if (error) {
    throw new Error("Failed to fetch guests");
  }

  return data ?? [];
};

export const addGuest = async (
  fullName: string,
  numberOfPeople: number,
): Promise<{ success: boolean; token?: string; error?: string }> => {
  const supabase = await createClient();

  const uniqueToken = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

  const { error } = await supabase.from("guests").insert({
    full_name: fullName,
    unique_token: uniqueToken,
    rsvp_status: "pending",
    number_of_people: Math.max(1, numberOfPeople),
    dietary_requirements: "",
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, token: uniqueToken };
};

export const deleteGuest = async (
  guestId: string,
): Promise<{ success: boolean; error?: string }> => {
  const supabase = await createClient();

  const { error } = await supabase.from("guests").delete().eq("id", guestId);

  if (error) {
    return { success: false, error: "Failed to delete guest." };
  }

  return { success: true };
};
