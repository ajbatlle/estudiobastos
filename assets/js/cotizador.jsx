const { useState, useMemo } = React;

/**
 * Bastos BrandElement — renders one of the four ornamental brand marks.
 * Use as a cluster of all four in corners: diamonds · asterisk · circles · flower
 */
function BrandElement({ element = 'circles', size = 32, color = 'currentColor' }) {
  const svgBase = {
    fill: 'currentColor',
    width: '100%',
    height: '100%',
    display: 'block',
  };

  const wrap = {
    display: 'inline-block',
    width: size,
    height: size,
    color,
    flexShrink: 0,
    lineHeight: 0,
  };

  if (element === 'diamonds') {
    return (
      <span style={wrap}>
        <svg viewBox="0 0 256.25 256.25" style={svgBase}>
          <rect x="18.76" y="146.89" width="90.6" height="90.6" transform="translate(-117.13 101.59) rotate(-45)" />
          <rect x="18.76" y="18.76" width="90.6" height="90.6" transform="translate(-26.54 64.06) rotate(-45)" />
          <rect x="146.89" y="146.89" width="90.6" height="90.6" transform="translate(-79.61 192.19) rotate(-45)" />
          <rect x="146.89" y="18.76" width="90.6" height="90.6" transform="translate(10.99 154.66) rotate(-45)" />
        </svg>
      </span>
    );
  }

  if (element === 'asterisk') {
    return (
      <span style={wrap}>
        <svg viewBox="0 0 256.21 256.25" style={svgBase}>
          <path d="M0,153.74h66.26l-46.85,46.85,36.23,36.23,46.83-46.83v66.26h51.23v-66.27l46.87,46.87,36.23-36.23-46.88-46.88h66.29v-51.23h-66.26l46.85-46.85-36.23-36.23-46.87,46.87V0h-51.23v66.29L55.61,19.43,19.38,55.65l46.85,46.85H0v51.23ZM102.47,138.74v-21.21l15.03-15.03h21.19l15.01,15.01v21.23l-14.99,14.99h-21.25l-15-15Z" />
        </svg>
      </span>
    );
  }

  if (element === 'circles') {
    return (
      <span style={wrap}>
        <svg viewBox="0 0 256.25 256.25" style={svgBase}>
          <rect x="128.12" y="128.12" width="128.12" height="128.12" rx="64.06" ry="64.06" />
          <rect x="0" y="0" width="128.12" height="128.12" rx="64.06" ry="64.06" />
          <rect x="128.12" y="0" width="128.12" height="128.12" rx="64.06" ry="64.06" />
          <rect x="0" y="128.12" width="128.12" height="128.12" rx="64.06" ry="64.06" />
        </svg>
      </span>
    );
  }

  if (element === 'flower') {
    return (
      <span style={wrap}>
        <svg viewBox="0 0 255.77 256.25" style={svgBase}>
          <path d="M15.54,144.7c21.49-10.18,52.86-16.58,96.73-16.58-43.8,0-75.13-6.38-96.62-16.53-31.08-14.68-11.2-62.72,21.16-51.12,22.36,8.02,49.02,25.66,79.99,56.62-31.14-31.14-48.81-57.95-56.76-80.4C48.57,4.3,96.38-15.48,111.17,15.54c10.25,21.5,16.7,52.94,16.7,96.98,0-43.84,6.39-75.19,16.55-96.68,14.69-31.07,62.68-11.23,51.13,21.14-7.99,22.39-25.64,49.1-56.65,80.11,31-31,57.7-48.65,80.07-56.66,32.36-11.57,52.23,36.41,21.16,51.12-21.48,10.17-52.82,16.56-96.66,16.56,43.91,0,75.29,6.42,96.77,16.61,31.04,14.73,11.18,62.65-21.18,51.11-22.4-7.99-49.12-25.64-80.16-56.71,31.06,31.06,48.72,57.81,56.7,80.23,11.53,32.38-36.41,52.21-51.13,21.15-10.19-21.5-16.6-52.89-16.6-96.81,0,44.05-6.46,75.5-16.71,97-14.79,31.01-62.6,11.22-51.13-21.17,7.95-22.45,25.62-49.26,56.76-80.4-30.99,31.02-57.68,48.67-80.07,56.67-32.36,11.57-52.24-36.41-21.18-51.11Z" />
        </svg>
      </span>
    );
  }

  return null;
}

/* =========================================================================
   COTIZADOR · BASTOS
   Motor: HORAS estimadas × valor hora. (Taller: por SESIÓN.)
   ========================================================================= */

const VALOR_HORA    = 18000;   // hora de diseño (particulares)
const VALOR_SESION  = 35000;   // sesión de taller suelto (particulares)
const COSTO_COPIA   = 9000;    // costo de impresión por ejemplar (antología) — editable
const ANTICIPO      = 0.5;
const TOPE_SUBE     = 0.25;
const TOPE_BAJA     = 0.15;

const CONTACTO = {
  whatsapp:  "56985003737",
  email:     "antoniobatllel@gmail.com",
  agenda:    "https://calendar.app.google/zSrf4k99THEb7JNW8",
};

// Envío interno silencioso (reporte con horas/fórmula/condiciones → Antonio).
// Completar con los datos de tu cuenta EmailJS (emailjs.com) para activarlo.
// Mientras publicKey esté vacío, el botón sigue funcionando pero no manda el interno.
const EMAILJS = {
  publicKey:  "",
  serviceId:  "",
  templateId: "",
};
if (typeof window !== "undefined" && window.emailjs && EMAILJS.publicKey) {
  window.emailjs.init(EMAILJS.publicKey);
}

const clp = (n) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 })
    .format(Math.round(n / 1000) * 1000);

// Titular de precio según el tipo de servicio
const headline = (r) => {
  if (!r) return "";
  if (r.exacto) return clp(r.precio);
  return `${clp(r.low)} – ${clp(r.high)}`;
};
const anticipoStr = (r) => (r ? clp(r.anticipo) : "");

