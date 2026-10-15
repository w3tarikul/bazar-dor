"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import Avatar from "@/components/Avatar";

export function useSignOut() {
  const router = useRouter();
  return async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  };
}

export default function AuthButtons() {
  const { data: session, isPending } = useSession();
  const handleSignOut = useSignOut();

  if (isPending) {
    return (
      <div className="flex items-center gap-2" aria-hidden="true">
        <div className="skeleton size-9 rounded-lg" />
        <div className="skeleton hidden h-4 w-16 sm:block" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md hover:bg-primary/10 hover:text-primary">
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="btn btn-primary btn-sm sm:btn-md shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = session;
  const firstName = (user.name || user.email).split(" ")[0];

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        aria-label="ব্যবহারকারী মেনু"
        className="btn btn-ghost btn-sm sm:btn-md gap-2 px-2 hover:bg-primary/10"
      >
        <Avatar user={user} />
        <span className="hidden max-w-28 truncate font-medium sm:inline">{firstName}</span>
        <span aria-hidden="true" className="text-[10px] text-base-content/60">▼</span>
      </button>
      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-2 w-64 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        <div className="px-3 py-2">
          <p className="truncate font-semibold">{user.name}</p>
          <p className="truncate text-xs text-base-content/60">{user.email}</p>
        </div>
        <ul className="menu w-full p-0">
          <li>
            <Link href="/profile" className="hover:bg-primary/10 hover:text-primary">
              <span aria-hidden="true">👤</span> আমার প্রোফাইল
            </Link>
          </li>
          <li>
            <button type="button" onClick={handleSignOut} className="text-error hover:bg-error/10">
              <span aria-hidden="true">↩</span> সাইন আউট
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
