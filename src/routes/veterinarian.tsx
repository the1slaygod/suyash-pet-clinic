import { createFileRoute } from "@tanstack/react-router";
import { ContactSection, MeetVet, PageHero, ReviewsSection } from "@/components/site/Sections";

const title = "Dr. Gaurav Khandekar, M.V.Sc. · Suyash Pet's Clinic";
const description = "Meet Dr. Gaurav Khandekar, M.V.Sc., Veterinary Surgeon at Suyash Pet's Clinic & Surgical Centre, Chembur.";

export const Route = createFileRoute("/veterinarian")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "profile" }] }),
  component: () => (
    <>
      <PageHero eyebrow="Our veterinarian" title="The doctor behind Suyash" />
      <MeetVet />
      <ReviewsSection />
      <ContactSection />
    </>
  ),
});
