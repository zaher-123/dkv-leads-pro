import { z } from "zod";
import { formOptions } from "@/lib/config";

// Los valores válidos salen de formOptions en config.ts, para no duplicar la lista.
const PRODUCTOS = formOptions.map((o) => o.value) as [string, ...string[]];
export const ORIGENES = ["instagram", "linkedin", "otro", "directo"] as const;

// Calcula la edad en años a partir de una fecha ISO "YYYY-MM-DD". Se exporta para que
// el panel de administración pueda mostrar la misma edad que valida este esquema.
export function calcularEdad(fechaISO: string, ahora: Date = new Date()) {
  const nacimiento = new Date(`${fechaISO}T00:00:00`);
  let edad = ahora.getFullYear() - nacimiento.getFullYear();
  const diferenciaMeses = ahora.getMonth() - nacimiento.getMonth();
  if (diferenciaMeses < 0 || (diferenciaMeses === 0 && ahora.getDate() < nacimiento.getDate())) {
    edad -= 1;
  }
  return edad;
}

// Esquema compartido por el formulario y por el servidor.
// Solo pide datos de contacto y datos básicos. Nunca datos de salud.
export const leadSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre.")
    .max(100, "El nombre es demasiado largo."),
  apellidos: z
    .string()
    .trim()
    .min(2, "Escribe tus apellidos.")
    .max(100, "Los apellidos son demasiado largos."),
  localidad: z
    .string()
    .trim()
    .min(2, "Escribe tu localidad.")
    .max(100, "La localidad es demasiado larga."),
  codigo_postal: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "El código postal tiene 5 cifras."),
  fecha_nacimiento: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Indica tu fecha de nacimiento.")
    .refine((v) => !Number.isNaN(new Date(`${v}T00:00:00`).getTime()), "Fecha no válida.")
    .refine((v) => calcularEdad(v) >= 18, "Tienes que ser mayor de edad.")
    .refine((v) => calcularEdad(v) <= 99, "Revisa la fecha de nacimiento."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Introduce un correo electrónico válido."),
  whatsapp: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s.-]/g, ""))
    .refine((v) => /^(?:\+?34)?[67]\d{8}$/.test(v), "Introduce un móvil español válido."),
  producto: z.enum(PRODUCTOS, { message: "Elige un seguro." }),
  origen: z.enum(ORIGENES).catch("directo"),
  consentimiento: z.literal(true, {
    message: "Necesitamos tu consentimiento para contactarte.",
  }),
  // Campo trampa anti-spam. Los humanos lo dejan vacío. La ruta decide qué hacer si llega con texto.
  web: z.string().optional().default(""),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;

// Normaliza el móvil a 9 dígitos, sin prefijo.
export function normalizarWhatsapp(valor: string) {
  return valor.replace(/\D/g, "").replace(/^34/, "").slice(-9);
}

// Convierte utm_source en uno de los orígenes permitidos.
export function normalizarOrigen(valor: string | null | undefined) {
  const v = (valor ?? "").trim().toLowerCase();
  if (v.includes("instagram") || v === "ig") return "instagram";
  if (v.includes("linkedin")) return "linkedin";
  if (v) return "otro";
  return "directo";
}
