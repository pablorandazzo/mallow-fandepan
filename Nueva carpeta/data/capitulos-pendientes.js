/* T-06 a T-11 — Capítulos en elaboración.
   Para activar un capítulo: agregar `contenido` (HTML) y/o `bloques` al objeto correspondiente.
   Si trae `contenido`, se renderiza completo con el mismo sistema que los capítulos 01–05. */
window.DATA=window.DATA||{};
DATA.entregables=[
 {id:"T-01",t:"Caso de negocio y relevamiento",f:"21/08/2026",est:"Completo"},
 {id:"T-02",t:"Arquitectura empresarial actual",f:"04/09/2026",est:"Completo"},
 {id:"T-03",t:"Visión de arquitectura empresarial destino",f:"11/09/2026",est:"Completo"},
 {id:"T-04",t:"Matriz de brechas y análisis de escenarios",f:"18/09/2026",est:"Completo"},
 {id:"T-05",t:"Alcance y análisis del mercado de soluciones",f:"25/09/2026",est:"Completo"},
 {id:"T-06",t:"Matriz RFP",f:"02/10/2026",est:"En elaboración"},
 {id:"T-07",t:"Comparación de cumplimiento y evaluación económica",f:"16/10/2026",est:"En elaboración"},
 {id:"T-08",t:"Análisis de la propuesta comercial y conclusiones",f:"23/10/2026",est:"En elaboración"},
 {id:"T-09",t:"Oportunidad de innovación con IA generativa",f:"30/10/2026",est:"En elaboración"},
 {id:"T-10",t:"Diseño y validación de la solución de IA generativa",f:"06/11/2026",est:"En elaboración"},
 {id:"T-11",t:"Carpeta de cierre del proyecto",f:"13/11/2026",est:"En elaboración"}];
DATA.pend=[
 {num:"06",id:"parte06",nav:"Selección de la solución",titulo:["Selección de la","solución"],label:"Parte 06 · Selección de la solución",
  lead:"Criterios ponderados, fichas de mercado, matriz RFP por proveedor, cumplimiento y evaluación económica.",
  chips:["Criterios ponderados","Fichas de mercado","Matriz RFP","Cumplimiento","Evaluación económica"],
  entregables:[["T-06","Matriz RFP","02/10/2026"],["T-07","Comparación de cumplimiento y evaluación económica","16/10/2026"]],
  contexto:"Contexto ya definido en T-05: candidatos de la preselección Ayres IT (POS actual), Maxirest y Bistrosoft; regla de imparcialidad (mismas reglas, plazos y respuestas para todos); preferencia por soluciones que se integren con AyresPOS (EX1).",
  contenido:""},
 {num:"07",id:"parte07",nav:"Evaluación y recomendación",titulo:["Propuesta comercial y","recomendación"],label:"Parte 07 · Propuesta comercial y recomendación",
  lead:"Análisis de la propuesta del proveedor, conclusiones y recomendación al sponsor.",
  chips:["Propuesta comercial","Conclusiones","Recomendación al sponsor"],
  entregables:[["T-08","Análisis de la propuesta comercial y conclusiones","23/10/2026"]],contexto:"",contenido:""},
 {num:"08",id:"parte08",nav:"IA generativa y cierre",titulo:["IA generativa y","cierre"],label:"Parte 08 · IA generativa y cierre",
  lead:"Dónde la IA generativa suma de verdad, el prototipo validado con el sponsor y la carpeta de cierre del proyecto.",
  chips:["Oportunidad de IA","Diseño y validación","Carpeta de cierre","Presentación final"],
  entregables:[["T-09","Oportunidad de innovación con IA generativa","30/10/2026"],["T-10","Diseño y validación de la solución de IA generativa (con presentación de avance)","06/11/2026"],["T-11","Carpeta de cierre del proyecto","13/11/2026"],["—","Presentación final ante el sponsor","24/11/2026"]],
  contexto:"",contenido:"",timeline:true}
];
