import { createFileRoute } from "@tanstack/react-router";
import { GallerySection, PageHero, SectionHead, SurgicalFacilities } from "@/components/site/Sections";
import { VideoGallery } from "@/components/site/VideoGallery";

const title = "Clinic Facilities & Gallery · Suyash Pet's Clinic, Chembur";
const description = "Real photographs and videos of the Suyash operating room, consultation area and clinic front in Tilak Nagar, Chembur.";

export const Route = createFileRoute("/facilities")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: () => (
    <>
      <PageHero eyebrow="Facilities" title="See the clinic before you visit">
        Every photo and video here is original footage of the clinic — no stock images or computer-generated rooms.
      </PageHero>
      <SurgicalFacilities />
      <GallerySection />
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHead eyebrow="Videos" title="Inside the clinic">Short clips filmed at the clinic. Videos load only when you press play.</SectionHead>
        <VideoGallery />
      </section>
    </>
  ),
});