/* ----------------------------- Flujos (UI) ------------------------------ */
const FLUJOS = {
  identidad: {
    n: "01", label: "Identidad de marca",
    intro: "Construyamos tu marca. Unas pocas preguntas y tienes un estimado.",
    pasos: [
      { id: "nivel", tipo: "single", q: "¿Hasta dónde llega el encargo?",
        op: [
          { id: "logo",     t: "Solo logotipo",                   d: "Marca y variaciones, sin sistema.", h: 25 },
          { id: "sistema",  t: "Logo + sistema base",             d: "Marca, color, tipografía y grilla.", h: 37 },
          { id: "completa", t: "Identidad completa + manual",     d: "Sistema y guía de uso.", h: 47 },
        ] },
      { id: "origen", tipo: "single", q: "¿Marca nueva o rediseño?",
        op: [
          { id: "nombre", t: "Nueva, ya tiene nombre",            h: 0 },
          { id: "naming", t: "Nueva, hay que crear el nombre",    d: "Incluye naming.", h: 8 },
          { id: "redis",  t: "Rediseño de algo existente",        h: -4 },
        ] },
      { id: "research", tipo: "single", q: "¿Hay investigación o posicionamiento previo?",
        op: [
          { id: "hacer", t: "No; la hacemos nosotros", d: "Incluida en la base.", h: 0 },
          { id: "tiene", t: "Sí, ya está hecha", h: -6 },
        ] },
      { id: "aplic", tipo: "multi", q: "¿Qué aplicaciones necesitas?", sub: "Elige todas las que apliquen.",
        op: [
          { id: "pap",  t: "Papelería",                h: 4 },
          { id: "redes",t: "Plantillas de redes",       h: 4 },
          { id: "pack", t: "Packaging",                 h: 4 },
          { id: "senal",t: "Señalética",                h: 4 },
          { id: "pres", t: "Presentación / pitch",      h: 4 },
        ] },
      { id: "plazo", tipo: "single", q: "¿Con qué plazo?",
        op: [
          { id: "normal",  t: "Normal (1 a 2 meses)",                           mult: 1 },
          { id: "urgente", t: "Urgente (menos de 1 mes)", d: "Recargo por prioridad.", mult: 1.3 },
        ] },
    ],
  },

  editorial: {
    n: "02", label: "Diseño editorial",
    intro: "Libros, revistas, memorias, catálogos. Cuéntanos de la pieza.",
    pasos: [
      { id: "tipo", tipo: "single", q: "¿Qué tipo de pieza es?",
        op: [
          { id: "libro",    t: "Libro",               h: 12 },
          { id: "revista",  t: "Revista",             h: 14 },
          { id: "memoria",  t: "Memoria / reporte",   h: 12 },
          { id: "catalogo", t: "Catálogo",            h: 12 },
          { id: "fanzine",  t: "Fanzine / pieza corta", h: 8 },
        ] },
      { id: "paginas", tipo: "slider", q: "¿Cuántas páginas, aproximadamente?",
        min: 8, max: 160, step: 4, def: 64, unidad: "págs" },
      { id: "densidad", tipo: "single", q: "¿Cómo es el contenido por página?",
        op: [
          { id: "texto",  t: "Texto corrido",          d: "Pocas imágenes.", perPage: 0.3 },
          { id: "mixto",  t: "Mixto: texto e imágenes",                      perPage: 0.5 },
          { id: "visual", t: "Muy visual",             d: "Catálogo, fotolibro.", perPage: 0.8 },
        ] },
      { id: "portada", tipo: "single", q: "¿Incluye diseño de portada?",
        op: [
          { id: "si", t: "Sí, diseñar portada", h: 8 },
          { id: "no", t: "No / ya existe",       h: 0 },
        ] },
      { id: "contenido", tipo: "single", q: "¿En qué estado llega el contenido?",
        op: [
          { id: "listo",   t: "Texto e imágenes listos", h: 0 },
          { id: "ordenar", t: "Hay que ordenarlo",        h: 4 },
          { id: "edicion", t: "Requiere edición",         h: 8 },
        ] },
      { id: "imagenes", tipo: "single", q: "¿Cuánto tratamiento de imagen?",
        op: [
          { id: "ninguna", t: "Sin tratamiento",  h: 0 },
          { id: "pocas",   t: "Algunas (~10)",     h: 3 },
          { id: "muchas",  t: "Muchas (~30)",      h: 9 },
        ] },
      { id: "preprensa", tipo: "single", q: "¿Destino final?",
        op: [
          { id: "imprenta", t: "Impreso: preparar para imprenta", h: 5 },
          { id: "digital",  t: "Solo digital",                     h: 0 },
        ] },
      { id: "revisiones", tipo: "single", q: "¿Rondas de revisión?", sub: "Dos vienen incluidas.",
        op: [
          { id: "estandar", t: "Las 2 incluidas", h: 0 },
          { id: "una",      t: "+1 ronda",         h: 6 },
          { id: "dos",      t: "+2 rondas",         h: 12 },
        ] },
    ],
  },

  primera: {
    n: "03", label: "Taller editorial",
    intro: "Taller editorial orientado al desarrollo de publicaciones literarias, artísticas e independientes.",
    pasos: [
      { id: "audiencia", tipo: "single", q: "¿Para quién es el taller?",
        op: [
          { id: "particular", t: "Para mí o un grupo particular" },
          { id: "empresa",    t: "Para mi empresa u organización", d: "Programa a medida para un equipo." },
        ] },
      { id: "grupo", tipo: "slider", q: "¿Cuántas personas participan?",
        min: 1, max: 12, step: 1, def: 6, unidad: "personas" },
      { id: "sesiones", tipo: "slider", q: "¿Cuántas sesiones de 2 horas?",
        min: 4, max: 10, step: 1, def: 6, unidad: "sesiones" },
      { id: "enfoque", tipo: "single", q: "¿Qué etapa del proceso editorial quieren trabajar?",
        op: [
          { id: "contenido", t: "Contenido, estructura y edición" },
          { id: "diseno",    t: "Diseño y producción editorial" },
          { id: "completo",  t: "Proceso completo", d: "Del contenido al libro impreso." },
        ] },
      { id: "modalidad", tipo: "single", q: "¿En qué modalidad?",
        op: [
          { id: "online",     t: "Online" },
          { id: "presencial", t: "Presencial", d: "Suma logística y traslado por sesión." },
          { id: "mixta",      t: "Mixta" },
        ] },
      { id: "entregable", tipo: "single", q: "¿Entregable final?", sub: "El libro impreso lo diseña e imprime Bastos.",
        op: [
          { id: "proceso", t: "Solo el proceso del taller" },
          { id: "libro",   t: "+ Libro impreso", d: "Curaduría, maquetación e impresión." },
        ] },
    ],
  },
};

const FACTORES = {
  identidad: [
    { id: "i_paralelo",   dir: "sube", peso: 0.07, label: "Hay que empezar a diseñar antes de que definan qué son / a quién le hablan",   porque: "El diseño avanza sobre una base incompleta: más rutas y reproceso." },
    { id: "i_decisores",  dir: "sube", peso: 0.06, label: "Aprueba más de una persona (socios, directorio)",                               porque: "Cada ronda se multiplica y aparecen criterios en conflicto." },
    { id: "i_naming",     dir: "sube", peso: 0.06, label: "Hay que crear el nombre desde cero",                                            porque: "El naming es lo más subjetivo y lo que más rondas toma." },
    { id: "i_sinref",     dir: "sube", peso: 0.04, label: "No traen referencias de lo que les gusta",                                      porque: "Sin un norte visual, la exploración es más amplia." },
    { id: "i_rutas",      dir: "sube", peso: 0.05, label: "Quieren ver varias rutas distintas desde el inicio",                            porque: "Cada ruta es casi un diseño completo en paralelo." },
    { id: "i_scope",      dir: "sube", peso: 0.04, label: "La lista de aplicaciones queda abierta (\"vamos viendo\")",                     porque: "El alcance crece durante el proyecto." },
    { id: "i_nombreok",   dir: "baja", peso: 0.04, label: "El nombre ya está definido y conforme",                                         porque: "Se elimina la etapa más iterativa." },
    { id: "i_undecisor",  dir: "baja", peso: 0.05, label: "Decide una sola persona con poder de firmar",                                   porque: "Menos rondas, criterio único." },
    { id: "i_briefok",    dir: "baja", peso: 0.05, label: "Traen brief y referencias claras",                                              porque: "Acota la exploración desde el inicio." },
    { id: "i_unaruta",    dir: "baja", peso: 0.03, label: "Aceptan trabajar sobre una sola ruta",                                          porque: "Menos exploración en paralelo." },
    { id: "i_reusa",      dir: "baja", peso: 0.03, label: "Hay material previo reutilizable (líneas, manual)",                             porque: "Parte de una base existente." },
  ],
  editorial: [
    { id: "e_texto",      dir: "sube", peso: 0.08, label: "El texto todavía está en edición / no está cerrado",                            porque: "Cambios de extensión rompen la maquetación ya hecha; se rehace." },
    { id: "e_paralelo",   dir: "sube", peso: 0.06, label: "Hay que maquetar en paralelo mientras llega el contenido",                      porque: "Se trabaja sobre borradores y se rehace al llegar lo final." },
    { id: "e_imgs",       dir: "sube", peso: 0.05, label: "Las imágenes no están definidas o son de baja calidad",                         porque: "Hay que gestionarlas, tratarlas o pedir reemplazos." },
    { id: "e_indice",     dir: "sube", peso: 0.05, label: "No hay índice / estructura final definida",                                     porque: "La grilla y las maestras se rehacen si cambia la estructura." },
    { id: "e_comite",     dir: "sube", peso: 0.06, label: "Aprueba un comité o varias áreas",                                              porque: "Las rondas se multiplican." },
    { id: "e_imprenta",   dir: "sube", peso: 0.04, label: "Lleva terminaciones especiales o imprenta externa",                             porque: "Más vueltas técnicas y pruebas de color." },
    { id: "e_textook",    dir: "baja", peso: 0.06, label: "El texto está cerrado y corregido",                                             porque: "No hay reproceso por cambios de contenido." },
    { id: "e_imgok",      dir: "baja", peso: 0.04, label: "El banco de imágenes está definido y en buena resolución",                      porque: "Sin gestión ni tratamiento extra." },
    { id: "e_indiceok",   dir: "baja", peso: 0.04, label: "El índice / estructura ya está definido",                                       porque: "La grilla se define una sola vez." },
    { id: "e_undecisor",  dir: "baja", peso: 0.04, label: "Decide una sola contraparte",                                                   porque: "Menos rondas." },
    { id: "e_reedicion",  dir: "baja", peso: 0.03, label: "Es reedición sobre una línea existente",                                        porque: "Parte de un sistema ya hecho." },
  ],
  primera: [],
};

