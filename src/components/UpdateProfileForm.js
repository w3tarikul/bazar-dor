"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authErrorMessage, updateUser } from "@/lib/auth-client";
import { Field, FormAlert } from "@/components/auth/AuthShell";

export default function UpdateProfileForm({ currentName }) {
  const router = useRouter();
  const [name, setName] = useState(currentName ?? "");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    const trimmed = name.trim();
    if (!trimmed) {
      setError("নাম খালি রাখা যাবে না।");
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }
    if (trimmed === currentName) {
      toast("নামে কোনো পরিবর্তন হয়নি।", { icon: "ℹ️" });
      return;
    }

    setLoading(true);
    const { error: updateError } = await updateUser({ name: trimmed });
    setLoading(false);

    if (updateError) {
      const message = authErrorMessage(updateError);
      setFormError(message);
      toast.error(message);
      return;
    }

    toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে।");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormAlert message={formError} />
      <Field
        label="নাম"
        type="text"
        name="name"
        autoComplete="name"
        placeholder="আপনার নাম লিখুন"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        error={error}
      />
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        {loading && <span className="loading loading-spinner loading-sm" />}
        তথ্য আপডেট করুন
      </button>
    </form>
  );
}
