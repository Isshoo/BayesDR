/* eslint-disable no-console */
"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const DR_CLASSES = [
  {
    name: "No_DR",
    label: "No DR",
    color: "bg-emerald-500",
    textColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-500",
    description:
      "Tidak ada tanda Diabetic Retinopathy terdeteksi. Retina dalam kondisi sehat.",
  },
  {
    name: "Mild",
    label: "Mild",
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-500",
    description:
      "Tahap awal dengan microaneurysms. Disarankan untuk pemeriksaan rutin setiap 12 bulan.",
  },
  {
    name: "Moderate",
    label: "Moderate",
    color: "bg-orange-500",
    textColor: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-500",
    description:
      "Tahap menengah. Perlu pemantauan lebih intensif dan konsultasi dengan dokter mata.",
  },
  {
    name: "Severe",
    label: "Severe",
    color: "bg-red-500",
    textColor: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-500",
    description:
      "Tahap lanjut. Segera konsultasikan dengan dokter mata spesialis untuk penanganan.",
  },
  {
    name: "Proliferate_DR",
    label: "Proliferate DR",
    color: "bg-red-800",
    textColor: "text-red-800",
    bgColor: "bg-red-50",
    borderColor: "border-red-800",
    description:
      "Tahap paling parah. Memerlukan penanganan medis segera untuk mencegah kebutaan.",
  },
];

