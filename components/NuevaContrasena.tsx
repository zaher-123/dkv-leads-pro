"use client";

import { useEffect, useState, type FormEvent } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

const LONGITUD_MINIMA = 8;

// Se monta en el layout. Cuando el enlace del correo de recuperación inicia sesión, muestra el formulario de nueva contraseña.
export default function NuevaContrasena() {
  const [abierto, setAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [hecho, setHecho] = useState(false);

  useEffect(() => {
    // El evento puede llegar antes de que este componente se monte, así que también miramos el hash de la URL.
    // Se mira ahora, antes de que Supabase lo limpie, y se aplica en una microtarea para no hacer setState dentro del efecto.
    if (window.location.hash.includes("type=recovery")) queueMicrotask(() => setAbierto(true));

    const { data: suscripcion } = supabaseBrowser.auth.onAuthStateChange((evento) => {
      if (evento === "PASSWORD_RECOVERY") setAbierto(true);
    });
    return () => suscripcion.subscription.unsubscribe();
  }, []);

  async function guardar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    const datos = new FormData(formulario);
    const nueva = String(datos.get("password") ?? "");
    const repetida = String(datos.get("confirmar") ?? "");

    if (nueva.length < LONGITUD_MINIMA) {
      setError(`La contraseña debe tener al menos ${LONGITUD_MINIMA} caracteres.`);
      return;
    }
    if (nueva !== repetida) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setEnviando(true);
    setError("");
    const { error: errorUpdate } = await supabaseBrowser.auth.updateUser({ password: nueva });
    setEnviando(false);

    if (errorUpdate) {
      setError("No se pudo cambiar la contraseña. Si el enlace ha caducado, pide uno nuevo.");
      return;
    }

    formulario.reset();
    setHecho(true);
    // Quita los tokens del enlace de la URL para que no se queden visibles.
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  function cerrar() {
    setAbierto(false);
    setHecho(false);
    setError("");
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  if (!abierto) return null;

  return (
    <div className="nueva-contrasena" role="dialog" aria-modal="true" aria-labelledby="nueva-contrasena-titulo">
      <form className="formulario nueva-contrasena__caja" onSubmit={guardar}>
        <h1 className="formulario__titulo" id="nueva-contrasena-titulo">
          Nueva contraseña
        </h1>
        {hecho ? (
          <div className="campos">
            <p className="exito" role="status">Contraseña actualizada. Ya puedes usarla para entrar.</p>
            <button className="boton boton--bloque" type="button" onClick={cerrar}>
              Continuar
            </button>
          </div>
        ) : (
          <div className="campos">
            <div className="campo">
              <input id="nueva-password" name="password" type="password" placeholder=" " autoComplete="new-password" minLength={LONGITUD_MINIMA} required />
              <label htmlFor="nueva-password">Nueva contraseña</label>
            </div>
            <div className="campo">
              <input id="confirmar-password" name="confirmar" type="password" placeholder=" " autoComplete="new-password" minLength={LONGITUD_MINIMA} required />
              <label htmlFor="confirmar-password">Repite la contraseña</label>
            </div>
            <button className="boton boton--bloque" type="submit" disabled={enviando}>
              {enviando ? "Guardando…" : "Guardar contraseña"}
            </button>
            <button className="boton boton--linea boton--pequeno" type="button" onClick={cerrar} disabled={enviando}>
              Cerrar
            </button>
            {error && <p className="error" role="alert">{error}</p>}
          </div>
        )}
      </form>
    </div>
  );
}
