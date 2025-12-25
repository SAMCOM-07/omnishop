"use client";

import { useState } from "react";
import { registerUser, setAuthCookie, signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { AuthButton, GoogleSignInButton } from "./AuthButtons";

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(email, password);
      await setAuthCookie();
      router.push("/");
    } catch (e: any) {
      toast.error("Error Signing In")
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      await signInWithGoogle();
      await setAuthCookie();
      router.push("/");
    } catch (e: any) {
      toast.error("Error Signing In")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      <form onSubmit={handleRegister} className="space-y-6 font-inter">
        <span className="text-green text-center block text-2xl font-semibold font-poppins">Welcome to Omnishop</span>

        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-neutral-3 py-2 w-full outline-none text-neutral-4"
        />

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-neutral-3 py-2 w-full outline-none text-neutral-4"
        />

        <div
          className="border-b border-neutral-3 py-2 w-full text-neutral-4 flex items-center justify-between gap-4"
        >
          <input
            type={isOpen ? 'text' : 'password'}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none"
          />
          <button type="button" onClick={() => setIsOpen(prev => !prev)}>{isOpen ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>

        <p className="-mt-4 text-xs text-neutral-4">Password must include uppercase, lowercase, symbol and number</p>

        <AuthButton text="Sign Up" loading={loading} />
      </form>

      <div className="text-center text-neutral-500">or</div>

      <GoogleSignInButton handleGoogle={handleGoogle} loading={loading} />
      <div className="text-neutral-4 text-sm text-center font-inter">
        <span>Already have an account?</span>
        <Link href={'/login'} className="text-green ml-1 underline">Sign In</Link>
      </div>
    </div>
  );
}
