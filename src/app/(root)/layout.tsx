import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Providers } from "@/context/Providers";
import Navbar from "@/components/Navbar";
import './../styles/globals.css';
import Footer from "@/components/Footer";
import Hamburger from "@/components/Hamburger";
import SearchPage from "@/components/SearchPage";

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
          <div className="sticky w-full inset-0 z-50 bg-white border-b border-border">
            <Navbar />
          </div>
          {children}
          <Footer />
          <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-border">
            <Hamburger />
          </div>
        
        </Providers>
      </body>
    </html >
  );
}