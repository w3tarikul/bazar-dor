import "server-only";
import { headers } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/** Returns the signed-in user or redirects to /signin with a callback back here. */
export async function requireUser(callbackURL) {
  // getSession checks expiry with `new Date()`, so mark this as request-time work first.
  await connection();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect(`/signin?callbackURL=${encodeURIComponent(callbackURL)}`);
  }
  return session.user;
}
