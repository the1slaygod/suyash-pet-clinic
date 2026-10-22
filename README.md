# Suyash Pet Care

Build a complete, premium, modern, fully responsive website for **Suyash Pet's Clinic & Surgical Centre**, located in Chembur, Mumbai.

I have uploaded a ZIP containing the website HTML reference, original clinic logo, actual clinic photographs, veterinarian portraits, videos, Google review data, and development instructions.

**IMPORTANT: First extract and examine all files in the uploaded ZIP. Read the README and development brief, inspect the HTML and images, and understand the brand before building.**

## 1. Website design and branding

Existing website: https://suyash-clinic.vercel.app/

Use the uploaded HTML as the primary design reference, but improve its overall visual quality.

Follow the original clinic branding:

- Primary blue: `#0048AA`
- Secondary sky blue: `#39B6FF`
- White: `#FFFFFF`
- Text: `#3C3C3C`
- Light blue backgrounds: `#F3F9FF`

Use the exact original Suyash logo from the ZIP without changing its design.

The website should feel premium, trustworthy, professional, welcoming and appropriate for a modern veterinary hospital.

Use elegant typography, clean layouts, generous whitespace, subtle animations, rounded cards and excellent visual hierarchy.

Avoid excessive gradients, cluttered layouts, generic stock photographs and unnecessary animations.

## 2. Homepage

Create a beautiful homepage containing:

1. Sticky navigation with the original clinic logo.
2. Premium hero section introducing Suyash Clinic.
3. Prominent Book Appointment and WhatsApp buttons.
4. Clinic highlights and trust indicators.
5. Veterinary services with attractive cards.
6. Dedicated surgical facilities section.
7. Meet the Veterinarian section.
8. Real clinic photo gallery.
9. Genuine Google customer reviews.
10. Appointment and contact section.
11. Google Maps location and directions.
12. Professional footer.

Use the uploaded veterinarian portrait in the homepage hero and the original clinic photographs throughout the site.

Clearly distinguish AI-edited portraits from original photographs. Prioritise original photographs unless the edited portrait is approved.

## 3. Google Reviews — very important

The ZIP includes a Google Reviews data file with genuine, publicly indexed review excerpts.

Read this file and use it to create a beautiful testimonials section.

Requirements:

- Add a floating Google Reviews widget at the bottom-left of the desktop website.
- Show reviewer names and authentic review excerpts.
- Display star ratings only when verified.
- Allow visitors to browse reviews using navigation controls.
- Make the widget dismissible.
- Clicking the widget should expand a larger reviews panel.
- On mobile, show a compact, expandable reviews button.
- Include a View on Google Maps link.

The stored reviews are historical snapshots, not live API data. Label them appropriately.

Structure the component so that it can later be connected to Google Places API or Google Business Profile API.

Do not invent reviews, reviewer names, ratings or timestamps. Do not claim that a Google review is verified unless the source supports that claim.

## 4. Clinic photography and surgical facilities

Use the original photographs from the ZIP to build an impressive facilities section.

Include:

- Operating-room photographs.
- Surgical lighting and equipment.
- Real clinic interior photographs.
- Veterinary procedure photograph, placed appropriately within the gallery.
- Veterinarian profile photographs.

Create a responsive image gallery with full-screen viewing and smooth transitions.

Show authentic clinic facilities rather than AI-generated substitutes.

## 5. Clinic videos

Use the uploaded original walkthrough videos in a conventional video gallery where appropriate.

Optimise video loading and provide playback controls.

**Do not create any 3D models, 360° virtual tours, interactive 3D rooms or simulated clinic environments.**

## 6. Appointments and contact

Create a clear appointment enquiry experience with:

- Pet parent's name.
- Contact number.
- Pet name.
- Type of pet.
- Required service.
- Preferred appointment date and time.
- Optional additional notes.

Include WhatsApp integration and click-to-call functionality using verified clinic contact details.

Do not falsely confirm an appointment without a connected scheduling system. Use an enquiry-submitted status until the clinic confirms the booking.

## 7. Mobile experience

Prioritise mobile responsiveness.

Ensure:

- Fast loading.
- Easy navigation.
- Readable typography.
- Tap-friendly buttons.
- Compact Google Reviews widget.
- Accessible booking and contact options.
- Optimised images and videos.

## 8. Technical requirements

Build using React, TypeScript and Tailwind CSS with reusable components.

Implement accessibility best practices, semantic HTML, proper image alt text, SEO metadata, local-business structured data where verified, and image optimisation.

Use real clinic information from the existing website and uploaded materials. Flag any details that require confirmation instead of inventing them.

## 9. Important implementation instructions

- Do not simply embed the HTML file as an iframe.
- Rebuild its design as maintainable React components.
- Do not change the official clinic logo.
- Do not use fabricated testimonials.
- Do not introduce 3D or 360° functionality.
- Do not overwrite or modify the existing live website.
- Do not create fake credentials, treatment statistics or medical claims.

## 10. Build sequence

First, inspect the uploaded files and explain briefly how you will use the assets.

Then build the complete responsive homepage, including the floating Google Reviews feature and clinic gallery.

Make the design visually polished and functional, not merely a wireframe.

After completing the homepage, build the remaining sections and pages while maintaining consistent branding.

**The final result should look like a professionally designed premium veterinary clinic website, with Suyash's original brand identity and authentic facilities as the main focus.**

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/73e2940f-d0f7-4b7f-873e-b7261d926d4d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
