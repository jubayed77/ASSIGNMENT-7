import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("bazardor");

export const auth = betterAuth({
  // ১. baseURL যোগ করুন
  baseURL: process.env.BETTER_AUTH_URL || "https://bdbazer.vercel.app", 
  
  // ২. trustedOrigins যোগ করুন
  trustedOrigins: [
    "https://bdbazer.vercel.app",
    "http://localhost:3000" // লোকাল টেস্টিং এর জন্য
  ],

  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, { client }),
});