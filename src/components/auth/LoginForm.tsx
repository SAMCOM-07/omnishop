"use client";

import { useState } from "react";
import { loginUser, setAuthCookie, signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { Check, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthButton, GoogleSignInButton } from "./AuthButtons";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
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
      console.log('Error: ' + e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      <form onSubmit={handleLogin} className="space-y-6 font-inter">
        <span className="text-green text-center block text-2xl font-semibold font-poppins">Welcome back</span>

        <input
          type="email"
          placeholder="Username or Email"
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

        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-2 ">
            <button type="button" className="" onClick={() => setIsChecked(prev => !prev)}>
              <input type="checkbox" id="remember-me" readOnly checked={isChecked} className="hidden" />
              <span className={cn("h-5 w-5 rounded-sm border-neutral-4 text-neutral-1 grid place-content-center", isChecked ? 'bg-neutral-7 border-0' : 'bg-neutral-1 border-2')}>{isChecked ? <Check className="p-1" /> : ""}</span>
            </button>
            <label htmlFor="remember-me" className="mt-0.5 text-neutral-4 text-sm cursor-pointer">Remember me</label>
          </div>
          <Link href={'#'} className="text-neutral-7 text-sm font-semibold">Forgot password?</Link>
        </div>

        <AuthButton text="Sign In" loading={loading} />
      </form>

      <div className="text-center text-neutral-500">or</div>

      <GoogleSignInButton handleGoogle={handleGoogle} loading={loading} />
      <div className="text-neutral-4 text-sm text-center font-inter">
        <span>Don't have an account?</span>
        <Link href={'/register'} className="text-green ml-1 underline">Sign Up</Link>
      </div>
    </div>
  );
}