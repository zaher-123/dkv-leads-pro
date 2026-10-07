"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { formOptions } from "@/lib/config";
import { calcularEdad } from "@/lib/validation";

const ESTADOS = ["nuevo", "contactado", "propuesta", "cerrado"] as const;
type Estado = (typeof ESTADOS)[number];

type Lead = {
  id: string;
  nombre: string;
  apellidos: string;
  localidad: string;
  codigo_postal: string;
  fecha_nacimiento: string;
  email: string;
  telefono: string;
  producto: string;
  utm_source: string;
  estado: Estado;
  created_at: string;
};

const ETIQUETA_PRODUCTO = Object.fromEntries(formOptions.map((o) => [o.value, o.label]));

// Compara el día en la zona horaria de Madrid, no en la del navegador.
function esHoyEnMadrid(iso: string) {
  const formato = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formato.format(new Date(iso)) === formato.format(new Date());
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [listo, setListo] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    let activo = true;
    supabaseBrowser.auth.getSession().then(({ data }) => {
      if (!activo) return;
      setSession(data.session);
      setListo(true);
    });
    const { data: suscripcion } = supabaseBrowser.auth.onAuthStateChange((_evento, nueva) => {
      setSession(nueva);
    });
    return () => {
      activo = false;
      suscripcion.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) return;
    let activo = true;
    supabaseBrowser
      .from("leads")
      .select(
        "id, nombre, apellidos, localidad, codigo_postal, fecha_nacimiento, email, telefono, producto, utm_source, estado, created_at",
      )
      .order("created_at", { ascending: false })
      .then(({ data, error: errorCarga }) => {
        if (!activo) return;
        if (errorCarga) {
          setError("No se pudieron cargar los leads.");
          return;
        }
        setLeads((data ?? []) as Lead[]);
      });
    return () => {
      activo = false;
    };
  }, [session]);

  const metricas = useMemo(() => {
    const total = leads.length;
    const nuevosHoy = leads.filter((l) => esHoyEnMadrid(l.created_at)).length;
    const cerrados = leads.filter((l) => l.estado === "cerrado").length;
    const conversion = total ? Math.round((cerrados / total) * 100) : 0;
    return { total, nuevosHoy, conversion };
  }, [leads]);

  async function entrar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEnviando(true);
    setError("");
    const datos = new FormData(evento.currentTarget);
    try {
      const { error: errorLogin } = await supabaseBrowser.auth.signInWithPassword({
        email: String(datos.get("email") ?? "").trim(),
        password: String(datos.get("password") ?? ""),
      });
      if (errorLogin) {
        // Error exacto de Supabase: mensaje, código y estado HTTP, sin ocultarlos.
        console.error("Error de login de Supabase:", errorLogin);
        setError(
          `Supabase devolvió: "${errorLogin.message}" (código: ${errorLogin.code ?? "sin código"}, estado HTTP: ${errorLogin.status ?? "sin estado"}).`,
        );
      }
    } catch (excepcion) {
      // Fallos antes de recibir respuesta, como red bloqueada o CORS.
      console.error("Excepción al llamar a Supabase:", excepcion);
      setError(
        `No se pudo contactar con Supabase: ${excepcion instanceof Error ? excepcion.message : String(excepcion)}.`,
      );
    } finally {
      setEnviando(false);
    }
  }

  async function salir() {
    await supabaseBrowser.auth.signOut();
    setLeads([]);
  }

  async function cambiarEstado(id: string, estado: Estado) {
    const anterior = leads;
    setLeads((previos) => previos.map((l) => (l.id === id ? { ...l, estado } : l)));
    const { error: errorUpdate } = await supabaseBrowser
      .from("leads")
      .update({ estado })
      .eq("id", id);
    if (errorUpdate) {
      setLeads(anterior);
      setError("No se pudo guardar el cambio de estado.");
    }
  }

  if (!listo) {
    return (
      <main className="admin">
        <p>Cargando…</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="admin admin--login">
        <form className="formulario admin__login" onSubmit={entrar}>
          <h1 className="formulario__titulo">Acceso al panel</h1>
          <div className="campos">
            <div className="campo">
              <input id="email" name="email" type="email" placeholder=" " autoComplete="username" required />
              <label htmlFor="email">Correo</label>
            </div>
            <div className="campo">
              <input id="password" name="password" type="password" placeholder=" " autoComplete="current-password" required />
              <label htmlFor="password">Contraseña</label>
            </div>
            <button className="boton boton--bloque" type="submit" disabled={enviando}>
              {enviando ? "Entrando…" : "Entrar"}
            </button>
            {error && <p className="error" role="alert">{error}</p>}
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className="admin">
      <div className="contenedor">
        <header className="admin__cabecera">
          <h1>Leads</h1>
          <button className="boton boton--linea boton--pequeno" type="button" onClick={salir}>
            Salir
          </button>
        </header>

        <section className="admin__metricas" aria-label="Resumen">
          <article className="admin__metrica">
            <p className="admin__valor">{metricas.total}</p>
            <p className="admin__etiqueta">Total de leads</p>
          </article>
          <article className="admin__metrica">
            <p className="admin__valor">{metricas.nuevosHoy}</p>
            <p className="admin__etiqueta">Nuevos hoy</p>
          </article>
          <article className="admin__metrica">
            <p className="admin__valor">{metricas.conversion}%</p>
            <p className="admin__etiqueta">Conversión (cerrados)</p>
          </article>
        </section>

        {error && <p className="error" role="alert">{error}</p>}

        <div className="admin__tabla-wrap">
          <table className="admin__tabla">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Localidad</th>
                <th>CP</th>
                <th>Nacimiento</th>
                <th>Edad</th>
                <th>Producto</th>
                <th>UTM</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td>{new Date(l.created_at).toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}</td>
                  <td>{l.nombre}</td>
                  <td>{l.apellidos}</td>
                  <td>
                    <a href={`https://wa.me/34${l.telefono}`} target="_blank" rel="noopener noreferrer">
                      {l.telefono}
                    </a>
                  </td>
                  <td>
                    <a href={`mailto:${l.email}`}>{l.email}</a>
                  </td>
                  <td>{l.localidad}</td>
                  <td>{l.codigo_postal}</td>
                  <td>{new Date(`${l.fecha_nacimiento}T00:00:00`).toLocaleDateString("es-ES")}</td>
                  <td>{calcularEdad(l.fecha_nacimiento)}</td>
                  <td>{ETIQUETA_PRODUCTO[l.producto] ?? l.producto}</td>
                  <td>{l.utm_source}</td>
                  <td>
                    <select
                      aria-label={`Estado de ${l.nombre}`}
                      value={l.estado}
                      onChange={(e) => cambiarEstado(l.id, e.target.value as Estado)}
                    >
                      {ESTADOS.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={12}>Todavía no hay leads.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
