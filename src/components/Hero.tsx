import { getBanglaDate } from "@/lib/bangla_utils";

const Hero = () => {
  return (
    <section className="card overflow-hidden rounded-3xl border border-base-300 bg-base-100">

      <div className="flex flex-col items-center justify-between gap-6 px-4 py-10 md:flex-row">

        <div className="flex max-w-xl flex-col items-start gap-2">

          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{getBanglaDate()}</span>
          <h1 className="text-4xl font-bold leading/-[45px]">আজকের বাজারের দাম এক নজরে</h1>

          <p className="mt-1 text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।

          </p>
          
          <a href="#সব-পণ্য" className="btn btn-primary mt-3 h-10 min-h-10 rounded-lg px/-[17px] font-semibold">
            সব পণ্য দেখুন
          </a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bazar-hero.png" alt="বাজারের ঝুড়ি" width={315} height={263} className="h-auto w-64 md:w-[315px]" />
      </div>
    </section>
  );
}
export default Hero;
