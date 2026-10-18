import { ChevronLeft, ChevronRight, ExternalLink, MessageSquareQuote, X } from "lucide-react";
import { useEffect, useState } from "react";
import { formatReviewDate, getReviews } from "@/lib/reviews";
import { GoogleG, Stars } from "./Stars";

/** Floating Google reviews widget (bottom-left). Compact pill on mobile. */
export function ReviewsWidget() {
  const feed = getReviews();
  const [hidden, setHidden] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [i, setI] = useState(0);
  const n = feed.reviews.length;
  const r = feed.reviews[i];
  const prev = () => setI((i - 1 + n) % n);
  const next = () => setI((i + 1) % n);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  if (hidden && !expanded) {
    return (
      <button onClick={() => setHidden(false)} className="fixed bottom-4 left-4 z-30 hidden items-center gap-2 rounded-full border bg-card px-4 py-2.5 text-sm font-semibold shadow-lift md:flex" aria-label="Show Google reviews">
        <GoogleG className="h-4 w-4" /> Reviews
      </button>
    );
  }

  return (
    <>
      {/* Mobile compact pill — sits above the mobile action bar */}
      <button onClick={() => setExpanded(true)} className="fixed bottom-20 left-3 z-30 flex items-center gap-2 rounded-full border bg-card px-3.5 py-2 text-xs font-bold shadow-lift md:hidden" aria-label="Open Google reviews">
        <GoogleG className="h-4 w-4" />
        {feed.rating ? <>{feed.rating.value} <Stars value={feed.rating.value} className="h-3 w-3" /></> : "Reviews"}
      </button>

      {/* Desktop card */}
      <aside aria-label="Google reviews" className="fixed bottom-5 left-5 z-30 hidden w-80 rounded-3xl border bg-card p-5 shadow-lift fade-up md:block">
        <div className="flex items-start justify-between">
          <button onClick={() => setExpanded(true)} className="flex items-center gap-2 text-left" aria-label="Expand reviews panel">
            <GoogleG />
            <span>
              <span className="block text-sm font-bold text-navy">Google reviews</span>
              {feed.rating && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <b className="text-foreground">{feed.rating.value}</b> <Stars value={feed.rating.value} className="h-3 w-3" /> ({feed.rating.count})
                </span>
              )}
            </span>
          </button>
          <button onClick={() => setHidden(true)} className="grid h-8 w-8 place-items-center rounded-full bg-muted" aria-label="Dismiss reviews widget">
            <X className="h-4 w-4" />
          </button>
        </div>
        <button onClick={() => setExpanded(true)} className="mt-3 block w-full text-left">
          <p className="line-clamp-3 text-sm leading-relaxed">“{r.excerpt}”</p>
          <p className="mt-2 text-xs font-bold">— {r.author}</p>
        </button>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1">
            <button onClick={prev} className="grid h-8 w-8 place-items-center rounded-full border" aria-label="Previous review"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={next} className="grid h-8 w-8 place-items-center rounded-full border" aria-label="Next review"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Snapshot · not live</span>
        </div>
      </aside>

      {expanded && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-navy/60 p-0 backdrop-blur-sm sm:place-items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Google reviews" onClick={() => setExpanded(false)}>
          <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-card p-6 sm:rounded-3xl sm:p-8 fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <GoogleG className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl">What pet parents say</h2>
                  {feed.rating && (
                    <p className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                      <b className="text-foreground">{feed.rating.value}</b> <Stars value={feed.rating.value} /> {feed.rating.count} reviews · {feed.rating.asOf}
                    </p>
                  )}
                </div>
              </div>
              <button onClick={() => setExpanded(false)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted" aria-label="Close reviews"><X className="h-5 w-5" /></button>
            </div>
            <p className="mt-4 rounded-xl bg-soft px-4 py-3 text-xs text-muted-foreground">
              {feed.label}. Google-attributed excerpts reproduced by public directories; star ratings and dates shown only where the source displays them.
            </p>
            <ul className="mt-5 space-y-3">
              {feed.reviews.map((rv) => (
                <li key={rv.author} className="rounded-2xl border p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold">{rv.author}</span>
                    {rv.rating !== null && <Stars value={rv.rating} className="h-3.5 w-3.5" />}
                    {rv.date && <span className="text-xs text-muted-foreground">{formatReviewDate(rv.date)}</span>}
                  </div>
                  <p className="mt-2 leading-relaxed">“{rv.excerpt}”</p>
                  <a href={rv.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-muted-foreground hover:underline">{rv.source}</a>
                </li>
              ))}
            </ul>
            <a href={feed.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 font-bold text-primary-foreground">
              View all reviews on Google Maps <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export { MessageSquareQuote };
