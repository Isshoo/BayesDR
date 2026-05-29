import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-800 pt-12 pb-8 text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main Footer Content */}
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Brand Column */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600">
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
              <span className="text-xl font-bold text-white">
                Bayes<span className="text-teal-400">DR</span>
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Deteksi Diabetic Retinopathy menggunakan teknologi Bayesian CNN
              untuk hasil yang akurat dan terukur.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {/* Quick Links */}
            <div>
              <h4 className="mb-4 flex min-h-[40px] items-center text-sm font-bold tracking-wider text-slate-200 uppercase">
                Navigasi
              </h4>
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="text-sm text-slate-400 no-underline transition-colors hover:text-white"
                >
                  Beranda
                </Link>
                <Link
                  href="/classify"
                  className="text-sm text-slate-400 no-underline transition-colors hover:text-white"
                >
                  Klasifikasi
                </Link>
                <a
                  href="#about"
                  className="text-sm text-slate-400 no-underline transition-colors hover:text-white"
                >
                  Tentang DR
                </a>
              </div>
            </div>

            {/* Technology */}
            <div>
              <h4 className="mb-4 flex min-h-[40px] items-center text-sm font-bold tracking-wider text-slate-200 uppercase">
                Teknologi
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300">
                  Bayesian CNN
                </span>
                <span className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300">
                  TensorFlow
                </span>
                <span className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300">
                  Next.js
                </span>
                <span className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300">
                  Flask
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px bg-slate-700"></div>

        {/* Bottom Row */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-slate-500">
            © 2025 BayesDR. Dibuat untuk keperluan edukasi dan penelitian.
          </p>
          <div className="max-w-2xl rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
            <p className="text-xs leading-relaxed text-red-400">
              <strong>⚠️ Disclaimer:</strong> Aplikasi ini bukan pengganti
              diagnosis medis profesional. Selalu konsultasikan dengan dokter
              mata untuk pemeriksaan dan diagnosa yang akurat.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
