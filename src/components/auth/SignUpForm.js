"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authErrorMessage, signOut, signUp } from "@/lib/auth-client";
import { Field, FormAlert, safeCallback } from "@/components/auth/AuthShell";
import SocialButtons from "@/components/auth/SocialButtons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, password, confirmPassword }) {
  const errors = {};
  if (!name.trim()) errors.name = "আপনার নাম লিখুন।";
  if (!email) errors.email = "ইমেইল লিখুন।";
  else if (!EMAIL_RE.test(email)) errors.email = "সঠিক ইমেইল ঠিকানা লিখুন।";
  if (!password) errors.password = "পাসওয়ার্ড লিখুন।";
  else if (password.length < 8) errors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  if (confirmPassword !== password) errors.confirmPassword = "দুটি পাসওয়ার্ড মিলছে না।";
  return errors;
}

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallback = searchParams.get("callbackURL");
  const callbackURL = safeCallback(rawCallback);

  const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

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
    const { error } = await signUp.email({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
    });
    if (error) {
      setLoading(false);
      const message = authErrorMessage(error);
      setFormError(message);
      toast.error(message);
      return;
    }

    await signOut();
    setLoading(false);
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন।");
    router.push(rawCallback ? `/signin?callbackURL=${encodeURIComponent(callbackURL)}` : "/signin");
  }

  const signInHref = rawCallback
    ? `/signin?callbackURL=${encodeURIComponent(callbackURL)}`
    : "/signin";

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormAlert message={formError} />
      <Field
        label="নাম"
        type="text"
        name="name"
        autoComplete="name"
        placeholder="যেমন: রহিম উদ্দিন"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />
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
        autoComplete="new-password"
        placeholder="কমপক্ষে ৮ অক্ষর"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />
      <Field
        label="পাসওয়ার্ড নিশ্চিত করুন"
        type="password"
        name="confirmPassword"
        autoComplete="new-password"
        placeholder="আবার লিখুন"
        value={values.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        {loading && <span className="loading loading-spinner loading-sm" />}
        অ্যাকাউন্ট তৈরি করুন
      </button>
      <div className="divider my-0 text-xs">অথবা</div>
      <SocialButtons callbackURL={callbackURL} disabled={loading} />
      <p className="text-center text-sm text-base-content/70">
        অ্যাকাউন্ট আছে?{" "}
        <Link href={signInHref} className="link link-primary link-hover">
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}
