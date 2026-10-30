"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

import { API_BASE, Category, getBanglaDate } from "@/lib/bangla_utils";

const chip =
  "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-lg border px-[13px] text-xs font-semibold transition-colors";

function Avatar({ name, image, size }: { name?: string; image?: string | null; size: string }) {
  return (
    <span className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-primary text-sm font-semibold text-primary-content`}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={name || "avatar"} className="h-full w-full object-cover" />
      ) : (
        name?.charAt(0) || "U"
      )}
    </span>
  );
}

const Navbar = () => {
  
  const [categories, setCategories] = useState<Category[]>([]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  useEffect(() => {
    fetch(`${API_BASE}/categories`)

      .then((r) => r.json())

      .then(setCategories)

      .catch(() => {});
  }, []);

  const closeDropdown = () => (document.activeElement as HTMLElement | null)?.blur();

  const handleSignOut = async () => {

    closeDropdown();
    await signOut({

      fetchOptions: {
        onSuccess: () => {

          toast.success("সাইন আউট সফল!");
          router.push("/");

          router.refresh();
        },
      },
    });
  };

  const categoryLinks = categories.map((cat) => {

    const isActive = pathname === `/category/${cat.slug}`;

    return (
      <Link
        key={cat.id}

        href={`/category/${cat.slug}`}

        onClick={() => setMobileMenuOpen(false)}

        className={`${chip} ${
          isActive
            ? "border-[#047c37] bg-[#047f39] text-primary-content"
            : "border-transparent hover:border-[#ccd0cc] hover:bg-[#dadeda]"
        }`}
      >
        <span>{cat.icon}</span>

        {cat.nameBn}
      </Link>
    );
  });

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">

          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">🛒

          </span>
          <span className="flex flex-col">
            <span className="text-xl font-bold leading-7 tracking-tight">বাজার দর</span>
{/* small device time fixed */}
            <span suppressHydrationWarning className=" text-xs leading-4 text-base-content/60 sm:block">

              {getBanglaDate()}
            </span>
          </span>
        </Link>

        <div className="flex-1" />

        {isPending ? (
          <span className="loading loading-spinner loading-sm text-primary" />
        ) : session ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost h-10 min-h-10 gap-2 rounded-lg px\-[17px] font-medium">
              <Avatar name={session.user.name} image={session.user.image} size="h-9 w-9" />
              <span className="hidden max-w-28 truncate sm:inline">{session.user.name}</span>
              <span className="text-xs opacity-60">▾</span>
            </div>
            <div
              tabIndex={0}
              className="dropdown-content z-50 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p\-[9px] shadow-lg"
            >
              <div className="px-3 py-2">
                <p className="text-sm font-semibold leading\-[21px]">{session.user.name}</p>
                <p className="text-xs text-base-content/70">{session.user.email}</p>
              </div>
              <Link
                href="/profile"
                onClick={closeDropdown}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm hover:bg-base-content/10"
              >
                👤 আমার প্রোফাইল
              </Link>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm text-error hover:bg-base-content/10"
              >
                ↩ সাইন আউট
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/signin" className="btn btn-ghost h-10 min-h-10 rounded-lg px\-[17px] font-semibold">সাইন ইন</Link>
            <Link href="/signup" className="btn btn-primary h-10 min-h-10 rounded-lg px\-[17px] font-semibold">সাইন আপ</Link>
          </div>
        )}

        <button
          className="btn btn-ghost btn-square h-10 min-h-10 lg:hidden"
          aria-label="মেনু"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      <nav className="hidden border-t border-base-200 bg-base-100 lg:block">
        <div className="mx-auto flex max-w-6xl items-center gap-1 px-4 py-2">{categoryLinks}</div>
      </nav>

      {mobileMenuOpen && (
        <nav className="border-t border-base-200 bg-base-100 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-3">{categoryLinks}</div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
