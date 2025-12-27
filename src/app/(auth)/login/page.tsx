import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import Logo3 from './../../../../public/images/omnishop-logo3.png';
import LogoText from './../../../../public/images/omnishop-text.png';
import Logo2 from './../../../../public/images/omnishop-logo2.png';
import Link from "next/dist/client/link";

export default function LoginPage() {

  return (
    <div className="flex items-center justify-between gap-4 h-dvh w-full relative">
      <div className="mx-auto bg-neutral-3 w-full min-h-full hidden lg:grid place-content-center">
        <Image src={Logo2} width={500} height={500} alt="Product Picture" />
      </div>
      <div className="mx-auto w-full h-full flex flex-col gap-4 items-center relative justify-center px-6 lg:px-0">

        <Image src={Logo3} width={120} height={120} alt="Product Picture" />
        <LoginForm />
      </div>
      <Link href="/" className="absolute top-6 -translate-x-1/2 left-1/2 lg:hidden">
        <Image src={LogoText} width={120} height={120} alt="Product Picture" />
      </Link>
    </div>
  );
}




// import LoginForm from "@/components/auth/LoginForm";
// import Image from "next/image";
// import Logo3 from './../../../../public/images/omnishop-logo3.png';
// import LogoText from './../../../../public/images/omnishop-text.png';
// import Logo2 from './../../../../public/images/omnishop-logo2.png';
// import Link from "next/dist/client/link";

// export default function LoginPage() {

//   return (
//     <div className="flex items-center justify-between gap-4 h-dvh w-full">

//       <div className="mx-auto bg-neutral-3 w-full min-h-full hidden lg:grid place-content-center">
//         <Image src={Logo2} width={500} height={500} alt="Product Picture" />
//       </div>
//       <div className="mx-auto w-full h-full grid grid-rows-3 lg:grid-rows-1 px-6 lg:px-0">
//         <Link href="/" className="lg:hidden h-fit justify-self-center mt-6">
//           <Image src={LogoText} width={120} height={120} alt="Product Picture" />
//         </Link>
//         <div className="flex flex-col items-center self-center">
//           <Image src={Logo3} width={120} height={120} alt="Product Picture" />
//           <LoginForm />
//         </div>
//       </div>
//       {/* <Link href="/" className="absolute top-6 -translate-x-1/2 left-1/2 lg:hidden">
//         <Image src={LogoText} width={120} height={120} alt="Product Picture" />
//       </Link> */}
//     </div>
//   );
// }
