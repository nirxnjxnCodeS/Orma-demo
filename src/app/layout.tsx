import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-atkinson",
  display: "swap",
});

const notoMl = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  variable: "--font-noto-ml",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orma",
  description: "A phone call that leaves a medicine record behind.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f1412",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${atkinson.variable} ${notoMl.variable}`}>
      <body className="min-h-dvh font-sans antialiased">{children}</body>
    </html>
  );
}
