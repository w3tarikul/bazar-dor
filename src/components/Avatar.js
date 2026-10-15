/* eslint-disable @next/next/no-img-element -- OAuth avatars come from arbitrary hosts */

export default function Avatar({ user, size = "size-9", textSize = "text-sm", rounded = "rounded-lg" }) {
  const initial = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

  if (user?.image) {
    return (
      <img
        src={user.image}
        alt={user.name || "প্রোফাইল ছবি"}
        referrerPolicy="no-referrer"
        className={`${size} ${rounded} shrink-0 object-cover bg-base-200`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${size} ${rounded} ${textSize} grid shrink-0 place-items-center bg-primary/15 font-bold text-primary`}
    >
      {initial}
    </span>
  );
}
