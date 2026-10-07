import IconoProducto from "@/components/IconoProducto";
import LeadForm from "@/components/LeadForm";
import { SITE, TEXTOS, WHATSAPP_URL, barraConfianza, productos } from "@/lib/config";

const anio = new Date().getFullYear();
const destacados = productos.filter((p) => p.destacado);
const otros = productos.filter((p) => !p.destacado);

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="contenedor">
          <a href="#inicio" className="nav__marca">
            {SITE.nombre}
          </a>
          <nav className="nav__enlaces" aria-label="Principal">
            {TEXTOS.nav.enlaces.map((enlace) => (
              <a key={enlace.href} href={enlace.href}>
                {enlace.label}
              </a>
            ))}
          </nav>
          <a href="#presupuesto" className="boton boton--pequeno">
            {TEXTOS.nav.cta}
          </a>
        </div>
      </header>

      <main>
        {/* 1. Hero de impacto: directo al dolor del cliente */}
        <section className="seccion hero" id="inicio">
          <div className="contenedor">
            <h1 className="titular titular--xl reveal">{TEXTOS.hero.titular}</h1>
            <p className="subtitular reveal">{TEXTOS.hero.subtitulo}</p>

            <div className="hero__acciones reveal">
              <a href="#presupuesto" className="boton boton--grande">
                {TEXTOS.hero.boton}
              </a>
            </div>

            <ul className="micro-confianza reveal">
              {TEXTOS.hero.microConfianza.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 2. Barra de autoridad y confianza inmediata */}
        <section className="seccion seccion--claro seccion--compacta">
          <div className="contenedor">
            <ul className="confianza-barra">
              {barraConfianza.map((item) => (
                <li key={item.icono} className="confianza-item reveal">
                  <IconoProducto nombre={item.icono} color="var(--primary)" size={32} />
                  <p className="confianza-item__valor">{item.texto}</p>
                  {item.etiqueta && <p className="confianza-item__etiqueta">{item.etiqueta}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Dolor vs solución: por qué yo y no un comparador genérico */}
        <section className="seccion seccion--oscuro" id="como-ayudo">
          <div className="contenedor">
            <h2 className="titular reveal">{TEXTOS.dolorSolucion.titulo}</h2>
            <div className="pasos">
              {TEXTOS.dolorSolucion.pasos.map((paso, indice) => (
                <div key={paso.titulo} className="paso reveal">
                  <span className="paso__num" aria-hidden="true">
                    {indice + 1}
                  </span>
                  <h3>{paso.titulo}</h3>
                  <p>{paso.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Producto estrella: Salud, en primer plano */}
        <section className="seccion seccion--claro" id="seguro-salud">
          <div className="contenedor">
            <h2 className="titular reveal">{TEXTOS.productoEstrella.titulo}</h2>
            <p className="subtitular reveal">{TEXTOS.productoEstrella.subtitulo}</p>

            <div className="productos productos--estrella">
              {destacados.map((producto) => (
                <article key={producto.id} className="tarjeta tarjeta--claro tarjeta--estrella reveal">
                  <span className="tarjeta__insignia">Seguro estrella</span>
                  <IconoProducto nombre={producto.icono} color={producto.colorIcono} />
                  <h3>{producto.nombre}</h3>
                  <p>{producto.descripcion}</p>
                  <ul className="lista">
                    {producto.lista.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a href="#presupuesto" className="boton tarjeta__accion">
                    {TEXTOS.formulario.boton}
                  </a>
                </article>
              ))}
            </div>

            <h3 className="otros-seguros__titulo">{TEXTOS.otrosSeguros.titulo}</h3>
            <div className="productos productos--compactas">
              {otros.map((producto) => (
                <a key={producto.id} href="#presupuesto" className="tarjeta-compacta reveal">
                  <IconoProducto nombre={producto.icono} color={producto.colorIcono} size={28} />
                  <span>{producto.nombre}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Formulario de captación ultra-simple */}
        <section className="seccion seccion--claro" id="presupuesto">
          <div className="contenedor">
            <h2 className="titular reveal">{TEXTOS.formulario.titulo}</h2>
            <div className="reveal formulario-wrap">
              <LeadForm />
            </div>
          </div>
        </section>

        {/* 6. Preguntas frecuentes */}
        <section className="seccion seccion--claro" id="preguntas">
          <div className="contenedor">
            <h2 className="titular reveal">{TEXTOS.faq.titulo}</h2>
            <div className="faq reveal">
              {TEXTOS.faq.lista.map((item) => (
                <details key={item.pregunta}>
                  <summary>{item.pregunta}</summary>
                  <p>{item.respuesta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="pie">
        <div className="contenedor">
          <p>{SITE.legalTexto}</p>
          <div className="pie__enlaces">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.telefono.replace(/\s/g, "")}`}>{SITE.telefono}</a>
            <a href="/privacidad">Política de privacidad</a>
            <a href="/aviso-legal">Aviso legal</a>
          </div>
          <p>© {anio} {SITE.nombre}</p>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp: solo en móvil, siempre visible, para el lead caliente */}
      <a
        href={WHATSAPP_URL}
        className="boton whatsapp-flotante"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={TEXTOS.whatsappFlotante}
      >
        {TEXTOS.whatsappFlotante}
      </a>
    </>
  );
}
