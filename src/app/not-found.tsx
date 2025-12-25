'use client';
import './styles/globals.css';

import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-neutral-1 text-neutral-7">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-8">The page you are looking for does not exist.</p>
        <button
          onClick={() => router.back()}
          className="bg-green text-neutral-1 text-sm py-2 px-4 rounded-full hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          Go back
        </button>
      </body>
    </html>
  )
}

export default NotFoundPage