/* ------------------------------- Motor ---------------------------------- */
function opt(cat, pasoId, id) {
  const p = FLUJOS[cat].pasos.find((x) => x.id === pasoId);
  return p?.op?.find((o) => o.id === id);
}

function motor(cat, ans) {
  let horas = 0, mult = 1, sesiones = 0, esSesion = false;
  let esEmpresa = false, esPrograma = false, empresaTotal = 0, empresaImpresion = 0;
  const tareas = [];

  if (cat === "identidad") {
    const nivel    = opt(cat, "nivel",    ans.nivel);
    const origen   = opt(cat, "origen",   ans.origen);
    const research = opt(cat, "research", ans.research);
    const plazo    = opt(cat, "plazo",    ans.plazo);
    horas += nivel?.h    || 0;
    horas += origen?.h   || 0;
    horas += research?.h || 0;
    (ans.aplic || []).forEach((a) => { horas += opt(cat, "aplic", a)?.h || 0; });
    mult = plazo?.mult || 1;

    if (ans.origen === "naming") tareas.push(["Creación de nombre", 8]);
    tareas.push([ans.research === "tiene" ? "Revisión del posicionamiento existente" : "Investigación y referentes", 6]);
    tareas.push(["Conceptualización y rutas de diseño", 8]);
    tareas.push(["Diseño de logotipo y variaciones", 12]);
    if (ans.nivel !== "logo") tareas.push(["Sistema visual: color, tipografía y grilla", 6]);
    (ans.aplic || []).forEach((a) => tareas.push([`Diseño de ${opt(cat, "aplic", a)?.t.toLowerCase()}`, 4]));
    if (ans.nivel === "completa") tareas.push(["Manual de marca y guía de uso", 10]);
    tareas.push(["Entrega de archivos finales", 4]);
  }

  if (cat === "editorial") {
    const tipo       = opt(cat, "tipo",       ans.tipo);
    const dens       = opt(cat, "densidad",   ans.densidad);
    const portada    = opt(cat, "portada",    ans.portada);
    const contenido  = opt(cat, "contenido",  ans.contenido);
    const imagenes   = opt(cat, "imagenes",   ans.imagenes);
    const preprensa  = opt(cat, "preprensa",  ans.preprensa);
    const revisiones = opt(cat, "revisiones", ans.revisiones);
    const pags = ans.paginas ?? 64;
    const hMaq = pags * (dens?.perPage || 0.5);

    horas += (tipo?.h || 0) + (portada?.h || 0) + (contenido?.h || 0) +
             (imagenes?.h || 0) + (preprensa?.h || 0) + (revisiones?.h || 0) + hMaq;

    tareas.push(["Definición de grilla, estilos y maestras", tipo?.h || 12]);
    if (ans.portada === "si") tareas.push(["Diseño de portada", 8]);
    tareas.push([`Maquetación de ${pags} páginas (${dens?.t.toLowerCase() || "mixto"})`, Math.round(hMaq)]);
    if (ans.contenido === "ordenar") tareas.push(["Ordenamiento del contenido", 4]);
    if (ans.contenido === "edicion") tareas.push(["Edición y ajuste de textos", 8]);
    if (imagenes?.h) tareas.push(["Tratamiento de imágenes", imagenes.h]);
    if (ans.preprensa === "imprenta") tareas.push(["Preprensa y entrega para imprenta", 5]);
    const rondas = ans.revisiones === "dos" ? 4 : ans.revisiones === "una" ? 3 : 2;
    tareas.push([`${rondas} rondas de revisión`, revisiones?.h || 0]);
  }

  if (cat === "primera") {
    esPrograma = true;
    esEmpresa  = ans.audiencia === "empresa";
    const grupo     = ans.grupo ?? 6;
    const nSesiones = ans.sesiones ?? 6;
    const modalidad = opt(cat, "modalidad", ans.modalidad);
    const hLog = ans.modalidad === "presencial" ? 1.5 : ans.modalidad === "mixta" ? 0.75 : 0;
    const base = 4;                   // diseño y coordinación del programa
    const imprime = ans.entregable === "libro";

    let h = base;
    h += nSesiones * 3;               // 2 h facilitación + 1 h preparación por sesión
    if (ans.enfoque === "completo") h += 4;
    h += nSesiones * hLog;            // logística presencial
    if (imprime) h += 20;             // curaduría + maquetación editorial (Bastos)

    const copias = grupo + 2;
    empresaImpresion = imprime ? copias * COSTO_COPIA : 0;
    horas = Math.round(h);
    empresaTotal = horas * VALOR_HORA + empresaImpresion;

    tareas.push(["Diseño y coordinación del programa", base]);
    tareas.push([`${nSesiones} sesiones de 2 h${hLog ? ` · ${modalidad?.t.toLowerCase()}` : ""} — facilitación y preparación`, nSesiones * 3]);
    tareas.push(["Incluye contenido, edición, diseño editorial y preparación de archivos", null]);
    if (ans.enfoque === "completo") tareas.push(["Proceso editorial completo", 4]);
    if (imprime) {
      tareas.push(["Curaduría y maquetación del libro — Bastos", 20]);
      tareas.push([`Impresión de ${copias} ejemplares`, null]);
    }
  }

  const precio = esPrograma ? empresaTotal : horas * VALOR_HORA * mult;
  const exacto = esEmpresa || esPrograma;
  const defs = FACTORES[cat] || [];
  const maxSube = Math.min(TOPE_SUBE, defs.filter((f) => f.dir === "sube").reduce((s, f) => s + f.peso, 0));
  const maxBaja = Math.min(TOPE_BAJA, defs.filter((f) => f.dir === "baja").reduce((s, f) => s + f.peso, 0));
  const low  = exacto ? precio : precio * (1 - maxBaja);
  const high = exacto ? precio : precio * (1 + maxSube);

  return { horas: Math.round(horas), mult, sesiones, esSesion, esEmpresa, esPrograma, exacto, empresaImpresion,
    precio, low, high, maxSube, maxBaja, anticipo: precio * ANTICIPO, tareas, defs };
}

