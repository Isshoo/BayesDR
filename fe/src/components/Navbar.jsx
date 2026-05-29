"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-[80px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/30">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div>
              <span className="text-[22px] font-extrabold tracking-tight text-slate-800">
                Bayes<span className="text-teal-600">DR</span>
              </span>
              <p className="m-0 text-[11px] font-medium tracking-wider text-slate-500 uppercase">
                Diabetic Retinopathy
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className={`rounded-lg px-5 py-2.5 text-[15px] font-semibold no-underline transition-all ${
                isActive("/")
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/classify"
              className={`rounded-lg px-5 py-2.5 text-[15px] font-semibold no-underline transition-all ${
                isActive("/classify")
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Klasifikasi
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
