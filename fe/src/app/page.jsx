import Link from "next/link";
import { ClassificationCard } from "@/components/ui/Card";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-linear-to-br from-(--color-hero-from) via-(--color-hero-via) to-(--color-hero-to) pt-45 pb-27">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -top-1/2 -right-[10%] h-150 w-150 rounded-full bg-white/5"></div>
        <div className="pointer-events-none absolute -bottom-[30%] -left-[5%] h-100 w-100 rounded-full bg-white/3"></div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-(--color-status-success) shadow-lg"></span>
                Medical Image Classification
              </div>

              <h1 className="mb-6 text-5xl leading-tight font-extrabold tracking-tight text-white lg:text-[52px]">
                Deteksi{" "}
                <span className="bg-linear-to-r from-(--color-hero-text-highlight-from) to-(--color-hero-text-highlight-to) bg-clip-text text-transparent">
                  Diabetic Retinopathy
                </span>{" "}
                dengan Bayesian CNN
              </h1>

              <p className="mb-9 max-w-lg text-lg leading-relaxed text-white/85">
                Upload gambar fundus mata dan dapatkan hasil klasifikasi tingkat
                keparahan dengan confidence score dan uncertainty estimation
                yang akurat.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/classify"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-8 py-4 text-base font-bold text-(--color-primary-dark) no-underline shadow-xl shadow-black/15 transition-all hover:bg-(--color-primary-bg) hover:shadow-2xl"
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
              </div>
            </div>

            {/* Right - Eye Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="flex h-80 w-80 items-center justify-center rounded-full border border-white/15 bg-white/8 lg:h-85 lg:w-85">
                  <div className="flex h-64 w-64 items-center justify-center rounded-full bg-linear-to-br from-amber-100 via-amber-500 to-amber-900 shadow-2xl lg:h-65 lg:w-65">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-stone-900 shadow-inner lg:h-25 lg:w-25">
                      <div className="h-7 w-7 -translate-x-3 -translate-y-3 rounded-full bg-linear-to-br from-white/90 to-white/30"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-7 h-4 w-4 rounded-full bg-(--color-primary-light) shadow-lg"></div>
                <div className="absolute bottom-7 left-5 h-3 w-3 rounded-full bg-(--color-hero-to) shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-(--color-background) py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-5 inline-block rounded-full bg-(--color-primary-bg) px-4 py-2 text-sm font-semibold text-(--color-primary-dark)">
              Informasi Penting
            </span>
            <h2 className="mb-5 text-4xl leading-tight font-extrabold text-(--color-text-primary)">
              Apa itu Diabetic Retinopathy?
            </h2>
            <p className="text-lg leading-relaxed text-(--color-text-secondary)">
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
              color="bg-(--color-status-success)"
              bgColor="bg-(--color-status-success)/10"
              borderColor="border-(--color-status-success)"
              description="Tidak ada tanda DR"
              severity="0"
            />
            <ClassificationCard
              level="Mild"
              color="bg-(--color-status-warning)"
              bgColor="bg-(--color-status-warning)/10"
              borderColor="border-(--color-status-warning)"
              description="Tahap awal"
              severity="1"
            />
            <ClassificationCard
              level="Moderate"
              color="bg-(--color-status-danger)"
              bgColor="bg-(--color-status-danger)/10"
              borderColor="border-(--color-status-danger)"
              description="Perlu pemantauan"
              severity="2"
            />
            <ClassificationCard
              level="Severe"
              color="bg-(--color-status-severe)"
              bgColor="bg-(--color-status-severe)/10"
              borderColor="border-(--color-status-severe)"
              description="Perlu penanganan"
              severity="3"
            />
            <ClassificationCard
              level="Proliferate"
              color="bg-(--color-status-critical)"
              bgColor="bg-(--color-status-critical)/10"
              borderColor="border-(--color-status-critical)"
              description="Tahap parah"
              severity="4"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
