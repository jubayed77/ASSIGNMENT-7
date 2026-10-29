"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthShell, { Divider } from "@/components/AuthShell";
import FormField from "@/components/FormField";
import SocialButtons from "@/components/SocialButtons";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    if (password !== confirm) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }
    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ!");
    } else {
      toast.success("রেজিস্ট্রেশন সফল!");
      router.push("/signin");
    }
  };

  return (

    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField label="নাম" value={name} onChange={setName} placeholder="যেমন: রহিম উদ্দিন" />
        <FormField label="ইমেইল" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        <FormField label="পাসওয়ার্ড" type="password" value={password} onChange={setPassword} placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} />
        <FormField label="পাসওয়ার্ড নিশ্চিত করুন" type="password" value={confirm} onChange={setConfirm} placeholder="আবার লিখুন" minLength={8} />
        <button type="submit" disabled={loading} className="btn btn-primary h-10 min-h-10 rounded-lg font-semibold">
          {loading && <span className="loading loading-spinner loading-sm" />} অ্যাকাউন্ট তৈরি করুন
        </button>
        <Divider />
        <SocialButtons callbackUrl="/" />
        <p className="text-center text-sm text-base-content/70">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-primary hover:text-[#02642b]">সাইন ইন করুন</Link>
        </p>
      </form>
    </AuthShell>
  );
}
