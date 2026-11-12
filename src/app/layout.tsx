import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/context/Providers";
import CustomCursor from "@/components/CustomCursor";
import Background3D from "@/components/Background3D";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akash Sharma — Cybersecurity Engineer & Full Stack Developer",
  description: "Computer Science student specializing in Cybersecurity, Full Stack Development, and AI/ML. Discover modern scalable systems, secure backend APIs, and competitive programming solutions.",
  keywords: ["Akash Sharma", "Cybersecurity Engineer", "Full Stack Developer", "Competitive Programmer", "Go Developer", "Next.js Portfolio", "C-DOT Intern"],
  authors: [{ name: "Akash Sharma" }],
  creator: "Akash Sharma",
  openGraph: {
    title: "Akash Sharma — Cybersecurity Engineer & Full Stack Developer",
    description: "Computer Science student specializing in Cybersecurity, Full Stack Development, and AI/ML.",
    type: "website",
    locale: "en_US",
    url: "https://akashsharma.dev", // Fallback URL
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash Sharma — Cybersecurity Engineer & Full Stack Developer",
    description: "Computer Science student specializing in Cybersecurity, Full Stack Development, and AI/ML.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="antialiased selection:bg-[#3B82F6]/30 selection:text-white bg-[#050505] text-white">
        <Providers>
          <Background3D />
          <CustomCursor />
          <div className="relative z-10">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
