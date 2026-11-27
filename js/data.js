/* ==========================================================================
   DATA.JS  ·  ÚNICO ARCHIVO QUE NECESITAS EDITAR
   --------------------------------------------------------------------------
   1) CONFIG: textos generales, música, carta y mensaje final del día 24.
   2) DIAS: las 24 pruebas y sorpresas.

   TIPOS DE PRUEBA (campo "tipo"):
   - "test"    -> 3 "opciones" + "correcta" (copia EXACTA de una opción).
   - "texto"   -> ella escribe; "respuestas" = lista de respuestas válidas.
                  (Da igual mayúsculas, tildes y signos.)
   - "ordenar" -> "correcta" = la frase completa en orden correcto; la web
                  mezcla las palabras y ella las ordena tocándolas.

   FOTOS: por defecto la web busca
     assets/photos/day-01.jpg ... day-24.jpg  (fotos de vosotros)
     assets/gifts/day-01.jpg  ... day-24.jpg  (foto del regalo)
   Si quieres otro nombre/ruta, añade en ese día:  foto: "assets/photos/otra.jpg"
   o  regalo: "assets/gifts/otra.jpg".
   Los días marcados con ✏️ son preguntas PERSONALES: cámbialas por las vuestras.
   ========================================================================== */

const CONFIG = {
  anio: 2026,                       // Año del calendario
  zonaHoraria: "Europe/Madrid",     // Zona horaria para decidir "qué día es"
  titulo: "Calendario de Adviento 2026",
  dedicatoria: "Para la mejor novia del mundo", // ✏️
  musica: "assets/music/mariahcarey.mp3", // Pon aquí tu canción (o "" para quitar el botón)

  // FOTOS EN EL CALENDARIO (true = sí, false = no)
  fotoEnPuertas: true,    // Al completar un día, su puerta "revela" nuestra foto (el número siempre se ve)
  fotosFlotantes: true,   // Fotos nuestras que aparecen y desaparecen por la página (días completados)
  fotosFlotantesDe: "desbloqueados", // "desbloqueados" = fotos de los días ya disponibles; "completados" = solo de los días ya resueltos

  // PRUEBAS: pon un número (ej. 24) para desbloquear hasta ese día. null = fecha real.
  // También puedes probar con la dirección: index.html?dia=24
  diaPrueba: null,

  // DÍA 24 · Carta romántica (cada línea entre comillas es un párrafo) ✏️
  carta: [
    "Mi amor:",
    "Espero que te haya gustado este calendario de adviento que te he preparado.",
    "Gracias por cada momento vivido contigo y por los que nos quedan.",
    "Te quiero hoy, mañana y todos los días del año.",
    "Te amo mucho miniña preciosa."
  ],
  // DÍA 24 · Mensaje final ✏️
  mensajeFinal: "¡Feliz Navidad, mi amor! 🎄❤️"
};

