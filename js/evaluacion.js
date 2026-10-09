/*
 * Lógica del examen: selección de preguntas, puntuación y redacción del criterio.
 * Depende de COMPETENCIAS y BANCO (preguntas.js).
 */

const CRITERIOS = {
  // Porcentaje mínimo global para ser APTO
  minimoGlobal: 70,
  // Ninguna competencia evaluada puede quedar por debajo de este porcentaje
  minimoCompetencia: 50,
  // Respuestas "alerta" (puntuación 0) permitidas: máx(1, preguntas / 20)
  alertasPermitidas: (n) => Math.max(1, Math.floor(n / 20)),
};

function barajar(lista) {
  const a = lista.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Elige n preguntas repartidas por igual entre las competencias y baraja sus opciones. */
function seleccionarPreguntas(n) {
  const claves = barajar(Object.keys(COMPETENCIAS));
  const grupos = {};
  claves.forEach((k) => (grupos[k] = barajar(BANCO.filter((p) => p.c === k))));
  const elegidas = [];
  let i = 0;
  while (elegidas.length < n && elegidas.length < BANCO.length) {
    const k = claves[i % claves.length];
    if (grupos[k].length) elegidas.push(grupos[k].shift());
    i++;
  }
  return barajar(elegidas).map((p) => ({
    c: p.c,
    t: p.t,
    o: barajar(p.o.map(([texto, puntos]) => ({ texto, puntos }))),
  }));
}

/** respuestas[i] = índice de la opción elegida en preguntas[i]. */
function evaluar(preguntas, respuestas) {
  const comp = {};
  let total = 0;
  let alertas = 0;
  preguntas.forEach((p, i) => {
    const pts = p.o[respuestas[i]].puntos;
    comp[p.c] = comp[p.c] || { puntos: 0, max: 0, n: 0 };
    comp[p.c].puntos += pts;
    comp[p.c].max += 3;
    comp[p.c].n += 1;
    total += pts;
    if (pts === 0) alertas++;
  });
  const max = preguntas.length * 3;
  const pct = Math.round((total / max) * 100);
  const competencias = Object.keys(COMPETENCIAS)
    .filter((k) => comp[k])
    .map((k) => ({ clave: k, ...COMPETENCIAS[k], ...comp[k], pct: Math.round((comp[k].puntos / comp[k].max) * 100) }));

  const limiteAlertas = CRITERIOS.alertasPermitidas(preguntas.length);
  const motivos = [];
  if (pct < CRITERIOS.minimoGlobal) motivos.push(`Puntuación global por debajo del ${CRITERIOS.minimoGlobal} %`);
  competencias
    .filter((c) => c.pct < CRITERIOS.minimoCompetencia)
    .forEach((c) => motivos.push(`${c.nombre} por debajo del ${CRITERIOS.minimoCompetencia} %`));
  if (alertas > limiteAlertas) motivos.push(`${alertas} respuestas incompatibles con el servicio (máximo ${limiteAlertas})`);

  return {
    total, max, pct, alertas, limiteAlertas, competencias,
    apto: motivos.length === 0,
    motivos,
    preguntas: preguntas.length,
  };
}

function unirLista(items) {
  if (items.length <= 1) return items.join("");
  return items.slice(0, -1).join(", ") + " y " + items[items.length - 1];
}

/** Redacta el texto de observaciones según el resultado. sexo: "M" | "F". */
function redactarCriterio(r, sexo, apto = r.apto) {
  const sujeto = sexo === "F" ? "La evaluada" : "El evaluado";
  const orden = r.competencias.slice().sort((a, b) => b.pct - a.pct);
  const fuertes = orden.filter((c) => c.pct >= 80).slice(0, 2);
  const debiles = orden.slice().reverse().filter((c) => c.pct < 65).slice(0, 2);
  const frases = [];

  if (apto) {
    if (r.pct >= 90) frases.push(`${sujeto} muestra un criterio excelente para el servicio.`);
    else if (r.pct >= 80) frases.push(`${sujeto} muestra un criterio muy adecuado para el servicio.`);
    else frases.push(`${sujeto} muestra un criterio general adecuado para el servicio.`);

    if (fuertes.length === 2) frases.push(`Destaca su ${fuertes[0].fortaleza}, así como su ${fuertes[1].fortaleza}.`);
    else if (fuertes.length === 1) frases.push(`Destaca su ${fuertes[0].fortaleza}.`);

    if (debiles.length) frases.push(`Se recomienda reforzar ${unirLista(debiles.map((c) => c.refuerzo))}.`);

    if (r.pct >= 90) frases.push("Demuestra una actuación profesional sólida y fiable.");
    else if (r.pct >= 80) frases.push("Mantiene una base sólida de actuación profesional.");
    else frases.push("Mantiene una base estable de actuación profesional.");
  } else {
    if (r.pct >= 70) frases.push(`${sujeto} muestra un criterio general aceptable, pero presenta carencias relevantes para el servicio.`);
    else if (r.pct >= 55) frases.push(`${sujeto} muestra un criterio insuficiente para el servicio en este momento.`);
    else frases.push(`${sujeto} muestra un criterio no adecuado para el servicio.`);

    if (r.alertas > r.limiteAlertas) frases.push("Presenta respuestas incompatibles con el protocolo de actuación.");
    if (fuertes.length) frases.push(`Como aspecto positivo, destaca su ${fuertes[0].fortaleza}.`);
    const areas = debiles.length ? debiles : orden.slice(-1);
    frases.push(`Se recomienda reforzar ${unirLista(areas.map((c) => c.refuerzo))} antes de una nueva evaluación.`);
  }
  return frases.join(" ");
}
