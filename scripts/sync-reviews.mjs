import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..");
const PUBLIC_REVIEWS_FILE = path.join(ROOT_DIR, "public", "reviews.json");
const DATA_REVIEWS_FILE = path.join(ROOT_DIR, "src", "data", "reviews-data.json");

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body }));
      }
    ).on("error", reject);
  });
}

// Initial anchor reviews
const BASE_REVIEWS = [
  {
    author: "Minal Mankar",
    rating: 5,
    date: "2026-04-15",
    excerpt: "About 3 months ago, our 3-month-old puppy Mylo swallowed a large mutton bone from the trash. An initial X-ray at another hospital showed it was stuck in his throat near the neck. He was vomiting and not eating anything, and as time passed, he started breathing strangely, almost as if he was choking. We were extremely worried.\n\nThrough a common friend, we connected with Dr. Gaurav at Suyash Pet Clinic, Chembur. Even before we visited, he stayed in constant touch over the phone and guided us calmly. At the clinic, he immediately attended to Mylo, started him on saline, and did another X-ray. He clearly explained the situation, the size of the bone, the endoscopy procedure, and all associated risks, while also reassuring us throughout.\n\nWhat truly stood out was his patience, kindness, and genuine care—not just for Mylo, but for us as anxious pet parents. He did everything he could to avoid surgery, and thankfully, the endoscopy was successful. Mylo recovered well, and we couldn’t be more grateful.\n\nWe had visited another hospital before this and felt very unsure due to their lack of clarity and significantly higher costs. In such emergencies, having a doctor who is both skilled and empathetic is truly a blessing.\n\nHighly recommend Suyash Pet Clinic and Dr. Gaurav without hesitation. Writing this review after 2+ months, with a happy and healthy Mylo ❤️",
    source: "Google review via TrustedVets",
    sourceUrl: "https://trustedvets.in/clinic/suyash-pet-s-clinic-and-surgical-centre-veterinary-doctor-in-chembur/"
  },
  {
    author: "Priyanka Sharma",
    rating: 5,
    date: "2026-07-03",
    excerpt: "Its been 3 months of getting our puppy home and we are so happy that we trusted Dr Gaurav with his vaccinations and also for his allergies, guidance on food and recently when he happened to have a limp in his leg. The staff is sweet and the doctor is amazing. He is genuine and empathetic and has good diagnosis and support. Yes, there is a bit of waiting involved and some time coordination but its also because of the surgeries, emergencies and a lot of patients visiting. But after you meet doctor, its such a relief! And he is also our puppy's favourite🤞🏻🧿\n\nHighly recommend!",
    source: "Google review via TrustedVets",
    sourceUrl: "https://trustedvets.in/clinic/suyash-pet-s-clinic-and-surgical-centre-veterinary-doctor-in-chembur/"
  },
  {
    author: "prasenjeet gaikwad",
    rating: 5,
    date: "2026-04-02",
    excerpt: "Truly the best vet in the area. My 4 month old kitten (Ruby) was at a point where she wasn't responding and had a dangerously low WBC of 1.2. Thanks to the expert care and intensive treatment provided by Dr. Gaurav and Dr. Krishna, she made a full recovery. If your pet is in a critical situation, don't go anywhere else. This clinic saves lives.",
    source: "Google review via TrustedVets",
    sourceUrl: "https://trustedvets.in/clinic/suyash-pet-s-clinic-and-surgical-centre-veterinary-doctor-in-chembur/"
  },
  {
    author: "Amey Avinash",
    rating: 5,
    date: "2026-02-23",
    excerpt: "I got my dog's endoscopy done here at the clinic. Dr. Gaurav is well versed with his speciality and knowledge. He has an amazing hand in endoscopy and is very kind and compassionate.\nHis rates are relatively reasonable and pocket friendly.\nThe clinic is well equipped with required diagnostic machinary.\nThe location is also good.",
    source: "Google review via TrustedVets",
    sourceUrl: "https://trustedvets.in/clinic/suyash-pet-s-clinic-and-surgical-centre-veterinary-doctor-in-chembur/"
  },
  {
    author: "Rajashree",
    rating: 5,
    date: "2025-11-26",
    excerpt: "Can’t thank Dr. Gaurav enough for saving my cat’s life. He guided us well through the entire treatment and did everything possible to make him medically fit. Not just him but all the doctors working there are knowledgeable, loving and caring towards pets. Absolutely recommend!",
    source: "Google review via Wanderlog",
    sourceUrl: "https://wanderlog.com/place/details/12358215/suyash-pets-clinic--surgical-centre"
  },
  {
    author: "Baljeet K",
    rating: 5,
    date: "2025-07-03",
    excerpt: "I really liked the experience and iam thankful to doctor. Very caring staff and great care for pets.",
    source: "Google review via Wanderlog",
    sourceUrl: "https://wanderlog.com/place/details/12358215/suyash-pets-clinic--surgical-centre"
  },
  {
    author: "Dr. Shraddha Panchal",
    rating: 1,
    date: "2026-06-11",
    excerpt: "I have worst experiences over and over again. The main vet doctor is never at the clinic. The staff is incompetent and doesn’t communicate well. Makes you wait for a long time. They lure you to come after making a call but either the medicines aren’t available nor the doctor is late to arrive. Being a doctor myself, I have shared my experiences to Dr. Gaurav before, but similar experiences happen again and again. Not anymore. I choose not to waste my time and efforts even thinking to visit them.",
    source: "Google review via TrustedVets",
    sourceUrl: "https://trustedvets.in/clinic/suyash-pet-s-clinic-and-surgical-centre-veterinary-doctor-in-chembur/"
  }
];

