"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authErrorMessage, signIn } from "@/lib/auth-client";
import { Field, FormAlert, safeCallback } from "@/components/auth/AuthShell";
import SocialButtons from "@/components/auth/SocialButtons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email, password }) {
  const errors = {};
  if (!email) errors.email = "ইমেইল লিখুন।";
  else if (!EMAIL_RE.test(email)) errors.email = "সঠিক ইমেইল ঠিকানা লিখুন।";
  if (!password) errors.password = "পাসওয়ার্ড লিখুন।";
  else if (password.length < 8) errors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  return errors;
}

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallback = searchParams.get("callbackURL");
  const callbackURL = safeCallback(rawCallback);

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rawCallback) {
      toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন।", { id: "protected-redirect" });
    }
  }, [rawCallback]);

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("ফর্মের তথ্যগুলো ঠিকভাবে পূরণ করুন।");
      return;
    }

    setLoading(true);
    const { error } = await signIn.email({
      email: values.email.trim(),
      password: values.password,
    });
    setLoading(false);

    if (error) {
      const message = authErrorMessage(error);
      setFormError(message);
      toast.error(message);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    router.push(callbackURL);
    router.refresh();
  }

  const signUpHref = rawCallback
    ? `/signup?callbackURL=${encodeURIComponent(callbackURL)}`
    : "/signup";

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormAlert message={formError} />
      <Field
        label="ইমেইল"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Field
        label="পাসওয়ার্ড"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="কমপক্ষে ৮ অক্ষর"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        {loading && <span className="loading loading-spinner loading-sm" />}
        সাইন ইন
      </button>
      <div className="divider my-0 text-xs">অথবা</div>
      <SocialButtons callbackURL={callbackURL} disabled={loading} />
      <p className="text-center text-sm text-base-content/70">
        অ্যাকাউন্ট নেই?{" "}
        <Link href={signUpHref} className="link link-primary link-hover">
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}
