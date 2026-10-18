/**
 * Reviews data layer. Today it serves a static historical snapshot
 * (reviews/google_review_excerpts.json from the clinic pack).
 * To go live, implement a server function that calls Google Places API
 * (place details → rating, userRatingCount, reviews) with a server-side key,
 * and return the same `ReviewsFeed` shape with `live: true`.
 */
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

export const reviewsSnapshot: ReviewsFeed = {
  live: false,
  label: "Historical snapshot · not a live Google feed",
  rating: {
    value: 4.6,
    count: 237,
    asOf: "August 2026 directory snapshot",
    sourceUrl:
      "https://trustedvets.in/clinic/suyash-pet-s-clinic-and-surgical-centre-veterinary-doctor-in-chembur/",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Suyash+Pets+Clinic+Surgical+Centre+Chembur",
  reviews: [
    {
      author: "Rajashree",
      rating: 5,
      date: "2025-11-26",
      excerpt: "Can’t thank Dr. Gaurav enough for saving my cat’s life.",
      source: "Google review via Wanderlog",
      sourceUrl: "https://wanderlog.com/place/details/12358215/suyash-pets-clinic--surgical-centre",
    },
    {
      author: "Baljeet K",
      rating: 5,
      date: "2025-07-03",
      excerpt: "I really liked the experience and iam thankful to doctor",
      source: "Google review via Wanderlog",
      sourceUrl: "https://wanderlog.com/place/details/12358215/suyash-pets-clinic--surgical-centre",
    },
    {
      author: "Amey Avinash",
      rating: null,
      date: null,
      excerpt: "I got my dog's endoscopy done here at the clinic.",
      source: "Google review via TrustedVets",
      sourceUrl:
        "https://trustedvets.in/clinic/suyash-pet-s-clinic-and-surgical-centre-veterinary-doctor-in-chembur/",
    },
    {
      author: "Priyanka Sharma",
      rating: null,
      date: null,
      excerpt: "we are so happy that we trusted Dr Gaurav",
      source: "Google review via TrustedVets",
      sourceUrl:
        "https://trustedvets.in/clinic/suyash-pet-s-clinic-and-surgical-centre-veterinary-doctor-in-chembur/",
    },
  ],
};

/** Swap this for a live fetch once a Places API key and Place ID are configured. */
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
