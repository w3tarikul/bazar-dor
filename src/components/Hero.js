import Image from "next/image";
import BanglaDate from "@/components/BanglaDate";

export default function Hero() {
  return (
    <section className="hero rounded-3xl border border-base-300 bg-base-100">
      <div className="hero-content w-full flex-col items-start gap-6 py-10 lg:flex-row lg:justify-between">
        <div className="max-w-xl">
          <BanglaDate className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary" />
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-3 text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href="#সব-পণ্য"
              className="btn btn-primary shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>
        <Image
          src="/bazar-hero.png"
          alt="তাজা বাজারের ঝুড়ি"
          width={315}
          height={263}
          priority
          className="h-auto w-full max-w-xs shrink-0 self-center transition-transform duration-300 hover:scale-105 sm:max-w-sm"
        />
      </div>
    </section>
  );
}
