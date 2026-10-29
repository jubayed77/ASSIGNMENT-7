const  Loading = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="skeleton h-5 w-56" />
      <div className="skeleton h-[174px] rounded-2xl" />
      <div className="grid gap-3 md:grid-cols-3">
        {[0, 1, 2].map((i) => <div key={i} className="skeleton h-[102px] rounded-2xl" />)}
      </div>
      <div className="skeleton h-[420px] rounded-2xl" />
    </div>
  );
}

export default Loading;