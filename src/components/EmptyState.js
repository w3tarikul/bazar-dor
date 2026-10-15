import Link from "next/link";

export default function EmptyState({
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পণ্য বা পাতাটি খুঁজছেন সেটি সরানো হয়েছে বা কখনো ছিল না।",
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
      <p aria-hidden="true" className="text-6xl">
        🧺
      </p>
      <p className="text-5xl font-bold text-primary">৪০৪</p>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-base-content/70">{message}</p>
      <Link
        href="/"
        className="btn btn-primary shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
