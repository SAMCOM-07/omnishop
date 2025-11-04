import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Button = ({ text, href }: {text: string, href: string}) => {
  return (
    <Link
      href={href}
      className="border-b inline-flex py-0.5 items-center gap-1 group text-sm md:text-base [direction:ltr]"
    >
      <span>{text}</span>
      <span className="group-hover:translate-x-0.5 group-active:translate-0 transition-transform duration-200">
        <ArrowRight size={18} />
      </span>
    </Link>
  );
};

export default Button;
