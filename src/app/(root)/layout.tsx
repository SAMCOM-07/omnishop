import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Providers } from "@/context/Providers";
import Navbar from "@/components/Navbar";
import './../styles/globals.css';
import ToastProvider from "@/components/ui/ToastProvider";
import Newsletter from "@/components/Newsletter";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/Footer"));
const Hamburger = dynamic(() => import("@/components/Hamburger"));

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Omnishop - Your Premium Online Shopping Destination",
  description: "Discover a wide variety of products at Omnishop. Shop quality items, exclusive deals, and fast delivery. Your trusted online marketplace for all your needs.",
  keywords: ["online shopping", "e-commerce", "buy online", "products", "deals", "omnishop"],
  metadataBase: new URL("https://omnishop-ng.vercel.app"),

  // Open Graph
  openGraph: {
    title: "Omnishop - Your Premium Online Shopping Destination",
    description: "Discover a wide variety of products at Omnishop. Shop quality items, exclusive deals, and fast delivery.",
    url: "https://omnishop-ng.vercel.app",
    siteName: "Omnishop",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "./../../../public/images/omnishop-logo.png",
        width: 1200,
        height: 630,
        alt: "Omnishop - Your Online Shopping Marketplace",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Omnishop - Your Premium Online Shopping Destination",
  //   description: "Discover a wide variety of products at Omnishop. Shop quality items, exclusive deals, and fast delivery.",
  //   images: ["./../../../public/images/omnishop-logo3.png"],
  //   creator: "Samuel Shonde",
  // },

  // Additional metadata
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://omnishop-ng.vercel.app",
  },
  authors: [{ name: "Omnishop Team" }],
  creator: "Omnishop",
  publisher: "Omnishop",
  icons: {
    icon: "/favicon.ico",
  },
  // manifest: "/manifest.json",
  // verification: {
  //   google: "your-google-verification-code",
  // },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <meta name="google-site-verification" content="TXGAApfYoQlYQxnV7s3s7trHwEWFbchma88PXHOatYQ" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
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