import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// MongoClient only connects on first query, so a placeholder URI keeps `next build` working
// when the env var is missing; real requests will fail loudly until MONGODB_URI is set.
const client = new MongoClient(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bazardor",
);
const db = client.db(process.env.MONGODB_DB || "bazardor");

const socialProviders = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    // Sign-up sends the user to /signin instead of logging them in.
    autoSignIn: false,
  },
  socialProviders,
  plugins: [nextCookies()],
});
