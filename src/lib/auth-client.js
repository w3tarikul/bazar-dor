import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;

const ERROR_MESSAGES = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই একটি অ্যাকাউন্ট খোলা হয়েছে।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "এই ইমেইল দিয়ে আগেই একটি অ্যাকাউন্ট খোলা হয়েছে।",
  INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা লিখুন।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
  PASSWORD_TOO_LONG: "পাসওয়ার্ড অনেক বড় হয়ে গেছে।",
  PROVIDER_NOT_FOUND: "এই সোশ্যাল লগইন এখনো চালু করা হয়নি।",
};

/** Turn a BetterAuth error into a Bengali message. */
export function authErrorMessage(error) {
  if (!error) return "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।";
  return (
    ERROR_MESSAGES[error.code] ??
    (error.status === 429
      ? "অনেকবার চেষ্টা করা হয়েছে, একটু পরে আবার চেষ্টা করুন।"
      : "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।")
  );
}
