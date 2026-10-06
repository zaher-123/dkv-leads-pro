// Datos, colores y textos editables del sitio. Cambia aquí, no en los componentes.

export const SITE = {
  nombre: "Beatriz Gutierrez",
  estatus: "Mediadora de seguros vinculada a DKV",
  // Número de registro del mediador. Si está vacío, no se muestra.
  registro: "",
  // Contacto visible en la web. El enlace de WhatsApp usa solo los dígitos.
  email: "[correo@tudominio.es]",
  telefono: "[600 000 000]",
  whatsappNumero: "34600000000",
  // Dominio público con https://, usado en metadatos.
  url: "https://ejemplo.es",
  // Ruta de la foto de Beatriz, por ejemplo "/beatriz.jpg". Vacía = el hueco no se muestra.
  foto: "",
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsappNumero}`;

// Colores de marca. Placeholders hasta tener los valores definitivos.
export const PRIMARY_BLUE = "#0066CC";
export const DARK_BG = "#0A1F3D";
export const ACCENT = "#FFB020";

export function precioTexto(price: number | null) {
  return price === null ? "Presupuesto personalizado" : `Desde ${price} €/mes`;
}

// Productos de la sección. fondo alterna claro y oscuro. price: null = "Presupuesto personalizado".
export const productos = [
  {
    id: "salud_familiar",
    nombre: "Salud familiar",
    descripcion:
      "Cobertura médica para toda la familia, con acceso a especialistas y pruebas diagnósticas.",
    icono: "Users",
    colorIcono: "#0066CC",
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
    colorIcono: "#00A3A3",
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
    colorIcono: "#7A5CC7",
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
    colorIcono: "#E07A1F",
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
    colorIcono: "#18A058",
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
    colorIcono: "#D93B3B",
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
    colorIcono: "#2F6DB5",
    fondo: "claro",
    price: null as number | null,
    lista: [
      "Daños en el hogar según póliza",
      "Robo y responsabilidad civil según póliza",
      "Asistencia en el hogar",
    ],
  },
] as const;

// Opciones del selector del formulario. El valor se guarda en la base de datos.
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
// Confirma el plazo de respuesta antes de publicar.
export const cifras = [
  { valor: 0, sufijo: " €", etiqueta: "de coste para ti" },
  { valor: 24, sufijo: " h", etiqueta: "para responder a tu solicitud" },
  { texto: "Digital", etiqueta: "gestión por WhatsApp y teléfono" },
] as const;

export const TEXTOS = {
  hero: {
    titular: "Tu seguro de salud, explicado claro.",
    subtitulo:
      "Comparo las coberturas de DKV contigo y te explico cada punto antes de decidir. Sin letra pequeña.",
  },
  productos: {
    titulo: "Siete seguros. Una sola conversación.",
    subtitulo: "Elige el que necesitas o pide una comparativa completa.",
  },
  pasos: {
    titulo: "Así funciona.",
    lista: [
      {
        titulo: "Cuéntame lo que necesitas",
        texto: "Rellenas el formulario en dos minutos. No pedimos datos de salud.",
      },
      {
        titulo: "Comparo opciones",
        texto:
          "Reviso las pólizas de DKV que encajan con tu edad, tu código postal y tu presupuesto.",
      },
      {
        titulo: "Te lo explico y decides",
        texto: "Hablamos por teléfono o WhatsApp. Sin compromiso ni presión.",
      },
    ],
  },
  formulario: {
    titulo: "Pide tu presupuesto.",
    subtitulo: "Rellénalo en dos minutos. Sin compromiso.",
  },
  independencia: {
    titulo: "Asesoramiento vinculado a DKV.",
    texto:
      "Soy mediadora de seguros vinculada a DKV. Mi trabajo es explicarte las pólizas de esta aseguradora y ayudarte a elegir la que mejor se ajusta a ti. Por contratar percibo una comisión de la aseguradora; no la pagas tú.",
  },
  faq: {
    titulo: "Preguntas frecuentes.",
    lista: [
      {
        pregunta: "¿Me cuesta algo el asesoramiento?",
        respuesta: "No. La comisión la percibo de la aseguradora, no de ti.",
      },
      {
        pregunta: "¿Qué datos me pides?",
        respuesta:
          "Nombre, móvil, edad, código postal y el producto que te interesa. No pedimos datos de salud en el formulario.",
      },
      {
        pregunta: "¿Qué pasa con mis datos?",
        respuesta:
          "Los uso solo para contactarte sobre el seguro que has pedido. Puedes consultarlos, corregirlos o pedir su borrado en la política de privacidad.",
      },
      {
        pregunta: "¿Puedo pedir presupuesto sin contratar?",
        respuesta: "Sí. Recibes la comparativa y decides tú, sin compromiso.",
      },
    ],
  },
  cierre: "¿Quieres saber qué seguro te conviene?",
};