export async function syncReviews() {
  console.log("Starting Google Reviews sync...");

  // 1. Read existing reviews to accumulate (never overwrite or lose past reviews)
  const reviewMap = new Map();

  // Seed with base reviews
  for (const r of BASE_REVIEWS) {
    reviewMap.set(r.author, r);
  }

  // Load existing reviews from public/reviews.json or src/data/reviews-data.json
  for (const filePath of [PUBLIC_REVIEWS_FILE, DATA_REVIEWS_FILE]) {
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = JSON.parse(fs.readFileSync(filePath, "utf8"));
        if (Array.isArray(fileContent.reviews)) {
          for (const r of fileContent.reviews) {
            if (r.author && r.excerpt) {
              reviewMap.set(r.author, { ...reviewMap.get(r.author), ...r });
            }
          }
        }
      } catch (err) {
        console.warn(`Could not read ${filePath}:`, err.message);
      }
    }
  }

  let ratingVal = 4.6;
  let countVal = 237;

  // 2. Fetch latest reviews from TrustedVets stream controller
  try {
    const res = await fetchText(
      "https://trustedvets.in/clinic/suyash-pet-s-clinic-and-surgical-centre-veterinary-doctor-in-chembur/"
    );

    if (res.status === 200 && res.body.includes("googleRating")) {
      const enqueueMatch = res.body.match(/streamController\.enqueue\(("(?:\\.|[^"\\])*")\)/);
      if (enqueueMatch) {
        const rawJson = JSON.parse(enqueueMatch[1]);
        const arr = JSON.parse(rawJson);

        const ratingIdx = arr.indexOf("googleRating");
        const countIdx = arr.indexOf("googleUserRatingsTotal");
        const revsIdx = arr.indexOf("googleReviews");

        if (ratingIdx !== -1 && typeof arr[ratingIdx + 1] === "number") {
          ratingVal = arr[ratingIdx + 1];
        }
        if (countIdx !== -1 && typeof arr[countIdx + 1] === "number") {
          countVal = arr[countIdx + 1];
        }

        if (revsIdx !== -1 && Array.isArray(arr[revsIdx + 1])) {
          const reviewPointers = arr[revsIdx + 1];
          for (const ptr of reviewPointers) {
            const item = arr[ptr];
            if (!item || typeof item !== "object") continue;

            const decoded = {};
            for (const [k, v] of Object.entries(item)) {
              const keyName = arr[parseInt(k.replace("_", ""), 10)];
              decoded[keyName] = arr[v];
            }

            if (decoded.authorName && decoded.text) {
              const author = String(decoded.authorName).trim();
              const timestamp = typeof decoded.reviewTime === "number" ? decoded.reviewTime : null;
              const date = timestamp ? new Date(timestamp * 1000).toISOString().split("T")[0] : null;

              reviewMap.set(author, {
                author,
                rating: typeof decoded.rating === "number" ? decoded.rating : 5,
                date,
                excerpt: String(decoded.text).trim(),
                source: "Google review via TrustedVets",
                sourceUrl: "https://trustedvets.in/clinic/suyash-pet-s-clinic-and-surgical-centre-veterinary-doctor-in-chembur/",
              });
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn("TrustedVets scrape attempt failed:", err.message);
  }

  // 3. Format and sort reviews (newest date first, followed by others)
  const allReviews = Array.from(reviewMap.values()).sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const finalPayload = {
    live: true,
    lastSynced: now.toISOString(),
    totalCollectedReviews: allReviews.length,
    label: `Live Google Reviews · Synced ${formattedDate}`,
    rating: {
      value: ratingVal,
      count: countVal,
      asOf: `Google Maps · as of ${formattedDate}`,
      sourceUrl: "https://maps.app.goo.gl/fjKtucUykBCwF2vDA",
    },
    reviews: allReviews,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Suyash+Pets+Clinic+Surgical+Centre+Chembur",
  };

  // 4. Save to public/reviews.json (static JSON file in public folder)
  fs.mkdirSync(path.dirname(PUBLIC_REVIEWS_FILE), { recursive: true });
  fs.writeFileSync(PUBLIC_REVIEWS_FILE, JSON.stringify(finalPayload, null, 2) + "\n", "utf8");
  console.log(`Updated public static JSON: ${PUBLIC_REVIEWS_FILE} (${allReviews.length} reviews)`);

  // 5. Also save to src/data/reviews-data.json for SSR / direct import
  fs.mkdirSync(path.dirname(DATA_REVIEWS_FILE), { recursive: true });
  fs.writeFileSync(DATA_REVIEWS_FILE, JSON.stringify(finalPayload, null, 2) + "\n", "utf8");
  console.log(`Updated data JSON: ${DATA_REVIEWS_FILE}`);

  return finalPayload;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncReviews();
}
