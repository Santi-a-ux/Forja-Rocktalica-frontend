import type { ReactNode } from "react";

export function PageTitle({ titulo, children }: { titulo: string; children?: ReactNode }) {
  return (
    <header className="mb-8">
      <h1 className="m-0 mb-3 font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-tight">{titulo}</h1>
      {children && <p className="m-0 max-w-[38rem] text-[1.15rem] text-tinta-suave">{children}</p>}
    </header>
  );
}
