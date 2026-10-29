"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import AuthShell, { Divider } from "@/components/AuthShell";
import FormField from "@/components/FormField";
import SocialButtons from "@/components/SocialButtons";
import { signIn } from "@/lib/auth-client";

function SignInForm() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {

    e.preventDefault();

    setLoading(true);

    const { error } = await signIn.email({ email, password, callbackURL: callbackUrl });

    setLoading(false);

    if (error) {

      toast.error(error.message || "সাইন ইন ব্যর্থ!");

    } else {

      toast.success("সাইন ইন সফল! 🎉");
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (

    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <FormField label="ইমেইল" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        <FormField label="পাসওয়ার্ড" type="password" value={password} onChange={setPassword} placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} />
        <button type="submit" disabled={loading} className="btn btn-primary h-10 min-h-10 rounded-lg font-semibold">
          {loading && <span className="loading loading-spinner loading-sm" />} সাইন ইন
        </button>
        <Divider />
        <SocialButtons callbackUrl={callbackUrl} />
        <p className="text-center text-sm text-base-content/70">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-primary hover:text-[#02642b]">সাইন আপ করুন</Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default function SignInPage() {
  return (

    <Suspense fallback={<div className="skeleton mx-auto mt-10 h-96 max-w-md" />}>
      <SignInForm />
      
    </Suspense>
  );
}
