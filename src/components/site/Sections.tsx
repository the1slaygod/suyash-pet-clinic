import { Link } from "@tanstack/react-router";
import {
  ArrowRight, Bath, HeartPulse, MapPin, MessageCircle, Navigation, Phone, ShieldCheck, ShoppingBag, Scissors, Stethoscope, Syringe, Clock, GraduationCap, PawPrint,
} from "lucide-react";
import type { ReactNode } from "react";
import { clinic, media, photos, services } from "@/data/clinic";
import { getReviews } from "@/lib/reviews";
import { AppointmentForm } from "./AppointmentForm";
import { Gallery } from "./Gallery";
import { ReviewCard } from "./ReviewCard";
import { GoogleG, Stars } from "./Stars";

const icons = { Stethoscope, Syringe, HeartPulse, Scissors, Bath, ShoppingBag };

export function SectionHead({ eyebrow, title, children, center }: { eyebrow: string; title: ReactNode; children?: ReactNode; center?: boolean }) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-soft">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-sky/15 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[1.1fr_.9fr] md:py-24">
        <div className="fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <MapPin className="h-3.5 w-3.5" aria-hidden /> Tilak Nagar · Chembur · Mumbai
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Compassionate veterinary & <em className="text-primary">surgical care</em> for your pet.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Consultations, vaccination, surgery, grooming and pet essentials under one roof — led by {clinic.vet.name}, {clinic.vet.credential}, {clinic.vet.role}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" hash="book" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground shadow-lift transition hover:brightness-110">
              Book Appointment <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={clinic.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-4 font-bold text-primary-foreground">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={clinic.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-full border bg-background px-7 py-4 font-bold text-primary">
              <Phone className="h-4 w-4" /> Call
            </a>
          </div>
        </div>
        <div className="relative fade-up [animation-delay:150ms]">
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <img src={media.doctor} alt={`${clinic.vet.name} at the Suyash clinic consultation desk`} width={1200} height={1600} fetchPriority="high" className="aspect-[4/5] w-full object-cover object-[center_30%]" />
          </div>
          <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-lift sm:left-auto sm:right-[-1rem] sm:w-72">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary"><GraduationCap className="h-5 w-5 text-primary" /></div>
            <div><p className="font-bold text-navy">{clinic.vet.name}</p><p className="text-xs text-muted-foreground">{clinic.vet.credential} · {clinic.vet.role}</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Highlights() {
  const feed = getReviews();
  const items = [
    { icon: GraduationCap, t: "Led by an M.V.Sc. surgeon", d: `${clinic.vet.name}, ${clinic.vet.role}` },
    { icon: ShieldCheck, t: "In-clinic surgical centre", d: "Dedicated operating room" },
    { icon: PawPrint, t: "Care for dogs & cats", d: "Other pets — call first" },
  ];
  return (
    <section className="border-b bg-background">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: I, t, d }) => (
          <div key={t} className="flex items-start gap-3">
            <I className="mt-0.5 h-6 w-6 shrink-0 text-sky" aria-hidden />
            <div><p className="font-bold text-navy">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
          </div>
        ))}
        {feed.rating && (
          <Link to="/reviews" className="flex items-start gap-3">
            <GoogleG className="mt-0.5 h-6 w-6 shrink-0" />
            <div>
              <p className="flex items-center gap-2 font-bold text-navy">{feed.rating.value} <Stars value={feed.rating.value} className="h-3.5 w-3.5" /></p>
              <p className="text-sm text-muted-foreground">{feed.rating.count} Google reviews · {feed.rating.asOf}</p>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <SectionHead eyebrow="Services" title="Everything your pet needs, in one clinic">
        Medical care, surgery, grooming and pet supplies handled by one team that knows your pet's history.
      </SectionHead>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const I = icons[s.icon];
          return (
            <li key={s.title} className="group rounded-3xl border bg-card p-7 transition hover:-translate-y-1 hover:border-sky/50 hover:shadow-lift">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><I className="h-6 w-6" aria-hidden /></div>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function SurgicalFacilities() {
  const room = photos[0]!;
  return (
    <section className="bg-soft">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
        <div className="overflow-hidden rounded-[2rem] shadow-lift">
          <img src={room.src} alt={room.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </div>
        <div>
          <SectionHead eyebrow="Surgical centre" title="A dedicated operating room, inside the clinic">
            Surgical cases are planned and performed in-clinic by {clinic.vet.name}, {clinic.vet.credential}.
          </SectionHead>
          <ul className="space-y-4">
            {[
              ["Overhead surgical lighting", "Multi-head LED lights over the operating table."],
              ["Stainless steel surgical table", "Easy-to-sanitise, adjustable operating table."],
              ["Monitoring & equipment trolley", "Patient monitor and surgical equipment beside the table."],
              ["Separate glass-partitioned room", "The operating room is closed off from the consultation area."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-4 rounded-2xl bg-background p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div><p className="font-bold text-navy">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">Descriptions are based on the clinic's own photographs.</p>
        </div>
      </div>
    </section>
  );
}

export function MeetVet() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-[.8fr_1.2fr]">
        <img src={media.doctor} alt={`Portrait of ${clinic.vet.name}`} loading="lazy" className="aspect-square w-full rounded-[2rem] object-cover object-top shadow-lift" />
        <div>
          <SectionHead eyebrow="Meet the veterinarian" title={clinic.vet.name}>
            {clinic.vet.credential} · {clinic.vet.role}
          </SectionHead>
          <p className="-mt-6 text-lg leading-relaxed">
            {clinic.vet.name} leads Suyash Pet's Clinic & Surgical Centre, handling consultations and surgical cases for dogs and cats in Tilak Nagar, Chembur.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/veterinarian" className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-bold text-primary">About the doctor <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section className="bg-soft">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHead eyebrow="Inside Suyash" title="Real photos of our clinic">
          Original, unedited photographs of the clinic. Tap any photo to view it full screen.
        </SectionHead>
        <Gallery items={photos} />
      </div>
    </section>
  );
}

export function ReviewsSection() {
  const feed = getReviews();
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHead eyebrow="Google reviews" title="Kind words from pet parents" />
        {feed.rating && (
          <div className="mb-12 flex items-center gap-4 rounded-2xl border p-5">
            <GoogleG className="h-9 w-9" />
            <div>
              <p className="flex items-center gap-2 text-2xl font-bold text-navy">{feed.rating.value} <Stars value={feed.rating.value} /></p>
              <p className="text-xs text-muted-foreground">{feed.rating.count} reviews · {feed.rating.asOf}</p>
            </div>
          </div>
        )}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {feed.reviews.map((r) => <ReviewCard key={r.author} review={r} />)}
      </div>
      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-muted-foreground">{feed.label}. Excerpts are Google-attributed reviews reproduced by public directories.</p>
        <a href={feed.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold text-primary">View on Google Maps <ArrowRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}

export function ContactSection() {
  const a = clinic.address;
  return (
    <section id="book" className="scroll-mt-24 bg-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:py-28 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <SectionHead eyebrow="Appointments" title="Request an appointment">
            Send an enquiry and the clinic will call you back to confirm a time.
          </SectionHead>
          <AppointmentForm />
        </div>
        <div className="space-y-5 lg:pt-36">
          <div className="rounded-3xl border bg-card p-6">
            <h3 className="text-xl font-semibold">Visit the clinic</h3>
            <address className="mt-3 flex gap-3 not-italic text-muted-foreground"><MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />{a.street}, {a.locality} {a.postalCode}</address>
            <p className="mt-3 flex gap-3 text-muted-foreground"><Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />{clinic.hours ?? "Please call to confirm clinic timings."}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <a href={clinic.phoneHref} className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 font-bold text-primary-foreground"><Phone className="h-4 w-4" /> Call</a>
              <a href={clinic.directionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border px-4 py-3 font-bold text-primary"><Navigation className="h-4 w-4" /> Directions</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border bg-card">
            <iframe title="Map showing Suyash Pet's Clinic in Tilak Nagar, Chembur" src={clinic.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full border-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="bg-soft">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        {children && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{children}</p>}
      </div>
    </section>
  );
}

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 gap-2 border-t bg-background/95 p-2.5 backdrop-blur md:hidden">
      <a href={clinic.phoneHref} className="flex items-center justify-center gap-1.5 rounded-full border py-3 text-sm font-bold text-primary"><Phone className="h-4 w-4" /> Call</a>
      <a href={clinic.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 rounded-full bg-whatsapp py-3 text-sm font-bold text-primary-foreground"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
      <Link to="/contact" hash="book" className="flex items-center justify-center rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground">Book</Link>
    </div>
  );
}
