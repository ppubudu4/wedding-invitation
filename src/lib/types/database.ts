export const RSVP_STATUS = {
  PENDING: "pending",
  ATTENDING: "attending",
  DECLINED: "declined",
} as const;

export type RsvpStatus = (typeof RSVP_STATUS)[keyof typeof RSVP_STATUS];

export type Guest = {
  id: string;
  full_name: string;
  unique_token: string;
  rsvp_status: RsvpStatus;
  number_of_people: number;
  dietary_requirements: string;
  created_at: string;
};

export type GuestInsert = Omit<Guest, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type GuestUpdate = Partial<
  Pick<Guest, "rsvp_status" | "number_of_people" | "dietary_requirements">
>;
