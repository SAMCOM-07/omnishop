// login button

import { logoutUser } from "@/lib/auth";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";
import GoogleLogo from './../../../public/images/google-logo.png';
import { useRouter } from "next/navigation";


export const LogInButton = () => {
  return (
    <Link
      href={'/login'}
      className="bg-green text-neutral-1 text-sm py-2 px-3 rounded-full hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center gap-2"
    >
      Login <LogInIcon size={18} />
    </Link>
  );
}


// sign in with google button

export const GoogleSignInButton = ({ handleGoogle, loading }: { handleGoogle: MouseEventHandler<HTMLButtonElement>, loading: boolean }) => {
  return (
    <button
      onClick={handleGoogle}
      disabled={loading}
      className="w-full p-3 border border-neutral-3 gap-2 text-sm ld bg-neutral-2 rounded-full relative hover:bg-neutral-3 active:scale-95 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-wait"
    >
      <Image src={GoogleLogo} alt="Google Logo" width={20} height={20} className="absolute left-3" />
      <span>Continue with Google</span>
    </button>
  )
}


// logout button
export const LogOutButton = () => {

  const router = useRouter();

  async function handleLogout() {
    try {
      await logoutUser();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }
  return (
    <button
      className="bg-red-600 text-neutral-1 text-sm py-2 px-4 rounded-full hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center gap-2"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

// login/register button
export const AuthButton = ({ text, loading }: { text: string, loading: boolean }) => {
  return (
    <button type="submit" disabled={loading} className="bg-green text-neutral-1 text-sm w-full p-3 rounded-full hover:scale-105 active:scale-95 transition-transform duration-300 disabled:opacity-50 disabled:cursor-wait">
      {
        loading ? 'Processing...' : text
      }
    </button >
  )
}