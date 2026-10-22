import { ArrowUpRight, CheckCircle2, ExternalLink, Quote, X } from "lucide-react";
import { useEffect, useState } from "react";
import { formatReviewDate, type Review } from "@/lib/reviews";
import { GoogleG, Stars } from "./Stars";

export function ReviewCard({ review }: { review: Review }) {
  const [open, setOpen] = useState(false);
  const date = formatReviewDate(review.date);

  // Close on Escape key and prevent background scroll when open
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Extract initial for avatar
  const initial = review.author.trim().charAt(0).toUpperCase() || "P";

  return (
    <>
      {/* Compact Aesthetic Card */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`Read full review by ${review.author}`}
        className="group relative flex h-full cursor-pointer flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-sky/50 hover:shadow-lift focus:outline-none focus:ring-2 focus:ring-sky/40"
      >
        <div>
          {/* Card Top: Google icon + Stars + Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GoogleG className="h-5 w-5" />
              {review.rating !== null && <Stars value={review.rating} className="h-4 w-4" />}
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-soft px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Google Verified
            </span>
          </div>

          {/* Review text snippet (clamped) */}
          <blockquote className="mt-4 line-clamp-3 text-sm leading-relaxed text-navy font-medium">
            “{review.excerpt}”
          </blockquote>
        </div>

        {/* Card Footer: Author + Read full link */}
        <div className="mt-5 border-t border-border/60 pt-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-sm">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-navy group-hover:text-primary transition-colors">
                  {review.author}
                </p>
                {date && <p className="text-xs text-muted-foreground">{date}</p>}
              </div>
            </div>

            <span className="flex shrink-0 items-center gap-0.5 text-xs font-bold text-primary group-hover:underline">
              Read more <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Graceful Expanded Review Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm sm:p-6 fade-up"
          role="dialog"
          aria-modal="true"
          aria-label={`Full review by ${review.author}`}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8 fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-primary">
                  {initial}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-navy">{review.author}</h3>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-label="Verified review" />
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    {review.rating !== null && <Stars value={review.rating} className="h-3.5 w-3.5" />}
                    {date && <span>· {date}</span>}
                    <span className="rounded-md bg-soft px-2 py-0.5 font-medium text-primary">
                      Google Review
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-foreground transition hover:bg-muted/80 focus:outline-none"
                aria-label="Close review"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body: Full review text with proper formatting */}
            <div className="mt-6 border-t border-border pt-6">
              <Quote className="h-8 w-8 text-sky/30 mb-2" aria-hidden />
              <div className="whitespace-pre-line text-base leading-relaxed text-foreground/90 font-normal">
                {review.excerpt}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={review.sourceUrl || "https://maps.app.goo.gl/fjKtucUykBCwF2vDA"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-primary hover:underline"
              >
                <GoogleG className="h-4 w-4" /> View original on Google Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:brightness-110"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
