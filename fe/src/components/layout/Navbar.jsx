"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path) => pathname === path;

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-(--color-border) bg-(--color-surface)/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-[80px] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-primary) shadow-lg">
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
              <span className="text-[22px] font-extrabold tracking-tight text-(--color-text-primary)">
                Bayes<span className="text-(--color-primary)">DR</span>
              </span>
              <p className="m-0 text-[11px] font-medium tracking-wider text-(--color-text-muted) uppercase">
                Diabetic Retinopathy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className={`rounded-lg px-4 py-2 text-[14px] font-semibold no-underline transition-all ${
                isActive("/")
                  ? "bg-(--color-primary) text-white shadow-lg"
                  : "text-(--color-text-secondary) hover:bg-(--color-background)"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/classify"
              className={`rounded-lg px-4 py-2 text-[14px] font-semibold no-underline transition-all ${
                isActive("/classify")
                  ? "bg-(--color-primary) text-white shadow-lg"
                  : "text-(--color-text-secondary) hover:bg-(--color-background)"
              }`}
            >
              Klasifikasi
            </Link>
            {/* separator  */}
            <div className="mx-2 h-6 w-px bg-(--color-border)"></div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-text-secondary) transition-colors hover:bg-(--color-background) focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="border-t border-(--color-border) bg-(--color-surface) shadow-lg md:hidden">
          <div className="flex flex-col space-y-1 px-6 py-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`rounded-xl px-4 py-3 text-base font-semibold no-underline transition-all ${
                isActive("/")
                  ? "bg-(--color-primary-bg) text-(--color-primary-dark)"
                  : "text-(--color-text-secondary) hover:bg-(--color-background)"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/classify"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`rounded-xl px-4 py-3 text-base font-semibold no-underline transition-all ${
                isActive("/classify")
                  ? "bg-(--color-primary-bg) text-(--color-primary-dark)"
                  : "text-(--color-text-secondary) hover:bg-(--color-background)"
              }`}
            >
              Klasifikasi
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
