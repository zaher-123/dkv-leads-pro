import { BriefcaseMedical, Ambulance, Flower2, House, Smile, User, Users, type LucideIcon } from "lucide-react";

// Nombres de icono que pueden aparecer en config.ts (productos[].icono).
const ICONOS: Record<string, LucideIcon> = {
  Users,
  User,
  Flower2,
  BriefcaseMedical,
  Smile,
  Ambulance,
  House,
};

export default function IconoProducto({ nombre, color }: { nombre: string; color: string }) {
  const Icono = ICONOS[nombre];
  if (!Icono) return null;
  return <Icono size={48} color={color} strokeWidth={1.75} aria-hidden="true" />;
}
