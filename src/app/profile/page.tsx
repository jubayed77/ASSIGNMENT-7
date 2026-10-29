"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProfileForm from "@/components/ProfileForm";
import { signOut, useSession } from "@/lib/auth-client";

const  ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল!");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return <div className="flex justify-center py-32"><span className="loading loading-spinner loading-lg text-primary" /></div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center gap-4 py-32 text-center">
        <p className="text-lg">আপনি লগইন করেননি</p>
        <Link href="/signin" className="btn btn-primary rounded-lg">সাইন ইন করুন</Link>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
      <div>
        <h1 className="text-2xl font-bold leading-8">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-[25px]">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary text-3xl font-semibold text-primary-content">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            user.name?.charAt(0) || "U"
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xl font-semibold leading-7">{user.name}</p>
          <p className="truncate text-base text-base-content/70">{user.email}</p>
        </div>
        <button onClick={handleSignOut} className="btn btn-outline btn-error h-10 min-h-10 rounded-lg px-[17px] font-semibold">
          ↩ সাইন আউট
        </button>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <h2 className="text-lg font-semibold leading-7">তথ্য</h2>
        <div className="p-6 pt-2"><ProfileForm /></div>
      </div>
    </div>
  );
}

export default ProfilePage;
