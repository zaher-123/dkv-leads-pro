import Contador from "@/components/Contador";
import IconoProducto from "@/components/IconoProducto";
import LeadForm from "@/components/LeadForm";
import { SITE, TEXTOS, WHATSAPP_URL, cifras, precioTexto, productos } from "@/lib/config";

const anio = new Date().getFullYear();

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="contenedor">
          <a href="#inicio" className="nav__marca">
            {SITE.nombre}
          </a>
          <nav className="nav__enlaces" aria-label="Principal">
            <a href="#productos">Seguros</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#preguntas">Preguntas</a>
          </nav>
          <a href="#presupuesto" className="boton boton--pequeno">
            Hablemos
          </a>
        </div>
      </header>

      <main>
        {/* 1. Hero: claro, con gradiente de azul a blanco */}
        <section className="seccion hero" id="inicio">
          <div className="contenedor">
            <h1 className="titular titular--xl reveal">{TEXTOS.hero.titular}</h1>
            <p className="subtitular reveal">{TEXTOS.hero.subtitulo}</p>

            <div className="hero__acciones reveal">
              <a href={WHATSAPP_URL} className="boton" target="_blank" rel="noopener noreferrer">
                Escríbeme por WhatsApp
              </a>
              <a href="#presupuesto" className="boton boton--linea">
                Pedir presupuesto
              </a>
            </div>

            <p className="hero__legal">{SITE.estatus}</p>
          </div>
        </section>

        {/* 2. Productos: oscuro */}
        <section className="seccion seccion--oscuro parallax" id="productos">
          <div className="contenedor">
            <h2 className="titular reveal">{TEXTOS.productos.titulo}</h2>
            <p className="subtitular reveal">{TEXTOS.productos.subtitulo}</p>

            <div className="productos">
              {productos.map((producto) => (
                <article
                  key={producto.id}
                  className={`tarjeta tarjeta--${producto.fondo} reveal`}
                >
                  <IconoProducto nombre={producto.icono} color={producto.colorIcono} />
                  <h3>{producto.nombre}</h3>
                  <p>{producto.descripcion}</p>
                  <ul className="lista">
                    {producto.lista.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="tarjeta__precio">{precioTexto(producto.price)}</p>
                  <a href="#presupuesto" className="boton boton--linea tarjeta__accion">
                    Pedir presupuesto
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Cifras: claro */}
        <section className="seccion seccion--claro">
          <div className="contenedor">
            <ul className="cifras">
              {cifras.map((cifra) => (
                <li key={cifra.etiqueta} className="cifra reveal">
                  <p className="cifra__valor">
                    {"valor" in cifra ? (
                      <>
                        <Contador valor={cifra.valor} />
                        {cifra.sufijo}
                      </>
                    ) : (
                      cifra.texto
                    )}
                  </p>
                  <p className="cifra__etiqueta">{cifra.etiqueta}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. Cómo funciona: oscuro */}
        <section className="seccion seccion--oscuro" id="como-funciona">
          <div className="contenedor">
            <h2 className="titular reveal">{TEXTOS.pasos.titulo}</h2>
            <div className="pasos">
              {TEXTOS.pasos.lista.map((paso, indice) => (
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

        {/* 5. Formulario: claro */}
        <section className="seccion seccion--claro" id="presupuesto">
          <div className="contenedor">
            <h2 className="titular reveal">{TEXTOS.formulario.titulo}</h2>
            <p className="subtitular reveal">{TEXTOS.formulario.subtitulo}</p>
            <div className="reveal formulario-wrap">
              <LeadForm />
            </div>
          </div>
        </section>

        {/* 6. Independencia: oscuro */}
        <section className="seccion seccion--oscuro">
          <div className="contenedor reveal">
            <h2 className="titular">{TEXTOS.independencia.titulo}</h2>
            <p className="independencia__texto">{TEXTOS.independencia.texto}</p>
          </div>
        </section>

        {/* 7. Preguntas: claro */}
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

        {/* 8. Cierre: oscuro */}
        <section className="seccion seccion--oscuro cierre">
          <div className="contenedor reveal">
            <h2 className="titular">{TEXTOS.cierre}</h2>
            <a href="#presupuesto" className="boton">
              Pedir presupuesto
            </a>
          </div>
        </section>
      </main>

      <footer className="pie">
        <div className="contenedor">
          <p>
            {SITE.nombre}. {SITE.estatus}.
          </p>
          {SITE.registro && <p>Registro de mediadores nº {SITE.registro}.</p>}
          <p>
            No soy DKV ni actúo en su nombre. Las coberturas y condiciones dependen de cada póliza.
          </p>
          <div className="pie__enlaces">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.telefono.replace(/\s/g, "")}`}>{SITE.telefono}</a>
            <a href="/privacidad">Política de privacidad</a>
          </div>
          <p>© {anio} {SITE.nombre}</p>
        </div>
      </footer>
    </>
  );
}
