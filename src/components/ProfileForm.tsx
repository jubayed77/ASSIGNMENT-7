"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormField from "./FormField";
import { authClient, useSession } from "@/lib/auth-client";



const ProfileForm = ({ redirectTo }: { redirectTo?: string }) => {

  const { data: session } = useSession();

  const router = useRouter();

  const [name, setName] = useState("");
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {

    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.updateUser({ name });

    setLoading(false);
    if (error) {
      toast.error("আপডেট ব্যর্থ!");

    } else {

      toast.success("প্রোফাইল আপডেট হয়েছে! 🎉");

      if (redirectTo) router.push(redirectTo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <FormField label="নাম" value={name} onChange={setName} />

      <button type="submit" disabled={loading} className="btn btn-primary h-10 min-h-10 rounded-lg font-semibold">

        {loading && <span className="loading loading-spinner loading-sm" />} আপডেট
      </button>
    </form>
  );
}

export default ProfileForm;