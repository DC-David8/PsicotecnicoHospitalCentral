/*
 * Banco de preguntas del Psicotécnico — Hospital Central (EMS)
 * ------------------------------------------------------------
 * 60 preguntas situacionales, 10 por cada competencia.
 * Cada opción lleva una puntuación de 0 a 3:
 *   3 = respuesta ideal según protocolo
 *   2 = respuesta aceptable
 *   1 = respuesta poco adecuada
 *   0 = respuesta incompatible con el servicio (cuenta como "alerta")
 * El orden de las opciones se baraja al mostrar el examen.
 *
 * Para añadir preguntas: copia un bloque { c, t, o } dentro de BANCO.
 * "c" es la clave de la competencia (ver COMPETENCIAS).
 */

const COMPETENCIAS = {
  estabilidad: {
    nombre: "Estabilidad emocional",
    fortaleza: "estabilidad emocional",
    refuerzo: "la gestión emocional",
  },
  estres: {
    nombre: "Manejo del estrés",
    fortaleza: "templanza bajo presión",
    refuerzo: "el manejo del estrés",
  },
  decisiones: {
    nombre: "Toma de decisiones",
    fortaleza: "criterio en la toma de decisiones",
    refuerzo: "la toma de decisiones bajo presión",
  },
  equipo: {
    nombre: "Trabajo en equipo",
    fortaleza: "coordinación y trabajo en equipo",
    refuerzo: "la coordinación con el equipo",
  },
  integridad: {
    nombre: "Integridad y ética",
    fortaleza: "integridad y apego al protocolo",
    refuerzo: "el apego a la ética profesional",
  },
  impulsos: {
    nombre: "Autocontrol y uso de la fuerza",
    fortaleza: "autocontrol y uso proporcional de la fuerza",
    refuerzo: "el autocontrol y el uso proporcional de la fuerza",
  },
};

