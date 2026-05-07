import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/components/providers/Web3Provider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "buildsite.eth — Build Your ENS Website",
  description:
    "Create a permanent, decentralized website for your ENS name. Hosted on IPFS. No servers. Forever.",
  openGraph: {
    title: "buildsite.eth",
    description: "Your ENS name. Your website. Forever.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-[#0a0a0a] text-white font-sans antialiased">
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
