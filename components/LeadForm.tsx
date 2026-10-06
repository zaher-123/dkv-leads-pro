"use client";

import { useState, type FormEvent } from "react";
import { leadSchema, normalizarOrigen } from "@/lib/validation";
import { formOptions } from "@/lib/config";

type Estado = "inicial" | "enviando" | "ok" | "error";

export default function LeadForm() {
  const [estado, setEstado] = useState<Estado>("inicial");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [mensaje, setMensaje] = useState("");

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const form = evento.currentTarget;
    const datos = new FormData(form);

    // utm_source llega en la URL de la campaña. Se lee al enviar, no al pintar.
    const origen = normalizarOrigen(new URLSearchParams(window.location.search).get("utm_source"));

    const entrada = {
      nombre: datos.get("nombre"),
      whatsapp: datos.get("whatsapp"),
      edad: datos.get("edad"),
      cp: datos.get("cp"),
      producto: datos.get("producto"),
      origen,
      consentimiento: datos.get("consentimiento") === "on" ? true : undefined,
      web: datos.get("web"),
    };

    // Validación en cliente para mostrar el primer error junto a cada campo.
    const check = leadSchema.safeParse(entrada);
    if (!check.success) {
      const nuevos: Record<string, string> = {};
      for (const issue of check.error.issues) {
        const campo = String(issue.path[0]);
        if (!nuevos[campo]) nuevos[campo] = issue.message;
      }
      setErrores(nuevos);
      setMensaje("Revisa los campos marcados.");
      setEstado("error");
      return;
    }

    setErrores({});
    setEstado("enviando");
    setMensaje("");

    try {
      const respuesta = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entrada),
      });
      const cuerpo = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) {
        setMensaje(cuerpo.error ?? "No hemos podido enviar tu solicitud.");
        setEstado("error");
        return;
      }

      form.reset();
      setEstado("ok");
    } catch {
      setMensaje("Sin conexión. Revisa tu red e inténtalo de nuevo.");
      setEstado("error");
    }
  }

  if (estado === "ok") {
    return (
      <div className="formulario" role="status">
        <h3 className="formulario__titulo">Solicitud recibida</h3>
        <p className="exito" style={{ marginTop: 16 }}>
          Gracias. Te contactaré por WhatsApp o teléfono para explicarte las opciones.
        </p>
      </div>
    );
  }

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <div className="campos">
        <div className="campo">
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder=" "
            autoComplete="given-name"
            aria-invalid={!!errores.nombre}
            aria-describedby={errores.nombre ? "err-nombre" : undefined}
          />
          <label htmlFor="nombre">Nombre</label>
          {errores.nombre && <p id="err-nombre" className="error">{errores.nombre}</p>}
        </div>

        <div className="campo">
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            placeholder=" "
            autoComplete="tel"
            aria-invalid={!!errores.whatsapp}
            aria-describedby={errores.whatsapp ? "err-whatsapp" : undefined}
          />
          <label htmlFor="whatsapp">Móvil con WhatsApp</label>
          {errores.whatsapp && <p id="err-whatsapp" className="error">{errores.whatsapp}</p>}
        </div>

        <div className="grupo--fila">
          <div className="campo">
            <input
              id="edad"
              name="edad"
              type="number"
              inputMode="numeric"
              min={18}
              max={99}
              placeholder=" "
              aria-invalid={!!errores.edad}
              aria-describedby={errores.edad ? "err-edad" : undefined}
            />
            <label htmlFor="edad">Edad</label>
            {errores.edad && <p id="err-edad" className="error">{errores.edad}</p>}
          </div>
          <div className="campo">
            <input
              id="cp"
              name="cp"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder=" "
              aria-invalid={!!errores.cp}
              aria-describedby={errores.cp ? "err-cp" : undefined}
            />
            <label htmlFor="cp">Código postal</label>
            {errores.cp && <p id="err-cp" className="error">{errores.cp}</p>}
          </div>
        </div>

        <fieldset className="opciones" aria-describedby={errores.producto ? "err-producto" : undefined}>
          <legend className="etiqueta">¿Qué te interesa?</legend>
          {formOptions.map((opcion) => (
            <label key={opcion.value}>
              <input type="radio" name="producto" value={opcion.value} />
              {opcion.label}
            </label>
          ))}
          {errores.producto && <p id="err-producto" className="error">{errores.producto}</p>}
        </fieldset>

        <div className="consentimiento">
          <input
            id="consentimiento"
            name="consentimiento"
            type="checkbox"
            aria-invalid={!!errores.consentimiento}
          />
          <label htmlFor="consentimiento">
            He leído y acepto la <a href="/privacidad">política de privacidad</a> y consiento que traten mis datos para contactarme sobre el seguro que he solicitado.
          </label>
        </div>
        {errores.consentimiento && <p className="error">{errores.consentimiento}</p>}

        {/* Campo trampa: los humanos no lo ven, los bots suelen rellenarlo. */}
        <div className="campo-trampa" aria-hidden="true">
          <label htmlFor="web">Web</label>
          <input id="web" name="web" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button className="boton boton--bloque" type="submit" disabled={estado === "enviando"}>
          {estado === "enviando" ? "Enviando…" : "Pedir presupuesto"}
        </button>

        {estado === "error" && mensaje && (
          <p className="error" role="alert">{mensaje}</p>
        )}
      </div>
    </form>
  );
}
