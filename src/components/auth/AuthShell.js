import Link from "next/link";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <header className="text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-base-content/70">{subtitle}</p>
      </header>
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">{children}</div>
      </div>
      <p className="text-center text-sm text-base-content/60">
        <Link href="/" className="link link-hover transition-colors hover:text-primary">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}

export function Field({ label, error, ...inputProps }) {
  return (
    <label className="form-control w-full">
      <span className="label-text mb-1 block font-medium">{label}</span>
      <input
        {...inputProps}
        aria-invalid={error ? true : undefined}
        className={`input input-bordered w-full transition-colors hover:border-primary/60 focus:border-primary ${
          error ? "input-error" : ""
        }`}
      />
      {error && <span className="mt-1 block text-xs text-error">{error}</span>}
    </label>
  );
}

export function FormAlert({ message }) {
  if (!message) return null;
  return (
    <div role="alert" className="alert alert-error alert-soft text-sm">
      <span aria-hidden="true">⚠️</span>
      <span>{message}</span>
    </div>
  );
}

/** Only allow same-site relative callback paths. */
export function safeCallback(value) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}
