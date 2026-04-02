"use server";

import { createClient } from "@/lib/supabase/server";
import { rsvpFormSchema, type RsvpFormValues } from "@/lib/validations/rsvp-schema";

type RsvpResult = {
  success: boolean;
  error?: string;
};

export const submitRsvp = async (
  token: string,
  values: RsvpFormValues,
): Promise<RsvpResult> => {
  const parsed = rsvpFormSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data. Please try again." };
  }

  const { rsvpStatus, numberOfPeople, dietaryRequirements } = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase
    .from("guests")
    .update({
      rsvp_status: rsvpStatus,
      number_of_people: numberOfPeople ?? 1,
      dietary_requirements: dietaryRequirements ?? "",
    })
    .eq("unique_token", token);

  if (error) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
};
