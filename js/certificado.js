/*
 * Dibuja el Certificado de Psicotécnico del Hospital Central en un <canvas>
 * de 1224 × 2016 px (proporción de papel Legal, 8,5 × 14 in).
 */

const CERT = { W: 1224, H: 2016 };
const CERT_COLORES = { gris: "#D3D3D3", azul: "#1A9AD6", marino: "#1F4E79", tinta: "#111111", firma: "#1B2E6B" };
const FACCIONES = {
  LSPD: "Los Santos Police Department",
  LSSD: "Los Santos Sheriff's Department",
  FBI: "Federal Bureau of Investigation",
};

const _imgCache = {};
function cargarImagen(src) {
  if (!_imgCache[src]) {
    _imgCache[src] = new Promise((ok, mal) => {
      const im = new Image();
      im.onload = () => ok(im);
      im.onerror = () => mal(new Error("No se pudo cargar " + src));
      im.src = src;
    });
  }
  return _imgCache[src];
}

function fechaPartes(iso) {
  if (!iso) return ["", "", ""];
  const [a, m, d] = iso.split("-");
  return [d, m, a];
}
function fechaTexto(iso) {
  const [d, m, a] = fechaPartes(iso);
  return iso ? `${d}/${m}/${a}` : "";
}

async function dibujarCertificado(canvas, datos, recursos) {
  canvas.width = CERT.W;
  canvas.height = CERT.H;
  const ctx = canvas.getContext("2d");
  const [logo, sello] = await Promise.all([cargarImagen(recursos.logo), cargarImagen(recursos.sello)]);
  try { await document.fonts.load('48px "Dancing Script"'); } catch (e) { /* usa la fuente de respaldo */ }

  const SANS = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
  const font = (px, peso = "400", fam = SANS) => (ctx.font = `${peso} ${px}px ${fam}`);
  const texto = (t, x, y, px = 22, peso = "400", color = CERT_COLORES.tinta, align = "left") => {
    font(px, peso); ctx.fillStyle = color; ctx.textAlign = align; ctx.fillText(t, x, y); ctx.textAlign = "left";
  };
  const linea = (x1, y1, x2, y2, color = CERT_COLORES.tinta, w = 1) => {
    ctx.strokeStyle = color; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  };
  const banda = (y1, y2, x1 = 46, x2 = 1184) => { ctx.fillStyle = CERT_COLORES.gris; ctx.fillRect(x1, y1, x2 - x1, y2 - y1); };
  const caja = (y1, y2, x1 = 32, x2 = 1181) => {
    ctx.strokeStyle = CERT_COLORES.azul; ctx.lineWidth = 2.4; ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x1, y2); ctx.lineTo(x2, y2); ctx.lineTo(x2, y1); ctx.stroke();
  };
  // Campo con valor sobre una línea
  const campo = (valor, x1, x2, y, px = 22, peso = "400", align = "left") => {
    linea(x1, y + 4, x2, y + 4, CERT_COLORES.tinta, 1);
    const x = align === "center" ? (x1 + x2) / 2 : x1 + 6;
    texto(valor || "", x, y - 2, px, peso, CERT_COLORES.tinta, align);
  };

  // Fondo
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, CERT.W, CERT.H);

  // Encabezado
  ctx.drawImage(logo, 55, 50, 240, 245);
  font(54, "700", '"Times New Roman", Times, "Liberation Serif", serif');
  ctx.fillStyle = CERT_COLORES.tinta; ctx.textAlign = "center";
  ctx.fillText("HOSPITAL CENTRAL", 697, 195); ctx.textAlign = "left";
  linea(348, 217, 1106, 217, CERT_COLORES.marino, 3);
  linea(348, 278, 1106, 278, CERT_COLORES.marino, 3);
  texto("CERTIFICADO DE PSICOTÉCNICO", 722, 258, 25, "700", CERT_COLORES.tinta, "center");
  texto("Departamento de Salud Mental y Evaluación Psicológica", 726, 309, 21, "400", CERT_COLORES.tinta, "center");

  // Datos del funcionario
  banda(345, 381);
  texto("DATOS DEL FUNCIONARIO", 560, 372, 24, "700", CERT_COLORES.tinta, "center");
  texto("Nombre y Apellidos:", 77, 410, 22); campo(datos.nombre, 290, 1150, 406, 24, "700");
  texto("ID/Placa:", 80, 456, 22); campo(datos.placa, 180, 600, 452);
  texto("Facción:", 640, 456, 22); campo(datos.faccion ? `${datos.faccion} · ${FACCIONES[datos.faccion] || ""}` : "", 730, 1150, 452, 20);
  texto("Rango:", 77, 501, 22); campo(datos.rango, 153, 600, 497);
  texto("Fecha de nacimiento:", 77, 545, 22); campo(fechaTexto(datos.nacimiento), 300, 600, 541);

  // Evaluación psicotécnica
  banda(574, 609, 40, 1174);
  texto("EVALUACIÓN PSICOTÉCNICA", 508, 601, 24, "700", CERT_COLORES.tinta, "center");
  const parrafo = [
    "El/la funcionario/a arriba identificado/a ha sido sometido/a a una evaluación psicotécnica",
    "y psicológica integral, conforme a los protocolos internos del Hospital Central y del Servicio",
    "Médico de Emergencias (EMS).",
    "",
    "Durante la evaluación se valoraron la estabilidad emocional, el manejo del estrés, la toma de",
    "decisiones bajo presión, la capacidad de trabajo en equipo y la idoneidad psicológica para la",
    "atención de emergencias.",
  ];
  parrafo.forEach((l, i) => texto(l, 85, 652 + i * 34, 21));

  // Resultado final
  banda(879, 918, 32, 1181); caja(918, 1015);
  texto("RESULTADO FINAL", 80, 907, 24, "700");
  [["APTO/A PARA EL SERVICIO", true], ["NO APTO/A PARA EL SERVICIO", false]].forEach(([t, valor], i) => {
    const y = 948 + i * 34;
    ctx.strokeStyle = CERT_COLORES.tinta; ctx.lineWidth = 2; ctx.strokeRect(45, y - 21, 24, 24);
    if (datos.apto === valor) {
      linea(49, y - 17, 65, y - 1, CERT_COLORES.tinta, 2.5);
      linea(65, y - 17, 49, y - 1, CERT_COLORES.tinta, 2.5);
    }
    texto(t, 90, y - 1, 19);
  });
  if (datos.puntuacion != null) {
    texto(`Puntuación: ${datos.puntuacion} %`, 1150, 948, 20, "700", CERT_COLORES.tinta, "right");
    texto(`Preguntas evaluadas: ${datos.preguntas}`, 1150, 982, 19, "400", CERT_COLORES.tinta, "right");
  }

  // Observaciones
  banda(1054, 1090, 28, 1181); caja(1090, 1272, 28, 1178);
  texto("OBSERVACIONES:", 36, 1081, 24, "700");
  const lineasY = [1134, 1169, 1203, 1238];
  font(21);
  const renglones = partirTexto(ctx, datos.observaciones || "", 1100);
  lineasY.forEach((y, i) => {
    linea(45, y, i === 3 ? 1160 : 1160, y, "#555555", 0.8);
    if (renglones[i]) texto(renglones[i], 50, y - 7, 21);
  });

  // Validez
  banda(1352, 1395, 28, 1184); caja(1395, 1565, 28, 1182);
  texto("VALIDEZ:", 42, 1382, 24, "700");
  const filaFecha = (etiqueta, iso, y, x0) => {
    texto(etiqueta, 45, y, 22);
    const [d, m, a] = fechaPartes(iso);
    campo(d, x0, x0 + 55, y - 4, 21, "700", "center");
    texto("/", x0 + 60, y - 2, 21);
    campo(m, x0 + 72, x0 + 127, y - 4, 21, "700", "center");
    texto("/", x0 + 132, y - 2, 21);
    campo(a, x0 + 144, x0 + 219, y - 4, 21, "700", "center");
  };
  filaFecha("Fecha de Evaluación:", datos.fechaEvaluacion, 1420, 270);
  filaFecha("Fecha de Emisión:", datos.fechaEmision, 1468, 240);
  filaFecha("Válido hasta:", datos.validoHasta, 1518, 184);

  // Profesional responsable
  banda(1593, 1636, 30, 1186); caja(1636, 1818, 32, 1188);
  texto("PROFESIONAL RESPONSABLE:", 37, 1624, 24, "700");
  texto("Evaluador/a:", 48, 1683, 22); campo(datos.evaluador, 180, 500, 1679, 21, "700");
  texto("Firma:", 545, 1683, 22);
  linea(615, 1683, 1000, 1683, CERT_COLORES.tinta, 1);
  if (datos.firma) {
    const hayCursiva = document.fonts && document.fonts.check('44px "Dancing Script"');
    ctx.font = hayCursiva ? '600 44px "Dancing Script", cursive' : 'italic 400 38px "Brush Script MT", "Segoe Script", Georgia, serif';
    ctx.fillStyle = CERT_COLORES.firma; ctx.textAlign = "center";
    ctx.fillText(datos.firma, 807, 1676); ctx.textAlign = "left";
  }
  texto("Cargo:", 48, 1732, 22); campo(datos.cargo, 122, 500, 1728, 21, "700");
  texto("Firma Sello Oficial:", 48, 1782, 22);
  linea(290, 1818, 640, 1818, CERT_COLORES.azul, 2.4);
  ctx.globalAlpha = 0.9;
  ctx.drawImage(sello, 335, 1735, 265, 260);
  ctx.globalAlpha = 1;

  // Referencia del documento
  if (datos.referencia) texto(`Ref. ${datos.referencia}`, 1180, 1990, 15, "400", "#777777", "right");
  return canvas;
}

function partirTexto(ctx, t, ancho) {
  const palabras = t.replace(/\s+/g, " ").trim().split(" ");
  const out = [];
  let actual = "";
  palabras.forEach((p) => {
    const prueba = actual ? actual + " " + p : p;
    if (ctx.measureText(prueba).width > ancho && actual) { out.push(actual); actual = p; }
    else actual = prueba;
  });
  if (actual) out.push(actual);
  return out;
}

/** Número de renglones que ocupa un texto en el recuadro de observaciones (máx. 4). */
function renglonesObservaciones(t) {
  const c = document.createElement("canvas").getContext("2d");
  c.font = '400 21px Arial, "Helvetica Neue", Helvetica, sans-serif';
  return partirTexto(c, t, 1100).length;
}
