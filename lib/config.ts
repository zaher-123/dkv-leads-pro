// Datos, colores y textos editables del sitio. Cambia aquí, no en los componentes.

export const SITE = {
  nombre: "Beatriz Gutierrez",
  estatus: "Mediadora de seguros vinculada a DKV",
  // Número de registro del mediador (DGSFP). Si está vacío, el pie muestra "[pendiente]".
  registro: "",
  // Contacto visible en la web. El enlace de WhatsApp usa solo los dígitos.
  // PLACEHOLDER: sustituir por el correo real antes de publicar a producción.
  email: "[correo@tudominio.es]",
  // PLACEHOLDER: sustituir por el teléfono real antes de publicar a producción.
  telefono: "[600 000 000]",
  // PLACEHOLDER: sustituir por el número real de WhatsApp antes de publicar a producción.
  whatsappNumero: "34600000000",
  // PLACEHOLDER: dominio público con https://, usado en metadatos. Sustituir antes de publicar.
  url: "https://ejemplo.es",
  // Ruta de la foto de Beatriz, por ejemplo "/beatriz.jpg". Vacía = el hueco no se muestra.
  // La marca pide no usar fotos ni vídeos de Beatriz, así que se queda vacía a propósito.
  foto: "",
  // Línea única del pie. Si falta el nº de registro, se muestra "[pendiente]".
  get legalTexto() {
    return `Beatriz Gutierrez · Mediadora de seguros vinculada a DKV · Registro DGSFP nº ${
      this.registro || "[pendiente]"
    }`;
  },
};

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsappNumero}`;

// Colores de marca.
export const VERDE_BOSQUE = "#0B3B2E"; // titulares, fondos oscuros, botón principal
export const VERDE_OLIVA = "#5F7F20"; // botón secundario (contorno)
export const VERDE_LIMON = "#8DB600"; // acento: solo iconos/etiquetas sobre fondo oscuro, nunca texto sobre blanco
export const CREMA = "#F6F3EC"; // fondo de secciones claras y del pie

export function precioTexto(price: number | null) {
  return price === null ? "Presupuesto personalizado" : `Desde ${price} €/mes`;
}

// Productos de la sección. fondo alterna claro y oscuro. price: null = "Presupuesto personalizado"
// (no se muestra en la landing actual, se conserva por si se reactiva). colorIcono usa bosque
// en tarjetas claras y limón en tarjetas oscuras: son las dos combinaciones con contraste AA
// comprobado para esos fondos.
export const productos = [
  {
    id: "salud_familiar",
    nombre: "Salud familiar",
    descripcion:
      "Cobertura médica para toda la familia, con acceso a especialistas y pruebas diagnósticas.",
    icono: "Users",
    colorIcono: VERDE_BOSQUE,
    fondo: "claro",
    price: null as number | null,
    lista: [
      "Red de médicos y centros concertados",
      "Especialistas y pruebas diagnósticas",
      "Hospitalización y cirugía según póliza",
    ],
  },
  {
    id: "salud_individual",
    nombre: "Salud individual",
    descripcion:
      "Cobertura médica para una sola persona, con la misma red de centros concertados.",
    icono: "User",
    colorIcono: VERDE_LIMON,
    fondo: "oscuro",
    price: null as number | null,
    lista: [
      "Red de médicos y centros concertados",
      "Especialistas y pruebas diagnósticas",
      "Hospitalización según póliza",
    ],
  },
  {
    id: "decesos",
    nombre: "Decesos",
    descripcion:
      "Servicio funerario y gestiones para tu familia, con una cuota fija que no depende de tu salud.",
    icono: "Flower2",
    colorIcono: VERDE_BOSQUE,
    fondo: "claro",
    price: null as number | null,
    lista: [
      "Servicio funerario según póliza",
      "Cuota fija, mensual o anual",
      "Asistencia y gestiones tras el fallecimiento",
    ],
  },
  {
    id: "renta",
    nombre: "Renta y baja médica",
    descripcion:
      "Protege tus ingresos si una enfermedad o un accidente te impide trabajar durante un tiempo.",
    icono: "BriefcaseMedical",
    colorIcono: VERDE_LIMON,
    fondo: "oscuro",
    price: null as number | null,
    lista: [
      "Renta mensual según póliza",
      "Cobertura de baja médica según póliza",
      "Revisión de condiciones antes de contratar",
    ],
  },
  {
    id: "dental",
    nombre: "Dental",
    descripcion:
      "Revisiones, limpiezas y tratamientos dentales dentro de la red de clínicas concertadas.",
    icono: "Smile",
    colorIcono: VERDE_BOSQUE,
    fondo: "claro",
    price: null as number | null,
    lista: [
      "Revisiones y limpiezas",
      "Tratamientos según póliza",
      "Red de clínicas concertadas",
    ],
  },
  {
    id: "accidentes",
    nombre: "Accidentes",
    descripcion:
      "Indemnizaciones y asistencia por accidente, con las coberturas que recoja la póliza que elijas.",
    icono: "Ambulance",
    colorIcono: VERDE_LIMON,
    fondo: "oscuro",
    price: null as number | null,
    lista: [
      "Indemnización por invalidez permanente según póliza",
      "Asistencia en caso de accidente",
      "Gastos sanitarios por accidente según póliza",
    ],
  },
  {
    id: "hogar",
    nombre: "Hogar",
    descripcion:
      "Protege tu vivienda y tus bienes frente a daños, robo y responsabilidad civil.",
    icono: "House",
    colorIcono: VERDE_BOSQUE,
    fondo: "claro",
    price: null as number | null,
    lista: [
      "Daños en el hogar según póliza",
      "Robo y responsabilidad civil según póliza",
      "Asistencia en el hogar",
    ],
  },
] as const;

// Opciones del selector del formulario. El valor se guarda en la base de datos
// y coincide con el CHECK de Postgres: no cambiar estos "value" sin migrar la tabla.
export const formOptions = [
  { value: "salud_familiar", label: "Salud familiar" },
  { value: "salud_individual", label: "Salud individual" },
  { value: "decesos", label: "Decesos" },
  { value: "renta", label: "Renta y baja médica" },
  { value: "dental", label: "Dental" },
  { value: "accidentes", label: "Accidentes" },
  { value: "hogar", label: "Hogar" },
  { value: "no_sabe", label: "No lo sé todavía" },
] as const;

// Cifras en grande. Con "valor" se anima de 0 al número. Con "texto" se muestra tal cual.
export const cifras = [
  { valor: 0, sufijo: " €", etiqueta: "por mi asesoramiento" },
  { valor: 7, sufijo: " seguros", etiqueta: "para cubrir cada etapa de tu vida" },
  // Cifra de la red DKV: pendiente de confirmar con DKV antes de publicar. El valor de
  // momento es el que ha dado el cliente.
  { texto: "+51.000 / +1.000", etiqueta: "profesionales médicos y centros en toda España" },
] as const;

export const TEXTOS = {
  nav: {
    enlaces: [
      { href: "#productos", label: "Seguros" },
      { href: "#como-funciona", label: "Cómo funciona" },
      { href: "#preguntas", label: "Preguntas" },
    ],
    cta: "Hablemos",
  },
  hero: {
    titular: "El cuidado que merece tu tranquilidad.",
    subtitulo:
      "Te explico cada cobertura con calma y preparo tu presupuesto según tu edad y tu zona. Decides tú, con toda la información.",
    botonPrincipal: "Pedir mi presupuesto",
    botonSecundario: "Hablar por WhatsApp",
    microtexto: "Sin compromiso. Sin datos de salud.",
  },
  productos: {
    titulo: "Una protección para cada etapa.",
    subtitulo:
      "Salud, decesos, renta, dental, accidentes y hogar. Te digo cuál tiene sentido para ti y cuál no hace falta.",
    boton: "Pedir presupuesto",
  },
  confianza: {
    titulo: "Contigo antes, durante y después de contratar.",
    texto:
      "Mi trabajo es que entiendas lo que contratas. Te explico qué cubre cada póliza, qué no y cuánto costaría para ti, y sigo a tu lado cuando necesites hacer una gestión. Trabajo con DKV, así que conozco sus seguros a fondo. Mi asesoramiento no te cuesta nada: me remunera la aseguradora si contratas.",
  },
  pasos: {
    titulo: "Así funciona.",
    lista: [
      {
        titulo: "Cuéntame lo básico",
        texto: "Nombre, dónde vives, fecha de nacimiento y cómo contactarte. Sin datos de salud.",
      },
      {
        titulo: "Te explico y calculo tu presupuesto",
        texto: "Revisamos coberturas y precio según tu edad y tu zona.",
      },
      {
        titulo: "Decides con calma",
        texto: "Si te encaja, te acompaño con la contratación; si no, no pasa nada.",
      },
    ],
  },
  formulario: {
    titulo: "Cuéntame tu caso y te preparo un presupuesto.",
    subtitulo: "Rellénalo en dos minutos. Sin compromiso.",
    boton: "Pedir mi presupuesto",
    microtexto: "Sin compromiso. Solo uso tus datos para contactarte (ver política de privacidad).",
  },
  faq: {
    titulo: "Preguntas frecuentes.",
    lista: [
      {
        pregunta: "¿Me cuesta algo tu asesoramiento?",
        respuesta: "No. Lo paga la aseguradora si contratas; tú no pagas nada por él.",
      },
      {
        pregunta: "¿De qué depende el precio?",
        respuesta:
          "De tu edad, tu fecha de nacimiento, tu zona y la cobertura que elijas. Por eso preparo un presupuesto personal y no una cifra genérica.",
      },
      {
        pregunta: "¿Cuándo puedo usar el seguro?",
        respuesta:
          "Depende del producto y de las condiciones de la póliza. En tu propuesta te indico desde cuándo está activa cada cobertura y si hay carencias.",
      },
      {
        pregunta: "¿Qué datos necesitas?",
        respuesta:
          "Nombre y apellidos, dónde vives, fecha de nacimiento, correo y móvil. No te pido datos de salud en este formulario.",
      },
      {
        pregunta: "¿Qué haces con mis datos?",
        respuesta: "Los uso solo para prepararte el presupuesto y contactarte. Puedes pedirme que los borre cuando quieras.",
      },
      {
        pregunta: "¿Y si pido presupuesto y no contrato?",
        respuesta: "No pasa nada. Es sin compromiso.",
      },
    ],
  },
  cierre: {
    titulo: "Cuéntame tu caso. Yo hago el resto.",
    boton: "Pedir mi presupuesto",
    microtexto: "Sin compromiso. Sin datos de salud.",
  },
};
