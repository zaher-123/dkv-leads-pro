import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ACCENT, DARK_BG, PRIMARY_BLUE, SITE } from "@/lib/config";
import "./globals.css";

const texto = Inter({
  variable: "--font-texto",
  subsets: ["latin"],
  weight: ["500", "600", "800"],
});

const titulo = `${SITE.nombre} · Seguros de salud y decesos`;
const descripcion =
  "Comparo las coberturas de DKV contigo y te explico cada punto antes de decidir. Sin letra pequeña.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: titulo,
  description: descripcion,
  openGraph: {
    title: titulo,
    description: descripcion,
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Colores de marca desde config.ts. globals.css los usa como variables.
  const colores = {
    "--primary": PRIMARY_BLUE,
    "--dark": DARK_BG,
    "--accent": ACCENT,
  } as React.CSSProperties;

  return (
    <html lang="es" className={texto.variable} style={colores}>
      <body>{children}</body>
    </html>
  );
}
