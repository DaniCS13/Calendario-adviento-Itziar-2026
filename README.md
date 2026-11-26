# 🎄 Nuestro Adviento ❤️ · Calendario de Adviento romántico

Web interactiva (HTML + CSS + JavaScript puro) con 24 puertas, una prueba y una sorpresa cada día del 1 al 24 de diciembre de 2026. Sin instalar nada para ella: solo abre un enlace.

## Estructura
```
Calendario-Adviento/
├─ index.html          (estructura, no se toca)
├─ css/style.css       (colores y diseño)
├─ js/data.js          ← ÚNICO archivo que editarás
├─ js/app.js           (lógica, no se toca)
├─ assets/photos/      day-01.jpg ... day-24.jpg  (fotos de vosotros)
├─ assets/gifts/       day-01.jpg ... day-24.jpg  (fotos de los regalos)
└─ assets/music/       navidad.mp3 (opcional)
```

## 1. Abrirlo en Visual Studio Code
1. Descomprime el ZIP.
2. VS Code → **Archivo → Abrir carpeta…** → elige `Calendario-Adviento`.
3. Abre `js/data.js`: todo lo editable tiene comentarios en español.

## 2. Instalar y usar Live Server
1. En VS Code pulsa el icono de Extensiones (cuadrados, `Ctrl+Shift+X`).
2. Busca **Live Server** (Ritwick Dey) → **Install**.
3. Abre `index.html`, clic derecho → **Open with Live Server**. Se abre el navegador y se actualiza al guardar.
> Abrir `index.html` con doble clic también funciona, pero la fecha se tomará del reloj de tu equipo (ver apartado 6).

## 3. Dónde poner las fotos
- Fotos de vosotros: `assets/photos/day-01.jpg` … `day-24.jpg`
- Fotos de los regalos: `assets/gifts/day-01.jpg` … `day-24.jpg`
- Usa siempre minúsculas y `.jpg`. **Reduce las fotos** (unos 1200 px de ancho, <300 KB cada una) para que carguen rápido en el móvil.
- Si falta una foto, la web muestra un recuadro "Falta la imagen" con la ruta esperada, sin romperse.
- ¿Otro nombre o formato? En `data.js`, dentro de ese día: `foto: "assets/photos/playa.png"` o `regalo: "assets/gifts/libro.png"`.

### Fotos en el calendario
Las puertas sin resolver muestran solo el número, bien visible. Al resolver la prueba de un día y cerrar la ventana, la puerta **revela** nuestra foto de ese día (`assets/photos/day-XX.jpg`) con un pequeño efecto de "revelado", y el número queda en una insignia dorada en la esquina. Además, fotos suyas aparecen y desaparecen suavemente por los márgenes de la página (de los días disponibles; para que sean solo de los resueltos, usa `fotosFlotantesDe: "completados"` en `data.js`). Se activan o desactivan en `data.js` con `fotoEnPuertas` y `fotosFlotantes` (`true`/`false`).

## 4. Cambiar preguntas y respuestas (ejemplos)
Todo en `js/data.js`.

**Texto** (acepta varias respuestas; ignora mayúsculas y tildes):
```js
{ dia: 4, tipo: "texto", pregunta: "¿Dónde nos conocimos?",
  respuestas: ["biblioteca", "en la biblioteca"], pista: "Había silencio.",
  mensaje: "Qué suerte la mía.", titulo: "Un libro especial", descripcion: "Para leer juntos." }
```
**Test** (3 opciones; `correcta` debe ser idéntica a una opción):
```js
{ dia: 8, tipo: "test", pregunta: "¿Mi color favorito?",
  opciones: ["Rojo", "Azul", "Verde"], correcta: "Azul", pista: "Como el cielo.", ... }
```
**Ordenar** (la web mezcla las palabras):
```js
{ dia: 3, tipo: "ordenar", pregunta: "Ordena la frase:", correcta: "Te quiero mucho", ... }
```
Los días marcados con ✏️ son de relación: **cámbialos por los vuestros**.
El **día 24** usa `CONFIG.carta` (tu carta) y `CONFIG.mensajeFinal` (mensaje de Feliz Navidad).

