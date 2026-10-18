import { createFileRoute } from "@tanstack/react-router";
import { ContactSection, PageHero } from "@/components/site/Sections";

const title = "Contact & Appointments · Suyash Pet's Clinic, Chembur";
const description = "Request a vet appointment, call or WhatsApp Suyash Pet's Clinic in Tilak Nagar, Chembur, Mumbai 400089.";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: () => (
    <>
      <PageHero eyebrow="Contact" title="Visit, call or send an enquiry" />
      <ContactSection />
    </>
  ),
});
