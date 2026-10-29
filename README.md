# 🛒 বাজার দর (BazarDor)

Next.js 16 · TypeScript · Tailwind CSS v4 · DaisyUI · BetterAuth · MongoDB Atlas

UI is built from the Figma file "Bazardor - L1: Assignment-07" (Home, Sign Up, Sign In, Profile, Category, Product Details, User Menu).

## Run
```bash
cp .env.example .env.local   # fill in values
npm install
npm run dev
```

Protected routes: `/product/*`, `/profile/*` (see `src/proxy.ts`).

## Deploy
Push to GitHub, import in Vercel, add all env vars, set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to the Vercel URL, and update the Google/GitHub OAuth callback URLs.
