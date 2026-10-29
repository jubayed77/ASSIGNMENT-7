const Loading = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6">
      <div className="skeleton h\-[283px] rounded-3xl" />
      {[0, 1].map((s) => (
        <div key={s} className="flex flex-col gap-3">
          <div className="skeleton h-7 w-40" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h\-[138px] rounded-2xl" />)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loading;
