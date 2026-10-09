/*
 * Banco de preguntas del Psicotécnico — Hospital Central (EMS)
 * ------------------------------------------------------------
 * 60 preguntas situacionales basadas en las normativas vigentes de Jerarquía RP:
 *   Normativa General, Policial, Organizaciones Criminales, Secuestros, Robos,
 *   Puntos Calientes y Vehículos de Guerra.
 * Hay 10 preguntas por cada competencia.
 *
 * Cada opción lleva una puntuación de 0 a 3:
 *   3 = respuesta correcta según la normativa y el protocolo
 *   2 = respuesta aceptable
 *   1 = respuesta poco adecuada o error de normativa
 *   0 = respuesta incompatible con el servicio (cuenta como "alerta")
 * El 0 se reserva para conductas graves (abuso, corrupción, romper el rol,
 * disparar sin justificación…). Un simple desconocimiento puntúa 1.
 * El orden de las opciones se baraja al mostrar el examen.
 *
 * Para añadir preguntas: copia un bloque { c, t, o } dentro de BANCO.
 * "c" es la clave de la competencia (ver COMPETENCIAS).
 * Si cambia la normativa, actualiza aquí las preguntas afectadas.
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
    fortaleza: "solidez en la toma de decisiones",
    refuerzo: "la toma de decisiones conforme a la normativa",
  },
  equipo: {
    nombre: "Trabajo en equipo",
    fortaleza: "coordinación y trabajo en equipo",
    refuerzo: "la coordinación con el equipo",
  },
  integridad: {
    nombre: "Integridad y ética",
    fortaleza: "integridad y apego a la normativa",
    refuerzo: "el apego a la normativa y a la ética profesional",
  },
  impulsos: {
    nombre: "Autocontrol y uso de la fuerza",
    fortaleza: "autocontrol y uso proporcional de la fuerza",
    refuerzo: "el autocontrol y el uso proporcional de la fuerza",
  },
};

const BANCO = [
  // ───────────── ESTABILIDAD EMOCIONAL ─────────────
  { c: "estabilidad", t: "Un civil te insulta repetidamente durante un control rutinario.", o: [
    ["Mantengo la compostura y sigo con el control.", 3],
    ["Le pido con firmeza que modere el tono y continúo con el control.", 2],
    ["Le contesto con ironía, sin llegar a insultarle.", 1],
    ["Le devuelvo el insulto; él empezó primero.", 0]] },
  { c: "estabilidad", t: "En pleno operativo, el H-50 da una orden con la que no estás de acuerdo.", o: [
    ["La cumplo y, al terminar, expongo mi opinión por el canal adecuado.", 3],
    ["La cumplo sin decir nada, aunque me quedo molesto.", 2],
    ["Le discuto la orden por radio delante de todos.", 1],
    ["Hago lo contrario porque creo que tengo razón.", 0]] },
  { c: "estabilidad", t: "Te abaten durante un tiroteo. ¿Qué haces mientras estás abatido?", o: [
    ["Me muteo en TS3 y no hablo hasta que termine el rol.", 3],
    ["Me muteo en TS3, aunque tardo un poco en hacerlo.", 2],
    ["Comento por TS3 lo que ha pasado, sin dar posiciones.", 1],
    ["Envío un QRR (agente en peligro) para que mis compañeros vengan a por mí.", 0]] },
  { c: "estabilidad", t: "Acabas de abatir a un sospechoso tras un tiroteo muy tenso. Al informar por radio…", o: [
    ["Comunico con calma que el sospechoso ha sido abatido y pido EMS.", 3],
    ["Informo de que está abatido, aunque con un tono alterado.", 2],
    ["Digo que está muerto, que es lo que ha pasado realmente y así queda más claro.", 1],
    ["Celebro por radio que me lo he cargado.", 0]] },
  { c: "estabilidad", t: "Eres cadete y en tu semana de prueba cometes varios errores.", o: [
    ["Pido feedback a mis superiores y corrijo los fallos cuanto antes.", 3],
    ["Sigo patrullando y confío en mejorar con la práctica.", 2],
    ["Me desanimo y evito salir de servicio para no fallar.", 1],
    ["Explico a mis superiores que mis errores se deben a que mis compañeros no me ayudan.", 0]] },
  { c: "estabilidad", t: "Un compañero te falta al respeto delante de un detenido.", o: [
    ["Mantengo la calma y lo comunico a un superior al terminar.", 3],
    ["Le pido que pare y lo hablamos después en privado.", 2],
    ["Le contesto en el mismo tono para no quedar mal.", 1],
    ["Me enfrento a él allí mismo, delante del detenido.", 0]] },
  { c: "estabilidad", t: "Durante la negociación de un robo, el atracador se burla de ti y te provoca.", o: [
    ["Mantengo un tono profesional y me centro en las condiciones.", 3],
    ["Le advierto de que, si sigue burlándose, se acaba la conversación y entramos.", 2],
    ["Le respondo con amenazas para que deje de burlarse.", 1],
    ["Rompo la negociación y entro sin esperar a nadie.", 0]] },
  { c: "estabilidad", t: "Una organización te secuestra estando de servicio y te retiene durante la negociación.", o: [
    ["Mantengo la calma y colaboro para que la negociación salga bien.", 3],
    ["Me quedo callado y dejo que negocien mis compañeros, sin intervenir en nada.", 2],
    ["Provoco a los secuestradores para ponerlos nerviosos.", 1],
    ["Intento escapar sin pensar en el riesgo para el resto.", 0]] },
  { c: "estabilidad", t: "Por motivos personales estuviste dos semanas inactivo y has perdido tu rango.", o: [
    ["Lo acepto, vuelvo al servicio y trabajo para recuperar mi división.", 3],
    ["Pregunto a jefatura qué necesito para recuperar mi posición.", 2],
    ["Me quejo en público de que es una injusticia.", 1],
    ["Abandono la facción sin avisar a nadie.", 0]] },
  { c: "estabilidad", t: "Patrullas en binomio y seis atracadores armados os rodean y os apuntan.", o: [
    ["Valoro mi vida: levanto las manos y me rindo.", 3],
    ["Intento ganar tiempo hablando, sin hacer movimientos bruscos.", 2],
    ["Pido refuerzos por radio a escondidas mientras me apuntan.", 1],
    ["Desenfundo y abro fuego, aunque estemos en clara inferioridad.", 0]] },

  // ───────────── MANEJO DEL ESTRÉS ─────────────
  { c: "estres", t: "En el robo al Banco Central (DEFCON 1, alerta máxima) el tiroteo se alarga y la tensión es máxima.", o: [
    ["Mantengo mi posición, informo de lo que veo y sigo al H-50.", 3],
    ["Me centro solo en mi sector y dejo la radio a los demás.", 2],
    ["Salgo de cobertura para avanzar y terminar el tiroteo cuanto antes, cueste lo que cueste.", 1],
    ["Abandono el operativo porque la situación me supera.", 0]] },
  { c: "estres", t: "Una persecución supera los 10 minutos y empiezas a frustrarte.", o: [
    ["Doy los avisos reglamentarios y después intento un código 100 (bloquear el vehículo) o pinchar.", 3],
    ["Sigo detrás a distancia prudente y pido a otra unidad que lo releve para no perderlo.", 2],
    ["Pincho las ruedas directamente, sin dar los avisos.", 1],
    ["Le hago un código PIT (desestabilizar el vehículo) para acabar de una vez.", 0]] },
  { c: "estres", t: "Hay un robo en curso y siguen llegando nuevas solicitudes de robo.", o: [
    ["Respeto el turno de robos y acepto a los primeros solicitantes.", 3],
    ["Pido a central que lleve el turno mientras atiendo el robo actual.", 2],
    ["Acepto el que me queda más cerca, aunque no le toque.", 1],
    ["Los rechazo todos para no complicarme el turno.", 0]] },
  { c: "estres", t: "En un secuestro a un compañero, los secuestradores (sin un Comandante retenido) exigen armas y dinero.", o: [
    ["Les recuerdo con calma que solo se negocia lo que permite la normativa.", 3],
    ["Pido un momento y lo consulto con el H-50 antes de responder.", 2],
    ["Les ofrezco las armas y el dinero que piden, porque la vida del compañero es lo primero.", 1],
    ["Rompo la negociación y abro fuego sin avisar.", 0]] },
  { c: "estres", t: "Robo en la joyería: han pasado 25 de los 30 minutos y aún no hay acuerdo.", o: [
    ["Mantengo la calma y aviso de que el tiempo está a punto de agotarse.", 3],
    ["Sigo negociando y dejo que el tiempo corra.", 2],
    ["Acepto cualquier condición que pongan con tal de cerrar el acuerdo antes de que acabe el tiempo.", 1],
    ["Entro sin avisar para terminar ya.", 0]] },
  { c: "estres", t: "Estás atendiendo un 10-23 (venta de droga) y entra un QRR (agente en peligro).", o: [
    ["Aviso a central, aseguro la escena y acudo al QRR si me corresponde.", 3],
    ["Dejo el 10-23 a medias y voy directo al QRR, porque un agente en peligro es lo primero.", 2],
    ["Termino primero el 10-23 y luego ya veré.", 1],
    ["Ignoro el QRR; ya irá otra unidad.", 0]] },
  { c: "estres", t: "Durante un código 3 (tiroteo en curso) la radio se satura de mensajes.", o: [
    ["Pido QRX (silencio en radio) y comunico solo lo esencial.", 3],
    ["Hablo solo cuando me preguntan directamente.", 2],
    ["Repito varias veces mi posición para asegurarme.", 1],
    ["Cambio de canal y actúo por mi cuenta.", 0]] },
  { c: "estres", t: "Han secuestrado a tres compañeros y la presión en la negociación es enorme.", o: [
    ["Mantengo la cabeza fría y negocio dentro de lo permitido.", 3],
    ["Dejo la negociación al agente con más experiencia y le apoyo.", 2],
    ["Acepto la primera propuesta para no alargarlo.", 1],
    ["Ordeno asaltar sin negociar, aunque la negociación es obligatoria.", 0]] },
  { c: "estres", t: "En pleno rol tenso, un jugador te escribe por /ooc quejándose de tu actuación.", o: [
    ["Sigo con el rol y, si hay un problema, se resuelve al terminar.", 3],
    ["Le respondo brevemente por /ooc y sigo interpretando a mi personaje.", 2],
    ["Discuto con él por /ooc mientras el rol continúa.", 1],
    ["Corto el rol para discutir con él fuera de personaje.", 0]] },
  { c: "estres", t: "En el robo a un Flecca, uno de los rehenes entra en pánico.", o: [
    ["Transmito calma y sigo la negociación pensando en su seguridad.", 3],
    ["Le pido que se tranquilice y espere instrucciones.", 2],
    ["Lo ignoro para centrarme en los atracadores.", 1],
    ["Entro a por él sin coordinarme con el equipo.", 0]] },

  // ───────────── TOMA DE DECISIONES ─────────────
  { c: "decisiones", t: "Hay avisos de secuestros y tiroteos, y el H-50 establece DEFCON 3. ¿Qué te permite?", o: [
    ["Portar SMG y registrar a personas sospechosas.", 3],
    ["Usar escopeta solo si la intervención lo requiere.", 2],
    ["Usar únicamente las armas reglamentarias.", 1],
    ["Usar cualquier armamento, incluidas carabinas.", 0]] },
  { c: "decisiones", t: "En mitad de un tiroteo crees que habría que subir el nivel de alerta.", o: [
    ["Se lo comunico al H-50, que es el único que puede establecer el DEFCON.", 3],
    ["Espero a que el H-50 decida, sin decir nada.", 2],
    ["Le pido a un sargento que lo suba, ya que tiene rango suficiente para hacerlo.", 1],
    ["Lo subo yo y saco armamento pesado.", 0]] },
  { c: "decisiones", t: "Se activa un robo en un Badulaque con dos atracadores. ¿Cómo responde la policía?", o: [
    ["Acuden de 2 a 3 policías, sin tiradores ni helicóptero.", 3],
    ["Acuden 3 policías y piden el helicóptero por si huyen.", 2],
    ["Acuden 5 policías para asegurar la zona.", 1],
    ["Acude toda la comisaría con armas largas.", 0]] },
  { c: "decisiones", t: "Ves en /socialanon un mensaje vendiendo armas que dice \"con VPN, imposible de rastrear\".", o: [
    ["Se puede rastrear igualmente, porque describe una acción ilegal explícita.", 3],
    ["Lo comunico a jefatura para que valoren si se rastrea.", 2],
    ["No se puede rastrear porque menciona una VPN.", 1],
    ["Quedo con él haciéndome pasar por comprador y lo abato sin más.", 0]] },
  { c: "decisiones", t: "La persona a la que investigas está dentro de un gimnasio.", o: [
    ["Espero a que salga; en zona segura no se inicia un rol agresivo.", 3],
    ["La vigilo desde fuera y aviso a mis compañeros de su posición.", 2],
    ["Entro y la detengo a la fuerza dentro del gimnasio.", 1],
    ["Entro a por ella con el arma desenfundada.", 0]] },
  { c: "decisiones", t: "Llegan entornos de vehículos de guerra en el norte. ¿Qué hace la policía?", o: [
    ["Puede usar vehículos militares en el norte, avisándolo y en DEFCON 1.", 3],
    ["Pide refuerzos a todas las unidades y espera órdenes de jefatura sin sacar ningún vehículo.", 2],
    ["Saca los militares para patrullar la ciudad.", 1],
    ["Lleva los vehículos de guerra a la ciudad para disuadir.", 0]] },
  { c: "decisiones", t: "Detienes a un sospechoso. ¿Cuándo le lees sus derechos?", o: [
    ["Le informo del delito y le leo los derechos antes de entrar en comisaría.", 3],
    ["Se los leo en cuanto llegamos a comisaría, una vez está dentro y más tranquilo.", 2],
    ["Solo si me los pide.", 1],
    ["No se los leo; ya los conoce.", 0]] },
  { c: "decisiones", t: "Reconoces el coche que se usó en un robo de hace tres días.", o: [
    ["Solo continúo el rol si hay una investigación abierta con informe.", 3],
    ["Lo sigo a distancia y abro un informe antes de actuar.", 2],
    ["Lo detengo directamente; sé que es él.", 1],
    ["Le coloco pruebas para poder detenerlo.", 0]] },
  { c: "decisiones", t: "Persigues a un vehículo que hace un contrato de reparto de droga.", o: [
    ["Lo persigo sin chocar ni pinchar, aunque pasen 10 minutos.", 3],
    ["Lo sigo y comunico su posición al resto de unidades.", 2],
    ["Pasados los 10 minutos de persecución, doy los avisos y le pincho las ruedas.", 1],
    ["Lo embisto para detenerlo cuanto antes.", 0]] },
  { c: "decisiones", t: "Te informan de que un cártel está defendiendo un contenedor.", o: [
    ["No acudo; la policía no puede intervenir en los contenedores.", 3],
    ["Lo comunico a jefatura y no intervengo.", 2],
    ["Me acerco a observar desde lejos.", 1],
    ["Organizo una redada en el contenedor.", 0]] },

  // ───────────── TRABAJO EN EQUIPO ─────────────
  { c: "equipo", t: "Empiezas el turno y no hay ningún compañero libre para patrullar contigo.", o: [
    ["Espero a tener compañero; la patrulla debe ir en binomio.", 3],
    ["Me quedo haciendo tareas en comisaría hasta que algún compañero quede libre.", 2],
    ["Salgo solo un rato; no pasa nada.", 1],
    ["Salgo solo y no se lo digo a nadie.", 0]] },
  { c: "equipo", t: "En un robo, el H-50 reparte posiciones y la tuya no te convence.", o: [
    ["Ocupo mi posición e informo por radio de lo que veo.", 3],
    ["La ocupo, pero pido cambiarla en el próximo operativo.", 2],
    ["Me muevo a otra posición sin avisar.", 1],
    ["Discuto la decisión por radio en pleno operativo.", 0]] },
  { c: "equipo", t: "Tu unidad quiere hacer otra redada a una banda que ya ha tenido tres esta semana.", o: [
    ["Recuerdo que el máximo son 3 redadas semanales y propongo otra vía.", 3],
    ["Lo consulto con jefatura antes de seguir.", 2],
    ["Hacemos la redada igualmente; es solo una más.", 1],
    ["Hacemos varias más para presionar a la banda.", 0]] },
  { c: "equipo", t: "Un compañero cae abatido en un punto caliente.", o: [
    ["Aseguro la zona, comunico su posición y solicito EMS.", 3],
    ["Comunico su posición por radio y continúo con el operativo para no perder terreno.", 2],
    ["Me quedo a su lado esperando, sin cubrirme.", 1],
    ["Me retiro y lo dejo allí sin avisar a nadie.", 0]] },
  { c: "equipo", t: "Tu compañero ha pactado una salida limpia con los atracadores.", o: [
    ["Respeto el acuerdo y les dejo subir al vehículo sin detenerlos.", 3],
    ["Lo respeto y preparo el seguimiento para cuando arranquen.", 2],
    ["Les dejo salir del local, pero los detengo justo antes de que se suban al coche.", 1],
    ["Ignoro el pacto y abro fuego al verlos salir.", 0]] },
  { c: "equipo", t: "En una operación conjunta entre LSPD, LSSD y FBI hay dudas sobre quién manda.", o: [
    ["Respeto la cadena de mando acordada y aclaro los roles.", 3],
    ["Sigo las órdenes del agente de mayor rango presente, sea de la facción que sea.", 2],
    ["Solo acepto órdenes de mi propia facción.", 1],
    ["Actúo por mi cuenta sin coordinarme con nadie.", 0]] },
  { c: "equipo", t: "Identificas el color y modelo del vehículo usado en un robo.", o: [
    ["Lo comunico por radio a todas las unidades.", 3],
    ["Lo anoto en el informe al terminar el servicio.", 2],
    ["Me lo guardo para seguirlo yo más tarde.", 1],
    ["No lo comunico para llevarme el mérito.", 0]] },
  { c: "equipo", t: "Un compañero te pasa por Discord la ubicación de un sospechoso que ha visto fuera del rol.", o: [
    ["No uso esa información y le recuerdo que eso es metagaming.", 3],
    ["No la uso, aunque prefiero no decirle nada para no crear mal ambiente.", 2],
    ["La uso solo para patrullar cerca de esa zona.", 1],
    ["Vamos directos a por él con esa información.", 0]] },
  { c: "equipo", t: "Un compañero va a disparar a un sospechoso desarmado que huye de espaldas.", o: [
    ["Le aviso de que no puede disparar y le pido que pare.", 3],
    ["No intervengo en ese momento, pero lo reporto a jefatura al terminar el operativo.", 2],
    ["No digo nada; es su responsabilidad.", 1],
    ["Lo cubro y disparo yo también.", 0]] },
  { c: "equipo", t: "Estás patrullando y el H-50 solicita un 10-32 (refuerzos) en un robo.", o: [
    ["Confirmo por radio un 10-11 (en camino) y acudo.", 3],
    ["Acudo, pero sin confirmarlo por radio.", 2],
    ["Espero unos minutos a ver si responde otra unidad que esté más cerca.", 1],
    ["Me pongo 10-7 (fuera de servicio) para no tener que ir.", 0]] },

  // ───────────── INTEGRIDAD Y ÉTICA ─────────────
  { c: "integridad", t: "Eres Oficial, terminas el turno y aún llevas las armas reglamentarias.", o: [
    ["Las devuelvo antes de salir de servicio.", 3],
    ["Las devuelvo al empezar mi siguiente turno.", 2],
    ["Me las quedo; nadie lo va a notar.", 1],
    ["Se las presto a un conocido civil.", 0]] },
  { c: "integridad", t: "En un control, un civil lleva un arma de caza sin carne ni piel en el inventario.", o: [
    ["No se la requiso; solo puedo hacerlo si lleva carne o piel de animal.", 3],
    ["Le pregunto para qué la usa y le dejo continuar.", 2],
    ["Se la requiso por precaución.", 1],
    ["Se la requiso y me la quedo yo.", 0]] },
  { c: "integridad", t: "Un detenido pide un abogado y no tiene ninguno.", o: [
    ["Solicito un abogado de oficio mediante /pol.", 3],
    ["Le dejo avisar a un conocido para que lo represente.", 2],
    ["Le digo que espere, que primero lo procesamos.", 1],
    ["Le niego el abogado.", 0]] },
  { c: "integridad", t: "Un detenido pide hacer una llamada.", o: [
    ["Se la permito en presencia de un funcionario.", 3],
    ["Se la permito cuando termine de procesarlo.", 2],
    ["Le digo que no tiene ese derecho.", 1],
    ["Le dejo llamar a solas a cambio de información.", 0]] },
  { c: "integridad", t: "Durante un registro encuentras una gran cantidad de dinero negro.", o: [
    ["Lo documento, lo requiso según protocolo y lo entrego como prueba.", 3],
    ["Lo cuento con un compañero y lo entrego.", 2],
    ["Se lo devuelvo al propietario sin documentarlo para no complicar el registro.", 1],
    ["Me quedo con una parte.", 0]] },
  { c: "integridad", t: "Durante un robo pactado te queda poca vida y llevas una adrenalina.", o: [
    ["No la uso; en los robos pactados no se permiten adrenalinas.", 3],
    ["No la uso todavía; me retiro a cubierto y pido EMS para que me atiendan.", 2],
    ["La uso solo si nadie me está viendo.", 1],
    ["La uso; si me abaten pierdo el operativo.", 0]] },
  { c: "integridad", t: "Quieres dejar la policía y unirte a una organización criminal.", o: [
    ["Desarrollo una evolución coherente del personaje antes del cambio.", 3],
    ["Pido orientación a la administración y me cambio en cuanto me den el visto bueno.", 2],
    ["Me cambio de un día para otro.", 1],
    ["Paso información policial a la organización antes de irme.", 0]] },
  { c: "integridad", t: "Descubres un fallo que duplica armas en el armero de la comisaría.", o: [
    ["Lo reporto de inmediato a la administración y no lo uso.", 3],
    ["No lo uso y se lo comento a mi jefatura para que ellos decidan qué hacer.", 2],
    ["Lo pruebo una vez para confirmar que funciona.", 1],
    ["Lo aprovecho para equipar a toda mi unidad.", 0]] },
  { c: "integridad", t: "Detienes a una persona influyente que exige un trato especial.", o: [
    ["La trato con respeto y con el mismo procedimiento que a cualquiera.", 3],
    ["Consulto a mi superior cómo proceder.", 2],
    ["Le doy algunas facilidades.", 1],
    ["La dejo ir.", 0]] },
  { c: "integridad", t: "Los atracadores piden un 30% del botín por una salida limpia.", o: [
    ["Les recuerdo que el máximo es un 10% e intento negociar a la baja.", 3],
    ["Acepto el 10% sin intentar negociar menos.", 2],
    ["Acepto un 20% para no complicar la negociación y que nadie salga herido.", 1],
    ["Acepto el 30% a cambio de una parte para mí.", 0]] },

  // ───────────── AUTOCONTROL Y USO DE LA FUERZA ─────────────
  { c: "impulsos", t: "Un sospechoso desarmado huye corriendo de espaldas.", o: [
    ["No disparo; lo persigo y comunico su descripción.", 3],
    ["Le doy el alto varias veces y espero a que llegue apoyo para detenerlo.", 2],
    ["Le apunto con el arma para intimidarlo.", 1],
    ["Le disparo para que no escape.", 0]] },
  { c: "impulsos", t: "Se rompen las negociaciones en un robo.", o: [
    ["Espero los 10 segundos reglamentarios antes de iniciar el tiroteo.", 3],
    ["Espero unos segundos y sigo la orden del H-50.", 2],
    ["Disparo en cuanto veo moverse a un atracador.", 1],
    ["Abro fuego al instante para aprovechar la sorpresa antes de que se reorganicen.", 0]] },
  { c: "impulsos", t: "En la huida de un robo mediano, los atracadores chocan y deciden enfrentarse.", o: [
    ["Respeto 10 segundos de fairplay sin bajarme del vehículo.", 3],
    ["Espero un momento y me bajo cuando lo ordene el H-50.", 2],
    ["Me bajo y me pongo a cubierto de inmediato.", 1],
    ["Les disparo desde el coche nada más chocar.", 0]] },
  { c: "impulsos", t: "En un punto caliente llega un vehículo enemigo y sus ocupantes empiezan a bajar.", o: [
    ["Les doy fairplay: espero a que bajen y equipen su arma.", 3],
    ["Doy un aviso en voz alta antes de actuar para que sepan que estoy allí.", 2],
    ["Disparo cuando el primero ya está fuera.", 1],
    ["Disparo al coche antes de que se bajen.", 0]] },
  { c: "impulsos", t: "Vas en un vehículo blindado durante un tiroteo.", o: [
    ["No disparo desde dentro; me bajo si tengo que intervenir.", 3],
    ["Me quedo dentro del blindado dando cobertura a mis compañeros, sin disparar.", 2],
    ["Disparo desde la ventanilla solo un momento.", 1],
    ["Atropello a los atracadores con el blindado.", 0]] },
  { c: "impulsos", t: "Abates a un atacante en un punto caliente.", o: [
    ["Aseguro la zona y no me quedo esperando junto al cuerpo.", 3],
    ["Pido EMS y me retiro a cubierto.", 2],
    ["Me quedo cerca por si viene alguien a recogerlo.", 1],
    ["Espero junto al cuerpo para abatir a quien venga.", 0]] },
  { c: "impulsos", t: "En una persecución por la ciudad vas muy pegado al sospechoso.", o: [
    ["Dejo espacio suficiente para evitar un choque.", 3],
    ["Reduzco la distancia solo en las rectas, donde hay menos riesgo de chocar.", 2],
    ["Voy pegado para meterle presión.", 1],
    ["Lo embisto en cuanto tengo ocasión.", 0]] },
  { c: "impulsos", t: "Un atracador te dejó inconsciente en un robo y, al recuperarte, lo ves por la calle.", o: [
    ["No busco venganza; solo actúo si hay un rol nuevo o una investigación.", 3],
    ["Informo a mis compañeros de que lo he visto.", 2],
    ["Lo sigo con el coche para ver adónde va.", 1],
    ["Le disparo por lo que me hizo.", 0]] },
  { c: "impulsos", t: "Tras un robo, vas de copiloto en un vehículo en marcha durante un tiroteo.", o: [
    ["Solo disparo a ruedas o carrocería; a matar, con el vehículo parado.", 3],
    ["Espero a que el vehículo se detenga para disparar.", 2],
    ["Disparo a los ocupantes solo si ellos me disparan primero.", 1],
    ["Disparo a matar a los ocupantes en plena marcha.", 0]] },
  { c: "impulsos", t: "Tienes el arma desenfundada y el sospechoso suelta la suya y levanta las manos.", o: [
    ["Mantengo el control verbal y procedo a la detención sin disparar.", 3],
    ["Espero apoyo antes de acercarme.", 2],
    ["Le grito amenazas mientras me acerco.", 1],
    ["Disparo igualmente, por si acaso.", 0]] },
];
