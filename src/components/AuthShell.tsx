import Link from "next/link";

const AuthShell = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold leading-8">{title}</h1>
        <p className="text-sm text-base-content/70">{subtitle}</p>
      </div>
      <div className="card rounded-2xl border border-base-300 bg-base-100">
        <div className="card-body gap-2 p-6">{children}</div>
      </div>
      <Link href="/" className="text-center text-sm text-base-content/60 hover:text-primary">← হোম পেজে ফিরে যান</Link>
    </div>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-base-content/10" />
      <span className="text-xs">অথবা</span>
      <span className="h-px flex-1 bg-base-content/10" />
    </div>
  );
}

export default AuthShell
