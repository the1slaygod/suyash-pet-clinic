import { describe, expect, it } from "vitest";
import { getReviews } from "@/lib/reviews";
describe("reviews snapshot", () => {
  it("is labelled as not live", () => { expect(getReviews().live).toBe(false); });
  it("never shows stars for reviews whose source lacks a rating", () => {
    const amey = getReviews().reviews.find((r) => r.author === "Amey Avinash");
    expect(amey?.rating).toBeNull();
  });
});
