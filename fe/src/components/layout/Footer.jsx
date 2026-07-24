import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-(--color-footer-bg) pt-12 pb-8 text-(--color-footer-text)">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main Footer Content */}
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Brand Column */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-primary)">
                <svg
                  className="h-5 w-5 text-white"
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
              <span className="text-xl font-bold text-(--color-footer-text)">
                Bayes<span className="text-(--color-footer-accent)">DR</span>
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-(--color-footer-text-muted)">
              Deteksi Diabetic Retinopathy menggunakan teknologi Bayesian CNN
              untuk hasil yang akurat dan terukur.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {/* Quick Links */}
            <div>
              <h4 className="mb-4 flex min-h-10 items-center text-sm font-bold tracking-wider text-(--color-footer-text-heading) uppercase">
                Navigasi
              </h4>
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="text-sm text-(--color-footer-text-muted) no-underline transition-colors hover:text-(--color-footer-text)"
                >
                  Beranda
                </Link>
                <Link
                  href="/classify"
                  className="text-sm text-(--color-footer-text-muted) no-underline transition-colors hover:text-(--color-footer-text)"
                >
                  Klasifikasi
                </Link>
                <a
                  href="#about"
                  className="text-sm text-(--color-footer-text-muted) no-underline transition-colors hover:text-(--color-footer-text)"
                >
                  Tentang DR
                </a>
              </div>
            </div>

            {/* Technology */}
            <div>
              <h4 className="mb-4 flex min-h-10 items-center text-sm font-bold tracking-wider text-(--color-footer-text-heading) uppercase">
                Teknologi
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-(--color-footer-tag-bg) px-3 py-1.5 text-xs font-medium text-(--color-footer-tag-text)">
                  Bayesian CNN
                </span>
                <span className="rounded-md bg-(--color-footer-tag-bg) px-3 py-1.5 text-xs font-medium text-(--color-footer-tag-text)">
                  TensorFlow
                </span>
                <span className="rounded-md bg-(--color-footer-tag-bg) px-3 py-1.5 text-xs font-medium text-(--color-footer-tag-text)">
                  Next.js
                </span>
                <span className="rounded-md bg-(--color-footer-tag-bg) px-3 py-1.5 text-xs font-medium text-(--color-footer-tag-text)">
                  Flask
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px bg-(--color-footer-border)"></div>

        {/* Bottom Row */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-(--color-footer-text-muted)">
            © {new Date().getFullYear()} BayesDR. Dibuat untuk keperluan edukasi
            dan penelitian.
          </p>
          <div className="max-w-2xl rounded-lg border border-(--color-error-text)/20 bg-(--color-error-text)/10 px-4 py-3">
            <p className="text-xs leading-relaxed text-(--color-error-text)">
              <strong>⚠️ Disclaimer:</strong> Aplikasi ini bukan pengganti
              diagnosis medis profesional. Selalu konsultasikan dengan dokter
              mata untuk pemeriksaan dan diagnosa yang lebih akurat.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
