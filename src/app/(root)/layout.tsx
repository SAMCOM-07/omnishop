import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Providers } from "@/context/Providers";
import Navbar from "@/components/Navbar";
import './../styles/globals.css';
import Footer from "@/components/Footer";
import Hamburger from "@/components/Hamburger";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // adjust as needed
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Omnishop",
  description: "Modern e-commerce built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-poppins bg-neutral-1 text-neutral-7 min-h-screen antialiased relative">
        <Providers>
          <div className="sticky w-full inset-0 z-50 bg-white/50 backdrop-blur-xs">
            <Navbar />
          </div>
          {children}
          <Footer />
          <div className="sticky bottom-0 left-0 w-full z-50 bg-white/50 backdrop-blur-xs">
            <Hamburger />
          </div>
        </Providers>
      </body>
    </html >
  );
}