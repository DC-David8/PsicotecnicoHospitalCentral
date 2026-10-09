# Psicotécnico Hospital Central · EMS

Herramienta web para el rol del servidor: el personal del **Hospital Central (EMS)** realiza el examen psicotécnico a los agentes de **LSPD, LSSD y FBI** y genera el certificado oficial con el resultado.

## Qué hace

1. **Datos** · Facción (LSPD / LSSD / FBI), nombre, ID/placa, rango, fecha de nacimiento y sexo del agente. Datos del evaluador (nombre, cargo, firma), fechas de evaluación y emisión, y validez del certificado (6, 12 o 24 meses).
2. **Examen** · Eliges **10, 20, 30, 40, 50 o 60 preguntas**. Se reparten por igual entre las 6 competencias y el orden de preguntas y respuestas se baraja en cada examen.
3. **Resultado** · Puntuación global y por competencia, veredicto APTO / NO APTO y el **criterio redactado automáticamente**. El evaluador puede editar el texto y cambiar el resultado final si lo considera.
4. **Certificado** · Se genera el Certificado de Psicotécnico del Hospital Central con todos los datos, listo para **descargar en PNG o PDF**.

## Competencias evaluadas

| Competencia | Preguntas en el banco |
|---|---|
| Estabilidad emocional | 10 |
| Manejo del estrés | 10 |
| Toma de decisiones | 10 |
| Trabajo en equipo | 10 |
| Integridad y ética | 10 |
| Autocontrol y uso de la fuerza | 10 |

Cada pregunta tiene 4 respuestas puntuadas de 0 a 3 (3 = según protocolo, 0 = incompatible con el servicio).

## Cómo se decide APTO / NO APTO

El agente es **APTO** si cumple las tres condiciones:

- Puntuación global de **70 % o más**.
- Ninguna competencia por debajo del **50 %**.
- Como máximo **1 respuesta incompatible** por cada 20 preguntas (mínimo 1).

Los umbrales se cambian en `js/evaluacion.js` → `CRITERIOS`.

### Ejemplos de criterio generado

- **Apto (≥ 70 %)**: *El evaluado muestra un criterio general adecuado para el servicio. Destaca su coordinación y trabajo en equipo. Mantiene una base estable de actuación profesional.*
- **Apto (≥ 90 %)**: *La evaluada muestra un criterio excelente para el servicio. Destaca su templanza bajo presión, así como su integridad y apego al protocolo. Demuestra una actuación profesional sólida y fiable.*
- **No apto**: *El evaluado muestra un criterio insuficiente para el servicio en este momento. Presenta respuestas incompatibles con el protocolo de actuación. Se recomienda reforzar el autocontrol y el uso proporcional de la fuerza antes de una nueva evaluación.*

## Estructura

```
├── index.html            Página principal
├── css/styles.css        Estilos (modo claro y oscuro)
├── js/preguntas.js       Banco de 60 preguntas y competencias
├── js/evaluacion.js      Selección, puntuación y redacción del criterio
├── js/certificado.js     Dibujo del certificado (canvas 1224 × 2016)
├── js/pdf.js             Exportación a PDF sin librerías externas
├── js/app.js             Flujo de la aplicación
└── assets/               Logo EMS y sello oficial
```

No necesita servidor ni dependencias: es HTML, CSS y JavaScript puros.

## Publicar en GitHub Pages

1. Crea el repositorio (por ejemplo `psicotecnico-hospital-central`) y sube todos los archivos tal cual.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Elige la rama `main` y la carpeta `/ (root)` y guarda.
4. En un par de minutos estará disponible en `https://TU-USUARIO.github.io/psicotecnico-hospital-central/`.

Desde terminal:

```bash
git init
git add .
git commit -m "Psicotécnico Hospital Central: examen y certificado"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/psicotecnico-hospital-central.git
git push -u origin main
```

## Personalizar

- **Añadir o editar preguntas**: `js/preguntas.js`. Copia un bloque `{ c, t, o }` y asigna la competencia en `c`.
- **Rangos sugeridos por facción**: `js/app.js` → `RANGOS` (el campo admite cualquier texto).
- **Frases del criterio**: `js/preguntas.js` → `COMPETENCIAS` (fortaleza / refuerzo) y `js/evaluacion.js` → `redactarCriterio`.
- **Logo y sello**: reemplaza los PNG de `assets/` manteniendo el nombre.

---

Proyecto de rol. Hospital Central, LSPD, LSSD y FBI son facciones del servidor; no representa a ninguna institución real.