## 5. Música (opcional)
Copia una canción (con derechos libres o la que tengas) en `assets/music/navidad.mp3`. Aparece un botón 🎵 abajo a la derecha; **no suena hasta que ella lo pulsa**. Para quitarlo: `musica: ""` en `CONFIG`.

## 6. Probar los 24 días sin esperar a diciembre
- Opción A (cómoda): abre `index.html?dia=24` (o `?dia=5`, etc.). Con Live Server: `http://127.0.0.1:5500/index.html?dia=24`.
- Opción B: en `data.js`, `diaPrueba: 24`. **Vuelve a poner `null` antes de publicar.**
- Para reiniciar el progreso: F12 → pestaña *Aplicación* → *Almacenamiento local* → borrar `adviento-2026`.
> Ojo: `?dia=` también funciona para ella si lo conoce. Para ver la web como la verá ella, usa el enlace normal.

**Cómo se decide la fecha real:** la web lee la hora del *servidor* (GitHub) y no la del móvil, así que cambiar la hora del teléfono no desbloquea días. Si no se pudiera consultar el servidor, usa el reloj del dispositivo como plan B. Es una protección práctica, no a prueba de expertos: las respuestas están en `data.js`, que técnicamente es visible en el navegador.

## 7. Publicar en GitHub Pages (gratis)
1. Crea cuenta en https://github.com.
2. **New repository** → nombre `calendario-adviento` → **Public** → Create.
3. Sube el proyecto. Opción fácil: en el repositorio, **Add file → Upload files**, arrastra el *contenido* de la carpeta (index.html, css, js, assets, README.md) y pulsa **Commit changes**. (Opción con VS Code: icono *Control de código fuente* → *Publicar en GitHub*.)
4. **Settings → Pages** → *Source*: **Deploy from a branch** → Branch `main` / carpeta `/ (root)` → **Save**.
5. En 1-2 minutos tendrás tu enlace permanente: `https://TU-USUARIO.github.io/calendario-adviento/`. Ese es el que le envías.
6. Pídele que lo guarde como acceso directo en la pantalla de inicio del móvil.

## 8. Actualizar después
1. Edita `data.js` o cambia fotos en tu ordenador.
2. En VS Code: **Control de código fuente** → escribe un mensaje → **Confirmar** → **Sincronizar cambios** (o sube los archivos de nuevo en la web de GitHub).
3. Espera 1-2 minutos. Ella verá los cambios al **recargar** la página (si no, recarga forzada o cerrar y abrir).
> Su progreso (días completados) se guarda en su navegador: **actualizar la web no lo borra**. Si cambias una pregunta de un día ya completado, seguirá marcado como hecho.

## 9. ¿Es gratis? Costes y límites
- **GitHub Pages: gratis** (sin tarjeta). Límites razonables: sitio <1 GB, ~100 GB de tráfico al mes; de sobra para una persona.
- **Privacidad:** en el plan gratuito el repositorio debe ser **público**, es decir, cualquiera que encuentre la dirección podría ver los archivos (incluidas fotos y regalos, p. ej. `.../assets/gifts/day-20.jpg`, y las respuestas de `data.js`). Si quieres más discreción: no uses datos sensibles, no compartas el enlace y avisa de que ella no mire esas rutas. Alternativa gratuita con repositorio privado: **Cloudflare Pages** o **Netlify** (mismo proyecto, sin cambios de código).
- **Firebase:** no hace falta ni se usa. La primera versión no necesita backend; la fecha se obtiene del servidor sin coste.
- Las fuentes vienen de Google Fonts (necesita Internet; si fallan, usa Georgia).

## 10. Problemas frecuentes
- *No se ven las fotos:* revisa nombre exacto (`day-05.jpg`), minúsculas y que estén subidas.
- *Cambio no visible:* espera 2 min y recarga con `Ctrl+F5`.
- *Error de sintaxis:* suele ser una coma o comilla olvidada en `data.js`; VS Code la subraya en rojo.
