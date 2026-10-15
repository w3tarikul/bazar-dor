import { cacheLife } from "next/cache";
import { bnDate } from "@/lib/format";

export default async function BanglaDate({ className }) {
  "use cache";
  cacheLife("minutes");
  return <span className={className}>{bnDate()}</span>;
}