const BANCO = [
  // ───────────── ESTABILIDAD EMOCIONAL ─────────────
  { c: "estabilidad", t: "Un ciudadano te insulta repetidamente mientras le redactas una multa. ¿Cómo actúas?", o: [
    ["Mantengo un tono profesional, termino el procedimiento y le informo de cómo recurrir la multa.", 3],
    ["Le pido con firmeza que se calme y continúo, aunque me cuesta.", 2],
    ["Le respondo con ironía para que vea que no me afecta.", 1],
    ["Le devuelvo los insultos: nadie le falta el respeto a un agente.", 0]] },
  { c: "estabilidad", t: "Tras una persecución fallida, un superior te reprende delante de todo el equipo.", o: [
    ["Escucho, asumo lo que me corresponde y pido revisarlo en privado más tarde.", 3],
    ["Lo acepto sin decir nada, aunque me quedo molesto el resto del turno.", 2],
    ["Me justifico en ese momento discutiendo cada punto.", 1],
    ["Le contesto en el mismo tono delante de todos.", 0]] },
  { c: "estabilidad", t: "Has presenciado un accidente con víctimas mortales durante tu turno. Al terminar el servicio…", o: [
    ["Hablo con un compañero o con el servicio de apoyo psicológico si lo necesito.", 3],
    ["Me tomo un rato a solas para despejarme antes de volver a casa.", 2],
    ["Lo ignoro y sigo como si nada hubiera pasado.", 1],
    ["Bebo para olvidarlo; es lo que hace todo el mundo.", 0]] },
  { c: "estabilidad", t: "Un compañero comete un error que te deja en evidencia delante de un detenido.", o: [
    ["Corrijo la situación con calma y lo hablamos al terminar el servicio.", 3],
    ["Le hago una señal discreta y sigo con el procedimiento.", 2],
    ["Le recrimino el error en ese mismo momento.", 1],
    ["Me enfado y abandono el procedimiento.", 0]] },
  { c: "estabilidad", t: "Llevas varias semanas haciendo turnos dobles y notas que estás más irritable de lo normal.", o: [
    ["Lo comunico a mi supervisor y busco organizar descansos.", 3],
    ["Intento descansar más en mis días libres.", 2],
    ["Lo dejo pasar; ya se me pasará.", 1],
    ["Lo descargo con los ciudadanos durante las intervenciones.", 0]] },
  { c: "estabilidad", t: "Un sospechoso intenta provocarte hablando mal de tu familia.", o: [
    ["No entro en el juego y mantengo el foco en el procedimiento.", 3],
    ["Le corto la conversación con firmeza y sigo.", 2],
    ["Le advierto de que se está buscando problemas.", 1],
    ["Pierdo la calma y lo amenazo.", 0]] },
  { c: "estabilidad", t: "Recibes una queja formal de un ciudadano que consideras injusta.", o: [
    ["Colaboro con la investigación interna y aporto mi versión con pruebas.", 3],
    ["Respondo a la queja aunque me parece una pérdida de tiempo.", 2],
    ["Me quejo con los compañeros de lo injusta que es.", 1],
    ["Busco al ciudadano para pedirle explicaciones.", 0]] },
  { c: "estabilidad", t: "No has sido seleccionado para un ascenso que esperabas.", o: [
    ["Pido una valoración sobre qué mejorar y sigo trabajando.", 3],
    ["Me siento decepcionado, pero acepto la decisión.", 2],
    ["Bajo mi rendimiento durante un tiempo.", 1],
    ["Critico públicamente a quien fue ascendido.", 0]] },
  { c: "estabilidad", t: "Durante un servicio rutinario recibes una mala noticia personal por teléfono.", o: [
    ["Informo a mi supervisor por si necesito relevo y valoro si puedo continuar con seguridad.", 3],
    ["Termino el servicio intentando concentrarme.", 2],
    ["Sigo trabajando sin decir nada, aunque estoy distraído.", 1],
    ["Abandono el puesto sin avisar.", 0]] },
  { c: "estabilidad", t: "Un ciudadano te graba con el móvil durante una intervención.", o: [
    ["Sigo actuando con normalidad; grabar en la vía pública es su derecho si no interfiere.", 3],
    ["Le pido que mantenga una distancia de seguridad.", 2],
    ["Le exijo que deje de grabar.", 1],
    ["Le quito el móvil.", 0]] },

  // ───────────── MANEJO DEL ESTRÉS ─────────────
  { c: "estres", t: "Recibes tres avisos simultáneos por radio y eres la única unidad disponible.", o: [
    ["Priorizo según el riesgo para las personas, informo a central y pido apoyo.", 3],
    ["Atiendo el más cercano y aviso del resto.", 2],
    ["Atiendo el primero que recibí.", 1],
    ["Me bloqueo y espero a que central decida por mí.", 0]] },
  { c: "estres", t: "En medio de un tiroteo tu radio deja de funcionar.", o: [
    ["Me pongo a cubierto y uso señales acordadas o un canal alternativo, como la radio de un compañero.", 3],
    ["Me cubro y espero a que el equipo se acerque.", 2],
    ["Intento arreglar la radio en ese momento.", 1],
    ["Salgo de la cobertura para buscar a mi equipo.", 0]] },
  { c: "estres", t: "Debes redactar un informe extenso y queda poco tiempo para terminar el turno.", o: [
    ["Organizo los datos clave y lo redacto con precisión, aunque me quede algo más.", 3],
    ["Hago un informe básico y aviso de que lo completaré al día siguiente.", 2],
    ["Lo hago rápido y sin revisar.", 1],
    ["Lo dejo sin hacer.", 0]] },
  { c: "estres", t: "Una persecución se alarga y notas mucha tensión y adrenalina.", o: [
    ["Controlo la respiración, comunico mi posición y reduzco el riesgo si la situación lo requiere.", 3],
    ["Sigo la persecución y confío en el equipo.", 2],
    ["Acelero para terminarla cuanto antes.", 1],
    ["Asumo riesgos extremos para no perderlo.", 0]] },
  { c: "estres", t: "Un rehén grita y llora sin parar durante una negociación.", o: [
    ["Mantengo la calma, transmito seguridad y sigo el protocolo del negociador.", 3],
    ["Intento tranquilizarlo con palabras.", 2],
    ["Le pido que se calle para poder concentrarme.", 1],
    ["Actúo por mi cuenta para terminar rápido.", 0]] },
  { c: "estres", t: "En el lugar de un accidente varias personas te exigen atención a la vez.", o: [
    ["Establezco prioridades, delego tareas y doy instrucciones claras.", 3],
    ["Atiendo a quien parece más grave.", 2],
    ["Atiendo a quien grita más.", 1],
    ["Me retiro hasta que lleguen refuerzos.", 0]] },
  { c: "estres", t: "Un operativo sale mal y tienes que reaccionar en segundos.", o: [
    ["Aplico el plan de contingencia y lo comunico al mando.", 3],
    ["Me repliego y espero instrucciones.", 2],
    ["Improviso sin avisar a nadie.", 1],
    ["Me quedo paralizado.", 0]] },
  { c: "estres", t: "Estás nervioso antes de declarar como testigo en un juicio.", o: [
    ["Repaso mi informe, me apoyo en los hechos y respondo con sinceridad.", 3],
    ["Pido consejo a un compañero con experiencia.", 2],
    ["Intento memorizar respuestas para no fallar.", 1],
    ["Pido que me eximan de declarar.", 0]] },
  { c: "estres", t: "Llevas 12 horas de servicio y te asignan un aviso urgente.", o: [
    ["Valoro mi estado: si estoy apto acudo, y si no, lo comunico para que asignen otra unidad.", 3],
    ["Acudo aunque esté cansado.", 2],
    ["Acudo y lo resuelvo deprisa para irme.", 1],
    ["Ignoro el aviso.", 0]] },
  { c: "estres", t: "Durante una detención se concentra una multitud que se vuelve hostil.", o: [
    ["Aseguro al detenido, pido refuerzos y busco una salida segura sin provocar.", 3],
    ["Me retiro rápidamente con el detenido.", 2],
    ["Amenazo a la multitud para que se disperse.", 1],
    ["Saco el arma para intimidar.", 0]] },

  // ───────────── TOMA DE DECISIONES ─────────────
  { c: "decisiones", t: "Encuentras un vehículo con una persona inconsciente dentro y el motor encendido.", o: [
    ["Aseguro la escena, compruebo su estado, solicito EMS y apago el motor.", 3],
    ["Llamo a EMS y espero a que lleguen.", 2],
    ["Rompo el cristal sin valorar nada más.", 1],
    ["Le pongo una multa por mal estacionamiento.", 0]] },
  { c: "decisiones", t: "Dos testigos te dan versiones contradictorias de lo ocurrido.", o: [
    ["Registro ambas versiones, busco pruebas objetivas y no saco conclusiones precipitadas.", 3],
    ["Me quedo con la versión que me parece más creíble.", 2],
    ["Elijo la del testigo que conozco.", 1],
    ["Ignoro a los dos testigos.", 0]] },
  { c: "decisiones", t: "Un superior te da una orden que parece contraria al protocolo.", o: [
    ["Pido aclaración con respeto; si es ilegal, no la ejecuto y lo comunico por la vía correspondiente.", 3],
    ["La cumplo, pero dejo constancia por escrito.", 2],
    ["La cumplo sin preguntar.", 1],
    ["La ignoro sin decir nada.", 0]] },
  { c: "decisiones", t: "En un control rutinario notas olor a sustancias y el conductor está muy nervioso.", o: [
    ["Aplico el protocolo: le informo, solicito apoyo y realizo el registro según la normativa.", 3],
    ["Le pregunto directamente y decido según su respuesta.", 2],
    ["Le dejo ir con una advertencia.", 1],
    ["Registro el vehículo sin informarle ni seguir el protocolo.", 0]] },
  { c: "decisiones", t: "Llegas solo a una escena con un herido y un sospechoso huyendo.", o: [
    ["Atiendo al herido, solicito EMS y comunico la descripción y dirección del sospechoso.", 3],
    ["Lo comunico todo por radio y espero indicaciones.", 2],
    ["Persigo al sospechoso y dejo al herido.", 1],
    ["No hago nada hasta que llegue alguien.", 0]] },
  { c: "decisiones", t: "Para llegar a un aviso puedes tomar una ruta rápida pero peligrosa u otra más lenta.", o: [
    ["Valoro la urgencia del aviso y el riesgo para terceros antes de decidir.", 3],
    ["Elijo siempre la ruta segura.", 2],
    ["Elijo siempre la ruta rápida.", 1],
    ["Elijo al azar.", 0]] },
  { c: "decisiones", t: "Una persona armada se atrinchera en una tienda con clientes dentro.", o: [
    ["Establezco un perímetro, informo al mando y solicito unidades especializadas.", 3],
    ["Intento hablar con él desde fuera mientras llegan refuerzos.", 2],
    ["Entro solo para sorprenderlo.", 1],
    ["Disparo a través del escaparate.", 0]] },
  { c: "decisiones", t: "Ves circular un vehículo con una matrícula reportada como robada.", o: [
    ["Informo a central, solicito apoyo y hago una detención de alto riesgo según protocolo.", 3],
    ["Lo sigo a distancia hasta que llegue apoyo.", 2],
    ["Lo detengo yo solo de inmediato.", 1],
    ["Lo dejo pasar; no es mi zona.", 0]] },
  { c: "decisiones", t: "Durante una investigación aparece una prueba que contradice tu primera hipótesis.", o: [
    ["Reviso mi hipótesis y sigo la evidencia.", 3],
    ["Investigo más antes de cambiar de opinión.", 2],
    ["Le resto importancia.", 1],
    ["La oculto para no complicar el caso.", 0]] },
  { c: "decisiones", t: "En una persecución, el sospechoso entra en una zona escolar a la hora de salida.", o: [
    ["Reduzco la velocidad, comunico la situación y priorizo la seguridad de los menores.", 3],
    ["Mantengo la distancia y sigo con precaución.", 2],
    ["Sigo igual; no puedo perderlo.", 1],
    ["Acelero para alcanzarlo antes de que escape.", 0]] },

  // ───────────── TRABAJO EN EQUIPO ─────────────
  { c: "equipo", t: "Un compañero nuevo no sigue bien el procedimiento de detención.", o: [
    ["Le explico en privado cómo hacerlo y le ofrezco practicarlo juntos.", 3],
    ["Lo comento con el supervisor para que lo forme.", 2],
    ["Lo corrijo delante del detenido.", 1],
    ["Lo dejo; ya aprenderá solo.", 0]] },
  { c: "equipo", t: "Tu equipo decide una táctica con la que no estás de acuerdo.", o: [
    ["Expongo mi opinión con argumentos y, si se decide otra cosa, la ejecuto con compromiso.", 3],
    ["Me callo y la sigo.", 2],
    ["La sigo de mala gana.", 1],
    ["Hago lo que creo mejor por mi cuenta.", 0]] },
  { c: "equipo", t: "En una operación conjunta entre varias facciones hay dudas sobre quién tiene el mando.", o: [
    ["Respeto la cadena de mando acordada y aclaro los roles antes de actuar.", 3],
    ["Sigo a quien tenga más rango.", 2],
    ["Solo sigo las órdenes de mi propia facción.", 1],
    ["Actúo sin coordinarme con nadie.", 0]] },
  { c: "equipo", t: "Un compañero está sobrecargado de trabajo y tú tienes tiempo libre.", o: [
    ["Le ofrezco ayuda y nos coordinamos.", 3],
    ["Le ayudo si me lo pide.", 2],
    ["No es mi trabajo.", 1],
    ["Me quejo de lo lento que es.", 0]] },
  { c: "equipo", t: "Hay un conflicto entre dos compañeros de tu unidad.", o: [
    ["Medio para que lo hablen y, si persiste, lo comunico al supervisor.", 3],
    ["Lo comunico directamente al supervisor.", 2],
    ["Me pongo del lado del que me cae mejor.", 1],
    ["Alimento el conflicto.", 0]] },
  { c: "equipo", t: "Durante un operativo descubres información útil para otra unidad.", o: [
    ["La comparto de inmediato por el canal adecuado.", 3],
    ["La comparto al terminar el operativo.", 2],
    ["Me la guardo por si me sirve más adelante.", 1],
    ["La oculto para llevarme el mérito.", 0]] },
  { c: "equipo", t: "Te asignan patrulla con un compañero con el que no tienes afinidad.", o: [
    ["Mantengo una relación profesional y me centro en el servicio.", 3],
    ["Pido cambiar de compañero la próxima vez.", 2],
    ["Hablo con él lo mínimo.", 1],
    ["Me niego a patrullar con él.", 0]] },
  { c: "equipo", t: "Un operativo sale bien gracias al trabajo de todos.", o: [
    ["Reconozco el trabajo del equipo en el informe.", 3],
    ["Lo comento de manera informal.", 2],
    ["Destaco sobre todo mi parte.", 1],
    ["Me atribuyo todo el mérito.", 0]] },
  { c: "equipo", t: "Un compañero pide apoyo por radio en una zona lejana a la tuya.", o: [
    ["Confirmo disponibilidad, coordino con central y acudo si soy la unidad adecuada.", 3],
    ["Acudo directamente.", 2],
    ["Espero a que responda otra unidad.", 1],
    ["Ignoro la llamada.", 0]] },
  { c: "equipo", t: "Tu supervisor pide voluntarios para una tarea poco agradable.", o: [
    ["Me ofrezco si puedo; forma parte del servicio.", 3],
    ["Me ofrezco solo si nadie más lo hace.", 2],
    ["Pongo una excusa.", 1],
    ["Critico la tarea delante de todos.", 0]] },

  // ───────────── INTEGRIDAD Y ÉTICA ─────────────
  { c: "integridad", t: "Durante un registro encuentras una gran cantidad de dinero en efectivo.", o: [
    ["Lo documento, lo incauto según protocolo y lo entrego como prueba.", 3],
    ["Lo cuento junto a un compañero y lo entrego.", 2],
    ["Se lo devuelvo al propietario sin documentarlo.", 1],
    ["Me quedo con una parte.", 0]] },
  { c: "integridad", t: "Un comerciante te ofrece comida gratis \"por las molestias\".", o: [
    ["Lo rechazo con amabilidad y pago.", 3],
    ["Acepto solo un café.", 2],
    ["Acepto, pero no lo convierto en costumbre.", 1],
    ["Acepto y le prometo vigilar especialmente su negocio.", 0]] },
  { c: "integridad", t: "Ves a un compañero usar fuerza excesiva contra un detenido esposado.", o: [
    ["Intervengo para detenerlo y lo reporto.", 3],
    ["Lo reporto después.", 2],
    ["Lo hablo con él en privado sin reportarlo.", 1],
    ["Miro hacia otro lado.", 0]] },
  { c: "integridad", t: "Un familiar te pide que le anules una multa.", o: [
    ["Le explico que no puedo y le indico cómo recurrirla legalmente.", 3],
    ["Le digo que no, sin más.", 2],
    ["Le digo que hablaré con alguien.", 1],
    ["La anulo.", 0]] },
  { c: "integridad", t: "Descubres un error en un informe que ya entregaste.", o: [
    ["Lo comunico y presento una rectificación.", 3],
    ["Lo corrijo si alguien lo detecta.", 2],
    ["Lo dejo; no es grave.", 1],
    ["Modifico otros datos para que todo cuadre.", 0]] },
  { c: "integridad", t: "Un detenido te ofrece información a cambio de que \"pierdas\" una prueba.", o: [
    ["Rechazo la oferta, lo documento e informo al investigador.", 3],
    ["Rechazo la oferta.", 2],
    ["Le digo que me lo pensaré.", 1],
    ["Acepto el trato.", 0]] },
  { c: "integridad", t: "Un periodista te pregunta por una investigación confidencial que conoces.", o: [
    ["No revelo nada y lo remito al portavoz oficial.", 3],
    ["Le digo que no puedo hablar del tema.", 2],
    ["Le doy alguna pista de manera extraoficial.", 1],
    ["Le cuento todo lo que sé.", 0]] },
  { c: "integridad", t: "Un superior te pide que cambies la hora de un incidente en tu informe.", o: [
    ["Me niego y lo comunico por la vía correspondiente.", 3],
    ["Me niego.", 2],
    ["Lo cambio si me lo pide por escrito.", 1],
    ["Lo cambio sin más.", 0]] },
  { c: "integridad", t: "Detienes a una persona influyente que exige un trato especial.", o: [
    ["La trato con respeto y con el mismo procedimiento que a cualquier ciudadano.", 3],
    ["Consulto a mi supervisor cómo proceder.", 2],
    ["Le doy algunas facilidades.", 1],
    ["La dejo ir.", 0]] },
  { c: "integridad", t: "Un amigo te pide que busques en la base de datos policial la dirección de su expareja.", o: [
    ["Me niego, el acceso es solo para fines policiales, y si veo un riesgo lo comunico.", 3],
    ["Me niego.", 2],
    ["Le digo solo en qué ciudad vive.", 1],
    ["Le doy la dirección.", 0]] },

  // ───────────── AUTOCONTROL Y USO DE LA FUERZA ─────────────
  { c: "impulsos", t: "Un sospechoso se resiste pasivamente a ser esposado.", o: [
    ["Uso la mínima fuerza necesaria y le doy instrucciones verbales claras.", 3],
    ["Pido ayuda a un compañero para reducirlo.", 2],
    ["Uso el táser de inmediato.", 1],
    ["Lo golpeo para que aprenda.", 0]] },
  { c: "impulsos", t: "Un conductor huye de un control.", o: [
    ["Comunico matrícula y dirección, y persigo solo si el riesgo lo justifica.", 3],
    ["Lo persigo con precaución.", 2],
    ["Lo persigo a toda velocidad.", 1],
    ["Disparo al vehículo.", 0]] },
  { c: "impulsos", t: "Una persona en aparente crisis mental grita en la calle con un objeto en la mano.", o: [
    ["Mantengo la distancia, intento desescalar hablando y solicito EMS y apoyo especializado.", 3],
    ["Pido refuerzos y espero.", 2],
    ["Le ordeno a gritos que suelte el objeto.", 1],
    ["Uso el arma de fuego de inmediato.", 0]] },
  { c: "impulsos", t: "Tras una persecución larga, el sospechoso se rinde.", o: [
    ["Lo detengo según protocolo, sin represalias.", 3],
    ["Lo detengo con firmeza, aunque estoy alterado.", 2],
    ["Le grito mientras lo esposo.", 1],
    ["Le doy un golpe por hacerme correr.", 0]] },
  { c: "impulsos", t: "Un menor roba en una tienda y huye corriendo.", o: [
    ["Le doy alcance si es seguro, uso la mínima fuerza y aviso a sus tutores.", 3],
    ["Lo persigo y lo detengo.", 2],
    ["Lo persigo con el coche patrulla.", 1],
    ["Le apunto con el arma.", 0]] },
  { c: "impulsos", t: "Alguien te empuja durante una manifestación.", o: [
    ["Mantengo la calma, aseguro la zona e identifico al agresor para actuar con proporcionalidad.", 3],
    ["Lo aparto y le advierto.", 2],
    ["Le devuelvo el empujón.", 1],
    ["Cargo contra todo el grupo.", 0]] },
  { c: "impulsos", t: "Un sospechoso ya esposado no deja de insultarte.", o: [
    ["Lo ignoro y continúo con el traslado.", 3],
    ["Le pido que se calme.", 2],
    ["Le aprieto más las esposas.", 1],
    ["Lo golpeo.", 0]] },
  { c: "impulsos", t: "Tienes el arma desenfundada y el sospechoso suelta la suya y levanta las manos.", o: [
    ["Mantengo el control verbal, le ordeno tumbarse y procedo a la detención sin disparar.", 3],
    ["Espero apoyo antes de acercarme.", 2],
    ["Le grito amenazas.", 1],
    ["Disparo igualmente, por si acaso.", 0]] },
  { c: "impulsos", t: "Un compañero te provoca constantemente con bromas pesadas.", o: [
    ["Le pido con calma que pare y, si sigue, lo comunico.", 3],
    ["Lo evito.", 2],
    ["Le respondo con una broma más pesada.", 1],
    ["Lo enfrento físicamente.", 0]] },
  { c: "impulsos", t: "Durante un control, alguien te graba y se burla de ti.", o: [
    ["Mantengo la profesionalidad y sigo con el control.", 3],
    ["Le pido que mantenga la distancia.", 2],
    ["Le respondo con sarcasmo.", 1],
    ["Lo detengo sin motivo legal.", 0]] },
];
