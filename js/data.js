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
  musica: "assets/music/navidad.mp3", // Pon aquí tu canción (o "" para quitar el botón)

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
    mensaje: "Primer regalito del calendario", titulo: "Tu primera sorpresa", descripcion: "Un super Kinder Bueno"
  },
  {
    dia: 2, tipo: "texto", pregunta: "¿Donde fimos en nuestro primer viaje juntos?",
    respuestas: ["Madrid"], pista: "Me acople en el ultimo mometo.",
    mensaje: "Contigo nunca me pierdo: tú eres mi norte.", titulo: "Regalo 2", descripcion: "   ✏️    "
  },
  {
    dia: 3, tipo: "ordenar", pregunta: "Ordena las palabras para formar la frase:",
    correcta: "Té amo, Té adoro y te compro un loro", pista: "Empieza por «Eres».",
    mensaje: "Y lo digo en serio.", titulo: "Regalo 3", descripcion: "     ✏️   "
  },
  {
    dia: 4, tipo: "texto", pregunta: "¿Que tres emjis uso para darte las buenas noches?",
    respuestas: ["🤍🫶🏼💖"],
    mensaje: "Te dejo mirar el movil.", titulo: "Regalo 4", descripcion: "     ✏️     "
  },
  {
    dia: 5, tipo: "test", pregunta: "¿Que dia oficialmente fuimos novios?",
    opciones: ["02/09", "01/09", "31/08"], correcta: "02/09", pista: "Hicimos lo mismo que la primera cita",
    mensaje: "Sabia que te ibas a acordar...", titulo: "Regalo 5", descripcion: "    ✏️    "
  },
  {
    dia: 6, tipo: "texto", pregunta: "",
    respuestas: ["rudolph", "rodolfo"], pista: "Empieza por R.",
    mensaje: "Tu sonrisa ilumina más que su nariz.", titulo: "Regalo 6", descripcion: "    ✏️    "
  },
  {
    dia: 7, tipo: "ordenar", pregunta: "Ordena la frase:",
    correcta: "Contigo cada día es Navidad", pista: "Empieza por «Contigo».",
    mensaje: "Una semana de sorpresas ya.", titulo: "Regalo 7", descripcion: "      ✏️  "
  },
  {
    dia: 8, tipo: "test", pregunta: "✏️ ¿Cuál es mi comida favorita?",
    opciones: ["Pizza", "Sushi", "Paella"], correcta: "Pizza", pista: "✏️ Pista personal.",
    mensaje: "Y mi plan favorito: comerla contigo.", titulo: "Regalo 8", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 9, tipo: "texto", pregunta: "¿Cuál es la capital de Australia?",
    respuestas: ["canberra"], pista: "No es Sídney.",
    mensaje: "Contigo iría hasta el fin del mundo.", titulo: "Regalo 9", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 10, tipo: "texto", pregunta: "Cuanto más me quitas, más grande soy. ¿Qué soy?",
    respuestas: ["agujero", "un agujero", "hoyo", "un hoyo"], pista: "Se hace con una pala.",
    mensaje: "Contigo no falta nada.", titulo: "Regalo 10", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 11, tipo: "test", pregunta: "¿Qué flor simboliza el amor?",
    opciones: ["Girasol", "Rosa roja", "Margarita"], correcta: "Rosa roja", pista: "Tiene espinas.",
    mensaje: "Tú eres mi flor favorita.", titulo: "Regalo 11", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 12, tipo: "texto", pregunta: "✏️ ¿En qué mes empezamos a salir?",
    respuestas: ["marzo"], pista: "✏️ Pista personal.",
    mensaje: "El mejor mes de mi vida.", titulo: "Regalo 12", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 13, tipo: "ordenar", pregunta: "Ordena la frase:",
    correcta: "Mi lugar favorito es a tu lado", pista: "Empieza por «Mi».",
    mensaje: "Siempre.", titulo: "Regalo 13", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 14, tipo: "test", pregunta: "¿En qué año llegó el ser humano a la Luna?",
    opciones: ["1959", "1969", "1979"], correcta: "1969", pista: "Apolo 11.",
    mensaje: "Te querría hasta la Luna y volver.", titulo: "Regalo 14", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 15, tipo: "texto", pregunta: "¿Cuántos días tiene febrero en un año bisiesto? (en número)",
    respuestas: ["29", "veintinueve"], pista: "Uno más de lo normal.",
    mensaje: "Un día extra contigo nunca sobra.", titulo: "Regalo 15", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 16, tipo: "texto", pregunta: "✏️ ¿Cuál fue la primera película que vimos juntos?",
    respuestas: ["titanic"], pista: "✏️ Pista personal.",
    mensaje: "Yo solo miraba de reojo tu sonrisa.", titulo: "Regalo 16", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 17, tipo: "ordenar", pregunta: "Ordena la frase:",
    correcta: "Gracias por hacerme tan feliz", pista: "Empieza por «Gracias».",
    mensaje: "Gracias, de corazón.", titulo: "Regalo 17", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 18, tipo: "test", pregunta: "¿Qué país popularizó el árbol de Navidad decorado?",
    opciones: ["Brasil", "Alemania", "Japón"], correcta: "Alemania", pista: "Tierra de mercadillos navideños.",
    mensaje: "Montar el árbol contigo es mi plan ideal.", titulo: "Regalo 18", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 19, tipo: "texto", pregunta: "Tengo teclas pero no abro puertas. ¿Qué soy?",
    respuestas: ["piano", "un piano", "teclado", "un teclado"], pista: "Suena muy bonito.",
    mensaje: "Tú pones música a mis días.", titulo: "Regalo 19", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 20, tipo: "test", pregunta: "✏️ ¿Qué apodo cariñoso uso más contigo?",
    opciones: ["Cariño", "Princesa", "Vida"], correcta: "Vida", pista: "✏️ Pista personal.",
    mensaje: "Y es que eres mi vida.", titulo: "Regalo 20", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 21, tipo: "texto", pregunta: "Soy blanco, caigo del cielo en invierno y con mis copos se hacen muñecos. ¿Qué soy?",
    respuestas: ["nieve", "la nieve"], pista: "Mira cómo cae en esta página.",
    mensaje: "Contigo hasta el frío es bonito.", titulo: "Regalo 21", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 22, tipo: "ordenar", pregunta: "Ordena la frase:",
    correcta: "Quiero pasar la vida contigo", pista: "Empieza por «Quiero».",
    mensaje: "Toda la vida.", titulo: "Regalo 22", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 23, tipo: "test", pregunta: "¿Cuántos planetas tiene el Sistema Solar?",
    opciones: ["7", "8", "9"], correcta: "8", pista: "Plutón ya no cuenta.",
    mensaje: "Mañana, el gran final.", titulo: "Regalo 23", descripcion: "✏️ Describe el regalo."
  },
  {
    dia: 24, tipo: "texto", pregunta: "Última prueba. Completa: «Te ___ mucho»",
    respuestas: ["quiero", "amo", "adoro"], pista: "Lo que siento por ti.",
    mensaje: "(El día 24 usa la carta y el mensaje final de CONFIG.)", titulo: "El gran regalo de Navidad", descripcion: "✏️ Describe aquí el último regalo."
  }
];

// No toques esto: rellena las rutas de fotos por defecto (day-01.jpg ...).
DIAS.forEach(d => {
  const n = String(d.dia).padStart(2, "0");
  d.foto = d.foto || `assets/photos/day-${n}.jpg`;
  d.regalo = d.regalo || `assets/gifts/day-${n}.jpg`;
});
