import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Condiciones de uso de este sitio web.",
};

export default function AvisoLegal() {
  return (
    <main className="legal">
      <div className="contenedor">
        <p>
          <Link href="/">← Volver a la portada</Link>
        </p>

        <h1 style={{ marginTop: 24 }}>Aviso legal</h1>

        <h2>Datos del titular</h2>
        <p>
          {SITE.nombre}. {SITE.estatus}.
          {SITE.registro && ` Registro DGSFP nº ${SITE.registro}.`}{" "}
          Correo de contacto: {SITE.email}. Teléfono: {SITE.telefono}.
        </p>

        <h2>Objeto</h2>
        <p>
          Este sitio ofrece información sobre seguros de DKV y permite solicitar un
          estudio personalizado a través del formulario de contacto. No es un canal de
          contratación: la póliza se formaliza directamente con la aseguradora.
        </p>

        <h2>Propiedad intelectual</h2>
        <p>
          Los textos, el diseño y los elementos gráficos de esta web son propiedad de{" "}
          {SITE.nombre} o se usan con la autorización correspondiente. No está permitida
          su reproducción sin permiso.
        </p>

        <h2>Responsabilidad</h2>
        <p>
          La información de este sitio es orientativa. Las coberturas, carencias y
          condiciones exactas dependen de la póliza que contrates con la aseguradora.
        </p>

        <h2>Legislación aplicable</h2>
        <p>Este aviso legal se rige por la legislación española.</p>

        <p style={{ marginTop: 48, fontSize: "0.9rem" }}>
          Texto orientativo. Revísalo con un profesional antes de publicarlo.
        </p>
      </div>
    </main>
  );
}
