import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOG — Onchain Watchdog",
  description: "watches chain so you dont have to",
  icons: { icon: [{ url: "/dog.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "any" }] },
  openGraph: {
    title: "DOG — Onchain Watchdog",
    description: "watches chain so you dont have to",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0C0D0D] text-[#ECEBE5] flex flex-col font-sans selection:bg-[#FF6B22] selection:text-[#0C0D0D]">
        {children}
      </body>
    </html>
  );
}
