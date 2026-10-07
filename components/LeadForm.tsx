"use client";

import { useState, type FormEvent } from "react";
import { leadSchema, normalizarOrigen } from "@/lib/validation";
import { formOptions, TEXTOS } from "@/lib/config";

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
      apellidos: datos.get("apellidos"),
      localidad: datos.get("localidad"),
      codigo_postal: datos.get("codigo_postal"),
      fecha_nacimiento: datos.get("fecha_nacimiento"),
      email: datos.get("email"),
      whatsapp: datos.get("whatsapp"),
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
        <div className="grupo--fila">
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
              id="apellidos"
              name="apellidos"
              type="text"
              placeholder=" "
              autoComplete="family-name"
              aria-invalid={!!errores.apellidos}
              aria-describedby={errores.apellidos ? "err-apellidos" : undefined}
            />
            <label htmlFor="apellidos">Apellidos</label>
            {errores.apellidos && <p id="err-apellidos" className="error">{errores.apellidos}</p>}
          </div>
        </div>

        <p className="etiqueta">Dónde vives</p>
        <div className="grupo--fila">
          <div className="campo">
            <input
              id="localidad"
              name="localidad"
              type="text"
              placeholder=" "
              autoComplete="address-level2"
              aria-invalid={!!errores.localidad}
              aria-describedby={errores.localidad ? "err-localidad" : undefined}
            />
            <label htmlFor="localidad">Localidad</label>
            {errores.localidad && <p id="err-localidad" className="error">{errores.localidad}</p>}
          </div>
          <div className="campo">
            <input
              id="codigo_postal"
              name="codigo_postal"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder=" "
              aria-invalid={!!errores.codigo_postal}
              aria-describedby={errores.codigo_postal ? "err-codigo_postal" : undefined}
            />
            <label htmlFor="codigo_postal">Código postal</label>
            {errores.codigo_postal && <p id="err-codigo_postal" className="error">{errores.codigo_postal}</p>}
          </div>
        </div>

        <div className="campo">
          <input
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            type="date"
            autoComplete="bday"
            placeholder=" "
            aria-invalid={!!errores.fecha_nacimiento}
            aria-describedby={errores.fecha_nacimiento ? "err-fecha_nacimiento" : undefined}
          />
          <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
          {errores.fecha_nacimiento && (
            <p id="err-fecha_nacimiento" className="error">{errores.fecha_nacimiento}</p>
          )}
        </div>

        <div className="campo">
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            placeholder=" "
            autoComplete="email"
            aria-invalid={!!errores.email}
            aria-describedby={errores.email ? "err-email" : undefined}
          />
          <label htmlFor="email">Correo electrónico</label>
          {errores.email && <p id="err-email" className="error">{errores.email}</p>}
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

        <fieldset className="opciones" aria-describedby={errores.producto ? "err-producto" : undefined}>
          <legend className="etiqueta">¿Qué seguro te interesa?</legend>
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
          {estado === "enviando" ? "Enviando…" : TEXTOS.formulario.boton}
        </button>

        <p className="hero__legal" style={{ textAlign: "left", marginTop: 4 }}>
          {TEXTOS.formulario.microtexto}
        </p>

        {estado === "error" && mensaje && (
          <p className="error" role="alert">{mensaje}</p>
        )}
      </div>
    </form>
  );
}
