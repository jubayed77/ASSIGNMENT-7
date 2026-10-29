import Link from "next/link";


export default function NotFound() {

  return (

    <div className="flex flex-col items-center gap-3 px-4 py-32 text-center">


      <div className="text-7xl">🔍</div>
      
      <h1 className="text-3xl font-bold">পেজটি পাওয়া যায়নি</h1>
      <p className="text-base-content/70">আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরিয়ে নেওয়া হয়েছে।</p>
      <Link href="/" className="btn btn-primary mt-2 rounded-lg">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
