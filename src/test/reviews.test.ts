import { describe, expect, it } from "vitest";
import { getReviews } from "@/lib/reviews";

describe("reviews feed", () => {
  it("has live reviews enabled", () => {
    expect(getReviews().live).toBe(true);
  });

  it("contains valid rating and review count from Google Maps", () => {
    const feed = getReviews();
    expect(feed.rating).not.toBeNull();
    expect(feed.rating?.value).toBeGreaterThanOrEqual(4.0);
    expect(feed.rating?.count).toBeGreaterThan(100);
  });

  it("has authentic reviews with author and excerpt", () => {
    const reviews = getReviews().reviews;
    expect(reviews.length).toBeGreaterThanOrEqual(5);
    for (const r of reviews) {
      expect(r.author).toBeTruthy();
      expect(r.excerpt).toBeTruthy();
      expect(r.sourceUrl).toBeTruthy();
    }
  });
});
