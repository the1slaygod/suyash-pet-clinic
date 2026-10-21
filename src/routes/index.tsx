import { createFileRoute } from "@tanstack/react-router";
import {
  ContactSection, FacilitiesShowcase, GallerySection, Hero, Highlights, MeetVet, ReviewsSection, ServicesGrid, SurgicalFacilities,
} from "@/components/site/Sections";

const title = "Suyash Pet's Clinic & Surgical Centre · Vet in Chembur, Mumbai";
const description =
  "Veterinary consultation, vaccination, surgery and grooming in Tilak Nagar, Chembur — led by Dr. Gaurav Khandekar, M.V.Sc., Veterinary Surgeon.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Highlights />
      <ServicesGrid />
      <SurgicalFacilities />
      <FacilitiesShowcase />
      <MeetVet />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
