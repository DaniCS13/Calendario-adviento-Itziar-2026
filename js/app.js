/* APP.JS · Lógica del calendario. Normalmente NO hace falta tocarlo. */
(function () {
  "use strict";
  const C = CONFIG, D = DIAS, KEY = "adviento-" + C.anio;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\/ ]/g, "").replace(/\s+/g, " ").trim();
  const LABEL = { test: "Pregunta test", texto: "Respuesta escrita", ordenar: "Ordena la frase" };
  // MODO PRUEBA: si la dirección lleva ?dia=N (o diaPrueba en data.js), el progreso NO se carga ni se guarda.
  const PRUEBA = new URLSearchParams(location.search).get("dia") !== null || Number.isInteger(C.diaPrueba);
  let done = [], unlocked = 0, nuevo = null;
  if (!PRUEBA) { try { done = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { } }
  const save = () => { if (PRUEBA) return; try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) { } };

  // Fecha real: se lee de la cabecera "Date" del servidor (no del reloj del móvil).
  async function fecha() {
    try {
      const r = await fetch(location.pathname, { method: "HEAD", cache: "no-store" });
      const h = r.headers.get("Date"); const d = h && new Date(h);
      if (d && !isNaN(d)) return d;
    } catch (e) { }
    return new Date(); // Plan B: reloj del dispositivo
  }
  function diasDesbloqueados(d) {
    const p = new Intl.DateTimeFormat("en-CA", { timeZone: C.zonaHoraria, year: "numeric", month: "2-digit", day: "2-digit" }).format(d).split("-").map(Number);
    const k = p[0] * 10000 + p[1] * 100 + p[2], a = C.anio * 10000;
    return k >= a + 1224 ? 24 : k >= a + 1201 ? p[2] : 0;
  }

  // Días que faltan hasta el 1 de diciembre (según la fecha real del servidor).
  function diasHasta(d) {
    const p = new Intl.DateTimeFormat("en-CA", { timeZone: C.zonaHoraria, year: "numeric", month: "2-digit", day: "2-digit" }).format(d).split("-").map(Number);
    return Math.round((Date.UTC(C.anio, 11, 1) - Date.UTC(p[0], p[1] - 1, p[2])) / 864e5);
  }
  function contador(ahora) {
    const n = diasHasta(ahora);
    if (n < 1) return;
    const e = document.createElement("div"); e.className = "cuenta";
    e.innerHTML = `<span class="cn">${n === 1 ? "¡Solo falta 1 día!" : `Faltan ${n} días`}</span><span class="cs">para abrir la primera puerta, el 1 de diciembre 🎄</span>`;
    $("#dedicatoria").after(e);
  }

  function toast(t) { const e = $("#toast"); e.textContent = t; e.classList.add("on"); setTimeout(() => e.classList.remove("on"), 2500); }

  function grid() {
    $("#grid").innerHTML = D.map(d => {
      const st = done.includes(d.dia) ? "done" : d.dia <= unlocked ? "avail" : "locked";
      const ic = st === "done" ? "✓" : st === "avail" ? "❤️" : "🔒";
      const ph = st === "done" && C.fotoEnPuertas ? `<img class="ph" src="${esc(d.foto)}" alt="" loading="lazy" onerror="this.remove()">` : "";
      return `<button class="door ${st}${d.dia === nuevo ? " wait" : ""}" data-d="${d.dia}">${ph}<span class="n num">${d.dia}</span><small class="n">${ic}</small></button>`;
    }).join("");
    const n = done.length;
    $("#barra").style.width = (n / 24 * 100) + "%";
    $("#progreso").textContent = `${n} de 24 sorpresas descubiertas`;
  }

  function burst(n, chars) {
    const b = document.createElement("div"); b.className = "burst";
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.textContent = chars[i % chars.length];
      s.style.cssText = `left:${Math.random() * 100}%;font-size:${16 + Math.random() * 22}px;animation-delay:${Math.random() * 1.2}s`;
      b.appendChild(s);
    }
    document.body.appendChild(b); setTimeout(() => b.remove(), 5000);
  }

  function abrir(html) { $("#contenido").innerHTML = html; $("#modal").hidden = false; $(".panel").scrollTop = 0; }
  const cerrar = () => {
    $("#modal").hidden = true;
    if (nuevo) { // al cerrar, la puerta "revela" la foto
      const b = document.querySelector(`[data-d="${nuevo}"]`); nuevo = null;
      if (b) { b.classList.remove("wait"); b.classList.add("reveal"); }
    }
  };

  function openDay(n) {
    if (n > unlocked) {
      const b = document.querySelector(`[data-d="${n}"]`); b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 400);
      return toast("Todavía no es el momento… ¡paciencia, mi amor! 💕");
    }
    const d = D[n - 1];
    done.includes(n) ? reward(d, false) : quiz(d);
  }

  function correcta(d, v) {
    return d.tipo === "texto" ? d.respuestas.some(r => norm(r) === norm(v)) : norm(d.correcta) === norm(v);
  }

  function quiz(d) {
    let h = `<p class="tag">Día ${d.dia} · ${LABEL[d.tipo]}</p><h2>${esc(d.pregunta)}</h2>`;
    let words = [];
    if (d.tipo === "test") h += `<div class="opts">${d.opciones.map(o => `<button class="opt" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
    if (d.tipo === "texto") h += `<input id="ans" placeholder="Tu respuesta…" autocomplete="off"><button class="btn" id="ok">Comprobar</button>`;
    if (d.tipo === "ordenar") {
      words = d.correcta.split(" ").map((w, i) => ({ w, i })).sort(() => Math.random() - .5);
      h += `<div id="built"></div><div class="chips">${words.map((o, k) => `<button class="chip" data-k="${k}">${esc(o.w)}</button>`).join("")}</div>
            <button class="btn" id="ok">Comprobar</button><button class="btn" id="rs">Reiniciar</button>`;
    }
    h += `<p class="fb" id="fb"></p><button class="opt" id="hb">💡 Pista</button><p class="hint" id="hint"></p>`;
    abrir(h);
    let built = [];
    const intento = v => {
      if (correcta(d, v)) { if (!done.includes(d.dia)) { done.push(d.dia); nuevo = d.dia; } save(); grid(); reward(d, true); }
      else { $("#fb").textContent = "Casi… ¡inténtalo otra vez! 💕"; }
    };
    $("#hb").onclick = () => { $("#hint").textContent = d.pista || ""; };
    document.querySelectorAll(".opt[data-v]").forEach(b => b.onclick = () => intento(b.dataset.v));
    if ($("#ans")) { $("#ok").onclick = () => intento($("#ans").value); $("#ans").onkeydown = e => { if (e.key === "Enter") $("#ok").click(); }; }
    if (d.tipo === "ordenar") {
      document.querySelectorAll(".chip").forEach(c => c.onclick = () => { built.push(words[c.dataset.k].w); c.disabled = true; $("#built").textContent = built.join(" "); });
      $("#rs").onclick = () => { built = []; $("#built").textContent = ""; document.querySelectorAll(".chip").forEach(c => c.disabled = false); };
      $("#ok").onclick = () => intento(built.join(" "));
    }
  }

  function reward(d, anim) {
    const last = d.dia === 24;
    if (anim) burst(last ? 60 : 18, last ? ["❄️", "❤️", "✨", "🎄"] : ["❤️", "✨"]);
    const s1 = last
      ? `<p class="tag">Día 24 · Nochebuena</p><h2>Una carta para ti 💌</h2><img src="${esc(d.foto)}" alt="Nosotros"><div class="carta">${C.carta.map(p => `<p>${esc(p)}</p>`).join("")}</div>`
      : `<p class="tag">Día ${d.dia}</p><h2>¡Correcto! 🎉</h2><img src="${esc(d.foto)}" alt="Nosotros"><p class="msg">`;
    const s2 = `<img src="${esc(d.regalo)}" alt="Regalo"><h2>${esc(d.titulo)}</h2><p>${esc(d.descripcion)}</p>` +
      (last ? `<p class="final">${esc(C.mensajeFinal)}</p>` : "");
    if (!last) { // días 1-23: al acertar se muestra directamente el regalo (sin la foto de ustedes)
      abrir(`<div class="stage"><p class="tag">Día ${d.dia}</p><h2>¡Correcto! 🎉</h2>${s2}</div>`);
      return;
    }
    abrir(`<div class="stage">${s1}<button class="btn" id="nx">Ver mi regalo 🎁</button></div><div class="stage" id="s2" hidden>${s2}</div>`);
    $("#nx").onclick = e => { e.target.hidden = true; $("#s2").hidden = false; $(".panel").scrollTo({ top: 99999, behavior: "smooth" }); if (last) burst(40, ["🎄", "❤️", "❄️"]); };
  }

  // Si una foto no existe, muestra un recuadro elegante en vez de romperse.
  document.addEventListener("error", e => {
    const t = e.target;
    if (t.tagName === "IMG" && t.closest(".panel")) {
      const m = document.createElement("div"); m.className = "missing";
      m.innerHTML = `📷<br>Falta la imagen<br><small>${esc(t.getAttribute("src"))}</small>`; t.replaceWith(m);
    }
  }, true);

  function nieve() {
    const s = $("#snow");
    for (let i = 0; i < 20; i++) {
      const e = document.createElement("span"); e.textContent = "❄";
      e.style.cssText = `left:${Math.random() * 100}%;font-size:${7 + Math.random() * 10}px;animation-duration:${7 + Math.random() * 9}s;animation-delay:-${Math.random() * 12}s`;
      s.appendChild(e);
    }
  }

  // Fotos vuestras que aparecen y desaparecen A LA VEZ en varios huecos alrededor del calendario.
  // Cada hueco (a izquierda y derecha) funciona por su cuenta: muestra una foto, la desvanece y pone otra.
  function flotantes() {
    if (!C.fotosFlotantes) return;
    const box = document.createElement("div"); box.className = "floaty"; document.body.appendChild(box);
    const VIDA = 14000;      // cuánto tiempo se queda cada foto (ms)
    const ENTRE = 3500;      // cada cuánto aparece una foto nueva al empezar (ms): van llegando de poco en poco
    const porLado = innerWidth >= 900 ? 4 : 3;
    const rotas = new Set(); // fotos que no existen (no se vuelven a intentar)
    // Desde el principio, sin abrir ningún día: fotos de los 24 días + fotos extra.
    // (Si en data.js pones fotosFlotantesDe: "extra", solo salen las de fotosExtra.)
    const pool = () => {
      const extra = C.fotosExtra || [];
      const todas = C.fotosFlotantesDe === "extra" ? extra : D.map(d => d.foto).concat(extra);
      return todas.filter(f => !rotas.has(f));
    };
    function hueco(izq, k, retraso) {
      const mostrar = () => {
        const fotos = pool();
        if (!fotos.length) return setTimeout(mostrar, 3000);
        const usadas = [...box.querySelectorAll("img")].map(e => e.dataset.f);
        const libres = fotos.filter(f => !usadas.includes(f));
        const lista = libres.length ? libres : fotos;
        const foto = lista[Math.floor(Math.random() * lista.length)];
        const W = innerWidth, H = innerHeight, margen = (W - 640) / 2;
        const enMargen = margen >= 120;
        const size = enMargen ? Math.min(150, margen - 15) : (W < 600 ? 90 : 110);
        let x;
        if (enMargen) x = (izq ? 5 : W - margen + 5) + Math.random() * Math.max(0, margen - size - 10);
        else x = izq ? -size * .35 + Math.random() * 8 : W - size * .65 - Math.random() * 8; // en móvil asoman por los bordes
        const banda = (H - size) / porLado;
        const y = Math.max(5, k * banda + Math.random() * Math.max(0, banda - 10));
        const el = document.createElement("img"); el.src = foto; el.alt = ""; el.dataset.f = foto;
        let t;
        el.onerror = () => { rotas.add(foto); el.remove(); clearTimeout(t); setTimeout(mostrar, 300); };
        el.style.cssText = `width:${size}px;left:${x}px;top:${y}px;--r:${Math.random() * 24 - 12}deg;animation-duration:${VIDA}ms`;
        box.appendChild(el);
        t = setTimeout(() => { el.remove(); setTimeout(mostrar, 1500 + Math.random() * 3000); }, VIDA);
      };
      setTimeout(mostrar, retraso);
    }
    for (let k = 0; k < porLado; k++) { hueco(true, k, 2 * k * ENTRE + Math.random() * 1500); hueco(false, k, (2 * k + 1) * ENTRE + Math.random() * 1500); }
  }

  function musica() {
    if (!C.musica) return;
    const b = $("#musica"), a = new Audio(C.musica); a.loop = true; b.hidden = false; b.classList.add("off");
    b.onclick = () => {
      if (a.paused) a.play().then(() => b.classList.remove("off")).catch(() => toast("Añade la canción en assets/music/"));
      else { a.pause(); b.classList.add("off"); }
    };
  }

  async function init() {
    $("#titulo").textContent = C.titulo; $("#dedicatoria").textContent = C.dedicatoria; document.title = C.titulo;
    const q = new URLSearchParams(location.search).get("dia");
    const t = q !== null ? parseInt(q, 10) : C.diaPrueba;
    const ahora = await fecha();
    unlocked = Number.isInteger(t) ? Math.max(0, Math.min(24, t)) : diasDesbloqueados(ahora);
    if (unlocked === 0) contador(ahora);
    if (PRUEBA) { const b = document.createElement("div"); b.className = "prueba"; b.textContent = "🧪 Modo prueba: el progreso no se guarda. Recarga para empezar de cero."; document.body.appendChild(b); }
    grid(); nieve(); flotantes(); musica();
    $("#grid").onclick = e => { const b = e.target.closest(".door"); if (b) openDay(+b.dataset.d); };
    $("#cerrar").onclick = cerrar;
    $("#modal").onclick = e => { if (e.target.id === "modal") cerrar(); };
    document.onkeydown = e => { if (e.key === "Escape") cerrar(); };
  }
  init();
})();