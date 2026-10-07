// Datos, colores y textos editables del sitio. Cambia aquí, no en los componentes.

export const SITE = {
  nombre: "Beatriz Gutiérrez",
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
  foto: "",
  // Línea única del pie.
  get legalTexto() {
    return `${this.nombre} · Mediadora de seguros vinculada a DKV`;
  },
};

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsappNumero}`;

// Colores de marca. Verde limón solo para botones de acción y detalles clave (nunca texto
// de cuerpo); fondo general en blanco y crema.
export const VERDE_BOSQUE = "#0B3B2E"; // titulares, sección "dolor vs solución", texto sobre crema/blanco
export const VERDE_LIMON = "#8DB600"; // exclusivo de botones de acción y detalles clave
export const CREMA = "#F6F3EC"; // fondo general claro

export function precioTexto(price: number | null) {
  return price === null ? "Presupuesto personalizado" : `Desde ${price} €/mes`;
}

// Productos. "destacado" marca el producto estrella (Salud), que se pinta grande y primero;
// el resto se pinta en una franja compacta, en segundo plano. price: no se muestra en la
// landing actual, se conserva por si se reactiva.
export const productos = [
  {
    id: "salud_individual",
    nombre: "Salud individual",
    descripcion:
      "Cobertura médica completa para una sola persona, con acceso directo a especialistas y sin listas de espera.",
    icono: "User",
    colorIcono: VERDE_BOSQUE,
    fondo: "claro",
    destacado: true,
    price: null as number | null,
    lista: [
      "Red de médicos y centros concertados",
      "Especialistas y pruebas diagnósticas sin demoras",
      "Hospitalización según póliza",
    ],
  },
  {
    id: "salud_familiar",
    nombre: "Salud autónomos y familias",
    descripcion:
      "La misma cobertura médica para toda la familia o para ti como autónomo, con un precio que no sube cada año sin explicación.",
    icono: "Users",
    colorIcono: VERDE_BOSQUE,
    fondo: "claro",
    destacado: true,
    price: null as number | null,
    lista: [
      "Red de médicos y centros concertados",
      "Especialistas y pruebas diagnósticas",
      "Hospitalización y cirugía según póliza",
    ],
  },
  {
    id: "decesos",
    nombre: "Decesos",
    descripcion: "Servicio funerario con una cuota fija que no depende de tu salud.",
    icono: "Flower2",
    colorIcono: VERDE_BOSQUE,
    fondo: "claro",
    destacado: false,
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
    descripcion: "Protege tus ingresos si una enfermedad o un accidente te impide trabajar.",
    icono: "BriefcaseMedical",
    colorIcono: VERDE_BOSQUE,
    fondo: "claro",
    destacado: false,
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
    descripcion: "Revisiones, limpiezas y tratamientos en la red de clínicas concertadas.",
    icono: "Smile",
    colorIcono: VERDE_BOSQUE,
    fondo: "claro",
    destacado: false,
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
    descripcion: "Indemnización y asistencia si tienes un accidente, según tu póliza.",
    icono: "Ambulance",
    colorIcono: VERDE_BOSQUE,
    fondo: "claro",
    destacado: false,
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
    descripcion: "Protege tu vivienda y tus bienes frente a daños, robo y responsabilidad civil.",
    icono: "House",
    colorIcono: VERDE_BOSQUE,
    fondo: "claro",
    destacado: false,
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
  { value: "salud_individual", label: "Salud individual" },
  { value: "salud_familiar", label: "Salud autónomos y familias" },
  { value: "decesos", label: "Decesos" },
  { value: "renta", label: "Renta y baja médica" },
  { value: "dental", label: "Dental" },
  { value: "accidentes", label: "Accidentes" },
  { value: "hogar", label: "Hogar" },
  { value: "no_sabe", label: "No lo sé todavía" },
] as const;

// Barra de confianza inmediata, justo bajo el hero. "icono" usa el mismo mapa que los
// productos (components/IconoProducto.tsx).
export const barraConfianza = [
  { icono: "Coins", texto: "Asesoramiento experto y cercano", etiqueta: "" },
  { icono: "Smartphone", texto: "100%", etiqueta: "gestión digital o por WhatsApp" },
  // Cifra de la red DKV: pendiente de confirmar con DKV antes de publicar.
  { icono: "Stethoscope", texto: "+51.000 / 1.000", etiqueta: "profesionales médicos y centros concertados" },
] as const;

export const TEXTOS = {
  nav: {
    enlaces: [
      { href: "#seguro-salud", label: "Seguro de salud" },
      { href: "#como-ayudo", label: "Cómo te ayudo" },
      { href: "#preguntas", label: "Preguntas" },
    ],
    cta: "Hablemos",
  },
  hero: {
    titular: "¿Tu seguro de salud sube cada año sin motivo? Cámbiate a DKV sin perder antigüedad.",
    subtitulo:
      "Analizo tu situación actual, te explico las coberturas reales sin letra pequeña y busco la opción que mejor se adapte a ti. Sin compromiso.",
    boton: "Calcular mi cuota ideal",
    microConfianza: [
      "Asesoramiento 100% gratuito",
      "Sin llamadas spam",
      "Te atiendo personalmente",
    ],
  },
  dolorSolucion: {
    titulo: "Un comparador te vende una póliza y desaparece. Yo me encargo de que sepas qué contratas.",
    pasos: [
      {
        titulo: "Analizamos tu caso",
        texto: "Revisamos tu situación actual y tu presupuesto real, sin prisas.",
      },
      {
        titulo: "Filtramos la letra pequeña",
        texto: "Carencias, copagos y coberturas dentales de DKV, explicados antes de firmar.",
      },
      {
        titulo: "Te acompaño siempre",
        texto: "Antes, durante y después de contratar: reembolsos, autorizaciones, lo que necesites.",
      },
    ],
  },
  productoEstrella: {
    titulo: "Nuestro seguro estrella: Salud",
    subtitulo: "La cobertura que más contrato, individual o para autónomos y familias. El resto de seguros, aquí abajo.",
  },
  otrosSeguros: {
    titulo: "También trabajo estos seguros",
  },
  formulario: {
    titulo: "Pide tu estudio de salud personalizado en 1 minuto",
    boton: "Solicitar mi comparativa sin compromiso",
    notaSeguridad: "Tus datos están seguros. No compartimos tu información.",
  },
  faq: {
    titulo: "Preguntas frecuentes.",
    lista: [
      {
        pregunta: "¿Me cuesta algo tu asesoramiento?",
        respuesta: "No. Lo paga DKV directamente si contratas; tú no pagas nada por él.",
      },
      {
        pregunta: "¿Puedo cambiarme de seguro si ya tengo uno?",
        respuesta: "Sí. Te explico cómo hacerlo sin perder continuidad ni carencias.",
      },
      {
        pregunta: "¿Qué datos necesitas para empezar?",
        respuesta: "Solo lo básico para calcular la tarifa exacta según tu edad y tu zona.",
      },
    ],
  },
  whatsappFlotante: "Hablar por WhatsApp",
};
