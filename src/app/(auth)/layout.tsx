import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import './../styles/globals.css';
import ToastProvider from "@/components/ui/ToastProvider";

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
      <body className="font-poppins bg-neutral-1 text-neutral-7 antialiased relative">
        <ToastProvider />
        {children}
      </body>
    </html >
  );
}