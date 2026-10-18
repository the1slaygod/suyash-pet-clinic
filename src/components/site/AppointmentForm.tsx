import { CheckCircle2, Loader2, MessageCircle, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { clinic, serviceOptions } from "@/data/clinic";
import { enquirySchema } from "@/lib/enquiry";

const field = "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20";
const label = "text-sm font-semibold text-navy";

export function AppointmentForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setState("sending");
    const v = parsed.data;
    const { error } = await supabase.from("appointment_enquiries").insert({
      parent_name: v.parent_name,
      phone: v.phone,
      pet_name: v.pet_name,
      pet_type: v.pet_type,
      service: v.service,
      preferred_date: v.preferred_date || null,
      preferred_time: v.preferred_time || null,
      notes: v.notes || null,
    });
    setState(error ? "error" : "done");
  }

  if (state === "done") {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center shadow-soft" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden />
        <h3 className="mt-4 text-2xl">Enquiry submitted</h3>
        <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
          Thank you. This is not a confirmed booking yet — the clinic team will call you to confirm a time.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={clinic.phoneHref} className="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-semibold text-primary"><Phone className="h-4 w-4" /> Call clinic</a>
          <button onClick={() => setState("idle")} className="rounded-full px-5 py-3 font-semibold text-muted-foreground">Send another</button>
        </div>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-sm text-destructive">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border bg-card p-6 shadow-soft sm:p-8" aria-label="Appointment enquiry">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block"><span className={label}>Pet parent's name *</span><input name="parent_name" autoComplete="name" className={field} />{err("parent_name")}</label>
        <label className="block"><span className={label}>Contact number *</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} />{err("phone")}</label>
        <label className="block"><span className={label}>Pet's name *</span><input name="pet_name" className={field} />{err("pet_name")}</label>
        <label className="block"><span className={label}>Type of pet *</span>
          <select name="pet_type" defaultValue="" className={field}><option value="" disabled>Select</option><option>Dog</option><option>Cat</option><option>Other (please call first)</option></select>{err("pet_type")}
        </label>
        <label className="block sm:col-span-2"><span className={label}>Service required *</span>
          <select name="service" defaultValue="" className={field}><option value="" disabled>Select a service</option>{serviceOptions.map((s) => <option key={s}>{s}</option>)}</select>{err("service")}
        </label>
        <label className="block"><span className={label}>Preferred date</span><input name="preferred_date" type="date" className={field} /></label>
        <label className="block"><span className={label}>Preferred time</span><input name="preferred_time" type="time" className={field} /></label>
        <label className="block sm:col-span-2"><span className={label}>Additional notes</span><textarea name="notes" rows={3} maxLength={1000} className={field} placeholder="Symptoms, age, anything we should know" /></label>
      </div>
      {state === "error" && <p className="mt-4 text-sm text-destructive">Sorry, that didn't go through. Please try again or call {clinic.phoneDisplay}.</p>}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button disabled={state === "sending"} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-bold text-primary-foreground shadow-soft transition hover:brightness-110 disabled:opacity-70">
          {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" />} Send enquiry
        </button>
        <a href={clinic.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 font-bold text-primary-foreground">
          <MessageCircle className="h-4 w-4" /> WhatsApp instead
        </a>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Submitting sends an enquiry, not a confirmed appointment. The clinic will contact you to confirm.</p>
    </form>
  );
}
