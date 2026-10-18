import { z } from "zod";

export const enquirySchema = z.object({
  parent_name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,20}$/, "Enter a valid phone number"),
  pet_name: z.string().trim().min(1, "Please enter your pet's name").max(60),
  pet_type: z.string().min(1, "Choose a pet type").max(30),
  service: z.string().min(1, "Choose a service").max(80),
  preferred_date: z.string().max(10).optional().or(z.literal("")),
  preferred_time: z.string().max(20).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type Enquiry = z.infer<typeof enquirySchema>;
