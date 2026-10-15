"use client";

import { useState } from "react";
import { useSignOut } from "@/components/AuthButtons";

export default function SignOutButton() {
  const signOut = useSignOut();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await signOut();
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="btn btn-outline btn-error btn-sm sm:btn-md transition hover:-translate-y-0.5"
    >
      {loading ? <span className="loading loading-spinner loading-xs" /> : <span aria-hidden="true">↩</span>}
      সাইন আউট
    </button>
  );
}
