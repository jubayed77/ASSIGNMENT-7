import Link from "next/link";
import ProfileForm from "@/components/ProfileForm";

const UpdateProfilePage = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold leading-8">তথ্য আপডেট করুন</h1>
        <p className="text-sm text-base-content/70">আপনার নাম পরিবর্তন করুন।</p>
      </div>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
        <ProfileForm redirectTo="/profile" />
      </div>
      <Link href="/profile" className="text-center text-sm text-base-content/60 hover:text-primary">← প্রোফাইলে ফিরে যান</Link>
    </div>
  );
}

export default UpdateProfilePage;
