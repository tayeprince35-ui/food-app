import { z } from "zod";
import { normalizePhone } from "@/lib/phone";

const signupSchema = z
  .object({
    firstName: z.string().trim().min(2, "First name must be at least 2 characters long"),
    lastName: z.string().trim().min(2, "Last name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    country: z.string().min(1, "Please select a country"),
    phoneNumber: z.string().trim().min(1, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    referralCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.phoneNumber && !normalizePhone(data.phoneNumber, data.country)) {
      ctx.addIssue({
        code: "custom",
        path: ["phoneNumber"],
        message: "Enter a valid phone number for the selected country",
      });
    }
  });

export default signupSchema;