/* --------------------------------- App ---------------------------------- */
function Cotizador() {
  const [cat,       setCat]       = useState(null);
  const [paso,      setPaso]      = useState(0);
  const [ans,       setAns]       = useState({});
  const [detalle,   setDetalle]   = useState("");
  const [notas,     setNotas]     = useState({});
  const [notaOpen,  setNotaOpen]  = useState({});
  const [fin,       setFin]       = useState(false);
  const [datos,     setDatos]     = useState({ nombre: "", proyecto: "", correo: "" });
  const [enviado,   setEnviado]   = useState(false);

  const flujo = cat ? FLUJOS[cat] : null;
  const r = useMemo(() => (cat ? motor(cat, ans) : null), [cat, ans]);
  const agenda = flujo
    ? flujo.pasos.filter((p) => (notas[p.id] || "").trim()).map((p) => ({ q: p.q, nota: notas[p.id].trim() }))
    : [];

  const elegirCat = (id) => {
    setCat(id); setPaso(0); setFin(false); setEnviado(false);
    setNotas({}); setNotaOpen({}); setDetalle("");
    const def = {};
    FLUJOS[id].pasos.forEach((p) => {
      if (p.tipo === "single") def[p.id] = p.op[0].id;
      if (p.tipo === "multi")  def[p.id] = [];
      if (p.tipo === "slider") def[p.id] = p.def;
    });
    setAns(def);
  };

  const setSingle   = (pid, oid) => setAns((a) => ({ ...a, [pid]: oid }));
  const toggleMulti = (pid, oid) => setAns((a) => {
    const cur = a[pid] || [];
    return { ...a, [pid]: cur.includes(oid) ? cur.filter((x) => x !== oid) : [...cur, oid] };
  });
  const setSlider = (pid, v) => setAns((a) => ({ ...a, [pid]: v }));

  const total   = flujo ? flujo.pasos.length : 0;
  const avanzar = () => (paso < total - 1 ? setPaso(paso + 1) : setFin(true));
  const volver  = () => (fin ? setFin(false) : paso > 0 ? setPaso(paso - 1) : setCat(null));

  const resumenTxt = () => {
    if (!r) return "";
    const precio = headline(r);
    const items  = r.tareas.map((t) => `· ${t[0]}`).join("\n");
    return `Cotización Bastos — ${flujo.label}\n` +
      `${datos.nombre || "—"}${datos.proyecto ? " / " + datos.proyecto : ""}\n\n` +
      `Incluye:\n${items}\n\n` +
      `${r.exacto ? "Precio" : "Estimado"}: ${precio}\nAnticipo 50%: ${anticipoStr(r)}` +
      (agenda.length ? `\n\nTemas para la reunión:\n${agenda.map((a) => `· ${a.q} — ${a.nota}`).join("\n")}` : "") +
      (detalle ? `\n\nNota del cliente:\n${detalle}` : "");
  };

  // Reporte interno — solo para Bastos. Nunca se muestra en el cotizador ni se
  // le entrega al cliente; se envía en silencio por EmailJS al confirmar.
  const resumenInternoTxt = () => {
    if (!r) return "";
    const formula = r.esPrograma
      ? `${r.horas} h × ${clp(VALOR_HORA)}${r.empresaImpresion ? ` + impresión ${clp(r.empresaImpresion)}` : ""} = ${clp(r.precio)}`
      : `${r.horas} h × ${clp(VALOR_HORA)}${r.mult !== 1 ? ` · urgencia ×${r.mult}` : ""} = ${clp(r.precio)}`;
    const condiciones = (r.defs || []).length
      ? r.defs.map((f) => `· ${f.label} (${f.porque}) — ${f.dir === "sube" ? "+" : "−"}${Math.round(f.peso * 100)}%`).join("\n")
      : "—";
    const respuestas = flujo.pasos.map((p) => {
      const v = ans[p.id];
      const txt = p.tipo === "multi" ? (v || []).join(", ") : Array.isArray(v) ? v.join(", ") : v;
      return `· ${p.q} → ${txt}`;
    }).join("\n");
    return `[INTERNO — no compartir]\n` +
      `${flujo.label} — ${datos.nombre || "—"}${datos.proyecto ? " / " + datos.proyecto : ""} (${datos.correo || "sin correo"})\n\n` +
      `Fórmula: ${formula}\n` +
      `Rango mostrado al cliente: ${headline(r)}\n` +
      (!r.exacto ? `Tope ajuste: −${Math.round(r.maxBaja * 100)}% / +${Math.round(r.maxSube * 100)}%\n` : "") +
      `\nCondiciones a evaluar en la reunión (marcar en vivo, no automático):\n${condiciones}\n\n` +
      `Respuestas del formulario:\n${respuestas}` +
      (agenda.length ? `\n\nTemas marcados por el cliente:\n${agenda.map((a) => `· ${a.q} — ${a.nota}`).join("\n")}` : "") +
      (detalle ? `\n\nNota del cliente:\n${detalle}` : "");
  };

  const enviarInterno = () => {
    if (!window.emailjs || !EMAILJS.publicKey) return; // no configurado aún
    window.emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
      asunto: `Cotización interna — ${flujo?.label || ""} — ${datos.nombre || "sin nombre"}`,
      mensaje: resumenInternoTxt(),
    }).catch(() => {});
  };

  const waHref   = CONTACTO.whatsapp ? `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(resumenTxt())}` : null;

  return (
    <div className="bx-page">
      <div className="bx-frame">
        <div className="bx-ornament">
          <BrandElement element="diamonds" size={22} color="var(--color-brand)" />
          <BrandElement element="asterisk" size={22} color="var(--color-brand)" />
          <BrandElement element="circles"  size={22} color="var(--color-brand)" />
          <BrandElement element="flower"   size={22} color="var(--color-brand)" />
        </div>

      {/* PORTADA */}
      {!cat && (
        <div className="bx-home">
          <h1 className="bx-h1">¿Qué quieres crear?</h1>
          <p className="bx-lead">Respondes unas alternativas y obtienes un estimado y el alcance del trabajo.</p>
          <div className="bx-cards">
            {Object.entries(FLUJOS).map(([id, f]) => (
              <button key={id} className="bx-card" onClick={() => elegirCat(id)}>
                <span className="bx-card-n">{f.n}</span>
                <span className="bx-card-t">{f.label}</span>
                <span className="bx-card-d">{f.intro}</span>
                <span className="bx-card-go">Empezar →</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FLUJO */}
      {cat && !fin && (() => {
        const p = flujo.pasos[paso];
        return (
          <div className="bx-flow">
            <div className="bx-bar"><span style={{ width: `${((paso + 1) / total) * 100}%` }}></span></div>
            <div className="bx-meta">{flujo.label} · {paso + 1} de {total}</div>

            <h2 className="bx-q">{p.q}</h2>
            {p.sub && <p className="bx-sub">{p.sub}</p>}

            {p.tipo === "single" && (
              <div className="bx-opts">
                {p.op.map((o) => (
                  <button key={o.id} className="bx-opt" aria-pressed={ans[p.id] === o.id} onClick={() => setSingle(p.id, o.id)}>
                    <span className="bx-opt-t">{o.t}</span>
                    {o.d && <span className="bx-opt-d">{o.d}</span>}
                  </button>
                ))}
              </div>
            )}

            {p.tipo === "multi" && (
              <div className="bx-opts">
                {p.op.map((o) => (
                  <button key={o.id} className="bx-opt bx-multi" aria-pressed={(ans[p.id] || []).includes(o.id)} onClick={() => toggleMulti(p.id, o.id)}>
                    <span className="bx-chk"></span>
                    <span className="bx-opt-t">{o.t}</span>
                  </button>
                ))}
              </div>
            )}

            {p.tipo === "slider" && (
              <div className="bx-sliderbox">
                <div className="bx-sliderval">{ans[p.id]} <em>{p.unidad}</em></div>
                <input className="bx-slider" type="range" min={p.min} max={p.max} step={p.step}
                  value={ans[p.id]} onChange={(e) => setSlider(p.id, +e.target.value)} />
              </div>
            )}

            <div className="bx-note">
              {!notaOpen[p.id] && !notas[p.id] ? (
                <button className="bx-noteadd" onClick={() => setNotaOpen((o) => ({ ...o, [p.id]: true }))}>
                  + Agregar nota para la reunión
                </button>
              ) : (
                <textarea className="bx-noteta" rows={2} value={notas[p.id] || ""}
                  onChange={(e) => setNotas((n) => ({ ...n, [p.id]: e.target.value }))}
                  placeholder="Algo puntual sobre esta pregunta que quieras conversar." />
              )}
            </div>

            <div className="bx-running">
              <span>{r.exacto ? "Precio del programa" : "Estimado provisorio"}</span>
              <strong>{headline(r)}</strong>
            </div>

            <div className="bx-nav">
              <button className="bx-back" onClick={volver}>← {paso === 0 ? "Categorías" : "Atrás"}</button>
              <button className="bx-next" onClick={avanzar}>{paso < total - 1 ? "Siguiente" : "Ver cotización"}</button>
            </div>
          </div>
        );
      })()}

      {/* CIERRE */}
      {cat && fin && (
        <div className="bx-final">
          <div className="bx-meta">{flujo.label}</div>

          <div className="bx-price">
            <span className="bx-price-l">{r.exacto ? "Precio" : "Estimado"}</span>
            <span className="bx-price-n">{headline(r)}</span>
          </div>
          <div className="bx-dep">
            <span>Anticipo para iniciar · 50%</span>
            <span>{anticipoStr(r)}</span>
          </div>

          {!r.exacto && (
            <p className="bx-rangenote">El valor final dentro del rango se define en la primera reunión, según el estado del material, quién decide y qué tan definido esté el encargo.</p>
          )}

          <div className="bx-incl-h">
            <span>Qué incluye</span>
          </div>
          <ul className="bx-tareas">
            {r.tareas.map((t, i) => (
              <li key={i}>
                <span>{t[0]}</span>
              </li>
            ))}
          </ul>

          {agenda.length > 0 && (
            <div className="bx-agenda">
              <div className="bx-agenda-h">Temas para la reunión</div>
              <ul>
                {agenda.map((a, i) => (
                  <li key={i}>
                    <span className="bx-agenda-q">{a.q}</span>
                    {a.nota}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <label className="bx-tlabel">¿Algo más que debamos saber? <em>(opcional)</em></label>
          <textarea className="bx-textarea" rows={3} value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            placeholder="Contexto, referencias, plazos, lo que quieras agregar." />

          <div className="bx-inputs">
            <input className="bx-input" placeholder="Tu nombre"          value={datos.nombre}   onChange={(e) => setDatos({ ...datos, nombre:   e.target.value })} />
            <input className="bx-input" placeholder="Nombre del proyecto" value={datos.proyecto} onChange={(e) => setDatos({ ...datos, proyecto: e.target.value })} />
            <input className="bx-input" placeholder="Correo"             value={datos.correo}   onChange={(e) => setDatos({ ...datos, correo:   e.target.value })} />
          </div>

          <button className="bx-cta" onClick={() => {
            enviarInterno();
            setEnviado(true);
            if (CONTACTO.agenda) window.open(CONTACTO.agenda, "_blank");
          }}>Solicitar cotización y agendar</button>

          {enviado && (
            <div className="bx-after">
              <p className="bx-ok">Tu solicitud ya fue enviada. {CONTACTO.agenda ? "Se abrió una pestaña para agendar la reunión — si no se abrió, usa el botón de abajo." : "Coordinamos la reunión para cerrar el precio."}</p>
              <div className="bx-contact">
                {CONTACTO.agenda && <a className="bx-ghost" href={CONTACTO.agenda} target="_blank" rel="noreferrer">Agendar reunión →</a>}
                {waHref && <a className="bx-ghost" href={waHref} target="_blank" rel="noreferrer">Enviar por WhatsApp</a>}
              </div>
            </div>
          )}

          <div className="bx-nav">
            <button className="bx-back" onClick={() => setFin(false)}>← Ajustar respuestas</button>
            <button className="bx-back" onClick={() => setCat(null)}>Otra categoría</button>
          </div>
          <p className="bx-fine">{r.exacto ? "Precio cerrado del programa. Al confirmar coordinamos las fechas." : "Estimación referencial. El valor final se confirma con el estudio antes de iniciar."}</p>
        </div>
      )}

      <style>{`
/* Bastos — Font Face Declarations
 *
 * ⚠ PENDING FONT FILES — Replace each 'src: local(…)' with real woff2/ttf paths
 *   once font files are uploaded. The sidebar banner prompts for upload.
 *
 * Until then, local() tries system-installed copies of each family;
 * Google Fonts CDN is loaded below as automatic fallback.
 */

/* CDN fallback — loads when font files are not yet uploaded */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

/* ——— Plus Jakarta Sans (única tipografía — display, titulares, cuerpo, UI) ——— */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Plus Jakarta Sans Light'), local('PlusJakartaSans-Light');
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Plus Jakarta Sans'), local('PlusJakartaSans-Regular');
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Plus Jakarta Sans Medium'), local('PlusJakartaSans-Medium');
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: local('Plus Jakarta Sans SemiBold'), local('PlusJakartaSans-SemiBold');
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Plus Jakarta Sans Bold'), local('PlusJakartaSans-Bold');
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: local('Plus Jakarta Sans ExtraBold'), local('PlusJakartaSans-ExtraBold');
}
/* Bastos — Color Tokens
 * Structural reference: IBM Carbon Design System token naming
 * Brand palette is intentionally minimal: electric blue + white only.
 * ⚠ Exact hex for brand blue estimated from visual materials; confirm with brand.
 */

:root {
  /* ——— Base palette ——— */

  /* Brand Blue — Azul Real (Opción B)
   * oklch(43% 0.21 262°) — medio-oscuro, chroma moderado.
   * Hue 262° aleja del violeta puro; chroma 0.21 elimina
   * la vibración óptica contra blanco sin perder vivacidad. */
  --blue-100: oklch(43% 0.21 262deg);   /* Brand primary */
  --blue-90:  oklch(37% 0.19 262deg);   /* Hover / pressed */
  --blue-80:  oklch(32% 0.17 262deg);
  --blue-70:  oklch(27% 0.15 262deg);
  --blue-20:  oklch(84% 0.08 262deg);   /* Subtle */
  --blue-10:  oklch(91% 0.04 262deg);   /* Tint */
  --blue-5:   oklch(96% 0.02 262deg);   /* Background */

  /* Neutral */
  --white:    #ffffff;
  --black:    #0a0a0a;
  --gray-90:  #1a1a1a;
  --gray-80:  #333333;
  --gray-60:  #666666;
  --gray-40:  #999999;
  --gray-20:  #cccccc;
  --gray-10:  #e8e8e8;
  --gray-5:   #f2f2f2;   /* Off-white — light background surfaces (slides, etc.) */

  /* ——— Semantic aliases (Carbon-style) ——— */

  /* Brand */
  --color-brand:         var(--blue-100);
  --color-brand-hover:   var(--blue-90);
  --color-brand-subtle:  var(--blue-5);

  /* Text */
  --text-primary:        var(--black);
  --text-secondary:      var(--gray-60);
  --text-placeholder:    var(--gray-40);
  --text-disabled:       var(--gray-40);
  --text-on-brand:       var(--white);
  --text-inverse:        var(--white);

  /* Surface */
  --surface-page:        var(--white);
  --surface-subtle:      var(--gray-5);
  --surface-brand:       var(--blue-100);
  --surface-inverse:     var(--black);
  --surface-overlay:     oklch(43% 0.21 262deg / 0.08);

  /* Border */
  --border-subtle:       var(--gray-10);
  --border-strong:       var(--gray-20);
  --border-inverse:      rgba(255, 255, 255, 0.25);
  --border-brand:        var(--blue-100);

  /* Interactive */
  --interactive:         var(--blue-100);
  --interactive-hover:   var(--blue-90);
  --focus:               var(--blue-100);
}
/* Bastos — Typography Tokens
 *
 * Única tipografía: Plus Jakarta Sans (Google Fonts)
 *   Pesos disponibles: 300 · 400 · 500 · 600 · 700 · 800
 *   Load via: https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap
 *
 * Nota: el logotipo "~bastos~" usa una tipografía propietaria (trazados en SVG).
 *   Plus Jakarta Sans Bold 700 / ExtraBold 800 se usa para todos los titulares de display.
 */

:root {
  /* ——— Font families ——— */
  --font-sans:    'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-mono:    'Courier New', monospace;

  /* ——— Type scale (Carbon-aligned, 16px base) ——— */
  --type-scale-01: 0.75rem;     /* 12px — caption, label, small */
  --type-scale-02: 0.875rem;    /* 14px — body-compact */
  --type-scale-03: 1rem;        /* 16px — body */
  --type-scale-04: 1.125rem;    /* 18px — body-large */
  --type-scale-05: 1.25rem;     /* 20px — heading-01 */
  --type-scale-06: 1.5rem;      /* 24px — heading-02 */
  --type-scale-07: 1.75rem;     /* 28px — heading-03 */
  --type-scale-08: 2rem;        /* 32px — heading-04 */
  --type-scale-09: 2.625rem;    /* 42px — heading-05 */
  --type-scale-10: 3rem;        /* 48px — heading-06 */
  --type-scale-11: 3.75rem;     /* 60px — display-01 */
  --type-scale-12: 4.5rem;      /* 72px — display-02 */
  --type-scale-13: 6rem;        /* 96px — display-03 */

  /* ——— Semantic type roles ——— */
  --text-display:      var(--type-scale-12);
  --text-heading-xl:   var(--type-scale-11);
  --text-heading-lg:   var(--type-scale-09);
  --text-heading:      var(--type-scale-07);
  --text-heading-sm:   var(--type-scale-05);
  --text-body-lg:      var(--type-scale-04);
  --text-body:         var(--type-scale-03);
  --text-body-sm:      var(--type-scale-02);
  --text-label:        var(--type-scale-01);
  --text-caption:      var(--type-scale-01);

  /* ——— Font weights ——— */
  --weight-light:      300;
  --weight-regular:    400;
  --weight-medium:     500;
  --weight-semibold:   600;
  --weight-bold:       700;
  --weight-extrabold:  800;

  /* ——— Letter spacing ——— */
  --tracking-tight:   -0.02em;
  --tracking-normal:   0em;
  --tracking-wide:     0.05em;
  --tracking-wider:    0.1em;
  --tracking-caps:     0.15em;   /* "DISEÑO Y COMUNICACIONES" style */
  --tracking-ultra:    0.25em;

  /* ——— Line heights ——— */
  --leading-tight:    1.1;
  --leading-snug:     1.25;
  --leading-normal:   1.5;
  --leading-relaxed:  1.7;
}
/* Bastos — Spacing Tokens
 * Based on IBM Carbon Design System 4px base scale.
 * Brand uses generous whitespace; never crowd elements.
 */

:root {
  /* ——— Base spacing scale ——— */
  --spacing-01:  0.125rem;   /*   2px */
  --spacing-02:  0.25rem;    /*   4px */
  --spacing-03:  0.5rem;     /*   8px */
  --spacing-04:  0.75rem;    /*  12px */
  --spacing-05:  1rem;       /*  16px */
  --spacing-06:  1.5rem;     /*  24px */
  --spacing-07:  2rem;       /*  32px */
  --spacing-08:  2.5rem;     /*  40px */
  --spacing-09:  3rem;       /*  48px */
  --spacing-10:  4rem;       /*  64px */
  --spacing-11:  5rem;       /*  80px */
  --spacing-12:  6rem;       /*  96px */
  --spacing-13: 10rem;       /* 160px */

  /* ——— Semantic layout spacing ——— */
  --layout-xs:    var(--spacing-05);    /* 16px  — tight component spacing */
  --layout-sm:    var(--spacing-07);    /* 32px  — between elements */
  --layout-md:    var(--spacing-09);    /* 48px  — section spacing */
  --layout-lg:    var(--spacing-10);    /* 64px  — generous section / page gutter */
  --layout-xl:    var(--spacing-11);    /* 80px  — hero sections */
  --layout-2xl:   var(--spacing-13);    /* 160px — major section breaks */

  /* ——— Container ——— */
  --container-max:    80rem;            /* 1280px */
  --container-sm:     40rem;            /* 640px  */
  --page-gutter:      var(--spacing-10); /* 64px page-edge margin */
}
/* Bastos — Elevation, Border Radius & Motion Tokens
 * Brand aesthetic is intentionally flat.
 * Prefer zero shadow in brand contexts.
 * The footer wave uses organic bezier curves — not CSS radius.
 */

:root {
  /* ——— Shadow (use sparingly; prefer flat layouts) ——— */
  --shadow-none: none;
  --shadow-xs:   0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-sm:   0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-md:   0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg:   0 8px 24px rgba(0, 0, 0, 0.10);

  /* ——— Border radius ——— */
  /* Brand preference: sharp / no radius on all major UI elements */
  --radius-none: 0;
  --radius-xs:   2px;
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-pill: 9999px;  /* Badge only */
  --radius-full: 50%;

  /* ——— Transitions ——— */
  --transition-fast:    0.1s ease;  /* @kind other */
  --transition-normal:  0.2s ease;  /* @kind other */
  --transition-slow:    0.3s ease;  /* @kind other */

  /* ——— Opacity states ——— */
  --opacity-hover:    0.75;  /* @kind other */
  --opacity-active:   0.85;  /* @kind other */
  --opacity-disabled: 0.40;  /* @kind other */
}

        /* ——— Page & frame ——— */
        .bx-page {
          min-height: 100vh;
          background: var(--color-brand);
          padding: var(--spacing-10) var(--spacing-05);
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .bx-frame {
          background: #E6E6E6;
          width: 100%;
          max-width: 620px;
          padding: var(--spacing-09) var(--spacing-10);
          color: var(--text-primary);
          font-family: var(--font-sans);
          -webkit-font-smoothing: antialiased;
        }
        .bx-frame * { box-sizing: border-box; }
        .bx-ornament {
          display: flex;
          gap: var(--spacing-04);
          margin-bottom: var(--spacing-08);
        }

        /* ——— Home ——— */
        .bx-home { padding: 0; }
        .bx-h1 {
          font-family: var(--font-sans);
          font-size: var(--type-scale-08);
          font-weight: var(--weight-extrabold);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--spacing-05);
          line-height: var(--leading-snug);
        }
        .bx-lead {
          color: var(--text-secondary);
          font-size: var(--type-scale-04);
          margin: 0 0 var(--spacing-08);
          max-width: 46ch;
          line-height: var(--leading-normal);
        }
        .bx-cards {
          display: grid;
          gap: 0;
        }
        .bx-card {
          position: relative;
          text-align: left;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border-subtle);
          padding: var(--spacing-07) 0;
          cursor: pointer;
          display: grid;
          gap: var(--spacing-03);
          transition: color var(--transition-fast);
          width: 100%;
        }
        .bx-card:first-child { border-top: 1px solid var(--border-subtle); }
        .bx-card:hover .bx-card-t { color: var(--color-brand); }
        .bx-card:hover .bx-card-go { opacity: 1; }
        .bx-card-n {
          font-size: var(--type-scale-01);
          color: var(--text-secondary);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          font-weight: var(--weight-medium);
        }
        .bx-card-t {
          font-size: var(--type-scale-07);
          font-weight: var(--weight-bold);
          letter-spacing: var(--tracking-tight);
          transition: color var(--transition-fast);
          line-height: var(--leading-snug);
        }
        .bx-card-d {
          font-size: var(--type-scale-02);
          color: var(--text-secondary);
          max-width: 48ch;
          line-height: var(--leading-normal);
        }
        .bx-card-go {
          font-size: var(--type-scale-01);
          color: var(--color-brand);
          letter-spacing: var(--tracking-wide);
          margin-top: var(--spacing-01);
          opacity: 0.6;
          transition: opacity var(--transition-fast);
        }

        /* ——— Flujo ——— */
        .bx-flow, .bx-final { padding: 0; }
        .bx-bar {
          height: 2px;
          background: var(--border-subtle);
          margin-bottom: var(--spacing-05);
        }
        .bx-bar span {
          display: block;
          height: 100%;
          background: var(--color-brand);
          transition: width 0.25s ease;
        }
        .bx-meta {
          font-size: var(--type-scale-01);
          letter-spacing: var(--tracking-caps);
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: var(--weight-medium);
        }
        .bx-q {
          font-size: var(--type-scale-07);
          font-weight: var(--weight-bold);
          letter-spacing: var(--tracking-tight);
          margin: var(--spacing-06) 0 var(--spacing-03);
          line-height: var(--leading-snug);
        }
        .bx-sub {
          color: var(--text-secondary);
          font-size: var(--type-scale-02);
          margin: 0 0 var(--spacing-03);
        }
        .bx-opts {
          display: grid;
          gap: var(--spacing-03);
          margin-top: var(--spacing-06);
        }
        .bx-opt {
          text-align: left;
          background: transparent;
          border: 1px solid var(--border-subtle);
          padding: var(--spacing-05) var(--spacing-06);
          cursor: pointer;
          display: grid;
          gap: var(--spacing-02);
          transition: border-color var(--transition-fast);
          border-radius: 0;
        }
        .bx-opt:hover { border-color: var(--text-primary); }
        .bx-opt[aria-pressed="true"] {
          border-color: var(--color-brand);
          border-left-width: 3px;
        }
        .bx-opt-t {
          font-weight: var(--weight-semibold);
          font-size: var(--type-scale-03);
          color: var(--text-primary);
        }
        .bx-opt-d {
          font-size: var(--type-scale-02);
          color: var(--text-secondary);
        }
        .bx-multi {
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: var(--spacing-04);
        }
        .bx-chk {
          width: 18px;
          height: 18px;
          border: 1.5px solid var(--text-primary);
          display: inline-block;
          flex-shrink: 0;
        }
        .bx-multi[aria-pressed="true"] .bx-chk {
          background: var(--color-brand);
          border-color: var(--color-brand);
        }
        .bx-sliderbox { margin-top: var(--spacing-07); }
        .bx-sliderval {
          font-size: var(--type-scale-08);
          font-weight: var(--weight-bold);
          letter-spacing: var(--tracking-tight);
          margin-bottom: var(--spacing-05);
          color: var(--text-primary);
        }
        .bx-sliderval em {
          font-style: normal;
          font-size: var(--type-scale-02);
          color: var(--text-secondary);
          margin-left: var(--spacing-03);
          font-weight: var(--weight-regular);
        }
        .bx-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 2px;
          background: var(--text-primary);
          outline: none;
        }
        .bx-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px; height: 22px;
          background: var(--color-brand);
          cursor: pointer;
          border: 0;
          border-radius: 0;
        }
        .bx-slider::-moz-range-thumb {
          width: 22px; height: 22px;
          background: var(--color-brand);
          cursor: pointer;
          border: 0;
          border-radius: 0;
        }
        .bx-running {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-top: var(--spacing-07);
          padding-top: var(--spacing-05);
          border-top: 1px solid var(--border-subtle);
          font-size: var(--type-scale-01);
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
        }
        .bx-running strong {
          font-family: var(--font-sans);
          font-size: var(--type-scale-05);
          color: var(--text-primary);
          letter-spacing: var(--tracking-tight);
          text-transform: none;
          font-weight: var(--weight-bold);
        }
        .bx-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: var(--spacing-07);
          gap: var(--spacing-04);
        }
        .bx-back {
          background: transparent;
          border: 0;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: var(--type-scale-02);
          cursor: pointer;
          padding: var(--spacing-03) 0;
          letter-spacing: var(--tracking-wide);
        }
        .bx-back:hover { color: var(--text-primary); }
        .bx-next {
          background: var(--color-brand);
          color: var(--text-on-brand);
          border: 2px solid var(--color-brand);
          padding: var(--spacing-04) var(--spacing-07);
          font-family: var(--font-sans);
          font-size: var(--type-scale-02);
          font-weight: var(--weight-bold);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 0;
          transition: background var(--transition-fast), border-color var(--transition-fast);
        }
        .bx-next:hover {
          background: var(--color-brand-hover);
          border-color: var(--color-brand-hover);
        }

        /* ——— Cierre ——— */
        .bx-price {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-top: var(--spacing-06);
          padding-bottom: var(--spacing-05);
          border-bottom: 2px solid var(--text-primary);
        }
        .bx-price-l {
          font-size: var(--type-scale-01);
          letter-spacing: var(--tracking-caps);
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: var(--weight-medium);
        }
        .bx-price-n {
          font-size: var(--type-scale-08);
          font-weight: var(--weight-bold);
          color: var(--color-brand);
          letter-spacing: var(--tracking-tight);
        }
        .bx-dep {
          display: flex;
          justify-content: space-between;
          font-size: var(--type-scale-02);
          background: var(--color-brand);
          color: var(--text-on-brand);
          padding: var(--spacing-04) var(--spacing-05);
          margin-top: var(--spacing-04);
          font-weight: var(--weight-medium);
        }
        .bx-incl-h {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-top: var(--spacing-07);
          margin-bottom: var(--spacing-03);
        }
        .bx-incl-h > span {
          font-size: var(--type-scale-01);
          letter-spacing: var(--tracking-caps);
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: var(--weight-medium);
        }
        .bx-vista {
          background: transparent;
          border: 1px solid var(--border-subtle);
          font-size: var(--type-scale-01);
          padding: var(--spacing-02) var(--spacing-04);
          cursor: pointer;
          color: var(--text-primary);
          font-family: var(--font-sans);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          border-radius: 0;
          transition: border-color var(--transition-fast), color var(--transition-fast);
        }
        .bx-vista:hover { border-color: var(--color-brand); color: var(--color-brand); }
        .bx-tareas {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .bx-tareas li {
          display: flex;
          justify-content: space-between;
          gap: var(--spacing-04);
          padding: var(--spacing-04) 0;
          border-bottom: 1px solid var(--border-subtle);
          font-size: var(--type-scale-02);
          line-height: var(--leading-normal);
        }
        .bx-tareas em {
          font-style: normal;
          color: var(--color-brand);
          font-size: var(--type-scale-01);
          white-space: nowrap;
          font-weight: var(--weight-semibold);
          letter-spacing: var(--tracking-wide);
        }
        .bx-studio {
          font-size: var(--type-scale-01);
          color: var(--text-secondary);
          margin-top: var(--spacing-04);
          padding: var(--spacing-04) var(--spacing-05);
          border: 1px dashed var(--border-strong);
        }
        .bx-tlabel {
          display: block;
          margin-top: var(--spacing-07);
          font-size: var(--type-scale-03);
          font-weight: var(--weight-medium);
        }
        .bx-tlabel em {
          color: var(--text-secondary);
          font-style: normal;
          font-size: var(--type-scale-01);
          margin-left: var(--spacing-02);
        }
        .bx-textarea {
          width: 100%;
          margin-top: var(--spacing-03);
          font-family: var(--font-sans);
          font-size: var(--type-scale-03);
          background: transparent;
          border: 1px solid var(--border-subtle);
          padding: var(--spacing-04);
          color: var(--text-primary);
          resize: vertical;
          border-radius: 0;
          line-height: var(--leading-normal);
        }
        .bx-textarea:focus { outline: none; border-color: var(--color-brand); }
        .bx-inputs {
          display: grid;
          gap: var(--spacing-03);
          margin-top: var(--spacing-06);
        }
        .bx-input {
          font-family: var(--font-sans);
          font-size: var(--type-scale-03);
          background: transparent;
          border: 0;
          border-bottom: 1.5px solid var(--text-primary);
          padding: var(--spacing-03) var(--spacing-01);
          color: var(--text-primary);
          border-radius: 0;
        }
        .bx-input:focus { outline: none; border-color: var(--color-brand); }
        .bx-input::placeholder { color: var(--text-placeholder); }
        .bx-cta {
          margin-top: var(--spacing-06);
          width: 100%;
          background: var(--color-brand);
          color: var(--text-on-brand);
          border: 2px solid var(--color-brand);
          padding: var(--spacing-05);
          font-family: var(--font-sans);
          font-size: var(--type-scale-02);
          font-weight: var(--weight-bold);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 0;
          transition: background var(--transition-fast), border-color var(--transition-fast);
        }
        .bx-cta:hover { background: var(--color-brand-hover); border-color: var(--color-brand-hover); }
        .bx-after { margin-top: var(--spacing-05); }
        .bx-ok {
          font-size: var(--type-scale-02);
          color: var(--text-secondary);
          line-height: var(--leading-normal);
        }
        .bx-contact {
          display: flex;
          gap: var(--spacing-03);
          margin-top: var(--spacing-04);
        }
        .bx-ghost {
          flex: 1;
          text-align: center;
          text-decoration: none;
          color: var(--color-brand);
          border: 2px solid var(--color-brand);
          padding: var(--spacing-04);
          font-family: var(--font-sans);
          font-size: var(--type-scale-02);
          font-weight: var(--weight-bold);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          transition: background var(--transition-fast), color var(--transition-fast);
        }
        .bx-ghost:hover { background: var(--color-brand); color: var(--text-on-brand); }
        .bx-fine {
          font-size: var(--type-scale-01);
          color: var(--text-secondary);
          margin-top: var(--spacing-06);
          line-height: var(--leading-relaxed);
        }
        .bx-note { margin-top: var(--spacing-05); }
        .bx-noteadd {
          background: transparent;
          border: 0;
          color: var(--color-brand);
          font-family: var(--font-sans);
          font-size: var(--type-scale-01);
          letter-spacing: var(--tracking-wide);
          cursor: pointer;
          padding: var(--spacing-02) 0;
          text-transform: uppercase;
        }
        .bx-noteadd:hover { opacity: var(--opacity-hover); }
        .bx-noteta {
          width: 100%;
          font-family: var(--font-sans);
          font-size: var(--type-scale-02);
          background: transparent;
          border: 1px solid var(--color-brand);
          padding: var(--spacing-03);
          color: var(--text-primary);
          resize: vertical;
          border-radius: 0;
          line-height: var(--leading-normal);
        }
        .bx-noteta:focus { outline: none; }
        .bx-agenda {
          margin-top: var(--spacing-07);
          border: 1px solid var(--border-subtle);
          padding: var(--spacing-05) var(--spacing-06);
        }
        .bx-agenda-h {
          font-size: var(--type-scale-01);
          letter-spacing: var(--tracking-caps);
          text-transform: uppercase;
          color: var(--color-brand);
          margin-bottom: var(--spacing-05);
          font-weight: var(--weight-semibold);
        }
        .bx-agenda ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: var(--spacing-04);
        }
        .bx-agenda li {
          font-size: var(--type-scale-02);
          display: grid;
          gap: var(--spacing-02);
          line-height: var(--leading-normal);
        }
        .bx-agenda-q {
          font-size: var(--type-scale-01);
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
        }
        .bx-rangenote {
          font-size: var(--type-scale-01);
          color: var(--text-secondary);
          margin-top: var(--spacing-05);
          line-height: var(--leading-relaxed);
        }
        .bx-studio-line {
          font-size: var(--type-scale-01);
          color: var(--text-secondary);
          line-height: var(--leading-normal);
        }
        .bx-check-h {
          font-size: var(--type-scale-01);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          color: var(--text-primary);
          font-weight: var(--weight-semibold);
          margin: var(--spacing-05) 0 var(--spacing-04);
        }
        .bx-checks { display: grid; gap: var(--spacing-02); }
        .bx-check {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: var(--spacing-04);
          align-items: start;
          text-align: left;
          background: #E6E6E6;
          border: 1px solid var(--border-subtle);
          padding: var(--spacing-04) var(--spacing-05);
          cursor: pointer;
          border-radius: 0;
          transition: border-color var(--transition-fast);
        }
        .bx-check:hover { border-color: var(--text-primary); }
        .bx-check-box {
          width: 16px;
          height: 16px;
          border: 1.5px solid var(--text-primary);
          margin-top: 2px;
          border-radius: 0;
          transition: background var(--transition-fast);
        }
        /* sube → brand blue */
        .bx-check.up[aria-pressed="true"] { border-color: var(--color-brand); }
        .bx-check.up[aria-pressed="true"] .bx-check-box { background: var(--color-brand); border-color: var(--color-brand); }
        .bx-check.up[aria-pressed="true"] .bx-check-w { color: var(--color-brand); }
        /* baja → black fill */
        .bx-check.down[aria-pressed="true"] { border-color: var(--text-primary); background: var(--surface-subtle); }
        .bx-check.down[aria-pressed="true"] .bx-check-box { background: var(--text-primary); border-color: var(--text-primary); }
        .bx-check.down[aria-pressed="true"] .bx-check-w { color: var(--text-primary); }
        .bx-check-body { display: grid; gap: var(--spacing-01); }
        .bx-check-l {
          font-size: var(--type-scale-02);
          font-weight: var(--weight-medium);
          line-height: var(--leading-snug);
          color: var(--text-primary);
        }
        .bx-check-p {
          font-size: var(--type-scale-01);
          color: var(--text-secondary);
          line-height: var(--leading-snug);
        }
        .bx-check-w {
          font-size: var(--type-scale-01);
          color: var(--text-secondary);
          white-space: nowrap;
          font-weight: var(--weight-semibold);
          letter-spacing: var(--tracking-wide);
        }
        .bx-final-price {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-top: var(--spacing-05);
          padding-top: var(--spacing-04);
          border-top: 2px solid var(--text-primary);
          font-size: var(--type-scale-01);
          letter-spacing: var(--tracking-caps);
          text-transform: uppercase;
          font-weight: var(--weight-medium);
        }
        .bx-final-num {
          font-family: var(--font-sans);
          font-size: var(--type-scale-07);
          font-weight: var(--weight-bold);
          color: var(--color-brand);
          letter-spacing: var(--tracking-tight);
          text-transform: none;
        }

        /* ——— Focus ——— */
        button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 2px solid var(--color-brand);
          outline-offset: 2px;
        }

        /* ——— Responsive ——— */
        @media (max-width: 560px) {
          .bx-page  { padding: 0; }
          .bx-frame { padding: var(--spacing-07) var(--spacing-06); }
          .bx-h1    { font-size: var(--type-scale-07); }
          .bx-q     { font-size: var(--type-scale-06); }
          .bx-price-n { font-size: var(--type-scale-07); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('cotizador-root')).render(<Cotizador />);
