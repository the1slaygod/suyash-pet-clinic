import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { clinic, photos } from "@/data/clinic";
import { Gallery } from "@/components/site/Gallery";
import { ContactSection, PageHero, SectionHead, SurgicalFacilities } from "@/components/site/Sections";
import { VideoGallery } from "@/components/site/VideoGallery";

const title = "Veterinary Facilities in Chembur | Suyash Pet's Clinic";
const description = "Explore the facilities at Suyash Pet's Clinic & Surgical Centre in Tilak Nagar, Chembur. View our surgical suite, consultation areas and available veterinary equipment.";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/facilities" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/facilities" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Facilities · Tilak Nagar, Chembur" title="Veterinary facilities at Suyash Clinic">
        Original photographs and walkthrough videos of our clinic. See the spaces before you visit.
      </PageHero>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-5 py-4 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="text-primary underline-offset-4 hover:underline">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Facilities</li>
        </ol>
      </nav>
      <SurgicalFacilities />
      <section className="mx-auto max-w-6xl px-5 py-8" aria-label="Clinic contact options">
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" hash="book" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground">Enquire about surgery <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          <a href={clinic.phoneHref} className="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-bold text-primary"><Phone className="h-4 w-4" aria-hidden /> Call Suyash Clinic</a>
          <a href={clinic.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-bold text-primary"><MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp</a>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:py-20" aria-labelledby="consultation-title">
        <div>
          <SectionHead eyebrow="Consultation & examination" title="Care begins with a conversation" className="mb-5" />
          <h2 id="consultation-title" className="sr-only">Consultation and examination area</h2>
          <p className="leading-relaxed text-muted-foreground">The clinic offers veterinary consultations, treatment and health checkups for dogs and cats. Contact the clinic to discuss your pet’s needs and arrange a visit.</p>
          <Link to="/contact" hash="book" className="mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-3 font-bold text-primary">Book a consultation <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </div>
        {photos[1] && <figure className="overflow-hidden rounded-2xl border bg-card"><img src={photos[1].src} alt={photos[1].alt} loading="lazy" className="aspect-[4/3] w-full object-cover" /><figcaption className="p-4 text-sm text-muted-foreground">{photos[1].caption}</figcaption></figure>}
      </section>
      <section className="bg-soft" aria-labelledby="reception-title">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <SectionHead eyebrow="Reception & waiting area" title="A preview before you arrive" className="mb-8" />
          <h2 id="reception-title" className="sr-only">Reception and waiting area</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {photos.slice(2, 4).map((photo) => <figure key={photo.title} className="overflow-hidden rounded-2xl border bg-card"><img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" /><figcaption className="p-4"><h3 className="font-semibold">{photo.title}</h3><p className="mt-1 text-sm text-muted-foreground">{photo.caption}</p></figcaption></figure>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20" aria-labelledby="diagnostics-title">
        <SectionHead eyebrow="Diagnostic facilities" title="Ask us about diagnostic needs" className="mb-5" />
        <h2 id="diagnostics-title" className="sr-only">Diagnostic facilities and equipment</h2>
        <p className="max-w-3xl leading-relaxed text-muted-foreground">The clinic has not confirmed which diagnostic equipment or tests are available on-site. Please call before your visit to ask about X-ray, ultrasound, endoscopy, laboratory tests or other diagnostic services.</p>
        <a href={clinic.phoneHref} className="mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-3 font-bold text-primary"><Phone className="h-4 w-4" aria-hidden /> Call to confirm</a>
      </section>
      <section className="bg-soft">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <SectionHead eyebrow="Photo gallery" title="Real photographs of the clinic">Original photographs, including a clearly labelled clinical procedure image. Select a photo to enlarge it.</SectionHead>
          <Gallery items={photos} />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <SectionHead eyebrow="Walkthrough videos" title="Inside the clinic">Original clinic footage. Videos load when you press play.</SectionHead>
        <VideoGallery />
      </section>
      <section className="border-t bg-background" aria-labelledby="facilities-faq-title">
        <div className="mx-auto max-w-4xl px-5 py-16 md:py-20">
          <SectionHead eyebrow="Common questions" title="Facilities FAQs" className="mb-8" />
          <h2 id="facilities-faq-title" className="sr-only">Facilities frequently asked questions</h2>
          <div className="divide-y border-y">
            <details className="py-5"><summary className="cursor-pointer font-semibold text-navy">What facilities are available at Suyash Pet’s Clinic?</summary><p className="mt-3 leading-relaxed text-muted-foreground">The clinic has consultation and treatment services, health checkups, grooming, pet supplies and an in-clinic operating room. Please call to confirm specific diagnostic equipment.</p></details>
            <details className="py-5"><summary className="cursor-pointer font-semibold text-navy">Does Suyash Clinic have an operating theatre?</summary><p className="mt-3 leading-relaxed text-muted-foreground">The clinic identifies an in-clinic surgical centre and has shared photographs of its operating room. Call to discuss a particular procedure.</p></details>
            <details className="py-5"><summary className="cursor-pointer font-semibold text-navy">What veterinary surgeries are performed at the clinic?</summary><p className="mt-3 leading-relaxed text-muted-foreground">The clinic lists soft-tissue and routine surgical care, including spay and neuter procedures. A veterinarian can advise whether a specific procedure is offered.</p></details>
            <details className="py-5"><summary className="cursor-pointer font-semibold text-navy">Is veterinary endoscopy available at Suyash Clinic?</summary><p className="mt-3 leading-relaxed text-muted-foreground">Endoscopy availability has not been confirmed. Please call the clinic to ask.</p></details>
            <details className="py-5"><summary className="cursor-pointer font-semibold text-navy">Which diagnostic tests are performed in-house?</summary><p className="mt-3 leading-relaxed text-muted-foreground">The clinic has not confirmed its in-house diagnostic tests. Please call before visiting to check a specific test.</p></details>
            <details className="py-5"><summary className="cursor-pointer font-semibold text-navy">Can pet owners book a surgical consultation?</summary><p className="mt-3 leading-relaxed text-muted-foreground">You can send an appointment enquiry, and the clinic will contact you to confirm a time. An enquiry is not a confirmed booking.</p></details>
            <details className="py-5"><summary className="cursor-pointer font-semibold text-navy">Where is Suyash Clinic located in Chembur?</summary><p className="mt-3 leading-relaxed text-muted-foreground">{clinic.address.street}, {clinic.address.locality} {clinic.address.postalCode}.</p></details>
            <details className="py-5"><summary className="cursor-pointer font-semibold text-navy">How can I book an appointment?</summary><p className="mt-3 leading-relaxed text-muted-foreground">Send an appointment enquiry online, call {clinic.phoneDisplay}, or contact the clinic on WhatsApp. The clinic will confirm the appointment time.</p></details>
          </div>
        </div>
      </section>
      <section className="bg-soft" aria-label="Clinic location">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:py-20">
          <div><SectionHead eyebrow="Find us" title="Visit Suyash Clinic" className="mb-4" /><address className="not-italic leading-relaxed text-muted-foreground">{clinic.address.street}<br />{clinic.address.locality} {clinic.address.postalCode}</address><a href={clinic.directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground"><MapPin className="h-4 w-4" aria-hidden /> Get directions</a></div>
          <iframe title="Map showing Suyash Pet's Clinic in Tilak Nagar, Chembur" src={clinic.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full rounded-2xl border-0" />
        </div>
      </section>
      <ContactSection />
    </>
  ),
});
