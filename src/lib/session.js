import "server-only";
import { headers } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireUser(callbackURL) {
  await connection();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect(`/signin?callbackURL=${encodeURIComponent(callbackURL)}`);
  }
  return session.user;
}
