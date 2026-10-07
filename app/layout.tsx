import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { CREMA, SITE, TEXTOS, VERDE_BOSQUE, VERDE_LIMON, VERDE_OLIVA } from "@/lib/config";
import NuevaContrasena from "@/components/NuevaContrasena";
import "./globals.css";

const texto = Inter({
  variable: "--font-texto",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const titulos = Poppins({
  variable: "--font-titulos",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const titulo = `${SITE.nombre} · ${SITE.estatus}`;
const descripcion = TEXTOS.hero.subtitulo;

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
    "--primary": VERDE_BOSQUE,
    "--dark": VERDE_BOSQUE,
    "--accent": VERDE_LIMON,
    "--oliva": VERDE_OLIVA,
    "--claro": CREMA,
  } as React.CSSProperties;

  return (
    <html lang="es" className={`${texto.variable} ${titulos.variable}`} style={colores}>
      <body>
        {children}
        <NuevaContrasena />
      </body>
    </html>
  );
}
