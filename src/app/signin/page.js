import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";
import { FormSkeleton } from "@/components/Skeletons";

export const metadata = { title: "সাইন ইন" };

export default function SignInPage() {
  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <Suspense fallback={<FormSkeleton fields={2} />}>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
