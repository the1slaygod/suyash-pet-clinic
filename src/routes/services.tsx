import { createFileRoute } from "@tanstack/react-router";
import { ContactSection, PageHero, ServicesGrid, SurgicalFacilities } from "@/components/site/Sections";

const title = "Veterinary Services in Chembur · Suyash Pet's Clinic";
const description = "Consultation, vaccination, health checkups, surgical care, grooming and pet products for dogs and cats in Tilak Nagar, Chembur.";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: () => (
    <>
      <PageHero eyebrow="Services" title="Care for every stage of your pet's life">
        We primarily treat dogs and cats. For other pets, please call first so we can advise whether we can help.
      </PageHero>
      <ServicesGrid />
      <SurgicalFacilities />
      <ContactSection />
    </>
  ),
});