const DIAS = [
  {
    dia: 1, tipo: "test", pregunta: "¿Donde fue nuestra primera cita?",
    opciones: ["Montjuic", "Torre Baró", "En el mirador"], correcta: "Torre Baró", pista: "Casi se me cala el coche en subida",
    titulo: "Tu primera sorpresa", descripcion: "Un super Kinder Bueno"
  },
  {
    dia: 2, tipo: "texto", pregunta: "¿Donde fimos en nuestro primer viaje juntos?",
    respuestas: ["Madrid"], pista: "Me acople en el ultimo mometo.",
    titulo: "Regalo 2", descripcion: "   ✏️    "
  },
  {
    dia: 3, tipo: "ordenar", pregunta: "Ordena las palabras para formar la frase:",
    correcta: "Té amo, té adoro y te compro un loro", pista: "🦜",
    titulo: "Regalo 3", descripcion: "     ✏️   "
  },
  {
    dia: 4, tipo: "texto", pregunta: "¿Que tres emjis uso para darte las buenas noches?",
    respuestas: ["🤍🫶🏼💖"],
    titulo: "Regalo 4", descripcion: "     ✏️     "
  },
  {
    dia: 5, tipo: "test", pregunta: "¿Que dia oficialmente fuimos novios?",
    opciones: ["02/09", "01/09", "31/08"], correcta: "02/09", pista: "Hicimos lo mismo que la primera cita",
    titulo: "Regalo 5", descripcion: "    ✏️    "
  },
  {
    dia: 6, tipo: "texto", pregunta: "¿Que animal habia en un guachinche que comimos en Tenerife?",
    respuestas: ["gallinas", "Gallinas"], pista: "Te dan mucho miedo.",
    titulo: "Regalo 6", descripcion: "    ✏️    "
  },
  {

    dia: 7, tipo: "test", pregunta: "¿Como se llama nuestra racha?",
    opciones: ["Pere Milla", "Pocholo", "Gordito"], correcta: "Pere Milla", pista: "Mi jugador favorito",
    titulo: "Regalo 7", descripcion: "       ✏️          "
  },
  {
    dia: 8, tipo: "test", pregunta: "¿Que cenamos una noche en Londres?",
    opciones: ["McDonalds", "Xinolis", "Pizza"], correcta: "Xinolis", pista: "Tupper enorme",
    titulo: "Regalo 8", descripcion: "       ✏️          "
  },
  {
    dia: 9, tipo: "texto", pregunta: "¿Los mejores tacos donde se comen?",
    respuestas: ["Tacos Galos", "tacos galos"], pista: "",
    titulo: "Regalo 9", descripcion: "       ✏️          "
  },
  {
    dia: 10, tipo: "texto", pregunta: "¿Que flores son las que mas te gustan?",
    respuestas: ["lirios", "los lirios"], pista: "",
    titulo: "Regalo 10", descripcion: "       ✏️          "
  },
  {
    dia: 11, tipo: "test", pregunta: "¿Con que coche te fui a buscar la primera cita?",
    opciones: ["Bora", "Picasso", "el bora"], correcta: "Bora", pista: "",
    titulo: "Regalo 11", descripcion: "       ✏️          "
  },
  {
    dia: 12, tipo: "texto", pregunta: "¿Como te suelo llamar?",
    respuestas: ["Mi Pocholeta", "Mi Cachorrita"], pista: "Hay muchas formas",
    titulo: "Regalo 12", descripcion: "       ✏️          "
  },
  {
    dia: 13, tipo: "ordenar", pregunta: "Ordena la frase:",
    correcta: "Mi lugar favorito es a tu lado", pista: "Empieza por «Mi».",
    titulo: "Regalo 13", descripcion: "       ✏️          "
  },
  {
    dia: 14, tipo: "test", pregunta: "¿En qué año llegó el ser humano a la Luna?",
    opciones: ["1959", "1969", "1979"], correcta: "1969", pista: "Apolo 11.",
    titulo: "Regalo 14", descripcion: "       ✏️          "
  },
  {
    dia: 15, tipo: "texto", pregunta: "¿Cuántos días tiene febrero en un año bisiesto? (en número)",
    respuestas: ["29", "veintinueve"], pista: "Uno más de lo normal.",
    titulo: "Regalo 15", descripcion: "       ✏️          "
  },
  {
    dia: 16, tipo: "texto", pregunta: "✏️ ¿Cuál fue la primera película que vimos juntos?",
    respuestas: ["titanic"], pista: "✏️ Pista personal.",
    titulo: "Regalo 16", descripcion: "       ✏️          "
  },
  {
    dia: 17, tipo: "ordenar", pregunta: "Ordena la frase:",
    correcta: "Gracias por hacerme tan feliz", pista: "Empieza por «Gracias».",
    titulo: "Regalo 17", descripcion: "       ✏️          "
  },
  {
    dia: 18, tipo: "test", pregunta: "¿Qué país popularizó el árbol de Navidad decorado?",
    opciones: ["Brasil", "Alemania", "Japón"], correcta: "Alemania", pista: "Tierra de mercadillos navideños.",
    titulo: "Regalo 18", descripcion: "       ✏️          "
  },
  {
    dia: 19, tipo: "texto", pregunta: "Tengo teclas pero no abro puertas. ¿Qué soy?",
    respuestas: ["piano", "un piano", "teclado", "un teclado"], pista: "Suena muy bonito.",
    titulo: "Regalo 19", descripcion: "       ✏️          "
  },
  {
    dia: 20, tipo: "test", pregunta: "✏️ ¿Qué apodo cariñoso uso más contigo?",
    opciones: ["Cariño", "Princesa", "Vida"], correcta: "Vida", pista: "✏️ Pista personal.",
    titulo: "Regalo 20", descripcion: "       ✏️          "
  },
  {
    dia: 21, tipo: "texto", pregunta: "Soy blanco, caigo del cielo en invierno y con mis copos se hacen muñecos. ¿Qué soy?",
    respuestas: ["nieve", "la nieve"], pista: "Mira cómo cae en esta página.",
    titulo: "Regalo 21", descripcion: "       ✏️          "
  },
  {
    dia: 22, tipo: "ordenar", pregunta: "Ordena la frase:",
    correcta: "Quiero pasar la vida contigo", pista: "Empieza por «Quiero».",
    titulo: "Regalo 22", descripcion: "       ✏️          "
  },
  {
    dia: 23, tipo: "test", pregunta: "¿Cuántos planetas tiene el Sistema Solar?",
    opciones: ["7", "8", "9"], correcta: "8", pista: "Plutón ya no cuenta.",
    titulo: "Regalo 23", descripcion: "       ✏️          "
  },
  {
    dia: 24, tipo: "texto", pregunta: "Última prueba. Completa: «Te ___ mucho»",
    respuestas: ["quiero", "amo", "adoro"], pista: "Lo que siento por ti.",
    titulo: "El gran regalo de Navidad", descripcion: "       ✏️          "
  }
];

// No toques esto: rellena las rutas de fotos por defecto (day-01.jpg ...).
DIAS.forEach(d => {
  const n = String(d.dia).padStart(2, "0");
  d.foto = d.foto || `assets/photos/day-${n}.jpg`;
  d.regalo = d.regalo || `assets/gifts/day-${n}.jpg`;
});
