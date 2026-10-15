import { Suspense } from "react";
import Link from "next/link";
import { requireUser } from "@/lib/session";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";

export const metadata = { title: "আমার প্রোফাইল" };

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border-b border-base-200 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <dt className="text-sm text-base-content/60">{label}</dt>
      <dd className="font-medium break-all">{value}</dd>
    </div>
  );
}

async function ProfileContent() {
  const user = await requireUser("/profile");
  const joined = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date(user.createdAt));

  return (
    <>
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar user={user} size="size-20" textSize="text-3xl" rounded="rounded-2xl" />
            <div className="min-w-0">
              <p className="truncate text-xl font-semibold">{user.name}</p>
              <p className="truncate text-base-content/60">{user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </section>

      <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="mb-2 text-lg font-bold">তথ্য</h2>
        <dl>
          <InfoRow label="নাম" value={user.name} />
          <InfoRow label="ইমেইল" value={user.email} />
          <InfoRow label="সদস্য হয়েছেন" value={joined} />
        </dl>
        <Link
          href="/profile/update"
          className="btn btn-primary mt-4 w-full shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          তথ্য আপডেট করুন
        </Link>
      </section>
    </>
  );
}

function ProfileSkeleton() {
  return (
    <>
      <div className="skeleton h-32 w-full rounded-2xl" />
      <div className="skeleton h-64 w-full rounded-2xl" />
    </>
  );
}

export default function ProfilePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10">
      <header>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </header>
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
