/*
 * Generador mínimo de PDF sin dependencias: una página con una imagen JPEG a tamaño completo.
 * Uso: crearPdfDesdeCanvas(canvas, 612, 1008, "Título") → Blob (application/pdf)
 * 612 × 1008 pt = papel Legal (8,5 × 14 in).
 */
function crearPdfDesdeCanvas(canvas, anchoPt, altoPt, titulo = "") {
  const b64 = canvas.toDataURL("image/jpeg", 0.95).split(",")[1];
  const bin = atob(b64);
  const jpeg = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) jpeg[i] = bin.charCodeAt(i);

  const enc = new TextEncoder();
  const partes = [];
  const offsets = [];
  let largo = 0;
  const push = (d) => { const u = typeof d === "string" ? enc.encode(d) : d; partes.push(u); largo += u.length; };
  const obj = (n, cuerpo) => { offsets[n] = largo; push(`${n} 0 obj\n${cuerpo}\nendobj\n`); };
  // Texto PDF en UTF-16BE para admitir tildes en el título
  const textoPdf = (t) => {
    let hex = "FEFF";
    for (const ch of t) {
      const c = ch.codePointAt(0);
      if (c > 0xffff) continue;
      hex += c.toString(16).padStart(4, "0").toUpperCase();
    }
    return `<${hex}>`;
  };

  const contenido = `q ${anchoPt} 0 0 ${altoPt} 0 0 cm /Im0 Do Q`;
  push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
  obj(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  obj(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${anchoPt} ${altoPt}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`);
  offsets[4] = largo;
  push(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);
  push(jpeg);
  push("\nendstream\nendobj\n");
  obj(5, `<< /Length ${contenido.length} >>\nstream\n${contenido}\nendstream`);
  obj(6, `<< /Title ${textoPdf(titulo)} /Producer (Psicotecnico Hospital Central) >>`);

  const xref = largo;
  let tabla = `xref\n0 7\n0000000000 65535 f \n`;
  for (let n = 1; n <= 6; n++) tabla += `${String(offsets[n]).padStart(10, "0")} 00000 n \n`;
  push(tabla + `trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(partes, { type: "application/pdf" });
}
