export function CardSkeleton() {
  return (
    <div className="card border border-base-300 bg-base-100">
      <div className="card-body gap-3 p-4">
        <div className="flex items-start gap-3">
          <div className="skeleton size-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-28" />
            <div className="skeleton h-3 w-16" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className="skeleton h-3 w-14" />
            <div className="skeleton h-6 w-24" />
          </div>
          <div className="skeleton h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6" aria-busy="true">
      <span className="sr-only">লোড হচ্ছে…</span>
      <div className="skeleton h-56 w-full rounded-3xl" />
      <div className="skeleton h-7 w-48" />
      <GridSkeleton />
      <div className="skeleton h-7 w-48" />
      <GridSkeleton />
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6" aria-busy="true">
      <span className="sr-only">লোড হচ্ছে…</span>
      <div className="skeleton h-24 w-full rounded-2xl" />
      <GridSkeleton />
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6" aria-busy="true">
      <span className="sr-only">লোড হচ্ছে…</span>
      <div className="skeleton h-4 w-48" />
      <div className="skeleton h-40 w-full rounded-2xl" />
      <div className="skeleton h-[28rem] w-full rounded-2xl" />
    </div>
  );
}

export function FormSkeleton({ fields = 2 }) {
  return (
    <div className="flex flex-col gap-4" aria-busy="true">
      {Array.from({ length: fields }, (_, i) => (
        <div key={i} className="skeleton h-14 w-full" />
      ))}
      <div className="skeleton h-12 w-full" />
    </div>
  );
}
