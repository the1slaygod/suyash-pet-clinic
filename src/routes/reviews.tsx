import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ReviewsSection } from "@/components/site/Sections";

const title = "Google Reviews · Suyash Pet's Clinic, Chembur";
const description = "Google-attributed reviews from pet parents about Suyash Pet's Clinic & Surgical Centre in Chembur, Mumbai.";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: () => (
    <>
      <PageHero eyebrow="Reviews" title="What pet parents say">
        A historical snapshot of Google-attributed reviews. For the latest reviews, open the clinic on Google Maps.
      </PageHero>
      <ReviewsSection />
    </>
  ),
});
