"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: { fontFamily: "var(--font-hind-siliguri), sans-serif" },
        success: { iconTheme: { primary: "oklch(55% 0.15 150)", secondary: "#fff" } },
      }}
    />
  );
}
