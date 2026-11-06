/* T-01 — Caso de negocio y relevamiento */
window.DATA=window.DATA||{};
DATA.empresa={
 presentacion:[
  "Fan de Pan opera como Fan de Pan Franchising S.A., sociedad anónima con sede en Parque Leloir, Provincia de Buenos Aires. Es una marca de panadería en la industria gastronómica: elabora y vende productos frescos horneados a demanda —facturas, panes, sándwiches, tortas, chipá y opciones de almuerzo— bajo una modalidad de autoservicio («elegís, te servís, disfrutás») que la distingue de la panadería de barrio. Tiene nueve años de trayectoria: abrió su primera sucursal en 2017.",
  "Su estructura propia es liviana: 12 personas en casa matriz, mientras la actividad diaria descansa en una red de más de 45 sucursales, cada una operada como una célula independiente por uno o dos franquiciados y un equipo propio de 6 a 10 empleados. La casa matriz terceriza de forma permanente publicidad y promoción, contabilidad, capacitación y el desarrollo arquitectónico de nuevos locales.",
  "Presencia en más de 30 barrios de CABA y GBA; en conjunto, las sucursales reciben más de 15.000 visitantes diarios. Marca joven que reversiona la panadería tradicional, con locales de estética moderna y cocina con horno a la vista, y foco en una comunidad de «fanáticos»."],
 sponsor:{nombre:"Alexis Horianski",cargo:"CEO · Project sponsor",ini:"AH"},
 datos:[
  ["Razón social","Fan de Pan Franchising S.A."],["Sede","Parque Leloir, Provincia de Buenos Aires"],["Industria","Gastronomía · panadería en franquicia"],["Trayectoria","Primera sucursal en 2017 (9 años)"],
  ["Casa matriz","12 personas"],["Red","+45 sucursales, 6–10 empleados cada una"],["Tercerizado","Publicidad, contabilidad, capacitación y desarrollo arquitectónico"],["Alcance geográfico","CABA y GBA, sin presencia fuera del radio metropolitano"]],
 identidad:{
  mision:"Brindar productos de panadería frescos y de calidad, combinando la tradición con una propuesta moderna, ágil y accesible, donde el cliente sea protagonista y disfrute una experiencia diferente en cada visita.",
  vision:"Ser una marca referente de panadería en los barrios, transformando y modernizando un negocio tradicional, expandiendo su presencia y construyendo una comunidad de fanáticos alrededor de sus productos y experiencias.",
  valores:[["Orientación al cliente","«Elegís, te servís, disfrutás»."],["Innovación y adaptabilidad","Una marca joven que reversiona la panadería tradicional."],["Agilidad","Decisiones y operación rápidas."],["Calidad","Productos frescos, horneados en el momento."],["Comunidad","Vínculo de pertenencia en cada zona."]]},
 /* organigrama */
 org:{
  top:[["Dirección / CEO","Alexis Horianski. Concentra el conocimiento del negocio y decide las inversiones, incluida la tecnología."],["Gerente General (Marcos)","Coordina las cuatro áreas funcionales de la casa matriz."]],
  areas:[
   {n:"Administración",d:"Área funcional de la casa matriz.",jefe:"Jefe de Equipo de Administración",eq:"ADM 1-2"},
   {n:"Supervisión",d:"Área funcional de la casa matriz (auditoría de locales, PROC-11).",jefe:"Jefe de Equipo de Supervisión",eq:"SUP 1-3"},
   {n:"RRHH y Capacitaciones",d:"Área funcional de la casa matriz.",jefe:null,eq:"RRHH 1-2"},
   {n:"Marketing",d:"Área funcional de la casa matriz.",jefe:null,eq:"MKT 1"}],
  hallazgo:"La organización no tiene equipo propio de sistemas: la gestión tecnológica está tercerizada y las decisiones de inversión e innovación recaen directamente en el CEO."},
 productos:"Al consumidor: productos frescos horneados a demanda y una experiencia de compra por autoservicio. A los inversores: un modelo de franquicias probado y rentable, con rápido recupero de la inversión, capacitación, soporte comercial permanente e innovación continua. La propuesta apunta a las nuevas generaciones y a los vecinos de cada barrio (atención cálida para cualquier edad) y a emprendedores que quieran abrir su sucursal.",
 cadena:[["Casa matriz","Crea el concepto, provee el know-how, desarrolla productos y supervisa estándares."],["Franquiciados","Socios que invierten y operan las +45 sucursales."],["Equipos de trabajo","Producción y salón, bajo un encargado."],["Proveedores","Materias primas y productos de reventa."],["Clientes / «fanáticos»","Sostienen la demanda por autoservicio."]],
 smart:[
  {n:1,obj:"Estandarizar y desplegar el sistema único de carga financiera en el piloto",meta:"100%",to:100,suf:"%",ind:"100% de las 5 franquicias piloto reemplazan su herramienta propia por el sistema único",plazo:"6 meses"},
  {n:2,obj:"Establecer la línea base financiera y los umbrales óptimos de la marca",meta:"100%",to:100,suf:"%",ind:"100% de los KPIs prioritarios (CMV, costo laboral, costos fijos, utilidad neta) con línea base medida y umbral definido sobre los pilotos",plazo:"3 meses de uso"},
  {n:3,obj:"Disponer del resultado financiero consolidado de cada local en un plazo fijo tras el cierre",meta:"≤ 5 días",to:5,pre:"≤ ",suf:" días",ind:"≤ 5 días hábiles tras el cierre (hoy: 10)",plazo:"3 meses de uso"},
  {n:4,obj:"Reducir los desvíos financieros de la red frente a los umbrales óptimos",meta:"−30%",to:30,pre:"−",suf:"%",ind:"−30% del desvío promedio respecto de la línea base (preliminar, a validar tras la medición inicial)",plazo:"1 año"},
  {n:5,obj:"Reducir el esfuerzo de carga del franquiciado",meta:"≤ 3 h",to:3,pre:"≤ ",suf:" h",ind:"Carga manual ≤ 3 h semanales por franquiciado",plazo:"6 meses"}],
 competitivo:[
  "El sector de panaderías en franquicia en Argentina incluye a Buenos Aires Bakery, Central de Sabores, Costumbres Argentinas, Panificadora Tigre y Fábrica de Pan, con lógicas de expansión similares. Se compite en tres frentes: calidad y precio, fidelización por atención al cliente, y ubicaciones estratégicas.",
  "Diferencial que destaca el sponsor: mientras buena parte de la competencia apuesta a un modelo fácilmente replicable (que el cliente se adapte al negocio), Fan de Pan busca adaptarse al cliente para no perder la esencia del rubro; la calidad es innegociable.",
  "Amenaza propia del mercado local: competidores informales (personal sin registrar, compras sin factura) que bajan costos y presionan precios. Constante del sector: la gestión financiera de cada local queda en manos del franquiciado, sin mayor injerencia de la casa matriz.",
  "No se identifican nuevos competidores que estén cambiando las reglas del juego → ventana de oportunidad."],
 foda:{
  F:["Marca joven y consolidada (+45 sucursales, 15.000 visitantes diarios)","Modelo de franquicia probado y rentable, con rápido recupero","Compras centralizadas con proveedores comunes y sistema de cobranzas unificado","Cultura orientada a la innovación y al cliente; el CEO conoce a fondo el modelo"],
  D:["Cada franquiciado administra su backoffice distinto, con cashflows a mano","Información financiera aproximada y manual, sin estandarización","Conocimiento de gestión concentrado en los altos mandos; capacitación artesanal","Sin equipo propio de sistemas: todo el desarrollo es tercerizado"],
  O:["Ausencia de competidores que alteren las reglas","Posibilidad de marcar diferencia antes que el resto","Interés de nuevos inversores por un modelo con información confiable","Digitalización y modernización del rubro gastronómico"],
  A:["Competidores del rubro con lógica de expansión similar","Contexto económico inestable y consumo estancado (exige control fino de márgenes)","Competencia informal con menores costos","Dependencia de proveedores externos poco dispuestos a adaptarse tecnológicamente"]},
 /* ítems combinados por estrategia: interpretación del equipo, editable */
 estrategias:[
  {k:"F+O",n:"Ofensivas",t:"Desplegar una solución de gestión financiera antes que la competencia y reforzar el atractivo ante inversores.",m:{F:[0,1],O:[1,2]}},
  {k:"F+A",n:"Defensivas",t:"Estandarizar el control de márgenes para proteger la rentabilidad.",m:{F:[1,2],A:[1,2]}},
  {k:"D+O",n:"Reorientación",t:"Reemplazar la carga manual por un backoffice uniforme con visibilidad y comunicación directa.",m:{D:[0,1],O:[2,3]}},
  {k:"D+A",n:"Supervivencia",t:"Detectar y corregir temprano los «números hormiga».",m:{D:[1],A:[1,2]}}],
 problematica:{
  intro:"Fan de Pan está en plena expansión (+45 sucursales en +30 barrios, aperturas constantes desde 2017). El crecimiento superó la capacidad de sostener una gestión financiera uniforme.",
  frentes:[
   {n:1,t:"Gestión financiera descentralizada y heterogénea",c:true,d:"Cada franquiciado administra su backoffice distinto, con cashflows hechos a mano, incompletos y con criterios propios."},
   {n:2,t:"Comunicación y visibilidad Casa Matriz–franquiciado poco estandarizada",c:true,d:"La matriz centralizó compras y accede a la facturación por el sistema de cobranzas, pero la información financiera de cada local es aproximada y manual, y no hay un canal único; llega a una utilidad bruta estimada, no a un número exacto en tiempo real."},
   {n:3,t:"Onboarding y capacitación no escalable",c:false,d:"El conocimiento de gestión está en los altos mandos y se transmite persona a persona."}],
  prioridad:"El sponsor priorizó el eje financiero: la Casa Matriz debe tener registrados y centralizados los datos de cada local y un canal directo con cada franquiciado. Problemática central = frentes 1 + 2: una plataforma que estandarice la carga, centralice la visibilidad y habilite comunicación bidireccional, y no una solución puramente contable.",
  ahora:"A esta escala (+45 locales, +15.000 visitantes diarios) los «números hormiga» se multiplican y generan pérdidas; según el sponsor, con la misma facturación una buena gestión podría aumentar la rentabilidad de un local hasta un 30% (estimación del sponsor); sostener la expansión sin resolverlo pone en riesgo la consistencia de la marca ante inversores («nada como el ojo del dueño»).",
  complementarias:["Tablero de indicadores operativos (stock en vivo, mix y rentabilidad por producto, retorno de clientes, ocupación del salón)","Medición sistemática de satisfacción del cliente (hoy indirecta: Google y PedidosYa)","Estandarización del onboarding"]},
 historias:[["US-01","Backoffice financiero estandarizado para el franquiciado","must"],["US-02","Visibilidad consolidada para la Casa Matriz","must"],["US-03","Canal de comunicación financiera Matriz–franquiciado","must"],["US-04","Datos reales de rentabilidad para inversores","should"],["US-05","Alertas de desvíos frente a umbrales","could"]],
 cmm:{niveles:["Inicial","Repetible","Definido","Gestionado y medido","Optimizado"],
  texto:"Gestión financiera de los locales = Nivel 1 · Inicial (procesos informales, el éxito depende de cada franquiciado). Operación comercial, compras centralizadas y expansión de la marca (donde la matriz interviene con estándares) = cercanos a Repetible/Definido. Fan de Pan no tiene hoy certificación tipo ISO 9001 en la gestión financiera de la red. La convivencia de niveles dispares es el punto de partida del proyecto."},
 cultura:"Cultura joven, dinámica y orientada a la innovación. Liderazgo fuertemente centralizado en el CEO, que concentra el conocimiento del negocio y decide lo tecnológico. Disposición favorable al cambio; la tecnología se percibe como herramienta estratégica de backoffice y suele adoptarse ante urgencias. La limitación principal no es cultural sino operativa y estructural: heterogeneidad de prácticas entre franquiciados, dependencia de proveedores poco dispuestos a evolucionar y la resistencia natural a exponer los números."
};
