import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { useAuth } from "@/store/auth";
import { formatPrice } from "@/lib/format";
import { products } from "@/data/products";

const authSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});
type AuthValues = z.infer<typeof authSchema>;

const mockOrders = [
  { id: "AU-10482", date: "2026-07-18", status: "Delivered", product: products[0], total: products[0].price },
  { id: "AU-10339", date: "2026-06-02", status: "Delivered", product: products[8], total: products[8].price },
  { id: "AU-10201", date: "2026-04-27", status: "Delivered", product: products[16], total: products[16].price },
];

export default function Account() {
  const { isAuthenticated, name, email, login, logout } = useAuth();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValues>({ resolver: zodResolver(authSchema) });

  if (isAuthenticated) {
    return (
      <div className="pt-32 pb-24">
        <Container>
          <Eyebrow>My Account</Eyebrow>
          <div className="mt-3 flex items-center justify-between">
            <h1 className="font-display text-4xl">Welcome back, {name ?? "there"}</h1>
            <button type="button" onClick={logout} className="label-caps link-underline">
              Sign Out
            </button>
          </div>
          <p className="mt-2 text-sm text-mute">{email}</p>

          <div className="mt-14">
            <p className="label-caps text-mute">Order History</p>
            <div className="mt-6 flex flex-col divide-y divide-[var(--color-hairline)] border-y hairline">
              {mockOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-6 py-6">
                  <div className="h-16 w-14 shrink-0 overflow-hidden bg-panel">
                    <img src={order.product.images[0]} alt={order.product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{order.product.name}</p>
                    <p className="mt-1 text-xs text-mute">
                      Order {order.id} — {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <span className="label-caps text-gold">{order.status}</span>
                  <span className="w-20 text-right text-sm">{formatPrice(order.total)}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <Container className="mx-auto max-w-md">
        <Reveal className="text-center">
          <Eyebrow>Account</Eyebrow>
          <h1 className="mt-3 font-display text-4xl">{mode === "signin" ? "Sign In" : "Create Account"}</h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit((values) => login(values.name || values.email.split("@")[0], values.email))}
          >
            {mode === "register" && (
              <label className="block">
                <span className="label-caps text-mute">Name</span>
                <input className="input-underline mt-2" {...register("name")} />
              </label>
            )}
            <label className="block">
              <span className="label-caps text-mute">Email</span>
              <input type="email" className="input-underline mt-2" {...register("email")} />
              {errors.email && <span className="mt-1 block text-xs text-gold">{errors.email.message}</span>}
            </label>
            <label className="block">
              <span className="label-caps text-mute">Password</span>
              <input type="password" className="input-underline mt-2" {...register("password")} />
              {errors.password && <span className="mt-1 block text-xs text-gold">{errors.password.message}</span>}
            </label>
            <button type="submit" className="btn-outline mt-2 w-full justify-center text-ink">
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "register" : "signin")}
            className="label-caps mt-6 block w-full text-center link-underline"
          >
            {mode === "signin" ? "Create an account" : "Already have an account? Sign in"}
          </button>
        </Reveal>
      </Container>
    </div>
  );
}
