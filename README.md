# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক জায়গায় দেখার ওয়েবসাইট।


## ফিচার

- হোম পেজে Hero, "আজ দাম বেড়েছে", "আজ দাম কমেছে" ও সব পণ্যের তালিকা
- উপরে scrolling price ticker
- Category অনুযায়ী পণ্য দেখা এবং দাম অনুযায়ী sort করা
- Product Details পেজে বাজারভিত্তিক দাম, সর্বনিম্ন, সর্বাধিক ও গড় দাম
- Email/Password এবং Google/GitHub দিয়ে সাইন ইন ও সাইন আপ
- প্রোফাইল দেখা এবং নাম আপডেট করা
- লগইন ছাড়া `/product/*` ও `/profile/*` খোলে না, সাইন ইন পেজে চলে যায়
- Loading skeleton ও কাস্টম 404 পেজ
- মোবাইলেও ঠিকমতো দেখায়

## ব্যবহৃত টেকনোলজি

Next.js 16, TypeScript, Tailwind CSS v4, DaisyUI, BetterAuth, MongoDB Atlas, react-hot-toast

## চালানোর নিয়ম

1. Node.js (২০.৯ বা তার উপরে) ইনস্টল থাকতে হবে।
2. প্রজেক্ট ফোল্ডারে গিয়ে packages ইনস্টল করুন:
   ```bash
   npm install
   ```
3. `.env.example` কপি করে `.env.local` নাম দিন এবং নিজের মান বসান:
   ```
   MONGODB_URI=
   BETTER_AUTH_SECRET=
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
4. চালান:
   ```bash
   npm run dev
   ```
5. ব্রাউজারে `http://localhost:3000` খুলুন।

## ফোল্ডার


src/
├── app/          পেজগুলো (home, category, product, signin, signup, profile)
├── components/   Navbar, Footer, PriceTicker, ProductCard ইত্যাদি
├── lib/          auth, auth-client ও helper function
└── proxy.ts      route protection


## Deploy (Vercel)

1. GitHub এ push করুন।
2. Vercel এ New Project থেকে repo select করুন।
3. `.env.local` এর সব variable যোগ করুন। `BETTER_AUTH_URL` ও `NEXT_PUBLIC_APP_URL` এ Vercel এর URL দিন।
4. Google ও GitHub OAuth এর callback URL এ Vercel এর URL বসান।
5. Deploy করুন।