import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { leadSchema, normalizarTelefono } from "@/lib/validation";

export const runtime = "nodejs";

// Cliente con la clave publicable. La tabla solo permite INSERT al rol anon.
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_PUBLISHABLE_KEY!,
  { auth: { persistSession: false } },
);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Petición no válida." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const mensaje = parsed.error.issues[0]?.message ?? "Revisa los datos del formulario.";
    return NextResponse.json({ error: mensaje }, { status: 422 });
  }

  // Si el campo trampa tiene contenido, es un bot. Respondemos como si todo fuera bien.
  if (parsed.data.web) {
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase.from("leads").insert({
    nombre: parsed.data.nombre,
    apellidos: parsed.data.apellidos,
    localidad: parsed.data.localidad,
    codigo_postal: parsed.data.codigo_postal,
    fecha_nacimiento: parsed.data.fecha_nacimiento,
    email: parsed.data.email,
    telefono: normalizarTelefono(parsed.data.telefono),
    producto: parsed.data.producto,
    utm_source: parsed.data.utm_source,
    consentimiento: parsed.data.consentimiento,
  });

  if (error) {
    // No devolvemos el detalle del error al cliente.
    console.error("Error al guardar lead:", error.message);
    return NextResponse.json(
      { error: "No hemos podido enviar tu solicitud. Inténtalo de nuevo en unos minutos." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
