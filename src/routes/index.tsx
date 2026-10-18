import { createFileRoute } from "@tanstack/react-router";
import {
  ContactSection, GallerySection, Hero, Highlights, MeetVet, ReviewsSection, ServicesGrid, SurgicalFacilities,
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
      <MeetVet />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
