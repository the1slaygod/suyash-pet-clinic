import reviewsData from "@/data/reviews-data.json";

export type Review = {
  author: string;
  excerpt: string;
  /** Only set when the source shows the rating. Never inferred. */
  rating: number | null;
  /** ISO date; null when the source does not show one. */
  date: string | null;
  source: string;
  sourceUrl: string;
};

export type ReviewsFeed = {
  live: boolean;
  label: string;
  rating: { value: number; count: number; asOf: string; sourceUrl: string } | null;
  reviews: Review[];
  mapsUrl: string;
};

export const reviewsSnapshot: ReviewsFeed = reviewsData as unknown as ReviewsFeed;

/**
 * Returns the reviews feed. Automatically updated via the daily sync cron job.
 */
export function getReviews(): ReviewsFeed {
  return reviewsSnapshot;
}

export function formatReviewDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
