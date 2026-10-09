/*
 * Acceso de evaluadores: muestra el banco completo con la puntuación de cada respuesta.
 *
 * La contraseña se guarda como huella SHA-256 (no en texto plano).
 * Para cambiarla, calcula la huella de la nueva contraseña y sustituye CLAVE_SHA256:
 *   - En la consola del navegador:  await huella("NuevaContraseña")
 *   - O en una terminal:            echo -n "NuevaContraseña" | sha256sum
 *
 * Aviso: es una web estática, así que esto evita miradas casuales pero no es
 * seguridad real; el archivo js/preguntas.js es público para quien sepa buscarlo.
 */
const CLAVE_SHA256 = "38765e439e0365bef85e71e1e449c5ff46e2c1a063e0cc590964d719ca07f985";

const NOTAS = { 3: "Correcta", 2: "Aceptable", 1: "Poco adecuada", 0: "Incompatible" };

// Códigos de la Normativa Policial de Jerarquía RP
const GLOSARIO = [
  ["Códigos 10", [
    ["10-0", "Atención"], ["10-1", "No se escucha"], ["10-2", "Se escucha"], ["10-4", "Afirmativo"],
    ["10-5", "Negativo"], ["10-6", "Ocupado"], ["10-7", "Fuera de servicio"], ["10-8", "En servicio"],
    ["10-9", "Repetir comunicado"], ["10-10", "Patrullar"], ["10-11", "En camino"], ["10-14", "Sospechoso/a"],
    ["10-15", "Sospechoso detenido"], ["10-16", "Vehículo robado"], ["10-17", "Urgencia médica"],
    ["10-19", "Regresar a comisaría"], ["10-20", "Ubicación"], ["10-23", "Venta de droga"],
    ["10-31", "Delito en curso"], ["10-32", "Refuerzos"], ["10-37", "Grúa"], ["10-38", "Solicitamos ambulancia"],
    ["10-90", "Falsa alarma"],
  ]],
  ["Códigos especiales", [
    ["Código 1", "Sin sirenas ni luces"], ["Código 2", "Luces y sirenas"], ["Código 3", "Tiroteo en curso"],
    ["Código 100", "Bloquear vehículo"], ["Código 207", "Secuestro"], ["Código 210", "Detener un vehículo"],
    ["Código 254 Papa", "Persecución a pie"], ["Código 254 Victor", "Persecución a un vehículo"],
    ["Código PIT", "Desestabilizar vehículo (prohibido en persecuciones)"], ["Código Topo", "Permiso para ir de incógnito"],
    ["QRX", "Silencio en radio"], ["QRR", "Agente en peligro (nunca estando abatido)"],
    ["H-50", "Mando del operativo; es quien establece el nivel DEFCON"],
  ]],
  ["Niveles DEFCON", [
    ["DEFCON 5", "Alerta mínima. Solo armas reglamentarias"],
    ["DEFCON 4", "Amenazas moderadas o secuestros espontáneos. Escopeta si se requiere"],
    ["DEFCON 3", "Avisos de secuestros o tiroteos. SMG y registro de sospechosos"],
    ["DEFCON 2", "Secuestro a policías, robo a Humane o Union, vehículos de guerra. Sargentos+ carabina, resto SMG"],
    ["DEFCON 1", "Alerta máxima: Banco Central o ataque terrorista. Cualquier armamento"],
  ]],
];

async function huella(texto) {
  const datos = new TextEncoder().encode(texto);
  const hash = await crypto.subtle.digest("SHA-256", datos);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

(() => {
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const sesion = {
    get: () => { try { return sessionStorage.getItem("psico-admin") === "1"; } catch (e) { return false; } },
    set: (v) => { try { v ? sessionStorage.setItem("psico-admin", "1") : sessionStorage.removeItem("psico-admin"); } catch (e) { /* sin almacenamiento */ } },
  };

  function mostrarBanco() {
    $("#vista-acceso").hidden = true;
    $("#vista-banco").hidden = false;
    pintarGlosario();
    pintarFiltros();
    pintarLista();
  }

  function pintarGlosario() {
    $("#glosario").innerHTML = GLOSARIO.map(([titulo, filas]) => `
      <div class="glosario-grupo">
        <h3>${esc(titulo)}</h3>
        <dl>${filas.map(([c, s]) => `<dt>${esc(c)}</dt><dd>${esc(s)}</dd>`).join("")}</dl>
      </div>`).join("");
  }

  function pintarFiltros() {
    const sel = $("#filtro-comp");
    if (sel.options.length > 1) return;
    Object.entries(COMPETENCIAS).forEach(([k, c]) => {
      const n = BANCO.filter((p) => p.c === k).length;
      sel.insertAdjacentHTML("beforeend", `<option value="${k}">${esc(c.nombre)} (${n})</option>`);
    });
  }

  function pintarLista() {
    const q = $("#buscar").value.trim().toLowerCase();
    const comp = $("#filtro-comp").value;
    const filtradas = BANCO
      .map((p, i) => ({ ...p, n: i + 1 }))
      .filter((p) => (!comp || p.c === comp) && (!q || (p.t + " " + p.o.map((o) => o[0]).join(" ")).toLowerCase().includes(q)));
    $("#resumen").textContent = `${BANCO.length} preguntas en total, 10 por competencia. Mostrando ${filtradas.length}. Las respuestas aparecen ordenadas de mejor a peor; en el examen se barajan.`;
    $("#sin-resultados").hidden = filtradas.length > 0;
    $("#lista").innerHTML = filtradas.map((p) => `
      <article class="item-pregunta">
        <div class="item-cab"><span class="item-num">${p.n}</span><span class="chip">${esc(COMPETENCIAS[p.c].nombre)}</span></div>
        <h3>${esc(p.t)}</h3>
        <ol class="item-opciones">
          ${p.o.slice().sort((a, b) => b[1] - a[1]).map(([t, s]) => `
            <li class="op p${s}"><span class="nota n${s}">${s} · ${NOTAS[s]}</span><span>${esc(t)}</span></li>`).join("")}
        </ol>
      </article>`).join("");
  }

  $("#form-acceso").addEventListener("submit", async (e) => {
    e.preventDefault();
    const valor = $("#clave").value;
    let ok = false;
    try { ok = (await huella(valor)) === CLAVE_SHA256; } catch (err) { ok = false; }
    if (ok) { sesion.set(true); $("#clave").value = ""; $("#error-acceso").hidden = true; mostrarBanco(); }
    else { $("#error-acceso").hidden = false; $("#clave").select(); }
  });
  $("#btn-salir").addEventListener("click", () => {
    sesion.set(false);
    $("#vista-banco").hidden = true;
    $("#vista-acceso").hidden = false;
    $("#clave").focus();
  });
  $("#buscar").addEventListener("input", pintarLista);
  $("#filtro-comp").addEventListener("change", pintarLista);

  if (sesion.get()) mostrarBanco();
})();
