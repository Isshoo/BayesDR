import { Oxygen } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const oxygen = Oxygen({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "BayesDR - Diabetic Retinopathy Detection",
    template: "%s | BayesDR - Diabetic Retinopathy Detection",
  },
  description:
    "Diabetic Retinopathy detection using Bayesian CNN. Upload fundus images and get accurate classification with confidence and uncertainty scores.",
  keywords: [
    "diabetic retinopathy",
    "bayesian convolutional neural network",
    "medical imaging",
    "eye disease",
    "bcnn",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${oxygen.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
