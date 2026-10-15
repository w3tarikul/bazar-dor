import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Hind Siliguri draws "১" as a tiny hook at regular/medium weights, so the Bengali digits
// (০–৯ only) come from a 4 KB Noto Sans Bengali subset instead.
const bengaliDigits = localFont({
  src: "../fonts/noto-sans-bengali-digits.woff2",
  variable: "--font-bn-digits",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+09E6-09EF" }],
});

export const metadata = {
  title: {
    default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজার দর — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।",
};

function NavbarFallback() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3">
        <div className="skeleton size-10 rounded-xl" />
        <div className="space-y-1">
          <div className="skeleton h-5 w-24" />
          <div className="skeleton h-3 w-36" />
        </div>
      </div>
      <div className="h-12 border-t border-base-200" />
    </header>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="bazardor" className={`${bengaliDigits.variable} ${hindSiliguri.variable}`}>
      <body className="bg-base-200 font-sans text-base-content antialiased">
        <div className="flex min-h-screen flex-col">
          <Suspense fallback={<NavbarFallback />}>
            <Navbar />
          </Suspense>
          <Suspense fallback={<div className="h-9 border-b border-base-300 bg-base-100" />}>
            <PriceTicker />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ToastProvider />
      </body>
    </html>
  );
}
