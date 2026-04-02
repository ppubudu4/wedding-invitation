import { z } from "zod";

export const rsvpFormSchema = z.object({
  rsvpStatus: z.enum(["attending", "declined"]),
  numberOfPeople: z.number().min(1).max(20).optional(),
  dietaryRequirements: z.string().optional(),
});

export type RsvpFormValues = z.infer<typeof rsvpFormSchema>;
