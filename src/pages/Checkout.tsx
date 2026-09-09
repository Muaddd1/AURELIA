import { useState, type InputHTMLAttributes } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import clsx from "clsx";
import { Container, Eyebrow } from "@/components/ui/Container";
import { shippingSchema, paymentSchema, type ShippingValues, type PaymentValues } from "@/lib/checkoutSchemas";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";

const steps = ["Shipping", "Payment", "Review"] as const;

function Field({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block">
      <span className="label-caps text-mute">{label}</span>
      <input className="input-underline mt-2" {...props} />
      {error && <span className="mt-1 block text-xs text-gold">{error}</span>}
    </label>
  );
}

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<ShippingValues | null>(null);
  const [payment, setPayment] = useState<PaymentValues | null>(null);
  const [placed, setPlaced] = useState(false);

  const lines = useCart((s) => s.lines);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  const shippingForm = useForm<ShippingValues>({ resolver: zodResolver(shippingSchema), defaultValues: shipping ?? undefined });
  const paymentForm = useForm<PaymentValues>({ resolver: zodResolver(paymentSchema), defaultValues: payment ?? undefined });

  if (lines.length === 0 && !placed) {
    return <Navigate to="/cart" replace />;
  }

  if (placed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold">
          <Check size={24} strokeWidth={1.25} className="text-gold" />
        </div>
        <h1 className="mt-8 font-display text-4xl">Order Confirmed</h1>
        <p className="mt-3 max-w-md text-sm text-mute">
          Thank you. A confirmation has been sent to {shipping?.email}. Your pieces are being prepared for
          shipment.
        </p>
        <Link to="/" className="btn-outline mt-10 text-ink">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <Container>
        <Eyebrow>Checkout</Eyebrow>
        <div className="mt-4 flex items-center gap-6">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className={clsx(
                  "flex h-6 w-6 items-center justify-center rounded-full border text-xs",
                  i <= step ? "border-gold text-gold" : "border-[var(--color-hairline)] text-mute"
                )}
              >
                {i + 1}
              </span>
              <span className={clsx("label-caps", i === step ? "text-ink" : "text-mute")}>{label}</span>
              {i < steps.length - 1 && <span className="h-px w-8 bg-[var(--color-hairline)]" />}
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_360px]">
          <div>
            {step === 0 && (
              <form
                className="flex flex-col gap-6"
                onSubmit={shippingForm.handleSubmit((values) => {
                  setShipping(values);
                  setStep(1);
                })}
              >
                <h2 className="font-display text-2xl">Shipping Address</h2>
                <Field label="Full Name" {...shippingForm.register("fullName")} error={shippingForm.formState.errors.fullName?.message} />
                <Field label="Email" type="email" {...shippingForm.register("email")} error={shippingForm.formState.errors.email?.message} />
                <Field label="Address" {...shippingForm.register("address")} error={shippingForm.formState.errors.address?.message} />
                <div className="grid grid-cols-2 gap-6">
                  <Field label="City" {...shippingForm.register("city")} error={shippingForm.formState.errors.city?.message} />
                  <Field label="Postal Code" {...shippingForm.register("postalCode")} error={shippingForm.formState.errors.postalCode?.message} />
                </div>
                <Field label="Country" {...shippingForm.register("country")} error={shippingForm.formState.errors.country?.message} />
                <button type="submit" className="btn-outline mt-4 w-full justify-center text-ink sm:w-fit">
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 1 && (
              <form
                className="flex flex-col gap-6"
                onSubmit={paymentForm.handleSubmit((values) => {
                  setPayment(values);
                  setStep(2);
                })}
              >
                <h2 className="font-display text-2xl">Payment Details</h2>
                <p className="text-xs text-mute">This is a template demo — no real payment is processed.</p>
                <Field label="Name on Card" {...paymentForm.register("cardName")} error={paymentForm.formState.errors.cardName?.message} />
                <Field label="Card Number" placeholder="•••• •••• •••• ••••" {...paymentForm.register("cardNumber")} error={paymentForm.formState.errors.cardNumber?.message} />
                <div className="grid grid-cols-2 gap-6">
                  <Field label="Expiry (MM/YY)" placeholder="MM/YY" {...paymentForm.register("expiry")} error={paymentForm.formState.errors.expiry?.message} />
                  <Field label="CVC" {...paymentForm.register("cvc")} error={paymentForm.formState.errors.cvc?.message} />
                </div>
                <div className="mt-4 flex gap-4">
                  <button type="button" onClick={() => setStep(0)} className="label-caps link-underline">
                    Back
                  </button>
                  <button type="submit" className="btn-outline w-full justify-center text-ink sm:w-fit">
                    Review Order
                  </button>
                </div>
              </form>
            )}

            {step === 2 && shipping && payment && (
              <div className="flex flex-col gap-8">
                <h2 className="font-display text-2xl">Review Your Order</h2>
                <div className="border hairline p-6">
                  <p className="label-caps text-mute">Ship To</p>
                  <p className="mt-2 text-sm">
                    {shipping.fullName}
                    <br />
                    {shipping.address}, {shipping.city} {shipping.postalCode}
                    <br />
                    {shipping.country}
                  </p>
                </div>
                <div className="border hairline p-6">
                  <p className="label-caps text-mute">Payment</p>
                  <p className="mt-2 text-sm">
                    {payment.cardName} — Card ending in {payment.cardNumber.slice(-4)}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="label-caps link-underline">
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPlaced(true);
                      clear();
                    }}
                    className="btn-outline w-full justify-center text-ink sm:w-fit"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-fit border hairline p-8">
            <p className="label-caps">Order Summary</p>
            <ul className="mt-6 flex flex-col gap-4">
              {lines.map((line) => (
                <li key={`${line.productId}-${line.color}-${line.size}`} className="flex gap-3">
                  <div className="h-16 w-14 shrink-0 overflow-hidden bg-panel">
                    <img src={line.image} alt={line.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col text-sm">
                    <span>{line.name}</span>
                    <span className="text-xs text-mute">Qty {line.quantity}</span>
                  </div>
                  <span className="text-sm">{formatPrice(line.price * line.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t hairline pt-6 text-base">
              <span>Total</span>
              <span className="text-gold">{formatPrice(subtotal)}</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
