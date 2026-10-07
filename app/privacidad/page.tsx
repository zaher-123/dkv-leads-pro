import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo tratamos tus datos cuando pides presupuesto de seguro.",
};

export default function Privacidad() {
  return (
    <main className="legal">
      <div className="contenedor">
        <p>
          <Link href="/">← Volver a la portada</Link>
        </p>

        <h1 style={{ marginTop: 24 }}>Política de privacidad</h1>
        <p>Última actualización: [fecha]</p>

        <h2>Quién es el responsable</h2>
        <p>
          {SITE.nombre}. {SITE.estatus}.
          {SITE.registro && ` Registro de mediadores nº ${SITE.registro}.`}{" "}
          Correo de contacto: {SITE.email}. Teléfono: {SITE.telefono}.
        </p>

        <h2>Qué datos tratamos</h2>
        <p>
          Cuando pides presupuesto, tratamos: nombre, apellidos, localidad,
          código postal, fecha de nacimiento, correo electrónico, número de
          móvil, el seguro que te interesa y tu consentimiento. No tratamos
          datos de salud a través de este formulario.
        </p>

        <h2>Para qué los usamos</h2>
        <p>
          Para contactarte por WhatsApp o teléfono, preparar la comparativa de
          seguros que has pedido y resolver tus dudas sobre ella.
        </p>

        <h2>Base legal</h2>
        <p>
          Tu consentimiento, que das marcando la casilla del formulario y que
          puedes retirar en cualquier momento.
        </p>

        <h2>Quién más accede a tus datos</h2>
        <ul>
          <li>
            Supabase, que aloja la base de datos en la Unión Europea (región
            Irlanda).
          </li>
          <li>Vercel, que aloja la web.</li>
          <li>
            La aseguradora con la que tramitas la póliza, solo si decides
            contratar.
          </li>
        </ul>

        <h2>Cuánto tiempo los conservamos</h2>
        <p>
          Mientras dure la gestión de tu solicitud o hasta que retires tu
          consentimiento. [Indicar plazo concreto tras revisión legal.]
        </p>

        <h2>Tus derechos</h2>
        <p>
          Puedes pedir acceso, rectificación, supresión, limitación, oposición
          y portabilidad escribiendo a {SITE.email}. También puedes reclamar
          ante la Agencia Española de Protección de Datos (aepd.es).
        </p>

        <h2>Cookies</h2>
        <p>
          [Completar según las cookies que use la web. Esta versión no usa
          cookies propias de publicidad.]
        </p>

        <p style={{ marginTop: 48, fontSize: "0.9rem" }}>
          Texto orientativo. Revísalo con un profesional antes de publicarlo.
        </p>
      </div>
    </main>
  );
}
