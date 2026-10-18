import { Link } from "@tanstack/react-router";
import { clinic, media } from "@/data/clinic";

export function SiteFooter() {
  const a = clinic.address;
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="inline-block rounded-2xl bg-background p-2">
            <img src={media.logo} alt="Suyash Pet's Clinic & Surgical Centre logo" width={80} height={80} className="h-20 w-20 object-contain" loading="lazy" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-foreground/75">
            Veterinary consultation, surgical care, grooming and pet essentials in Tilak Nagar, Chembur — led by {clinic.vet.name}, {clinic.vet.credential}.
          </p>
        </div>
        <div>
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-sky">Visit</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed text-navy-foreground/80">
            {a.street}<br />{a.locality} {a.postalCode}<br />{a.region}
          </address>
          <a href={clinic.phoneHref} className="mt-3 block text-sm font-semibold">{clinic.phoneDisplay}</a>
        </div>
        <div>
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-sky">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm text-navy-foreground/80">
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/facilities">Facilities & gallery</Link></li>
            <li><Link to="/veterinarian">Our veterinarian</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/contact">Contact & appointments</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-navy-foreground/60">
          © {new Date().getFullYear()} {clinic.name}. Appointment requests are enquiries — the clinic will call to confirm.
        </p>
      </div>
    </footer>
  );
}
