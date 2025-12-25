import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Providers } from "@/context/Providers";
import Navbar from "@/components/Navbar";
import './../styles/globals.css';
import Footer from "@/components/Footer";
import Hamburger from "@/components/Hamburger";
import ToastProvider from "@/components/ui/ToastProvider";
import Newsletter from "@/components/Newsletter";

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
  title: "Omnishop - Where You Get All Kinds Of Products",
  description: "Modern e-commerce built with Next.js",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body className="font-poppins bg-neutral-1 text-neutral-7 antialiased relative">
        <ToastProvider />
        <Providers>
          <div className="sticky w-full inset-0 z-500 bg-white border-b border-border">
            <Navbar />
          </div>
          {children}
          <div className="mt-18">
            <Newsletter />
          </div>
          <Footer />
          <div className="sticky bottom-0 left-0 w-full z-50 bg-white border-t border-border">
            <Hamburger />
          </div>

        </Providers>
      </body>
    </html >
  );
}