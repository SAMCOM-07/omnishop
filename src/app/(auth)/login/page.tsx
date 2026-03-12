import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import Icon from './../../../../public/images/omnishop-icon.avif';
import LogoText from './../../../../public/images/omnishop-text.avif';
import Logo from './../../../../public/images/omnishop-logo.avif';
import Link from "next/dist/client/link";

export default function LoginPage() {

  return (
    <div className="flex items-center justify-between gap-4 h-dvh w-full relative">
      <div className="mx-auto bg-neutral-3 w-full min-h-full hidden lg:grid place-content-center">
        <Image src={Logo} width={400} height={400} alt="Omnishop logo" />
      </div>
      <div className="mx-auto w-full h-full flex flex-col gap-4 items-center relative justify-center px-6 lg:px-0">

        <Link href="/" aria-label="Go to homepage" className="w-24">
          <Image src={Icon} width={400} height={400} alt="Omnishop icon" />
        </Link>
        <LoginForm />
      </div>
      <Link href="/" aria-label="Go to homepage" className="w-32 absolute top-6 -translate-x-1/2 left-1/2 lg:hidden">
        <Image
          src={LogoText}
          alt="Omnishop"
          quality={55}
          sizes="128px"
          className="h-auto w-32"
        />
      </Link>
    </div>
  );
}