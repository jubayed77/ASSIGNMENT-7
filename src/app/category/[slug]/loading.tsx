export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="skeleton h\-[94px] rounded-2xl" />
      <div className="skeleton h\-[66px] rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-[138px] rounded-2xl" />)}
      </div>
    </div>
  );
}
