import { z } from "zod";
import { formOptions } from "@/lib/config";

// Los valores válidos salen de formOptions en config.ts, para no duplicar la lista.
const PRODUCTOS = formOptions.map((o) => o.value) as [string, ...string[]];
export const ORIGENES = ["instagram", "linkedin", "otro", "directo"] as const;

// Esquema compartido por el formulario y por el servidor.
// Solo pide datos de contacto y datos básicos. Nunca datos de salud.
export const leadSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre.")
    .max(100, "El nombre es demasiado largo."),
  whatsapp: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s.-]/g, ""))
    .refine((v) => /^(?:\+?34)?[67]\d{8}$/.test(v), "Introduce un móvil español válido."),
  edad: z.coerce
    .number({ message: "Indica tu edad." })
    .int("La edad debe ser un número entero.")
    .min(18, "Tienes que ser mayor de edad.")
    .max(99, "Revisa la edad."),
  cp: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "El código postal tiene 5 cifras."),
  producto: z.enum(PRODUCTOS, { message: "Elige un producto." }),
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
