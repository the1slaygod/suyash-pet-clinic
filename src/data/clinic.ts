import logo from "@/assets/logo.png.asset.json";
import doctor from "@/assets/doctor.jpg.asset.json";
import surgery from "@/assets/surgery.jpg.asset.json";
import procedure from "@/assets/procedure.jpg.asset.json";
import poster1 from "@/assets/poster_01.jpg.asset.json";
import poster2 from "@/assets/poster_02.jpg.asset.json";
import video1 from "@/assets/walkthrough_01.mp4.asset.json";
import video2 from "@/assets/walkthrough_02.mp4.asset.json";

/** Facts taken from the current live site (suyash-clinic.vercel.app). */
export const clinic = {
  name: "Suyash Pet's Clinic & Surgical Centre",
  shortName: "Suyash Pet's Clinic",
  phoneDisplay: "+91 97682 39152",
  phoneHref: "tel:+919768239152",
  // TODO(clinic): confirm this number is also the clinic's WhatsApp number.
  whatsappHref:
    "https://wa.me/919768239152?text=" +
    encodeURIComponent("Hello Suyash Pet's Clinic, I'd like to enquire about an appointment."),
  address: {
    street: "Shop No. 1, Vrushali Villa, Building No. 88, Tilak Nagar",
    locality: "Chembur, Mumbai",
    postalCode: "400089",
    region: "Maharashtra",
  },
  geo: { lat: 19.0709472, lng: 72.8981604 },
  mapsUrl: "https://maps.app.goo.gl/fjKtucUykBCwF2vDA",
  mapsEmbed: "https://www.google.com/maps?q=19.0709472,72.8981604&z=17&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=19.0709472,72.8981604",
  vet: {
    name: "Dr. Gaurav Khandekar",
    credential: "M.V.Sc.",
    role: "Veterinary Surgeon",
  },
  // TODO(clinic): opening hours not published on the current site — confirm before launch.
  hours: null as string | null,
};

export const media = { logo: logo.url, doctor: doctor.url };

export type Photo = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  advisory?: string;
};

export const photos: Photo[] = [
  {
    src: surgery.url,
    title: "Operating room",
    caption: "Surgical table, overhead LED surgical lights and monitoring equipment.",
    alt: "Suyash clinic operating room with stainless steel surgical table, overhead surgical lights and a monitoring trolley",
  },
  {
    src: doctor.url,
    title: "Consultation desk",
    caption: "Dr. Gaurav Khandekar at the clinic consultation desk.",
    alt: "Dr. Gaurav Khandekar in navy scrubs working at the clinic consultation desk",
  },
  {
    src: poster1.url,
    title: "Reception & entrance",
    caption: "Frosted glass entrance and front desk inside the clinic.",
    alt: "Clinic entrance with frosted glass door and blue reception desk with stethoscope",
  },
  {
    src: poster2.url,
    title: "Clinic front",
    caption: "Waiting area and weighing scale outside the clinic glass front.",
    alt: "Suyash clinic glass front with logo, pet weighing scale and waiting chairs",
  },
  {
    src: procedure.url,
    title: "Clinical procedure",
    caption: "A veterinary procedure in progress at the clinic.",
    alt: "Veterinary procedure being performed at Suyash clinic",
    advisory: "This photo shows a medical procedure.",
  },
];

export const videos = [
  { src: video1.url, poster: poster1.url, title: "Inside the clinic", caption: "A short walk from the entrance into the clinic." },
  { src: video2.url, poster: poster2.url, title: "Clinic front", caption: "The clinic front and waiting area." },
];

export const services = [
  { icon: "Stethoscope", title: "Consultation & Treatment", text: "Consultation, diagnosis, deworming, skin and dermatology care, and treatment for everyday illness." },
  { icon: "Syringe", title: "Pet Vaccination", text: "Core and booster vaccination for dogs and cats, with a clear reminder schedule." },
  { icon: "HeartPulse", title: "Health Checkup", text: "A full nose-to-tail examination to keep track of your pet's health." },
  { icon: "Scissors", title: "Surgical Care", text: "Soft tissue and routine surgical procedures, including spay and neuter, planned and performed in-clinic." },
  { icon: "Bath", title: "Pet Grooming", text: "Bathing, haircuts, nail trimming, ear cleaning and de-shedding for dogs and cats." },
  { icon: "ShoppingBag", title: "Pet Food & Products", text: "Pet food, treats, supplements, grooming products and everyday essentials at the clinic." },
] as const;

export const serviceOptions = [
  "Consultation & Treatment",
  "Vaccination",
  "Health Checkup",
  "Surgical Consultation",
  "Grooming",
  "Other",
];
