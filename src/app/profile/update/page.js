import { Suspense } from "react";
import Link from "next/link";
import { requireUser } from "@/lib/session";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { FormSkeleton } from "@/components/Skeletons";

export const metadata = { title: "তথ্য আপডেট" };

async function UpdateContent() {
  const user = await requireUser("/profile/update");
  return <UpdateProfileForm currentName={user.name} />;
}

export default function UpdateProfilePage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <header className="text-center">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-base-content/70">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p>
      </header>
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <Suspense fallback={<FormSkeleton fields={1} />}>
            <UpdateContent />
          </Suspense>
        </div>
      </div>
      <p className="text-center text-sm text-base-content/60">
        <Link href="/profile" className="link link-hover transition-colors hover:text-primary">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
