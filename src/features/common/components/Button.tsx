import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "principal" | "suave" | "peligro";

const base =
  "inline-flex items-center justify-center rounded-full border px-[1.15rem] py-[0.7rem] font-bold transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer";

const variantes: Record<Variante, string> = {
  principal: "border-transparent bg-terracota text-[#fffaf1] hover:bg-terracota-oscura",
  suave: "border-linea bg-transparent text-tinta hover:border-terracota",
  peligro: "border-error bg-transparent text-error",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
}

export function Button({ variante = "principal", className = "", ...props }: ButtonProps) {
  return <button className={`${base} ${variantes[variante]} ${className}`} {...props} />;
}

export function LinkButton({
  href,
  variante = "principal",
  children,
}: {
  href: string;
  variante?: Variante;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variantes[variante]} no-underline`}>
      {children}
    </Link>
  );
}
