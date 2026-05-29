import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-teal-600 via-teal-500 to-cyan-500 pt-45 pb-27">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -top-1/2 -right-[10%] h-[600px] w-[600px] rounded-full bg-white/5"></div>
        <div className="pointer-events-none absolute -bottom-[30%] -left-[5%] h-[400px] w-[400px] rounded-full bg-white/3"></div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50"></span>
                Powered by Bayesian CNN
              </div>

              <h1 className="mb-6 text-5xl leading-tight font-extrabold tracking-tight text-white lg:text-[52px]">
                Deteksi{" "}
                <span className="bg-linear-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
                  Diabetic Retinopathy
                </span>{" "}
                dengan AI
              </h1>

              <p className="mb-9 max-w-lg text-lg leading-relaxed text-white/85">
                Upload gambar fundus mata dan dapatkan hasil klasifikasi tingkat
                keparahan dengan confidence score dan uncertainty estimation
                yang akurat.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/classify"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-8 py-4 text-base font-bold text-teal-700 no-underline shadow-xl shadow-black/15 transition-all hover:bg-teal-50 hover:shadow-2xl"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Mulai Klasifikasi
                </Link>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white no-underline backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Pelajari Lebih Lanjut
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right - Eye Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="flex h-80 w-80 items-center justify-center rounded-full border border-white/15 bg-white/8 lg:h-[340px] lg:w-[340px]">
                  <div className="flex h-64 w-64 items-center justify-center rounded-full bg-linear-to-br from-amber-100 via-amber-500 to-amber-900 shadow-2xl lg:h-[260px] lg:w-[260px]">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-stone-900 shadow-inner lg:h-[100px] lg:w-[100px]">
                      <div className="h-7 w-7 -translate-x-3 -translate-y-3 rounded-full bg-linear-to-br from-white/90 to-white/30"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-7 h-4 w-4 rounded-full bg-teal-300 shadow-lg shadow-teal-300/50"></div>
                <div className="absolute bottom-7 left-5 h-3 w-3 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-12">
            <div className="text-center">
              <span className="text-3xl font-extrabold text-teal-600">5</span>
              <span className="ml-2 text-sm text-slate-500">
                Tingkat Klasifikasi
              </span>
            </div>
            <div className="hidden h-8 w-px bg-slate-200 sm:block"></div>
            <div className="text-center">
              <span className="text-3xl font-extrabold text-teal-600">
                BCNN
              </span>
              <span className="ml-2 text-sm text-slate-500">Model</span>
            </div>
            <div className="hidden h-8 w-px bg-slate-200 sm:block"></div>
            <div className="text-center">
              <span className="text-3xl font-extrabold text-teal-600">
                224px
              </span>
              <span className="ml-2 text-sm text-slate-500">Input Size</span>
            </div>
            <div className="hidden h-8 w-px bg-slate-200 sm:block"></div>
            <div className="text-center">
              <span className="text-3xl font-extrabold text-teal-600">±σ</span>
              <span className="ml-2 text-sm text-slate-500">Uncertainty</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-5 inline-block rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
              Informasi Penting
            </span>
            <h2 className="mb-5 text-4xl leading-tight font-extrabold text-slate-900">
              Apa itu Diabetic Retinopathy?
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Diabetic Retinopathy adalah komplikasi diabetes yang mempengaruhi
              mata. Kondisi ini disebabkan oleh kerusakan pada pembuluh darah di
              retina dan dapat menyebabkan kebutaan jika tidak terdeteksi dan
              ditangani dengan tepat.
            </p>
          </div>

          {/* Classification Levels */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <ClassificationCard
              level="No DR"
              color="bg-emerald-500"
              bgColor="bg-emerald-50"
              borderColor="border-emerald-500"
              description="Tidak ada tanda DR"
              severity="0"
            />
            <ClassificationCard
              level="Mild"
              color="bg-yellow-500"
              bgColor="bg-yellow-50"
              borderColor="border-yellow-500"
              description="Tahap awal"
              severity="1"
            />
            <ClassificationCard
              level="Moderate"
              color="bg-orange-500"
              bgColor="bg-orange-50"
              borderColor="border-orange-500"
              description="Perlu pemantauan"
              severity="2"
            />
            <ClassificationCard
              level="Severe"
              color="bg-red-500"
              bgColor="bg-red-50"
              borderColor="border-red-500"
              description="Perlu penanganan"
              severity="3"
            />
            <ClassificationCard
              level="Proliferate"
              color="bg-red-800"
              bgColor="bg-red-50"
              borderColor="border-red-800"
              description="Tahap parah"
              severity="4"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-5 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Keunggulan
            </span>
            <h2 className="mb-5 text-4xl leading-tight font-extrabold text-slate-900">
              Fitur Unggulan BayesDR
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Menggunakan teknologi Bayesian CNN untuk memberikan hasil
              klasifikasi yang akurat dan terukur.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon="📊"
              title="Confidence Score"
              description="Setiap prediksi dilengkapi dengan skor kepercayaan untuk membantu interpretasi hasil diagnosis."
              bgColor="bg-teal-50"
            />
            <FeatureCard
              icon="📈"
              title="Uncertainty Estimation"
              description="Model Bayesian memberikan estimasi ketidakpastian untuk setiap prediksi yang dihasilkan."
              bgColor="bg-blue-50"
            />
            <FeatureCard
              icon="⚡"
              title="Proses Cepat"
              description="Hasil klasifikasi diperoleh dalam hitungan detik dengan antarmuka yang mudah digunakan."
              bgColor="bg-violet-50"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-teal-600 via-teal-500 to-cyan-500 py-20">
        <div className="absolute top-0 left-0 h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-4xl leading-tight font-extrabold text-white">
            Siap Mencoba BayesDR?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-white/80">
            Upload gambar fundus mata Anda dan dapatkan hasil klasifikasi
            Diabetic Retinopathy sekarang juga.
          </p>
          <Link
            href="/classify"
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-10 py-4 text-lg font-bold text-teal-700 no-underline shadow-xl transition-all hover:bg-teal-50 hover:shadow-2xl"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Mulai Klasifikasi Sekarang
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ClassificationCard({
  level,
  color,
  bgColor,
  borderColor,
  description,
  severity,
}) {
  return (
    <div
      className={`${bgColor} rounded-2xl border-2 p-5 ${borderColor} text-center transition-all hover:shadow-lg`}
    >
      <div
        className={`h-12 w-12 ${color} mx-auto mb-4 flex items-center justify-center rounded-xl`}
      >
        <span className="text-xl font-extrabold text-white">{severity}</span>
      </div>
      <h3 className="mb-1 text-sm font-bold text-slate-900">{level}</h3>
      <p className="text-xs text-slate-600">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, bgColor }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`h-16 w-16 rounded-2xl ${bgColor} mb-6 flex items-center justify-center text-3xl`}
      >
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
      <p className="leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
