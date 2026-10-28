import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";
import { AuthProvider } from "@/features/auth/hooks/useAuth";
import { Footer } from "@/features/common/components/Footer";
import { Navbar } from "@/features/common/components/Navbar";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["600", "700"] });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source", weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "Forja Rocktalica — Instrumentos de Rock y Metal", template: "%s — Forja Rocktalica" },
  description:
    "Forja Rocktalica: instrumentos, equipos y accesorios para amantes del Rock y Metal. Guitarras, bajos, amplificadores, pedales y más.",
  icons: { icon: "/img/logo.svg" },
};

// Aplica el tema guardado antes de pintar, para evitar el parpadeo claro → oscuro
const scriptTema = `(function(){try{var t=localStorage.getItem('forja-tema');if(t!=='oscuro'&&t!=='claro'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'oscuro':'claro'}document.documentElement.setAttribute('data-tema',t)}catch(e){}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${sourceSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body className="min-h-screen">
        <a
          href="#contenido"
          className="absolute -left-[999px] top-0 z-20 bg-superficie px-4 py-2 text-tinta focus:left-2 focus:top-2"
        >
          Saltar al contenido
        </a>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
