import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { clinic, media } from "@/data/clinic";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/facilities", label: "Facilities" },
  { to: "/veterinarian", label: "Veterinarian" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" className="flex items-center gap-3" aria-label={`${clinic.name} home`}>
          <img src={media.logo} alt="Suyash Pet's Clinic & Surgical Centre logo" width={56} height={56} className="h-14 w-14 object-contain" />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-lg font-semibold text-primary">Suyash</span>
            <span className="block text-xs text-muted-foreground">Pet's Clinic & Surgical Centre</span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-foreground/80 transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={clinic.phoneHref} className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-primary md:flex">
            <Phone className="h-4 w-4" aria-hidden /> {clinic.phoneDisplay}
          </a>
          <Link to="/contact" hash="book" className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft transition hover:brightness-110">
            Book Appointment
          </Link>
          <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full border lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t bg-background px-5 pb-5 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block border-b py-4 font-semibold">
              {n.label}
            </Link>
          ))}
          <a href={clinic.phoneHref} className="mt-4 flex items-center gap-2 font-semibold text-primary">
            <Phone className="h-4 w-4" /> Call {clinic.phoneDisplay}
          </a>
        </nav>
      )}
    </header>
  );
}
