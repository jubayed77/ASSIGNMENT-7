// "use client";

// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: process.env.https://bdbazer.vercel.app/
// });

// export const { signIn, signUp, signOut, useSession } = authClient;



// "use client";

// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   // লোকালহোস্টে টেস্ট করার সময় localhost নেবে, আর লাইভ সাইটে অটোমেটিক আপনার Vercel URL নেবে
//   baseURL: typeof window !== "undefined" 
//     ? window.location.origin 
//     : process.env.NEXT_PUBLIC_DOMAIN_WEB_URL
// });

// export const { signIn, signUp, signOut, useSession } = authClient;


"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://bdbazer.vercel.app/"
});

export const { signIn, signUp, signOut, useSession } = authClient;