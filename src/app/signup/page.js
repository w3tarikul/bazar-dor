import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import SignUpForm from "@/components/auth/SignUpForm";
import { FormSkeleton } from "@/components/Skeletons";

export const metadata = { title: "সাইন আপ" };

export default function SignUpPage() {
  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <Suspense fallback={<FormSkeleton fields={4} />}>
        <SignUpForm />
      </Suspense>
    </AuthShell>
  );
}