export default function ClassifyPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const resultSectionRef = useRef(null); // Ref untuk section hasil

  // ✅ Auto-scroll ke hasil ketika result berubah
  useEffect(() => {
    if (result && resultSectionRef.current) {
      // Delay sedikit untuk memastikan DOM sudah terender
      setTimeout(() => {
        resultSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [result]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ✅ Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setError(
          `File terlalu besar (${(file.size / (1024 * 1024)).toFixed(2)}MB). Maksimal 10MB.`
        );
        return;
      }

      // ✅ Validate file type
      const validTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/bmp",
        "image/webp",
        "image/svg+xml",
      ];
      if (!validTypes.includes(file.type)) {
        setError(
          `Format file tidak didukung. Gunakan PNG, JPG, JPEG, BMP, WEBP, atau SVG.`
        );
        return;
      }

      // Scroll ke div gambar dengan smooth menggunakan useRef
      window.scrollTo({
        top: 200,
        behavior: "smooth",
      });

      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      // ✅ Validate file size
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setError(
          `File terlalu besar (${(file.size / (1024 * 1024)).toFixed(2)}MB). Maksimal 10MB.`
        );
        return;
      }

      // ✅ Scroll ke atas dengan smooth
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    } else {
      setError("Format file tidak valid. Upload gambar (PNG, JPG, BMP).");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClassify = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("image", selectedImage); // ✅ Key: "image" (match backend)

    try {
      console.log("📤 Sending request to backend...");
      console.log(`   File: ${selectedImage.name}`);
      console.log(`   Size: ${(selectedImage.size / 1024).toFixed(2)} KB`);

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/classify",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log(`📥 Response status: ${response.status}`);

      // ✅ Parse JSON response
      const data = await response.json();

      // ✅ Check if response is successful
      if (!response.ok) {
        // Backend returned error
        throw new Error(
          data.message || data.error || "Terjadi kesalahan saat klasifikasi"
        );
      }

      // ✅ Check if prediction was successful
      if (!data.success) {
        throw new Error(data.message || "Klasifikasi gagal");
      }

      console.log("✅ Prediction successful:", data);
      setResult(data);
    } catch (err) {
      console.error("❌ Classification error:", err);

      // ✅ Better error messages
      if (
        err.message.includes("Failed to fetch") ||
        err.message.includes("NetworkError")
      ) {
        setError(
          "Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:5500"
        );
      } else {
        setError(err.message || "Gagal melakukan klasifikasi");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // ✅ Scroll ke atas dengan smooth
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentClass = result ? DR_CLASSES[result.predicted_class] : null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Navbar />

      <main className="flex-1 pt-34 pb-18">
        <div className="mx-auto max-w-4xl px-6">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900">
              Klasifikasi Diabetic Retinopathy
            </h1>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-600">
              Upload gambar fundus mata untuk mendapatkan hasil analisis dengan
              confidence score dan uncertainty estimation.
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-teal-500 to-cyan-600">
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Upload Gambar Fundus
                </h2>
                <p className="text-sm text-slate-500">
                  Pilih atau drag & drop gambar retina
                </p>
              </div>
            </div>

            {/* Drop Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
                imagePreview
                  ? "border-teal-500 bg-teal-50/50"
                  : "border-slate-300 bg-slate-50 hover:border-teal-400 hover:bg-teal-50/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />

              {imagePreview ? (
                <div>
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={224}
                    height={224}
                    className="mx-auto max-h-72 max-w-full rounded-xl shadow-lg"
                  />
                  <p className="mt-4 text-sm font-medium text-teal-600">
                    ✓ {selectedImage?.name} (
                    {(selectedImage?.size / 1024).toFixed(0)} KB)
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-teal-50 to-teal-100">
                    <svg
                      className="h-8 w-8 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="mb-2 text-base font-semibold text-slate-900">
                    Klik atau drag & drop gambar di sini
                  </p>
                  <p className="text-sm text-slate-500">
                    Format: PNG, JPG, JPEG (maks. 10MB)
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleClassify}
                disabled={!selectedImage || isLoading}
                className={`flex flex-1 items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-bold transition-all ${
                  !selectedImage || isLoading
                    ? "cursor-not-allowed bg-slate-200 text-slate-400"
                    : "bg-linear-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30 hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Menganalisis...
                  </>
                ) : (
                  <>
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    Mulai Klasifikasi
                  </>
                )}
              </button>
              {selectedImage && (
                <button
                  onClick={handleReset}
                  disabled={isLoading}
                  className={`rounded-xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-600 transition-all hover:bg-slate-50 ${
                    isLoading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Reset
                </button>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                <svg
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}
          </div>

          {/* Results Section */}
          {(isLoading || result) && (
            <div
              ref={resultSectionRef}
              className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-purple-600">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Hasil Analisis
                  </h2>
                  <p className="text-sm text-slate-500">
                    Klasifikasi Diabetic Retinopathy
                  </p>
                </div>
              </div>

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="mb-5 h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-teal-500"></div>
                  <p className="font-semibold text-slate-900">
                    Menganalisis gambar...
                  </p>
                  <p className="text-sm text-slate-500">
                    Menjalankan 50 iterasi Monte Carlo Dropout
                  </p>
                </div>
              )}

              {result && currentClass && (
                <div className="space-y-5">
                  {/* Image + Prediction Row */}
                  <div className="flex items-center gap-5">
                    {imagePreview && (
                      <div className="rounded-2xl bg-slate-100 p-3">
                        <Image
                          src={imagePreview}
                          alt="Analyzed"
                          width={112}
                          height={112}
                          className="h-28 w-28 rounded-xl object-cover shadow-md"
                        />
                      </div>
                    )}
                    <div
                      className={`flex-1 rounded-2xl p-5 ${currentClass.bgColor} border-2 ${currentClass.borderColor}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="mb-1 text-sm font-medium text-slate-500">
                            Hasil Prediksi
                          </p>
                          <p
                            className={`text-3xl font-extrabold ${currentClass.textColor}`}
                          >
                            {currentClass.label}
                          </p>
                        </div>
                        <div className="rounded-xl bg-white px-5 py-3 text-center shadow-sm">
                          <p className="mb-0.5 text-xs font-medium text-slate-500">
                            Confidence
                          </p>
                          <p className="text-2xl font-extrabold text-slate-900">
                            {(result.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div
                    className={`rounded-xl border-l-4 bg-slate-50 p-4 ${currentClass.borderColor}`}
                  >
                    <p className="text-sm leading-relaxed text-slate-600">
                      {currentClass.description}
                    </p>
                  </div>

                  {/* ✅ Reliability Badge */}
                  {result.reliable_prediction !== undefined && (
                    <div
                      className={`rounded-xl p-4 ${
                        result.reliable_prediction
                          ? "border border-green-200 bg-green-50"
                          : "border border-yellow-200 bg-yellow-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {result.reliable_prediction ? (
                          <>
                            <svg
                              className="h-5 w-5 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm font-semibold text-green-700">
                              Prediksi Reliable
                            </span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="h-5 w-5 text-yellow-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                            <span className="text-sm font-semibold text-yellow-700">
                              Prediksi Perlu Verifikasi
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Uncertainty */}
                  <div className="rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-semibold text-blue-700">
                          Uncertainty (σ)
                        </span>
                        <p className="mt-1 text-xs text-slate-500">
                          Level: {result.uncertainty_level || "N/A"}
                        </p>
                      </div>
                      <span className="text-2xl font-extrabold text-blue-700">
                        {result.uncertainty?.toFixed(4) || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Probability Distribution */}
                  <div>
                    <h3 className="mb-4 text-sm font-bold text-slate-900">
                      Distribusi Probabilitas
                    </h3>
                    <div className="space-y-3">
                      {result.probabilities?.map((prob, idx) => (
                        <div key={idx}>
                          <div className="mb-1.5 flex items-center justify-between text-sm">
                            <span
                              className={`font-semibold ${DR_CLASSES[idx].textColor}`}
                            >
                              {DR_CLASSES[idx].label}
                            </span>
                            <span className="font-semibold text-slate-600">
                              {(prob * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className={`h-full ${DR_CLASSES[idx].color} rounded-full transition-all duration-500`}
                              style={{ width: `${prob * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
