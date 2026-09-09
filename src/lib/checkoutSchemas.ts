import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  address: z.string().min(4, "Enter your address"),
  city: z.string().min(1, "Enter your city"),
  postalCode: z.string().min(3, "Enter a valid postal code"),
  country: z.string().min(1, "Enter your country"),
});
export type ShippingValues = z.infer<typeof shippingSchema>;

export const paymentSchema = z.object({
  cardName: z.string().min(2, "Enter the name on card"),
  cardNumber: z
    .string()
    .min(15, "Enter a valid card number")
    .max(19)
    .regex(/^[\d\s]+$/, "Digits only"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
  cvc: z.string().min(3, "Enter a valid CVC").max(4),
});
export type PaymentValues = z.infer<typeof paymentSchema>;
