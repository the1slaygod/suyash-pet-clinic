import { videos } from "@/data/clinic";

export function VideoGallery() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-3xl">
      {videos.map((v) => (
        <figure key={v.src} className="overflow-hidden rounded-3xl bg-card shadow-soft">
          <video controls playsInline preload="none" poster={v.poster} className="aspect-[9/16] max-h-[560px] w-full bg-navy object-cover">
            <source src={v.src} type="video/mp4" />
            Your browser does not support video playback.
          </video>
          <figcaption className="p-4">
            <p className="font-bold text-navy">{v.title}</p>
            <p className="text-sm text-muted-foreground">{v.caption} Original clinic footage.</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
