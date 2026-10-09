/*
 * Flujo de la aplicación: Datos → Examen → Resultado → Certificado.
 */
(() => {
  const $ = (s) => document.querySelector(s);
  const RECURSOS = window.RECURSOS || { logo: "assets/logo-ems.png", sello: "assets/sello-oficial.png" };

  const RANGOS = {
    LSPD: ["Cadete", "Oficial I", "Oficial II", "Oficial III", "Cabo", "Sargento", "Teniente", "Capitán", "Comandante", "Subjefe", "Jefe de Policía"],
    LSSD: ["Cadete", "Deputy I", "Deputy II", "Deputy III", "Cabo", "Sargento", "Teniente", "Capitán", "Mayor", "Subsheriff", "Sheriff"],
    FBI: ["Agente en prácticas", "Agente Especial", "Agente Especial Sénior", "Agente Supervisor", "Subdirector Adjunto", "Subdirector", "Director"],
  };

  const estado = { datos: null, preguntas: [], respuestas: [], actual: 0, resultado: null, observaciones: "", apto: true, editado: false };

  // ── Utilidades ──
  const hoyISO = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  function sumarMeses(iso, meses) {
    if (!iso) return "";
    const [a, m, d] = iso.split("-").map(Number);
    const f = new Date(a, m - 1 + meses, 1);
    const ultimo = new Date(f.getFullYear(), f.getMonth() + 1, 0).getDate();
    f.setDate(Math.min(d, ultimo));
    return `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, "0")}-${String(f.getDate()).padStart(2, "0")}`;
  }
  const leer = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } };
  const radio = (name) => (document.querySelector(`input[name="${name}"]:checked`) || {}).value;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function irA(paso) {
    ["datos", "examen", "resultado", "certificado"].forEach((p, i, arr) => {
      $(`#vista-${p}`).hidden = p !== paso;
      const li = document.querySelector(`.pasos li[data-paso="${p}"]`);
      li.classList.toggle("activo", p === paso);
      li.classList.toggle("hecho", arr.indexOf(p) < arr.indexOf(paso));
    });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  // ── 1 · Datos ──
  function actualizarRangos() {
    const f = radio("faccion");
    $("#rangos").innerHTML = RANGOS[f].map((r) => `<option value="${esc(r)}">`).join("");
  }
  function actualizarValidez() {
    const hasta = sumarMeses($("#fecha-emision").value, Number($("#validez").value));
    const [a, m, d] = hasta ? hasta.split("-") : [];
    $("#valido-hasta").textContent = hasta ? `${d}/${m}/${a}` : "—";
  }
  function actualizarAyudaNum() {
    const n = Number(radio("num"));
    const porComp = n / 6;
    const minutos = Math.round(n * 0.6);
    $("#ayuda-num").textContent = `${n} preguntas repartidas entre 6 competencias (${Number.isInteger(porComp) ? porComp : "≈" + Math.round(porComp)} por competencia). Duración aproximada: ${minutos} min.`;
  }

  function iniciarFormulario() {
    $("#fecha-evaluacion").value = hoyISO();
    $("#fecha-emision").value = hoyISO();
    const ev = leer("psico-evaluador");
    if (ev) { $("#evaluador").value = ev.evaluador || ""; $("#cargo").value = ev.cargo || ""; $("#firma").value = ev.firma || ""; }
    actualizarRangos(); actualizarValidez(); actualizarAyudaNum();
    document.querySelectorAll('input[name="faccion"]').forEach((r) => r.addEventListener("change", actualizarRangos));
    document.querySelectorAll('input[name="num"]').forEach((r) => r.addEventListener("change", actualizarAyudaNum));
    $("#fecha-emision").addEventListener("change", actualizarValidez);
    $("#validez").addEventListener("change", actualizarValidez);
    $("#form-datos").addEventListener("input", (e) => e.target.removeAttribute("aria-invalid"));
    $("#form-datos").addEventListener("submit", comenzar);
  }

  function comenzar(e) {
    e.preventDefault();
    const req = ["#nombre", "#placa", "#rango", "#nacimiento", "#fecha-evaluacion", "#fecha-emision", "#evaluador", "#cargo"];
    const vacios = req.filter((s) => !$(s).value.trim());
    req.forEach((s) => $(s).toggleAttribute("aria-invalid", vacios.includes(s)));
    if (vacios.length) {
      $("#error-datos").textContent = "Completa los campos marcados en rojo para comenzar el examen.";
      $("#error-datos").hidden = false;
      $(vacios[0]).focus();
      return;
    }
    $("#error-datos").hidden = true;
    const fechaEmision = $("#fecha-emision").value;
    estado.datos = {
      nombre: $("#nombre").value.trim(),
      placa: $("#placa").value.trim(),
      rango: $("#rango").value.trim(),
      nacimiento: $("#nacimiento").value,
      sexo: $("#sexo").value,
      faccion: radio("faccion"),
      fechaEvaluacion: $("#fecha-evaluacion").value,
      fechaEmision,
      validoHasta: sumarMeses(fechaEmision, Number($("#validez").value)),
      evaluador: $("#evaluador").value.trim(),
      cargo: $("#cargo").value.trim(),
      firma: $("#firma").value.trim() || $("#evaluador").value.trim(),
    };
    guardar("psico-evaluador", { evaluador: estado.datos.evaluador, cargo: estado.datos.cargo, firma: $("#firma").value.trim() });
    nuevoExamen();
  }

  // ── 2 · Examen ──
  function nuevoExamen() {
    const n = Number(radio("num"));
    estado.preguntas = seleccionarPreguntas(n);
    estado.respuestas = new Array(n).fill(null);
    estado.actual = 0;
    estado.editado = false;
    const d = estado.datos;
    $("#examen-agente").innerHTML = `${esc(d.rango)} ${esc(d.nombre)} <small>· ${esc(d.faccion)} · Placa ${esc(d.placa)}</small>`;
    $("#p-total").textContent = n;
    $("#confirmar-cancelar").hidden = true;
    irA("examen");
    pintarPregunta();
  }

  function pintarPregunta() {
    const i = estado.actual;
    const p = estado.preguntas[i];
    const total = estado.preguntas.length;
    $("#p-actual").textContent = i + 1;
    $("#barra").style.width = `${(estado.respuestas.filter((r) => r !== null).length / total) * 100}%`;
    $("#p-competencia").textContent = COMPETENCIAS[p.c].nombre;
    $("#p-texto").textContent = p.t;
    $("#p-opciones").innerHTML = p.o.map((op, k) => `
      <button type="button" class="opcion" role="radio" aria-checked="${estado.respuestas[i] === k}" data-k="${k}">
        <span class="letra">${"ABCD"[k]}</span><span class="txt">${esc(op.texto)}</span>
      </button>`).join("");
    $("#btn-anterior").disabled = i === 0;
    $("#btn-siguiente").disabled = estado.respuestas[i] === null;
    $("#btn-siguiente").textContent = i === total - 1 ? "Finalizar examen" : "Siguiente";
  }

  function elegir(k) {
    estado.respuestas[estado.actual] = k;
    document.querySelectorAll(".opcion").forEach((b) => b.setAttribute("aria-checked", String(Number(b.dataset.k) === k)));
    $("#btn-siguiente").disabled = false;
    $("#barra").style.width = `${(estado.respuestas.filter((r) => r !== null).length / estado.preguntas.length) * 100}%`;
  }

  function siguiente() {
    if (estado.respuestas[estado.actual] === null) return;
    if (estado.actual < estado.preguntas.length - 1) { estado.actual++; pintarPregunta(); $("#p-texto").focus?.(); }
    else finalizar();
  }

  function iniciarExamen() {
    $("#p-opciones").addEventListener("click", (e) => {
      const b = e.target.closest(".opcion");
      if (b) elegir(Number(b.dataset.k));
    });
    $("#btn-siguiente").addEventListener("click", siguiente);
    $("#btn-anterior").addEventListener("click", () => { if (estado.actual > 0) { estado.actual--; pintarPregunta(); } });
    $("#btn-cancelar").addEventListener("click", () => ($("#confirmar-cancelar").hidden = false));
    $("#btn-cancelar-no").addEventListener("click", () => ($("#confirmar-cancelar").hidden = true));
    $("#btn-cancelar-si").addEventListener("click", () => irA("datos"));
    document.addEventListener("keydown", (e) => {
      if ($("#vista-examen").hidden || e.target.matches("input, textarea, select")) return;
      if (["1", "2", "3", "4"].includes(e.key)) elegir(Number(e.key) - 1);
      else if (e.key === "Enter" && !e.target.matches("button")) siguiente();
      else if (e.key === "ArrowRight") siguiente();
      else if (e.key === "ArrowLeft" && estado.actual > 0) { estado.actual--; pintarPregunta(); }
    });
  }

  // ── 3 · Resultado ──
  function finalizar() {
    estado.resultado = evaluar(estado.preguntas, estado.respuestas);
    estado.apto = estado.resultado.apto;
    estado.observaciones = redactarCriterio(estado.resultado, estado.datos.sexo, estado.apto);
    estado.editado = false;
    pintarResultado();
    irA("resultado");
  }

  function pintarResultado() {
    const r = estado.resultado;
    $("#veredicto").classList.toggle("no", !r.apto);
    $("#r-pct").textContent = r.pct;
    $("#r-pill").textContent = r.apto ? "APTO/A PARA EL SERVICIO" : "NO APTO/A PARA EL SERVICIO";
    $("#r-resumen").textContent = `${r.total} de ${r.max} puntos en ${r.preguntas} preguntas · ${r.alertas} ${r.alertas === 1 ? "respuesta incompatible" : "respuestas incompatibles"} (máx. ${r.limiteAlertas}).`;
    $("#r-motivos").innerHTML = r.motivos.map((m) => `<li>${esc(m)}</li>`).join("");
    $("#r-competencias").innerHTML = r.competencias.map((c) => `
      <div class="comp">
        <span class="comp-nombre">${esc(c.nombre)} <small>· ${c.n} ${c.n === 1 ? "pregunta" : "preguntas"}</small></span>
        <span class="comp-pct">${c.pct} %</span>
        <div class="comp-barra" role="img" aria-label="${esc(c.nombre)}: ${c.pct} %"><i class="${c.pct < 50 ? "bajo" : c.pct < 70 ? "medio" : ""}" style="width:${c.pct}%"></i></div>
      </div>`).join("");
    $("#observaciones").value = estado.observaciones;
    $(estado.apto ? "#res-apto" : "#res-noapto").checked = true;
    pintarAyudaRes();
    pintarAyudaObs();
    $("#r-revision").innerHTML = estado.preguntas.map((p, i) => {
      const op = p.o[estado.respuestas[i]];
      return `<li>${esc(p.t)}<span class="p${op.puntos}">${esc(op.texto)} — ${op.puntos}/3</span></li>`;
    }).join("");
  }

  function pintarAyudaObs() {
    const n = renglonesObservaciones($("#observaciones").value);
    const el = $("#ayuda-obs");
    el.textContent = n > 4 ? `El texto ocupa ${n} renglones y el certificado admite 4. Acórtalo para que no se corte.` : `Ocupa ${n} de 4 renglones en el certificado. Puedes editarlo.`;
    el.style.color = n > 4 ? "var(--bad)" : "";
  }
  function pintarAyudaRes() {
    const auto = estado.resultado.apto;
    $("#ayuda-res").textContent = estado.apto === auto
      ? "Coincide con el resultado calculado por el examen."
      : `Has cambiado el resultado calculado (${auto ? "apto/a" : "no apto/a"}). El criterio del evaluador prevalece.`;
  }

  function iniciarResultado() {
    $("#observaciones").addEventListener("input", () => { estado.observaciones = $("#observaciones").value; estado.editado = true; pintarAyudaObs(); });
    $("#btn-regenerar").addEventListener("click", () => {
      estado.observaciones = redactarCriterio(estado.resultado, estado.datos.sexo, estado.apto);
      estado.editado = false;
      $("#observaciones").value = estado.observaciones;
      pintarAyudaObs();
    });
    document.querySelectorAll('input[name="res"]').forEach((r) => r.addEventListener("change", () => {
      estado.apto = radio("res") === "apto";
      if (!estado.editado) {
        estado.observaciones = redactarCriterio(estado.resultado, estado.datos.sexo, estado.apto);
        $("#observaciones").value = estado.observaciones;
        pintarAyudaObs();
      }
      pintarAyudaRes();
    }));
    $("#btn-repetir").addEventListener("click", nuevoExamen);
    $("#btn-certificado").addEventListener("click", generarCertificado);
  }

  // ── 4 · Certificado ──
  function datosCertificado() {
    const d = estado.datos;
    return {
      ...d,
      apto: estado.apto,
      observaciones: estado.observaciones,
      puntuacion: estado.resultado.pct,
      preguntas: estado.resultado.preguntas,
      referencia: `PSI-${d.faccion}-${d.placa.replace(/\W+/g, "")}-${d.fechaEvaluacion.replace(/-/g, "")}`,
    };
  }
  const nombreArchivo = () => `Psicotecnico_${estado.datos.nombre.replace(/\s+/g, "_").replace(/[^\w\-áéíóúñÁÉÍÓÚÑ]/g, "")}_${estado.datos.fechaEmision.replace(/-/g, "")}`;

  async function generarCertificado() {
    irA("certificado");
    $("#aviso-descarga").hidden = true;
    try {
      await dibujarCertificado($("#lienzo"), datosCertificado(), RECURSOS);
    } catch (err) {
      $("#aviso-descarga").textContent = "No se pudieron cargar el logo o el sello. Comprueba que la carpeta assets está junto a index.html.";
      $("#aviso-descarga").hidden = false;
    }
  }

  function descargar(blob, nombre) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = nombre;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    if (window.MODO_VISTA_PREVIA) {
      $("#aviso-descarga").textContent = "Esta vista previa no permite descargar archivos. En GitHub Pages las descargas de PNG y PDF funcionan con normalidad.";
      $("#aviso-descarga").hidden = false;
    }
  }

  function iniciarCertificado() {
    $("#btn-png").addEventListener("click", () => $("#lienzo").toBlob((b) => descargar(b, nombreArchivo() + ".png"), "image/png"));
    $("#btn-pdf").addEventListener("click", () => {
      const blob = crearPdfDesdeCanvas($("#lienzo"), 612, 1008, `Certificado de Psicotécnico · ${estado.datos.nombre}`);
      descargar(blob, nombreArchivo() + ".pdf");
    });
    $("#btn-editar").addEventListener("click", () => { irA("resultado"); $("#observaciones").focus(); });
    $("#btn-nueva").addEventListener("click", () => {
      ["#nombre", "#placa", "#rango", "#nacimiento"].forEach((s) => ($(s).value = ""));
      irA("datos");
      $("#nombre").focus();
    });
  }

  iniciarFormulario();
  iniciarExamen();
  iniciarResultado();
  iniciarCertificado();
})();
