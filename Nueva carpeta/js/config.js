/* Configuración editable — Mallow × Fan de Pan (script clásico, sin módulos ES) */
window.CONFIG = {
  brand: "Mallow",
  tagline: "Suave en la experiencia. Riguroso por dentro.",
  // SHA-256 (hex) de la clave. Por defecto = hash de "mallow2026". CAMBIARLA antes de publicar.
  accessKeyHash: "a5e859a791f717769cf10403cad6f3f7692cb3942df44e1ab7860908535b8757",
  contactEmail: "",   // completar; si está vacío se muestra "a definir"
  today: null,        // null = fecha actual; o "2026-11-06" para fijar el marcador "hoy"
  links: {
    matrizBrechas: "https://docs.google.com/spreadsheets/d/12MdHMivYo_5qi6Sk4vGlYlAEnsFNpdUfOEwgnIOGtVA/edit?gid=2105133955#gid=2105133955",
    matrizBrechasExcel: "",   // T04_Matriz_de_Brechas_Mallow.xlsx
    entregables: { T01:"", T02:"", T03:"", T04:"", T05:"", T06:"", T07:"", T08:"", T09:"", T10:"", T11:"" }
  },
  team: [
    {iniciales:"IB",nombre:"Ian Belaev",rol:"Product Owner",linea:"Visión del producto y alineación con el cliente.",foto:""},
    {iniciales:"AD",nombre:"Agustín Duarte",rol:"Scrum Master",linea:"Coordinación del equipo y gestión ágil.",foto:""},
    {iniciales:"FG",nombre:"Federico Glorioso",rol:"Project Manager",linea:"Planificación, cronograma y seguimiento con el sponsor.",foto:""},
    {iniciales:"LD",nombre:"Lourdes Devit",rol:"Analista Funcional",linea:"Requerimientos, historias de usuario y análisis funcional.",foto:""},
    {iniciales:"LD",nombre:"Lucía Nahir Dumit",rol:"Consultora de Procesos",linea:"Mapa de procesos y arquitectura de negocio.",foto:""},
    {iniciales:"PR",nombre:"Pablo Randazzo",rol:"Programador / Analista Funcional",linea:"Análisis funcional y prototipado técnico.",foto:""},
    {iniciales:"RS",nombre:"Ramiro Scheinaizen",rol:"QA",linea:"Calidad y consistencia de los entregables.",foto:""}
  ]
};
