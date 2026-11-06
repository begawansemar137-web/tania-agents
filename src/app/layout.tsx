import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TANIA Agents — Platform AI Agent Enterprise",
  description:
    "Bangun, kelola, dan jalankan AI Agent untuk berbagai kebutuhan bisnis dengan aman, terintegrasi, dan siap skala.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Hidden until focused: lets keyboard users jump past the header nav. Every page marks its main with id="konten". */}
        <a
          href="#konten"
          className="sr-only rounded-lg bg-accent px-4 py-2 font-semibold text-surface focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
        >
          Lewati ke konten
        </a>
        {children}
      </body>
    </html>
  );
}
