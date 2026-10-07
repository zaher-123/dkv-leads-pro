import {
  Ambulance,
  BriefcaseMedical,
  Car,
  Coins,
  Flower2,
  House,
  Smartphone,
  Smile,
  Stethoscope,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

// Nombres de icono que pueden aparecer en config.ts (productos[].icono, barraConfianza[].icono).
const ICONOS: Record<string, LucideIcon> = {
  Users,
  User,
  Flower2,
  BriefcaseMedical,
  Smile,
  Ambulance,
  House,
  Coins,
  Smartphone,
  Stethoscope,
  Car,
};

export default function IconoProducto({
  nombre,
  color,
  size = 48,
}: {
  nombre: string;
  color: string;
  size?: number;
}) {
  const Icono = ICONOS[nombre];
  if (!Icono) return null;
  return <Icono size={size} color={color} strokeWidth={1.75} aria-hidden="true" />;
}
