import { createClient } from "@supabase/supabase-js";

// Cliente para el navegador. Solo usa la clave publicable: la protección la hacen las políticas RLS.
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  { auth: { persistSession: true, autoRefreshToken: true } },
);
