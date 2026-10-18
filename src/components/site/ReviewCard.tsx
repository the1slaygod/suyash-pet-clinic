import { Quote } from "lucide-react";
import { formatReviewDate, type Review } from "@/lib/reviews";
import { Stars } from "./Stars";

export function ReviewCard({ review }: { review: Review }) {
  const date = formatReviewDate(review.date);
  return (
    <figure className="flex h-full flex-col rounded-3xl border bg-card p-7 shadow-soft">
      <Quote className="h-7 w-7 text-sky" aria-hidden />
      {review.rating !== null && <div className="mt-4"><Stars value={review.rating} /></div>}
      <blockquote className="mt-4 flex-1 font-display text-xl leading-snug text-navy">“{review.excerpt}”</blockquote>
      <figcaption className="mt-6 border-t pt-4 text-sm">
        <span className="font-bold text-foreground">{review.author}</span>
        {date && <span className="text-muted-foreground"> · {date}</span>}
        <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-xs text-muted-foreground underline-offset-2 hover:underline">
          {review.source}
        </a>
      </figcaption>
    </figure>
  );
}
