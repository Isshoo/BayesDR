"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { DR_CLASSES } from "@/libs/constant";
import {
  AlertTriangle,
  Check,
  CloudUpload,
  Eye,
  Send,
  Upload,
} from "lucide-react";
import useClassifyStore from "@/services/store";

export default function ClassifyPage() {
  const {
    selectedImage,
    imagePreview,
    isLoading,
    result,
    error,
    setImage,
    setError,
    classifyImage,
    reset,
  } = useClassifyStore();

  const fileInputRef = useRef(null);
  const resultSectionRef = useRef(null);
  const imageSectionRef = useRef(null);

  // Auto-scroll ke hasil ketika result berubah
  useEffect(() => {
    if (result && resultSectionRef.current) {
      setTimeout(() => {
        resultSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [result]);

  // Auto-scroll ke input image ketika imagePreview berubah tapi kurang beberapa px ke atas
  useEffect(() => {
    if (imagePreview && imageSectionRef.current) {
      setTimeout(() => {
        imageSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [imagePreview]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setError("Format file tidak valid. Upload gambar (PNG, JPG, BMP).");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClassify = () => {
    classifyImage();
  };

  const handleReset = () => {
    reset();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (imageSectionRef.current) {
      setTimeout(() => {
        imageSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  };

  const currentClass = result ? DR_CLASSES[result.predicted_class] : null;

  return (
    <div className="flex-1 pt-34 pb-18">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-(--color-text-primary)">
            Klasifikasi Diabetic Retinopathy
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-(--color-text-secondary)">
            Upload gambar fundus mata untuk mendapatkan hasil analisis dengan
            confidence score dan uncertainty estimation.
          </p>
        </div>

        {/* Upload Section */}
        <div
          className="mb-8 rounded-3xl border border-(--color-border) bg-(--color-surface) p-8 shadow-sm"
          ref={imageSectionRef}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-primary)">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-(--color-text-primary)">
                Upload Gambar Fundus
              </h2>
              <p className="text-sm text-(--color-text-muted)">
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
                ? "border-(--color-primary) bg-(--color-primary-bg)/50"
                : "border-(--color-border) bg-(--color-background) hover:border-(--color-primary-light) hover:bg-(--color-primary-bg)/30"
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
                <p className="mt-4 text-sm font-medium text-(--color-primary)">
                  ✓ {selectedImage?.name} (
                  {(selectedImage?.size / 1024).toFixed(0)} KB)
                </p>
              </div>
            ) : (
              <div>
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-(--color-primary-bg)">
                  <CloudUpload className="h-8 w-8 text-(--color-primary)" />
                </div>
                <p className="mb-2 text-base font-semibold text-(--color-text-primary)">
                  Klik atau drag & drop gambar di sini
                </p>
                <p className="text-sm text-(--color-text-muted)">
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
                  ? "cursor-not-allowed bg-(--color-disabled-bg) text-(--color-disabled-text)"
                  : "bg-(--color-primary) text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                  Menganalisis...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Mulai Klasifikasi
                </>
              )}
            </button>
            {selectedImage && (
              <button
                onClick={handleReset}
                disabled={isLoading}
                className={`rounded-xl border border-(--color-border) bg-(--color-surface) px-6 py-4 text-base font-semibold text-(--color-text-secondary) transition-all hover:bg-(--color-background) ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Reset
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-(--color-error-border) bg-(--color-error-bg) p-4 text-sm text-(--color-error-text)">
              <AlertTriangle className="h-5 w-5" />
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {(isLoading || result) && (
          <div
            ref={resultSectionRef}
            className="scroll-mt-28 rounded-3xl border border-(--color-border) bg-(--color-surface) p-8 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-accent)">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-(--color-text-primary)">
                  Hasil Analisis
                </h2>
                <p className="text-sm text-(--color-text-muted)">
                  Klasifikasi Diabetic Retinopathy
                </p>
              </div>
            </div>

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-5 h-14 w-14 animate-spin rounded-full border-4 border-(--color-border) border-t-(--color-primary)"></div>
                <p className="font-semibold text-(--color-text-primary)">
                  Menganalisis gambar...
                </p>
                <p className="text-sm text-(--color-text-muted)">
                  Menjalankan 50 iterasi Monte Carlo Dropout
                </p>
              </div>
            )}

            {result && currentClass && (
              <div className="space-y-5">
                {/* Image + Prediction Row */}
                <div className="flex items-center gap-5">
                  {imagePreview && (
                    <div className="rounded-2xl bg-(--color-background) p-3">
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
                        <p className="mb-1 text-sm font-medium text-(--color-text-muted)">
                          Hasil Prediksi
                        </p>
                        <p
                          className={`text-3xl font-extrabold ${currentClass.textColor}`}
                        >
                          {currentClass.label}
                        </p>
                      </div>
                      <div className="rounded-xl bg-(--color-surface) px-5 py-3 text-center shadow-sm">
                        <p className="mb-0.5 text-xs font-medium text-(--color-text-muted)">
                          Confidence
                        </p>
                        <p className="text-2xl font-extrabold text-(--color-text-primary)">
                          {(result.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div
                  className={`rounded-xl border-l-4 bg-(--color-background) p-4 ${currentClass.borderColor}`}
                >
                  <p className="text-sm leading-relaxed text-(--color-text-secondary)">
                    {currentClass.description}
                  </p>
                </div>

                {/* ✅ Reliability Badge */}
                {result.reliable_prediction !== undefined && (
                  <div
                    className={`rounded-xl p-4 ${
                      result.reliable_prediction
                        ? "border border-(--color-reliable-border) bg-(--color-reliable-bg)"
                        : "border border-(--color-unreliable-border) bg-(--color-unreliable-bg)"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {result.reliable_prediction ? (
                        <>
                          <Check className="h-5 w-5 text-(--color-reliable-icon)" />
                          <span className="text-sm font-semibold text-(--color-reliable-text)">
                            Prediksi Reliable
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-5 w-5 text-(--color-unreliable-icon)" />
                          <span className="text-sm font-semibold text-(--color-unreliable-text)">
                            Prediksi Perlu Verifikasi
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Uncertainty */}
                <div className="rounded-xl bg-(--color-info-bg) p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-(--color-info-dark)">
                        Uncertainty (σ)
                      </span>
                      <p className="mt-1 text-xs text-(--color-text-muted)">
                        Level: {result.uncertainty_level || "N/A"}
                      </p>
                    </div>
                    <span className="text-2xl font-extrabold text-(--color-info-dark)">
                      {result.uncertainty?.toFixed(4) || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Probability Distribution */}
                <div>
                  <h3 className="mb-4 text-sm font-bold text-(--color-text-primary)">
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
                          <span className="font-semibold text-(--color-text-secondary)">
                            {(prob * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-(--color-border)">
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
    </div>
  );
}
