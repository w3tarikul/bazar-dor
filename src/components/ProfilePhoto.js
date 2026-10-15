"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authErrorMessage, updateUser } from "@/lib/auth-client";
import Avatar from "@/components/Avatar";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const AVATAR_SIZE = 256;

async function toAvatarDataUrl(file) {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = AVATAR_SIZE;
  canvas.height = AVATAR_SIZE;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, AVATAR_SIZE, AVATAR_SIZE);
  ctx.drawImage(
    bitmap,
    (bitmap.width - side) / 2,
    (bitmap.height - side) / 2,
    side,
    side,
    0,
    0,
    AVATAR_SIZE,
    AVATAR_SIZE,
  );
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.85);
}

export default function ProfilePhoto({ user }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  async function saveImage(image, successMessage) {
    setLoading(true);
    const { error } = await updateUser({ image });
    setLoading(false);
    if (error) {
      toast.error(authErrorMessage(error));
      return;
    }
    toast.success(successMessage);
    router.refresh();
  }

  async function handleFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("শুধু ছবি (JPG, PNG, WEBP) আপলোড করা যাবে।");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      toast.error("ছবির আকার ৫ MB-এর কম হতে হবে।");
      return;
    }

    let dataUrl;
    try {
      dataUrl = await toAvatarDataUrl(file);
    } catch {
      toast.error("ছবিটি পড়া যায়নি, অন্য একটি ছবি চেষ্টা করুন।");
      return;
    }
    await saveImage(dataUrl, "প্রোফাইল ছবি আপডেট হয়েছে।");
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        aria-label="প্রোফাইল ছবি পরিবর্তন করুন"
        className="group relative cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Avatar user={user} size="size-20" textSize="text-3xl" rounded="rounded-2xl" />
        <span className="absolute inset-0 grid place-items-center rounded-2xl bg-black/45 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "ছবি বদলান"}
        </span>
        <span
          aria-hidden="true"
          className="absolute -right-1.5 -bottom-1.5 grid size-7 place-items-center rounded-full border-2 border-base-100 bg-primary text-sm text-primary-content shadow transition-transform group-hover:scale-110"
        >
          📷
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFile}
        className="hidden"
      />
      {user.image && (
        <button
          type="button"
          disabled={loading}
          onClick={() => saveImage(null, "প্রোফাইল ছবি মুছে ফেলা হয়েছে।")}
          className="link link-hover text-xs text-base-content/60 hover:text-error"
        >
          ছবি মুছুন
        </button>
      )}
    </div>
  );
}
