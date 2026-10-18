<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Clinic facts live in `src/data/clinic.ts`; pages read from there so corrections happen in one place.
- Reviews come only through `getReviews()` in `src/lib/reviews.ts`; swap its body for a server-side Google Places call to go live without touching UI.
- Appointment enquiries are inserted from the browser into an insert-only table (anon cannot read); validation schema in `src/lib/enquiry.ts`.
