import { ChevronLeft, ChevronRight, EyeOff, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Photo } from "@/data/clinic";

export function Gallery({ items }: { items: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, close, step]);

  const view = (i: number) => {
    if (items[i].advisory && !revealed[i]) { setRevealed({ ...revealed, [i]: true }); return; }
    setOpen(i);
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {items.map((p, i) => {
          const hide = p.advisory && !revealed[i];
          return (
            <li key={p.title}>
              <button onClick={() => view(i)} className="group block w-full overflow-hidden rounded-3xl bg-card text-left shadow-soft transition hover:-translate-y-1 hover:shadow-lift" aria-label={hide ? `Content advisory: ${p.advisory} Tap to reveal ${p.title}` : `View ${p.title} full screen`}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${hide ? "scale-110 blur-2xl" : ""}`} />
                  {hide && (
                    <div className="absolute inset-0 grid place-items-center bg-navy/40 p-4 text-center text-navy-foreground">
                      <div><EyeOff className="mx-auto h-6 w-6" aria-hidden /><p className="mt-2 text-xs font-semibold">{p.advisory}</p><p className="mt-1 text-xs underline">Tap to view</p></div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-bold text-navy">{p.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.caption}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {open !== null && (
        <div className="fixed inset-0 z-50 flex flex-col bg-navy/95 fade-up" role="dialog" aria-modal="true" aria-label={items[open].title} onClick={close}>
          <div className="flex items-center justify-between p-4 text-navy-foreground">
            <p className="text-sm font-semibold">{items[open].title} <span className="opacity-60">· {open + 1}/{items.length}</span></p>
            <button onClick={close} className="grid h-11 w-11 place-items-center rounded-full bg-navy-foreground/10" aria-label="Close"><X className="h-5 w-5" /></button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => step(-1)} className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-navy-foreground/10 text-navy-foreground" aria-label="Previous photo"><ChevronLeft /></button>
            <img key={open} src={items[open].src} alt={items[open].alt} className="max-h-[78vh] max-w-full rounded-2xl object-contain fade-up" />
            <button onClick={() => step(1)} className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-navy-foreground/10 text-navy-foreground" aria-label="Next photo"><ChevronRight /></button>
          </div>
          <p className="p-5 text-center text-sm text-navy-foreground/80">{items[open].caption}</p>
        </div>
      )}
    </>
  );
}
