import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
});
type ContactValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  function onSubmit() {
    setSent(true);
    reset();
  }

  return (
    <div className="pt-32 pb-24">
      <Container className="mx-auto max-w-lg">
        <Reveal className="text-center">
          <Eyebrow>Get in Touch</Eyebrow>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Contact</h1>
          <p className="mt-4 text-sm text-mute">
            For press, wholesale, or general enquiries — we typically respond within two business days.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          {sent ? (
            <div className="border hairline p-10 text-center">
              <p className="label-caps text-gold">Message Sent</p>
              <p className="mt-3 text-sm text-mute">Thank you for reaching out. We'll be in touch shortly.</p>
            </div>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
              <label className="block">
                <span className="label-caps text-mute">Name</span>
                <input className="input-underline mt-2" {...register("name")} />
                {errors.name && <span className="mt-1 block text-xs text-gold">{errors.name.message}</span>}
              </label>
              <label className="block">
                <span className="label-caps text-mute">Email</span>
                <input type="email" className="input-underline mt-2" {...register("email")} />
                {errors.email && <span className="mt-1 block text-xs text-gold">{errors.email.message}</span>}
              </label>
              <label className="block">
                <span className="label-caps text-mute">Message</span>
                <textarea rows={5} className="input-underline mt-2 resize-none" {...register("message")} />
                {errors.message && <span className="mt-1 block text-xs text-gold">{errors.message.message}</span>}
              </label>
              <button type="submit" className="btn-outline mt-2 w-full justify-center text-ink">
                Send Message
              </button>
            </form>
          )}
        </Reveal>
      </Container>
    </div>
  );
}
