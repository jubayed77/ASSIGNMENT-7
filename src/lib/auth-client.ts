"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.PUBLIC_DOMIN_WEB_URL || "http://localhost:3000",
});

export const { signIn, signUp, signOut, useSession } = authClient;
