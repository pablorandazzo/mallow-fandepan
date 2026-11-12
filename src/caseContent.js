// Resúmenes para exploración web: no son transcripciones ni documentos oficiales.
// Disponible indica que existe una fuente, no una aprobación del sponsor.
// Las fuentes se identifican por nombre; no se publican rutas locales ni datos sensibles.
export const caseStages = [
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "arquitectura", label: "Arquitectura" },
  { id: "seleccion", label: "Selección" },
  { id: "innovacion", label: "Innovación" },
  { id: "cierre", label: "Cierre" },
];

export const caseDeliveries = [
  {
    id: "T-01",
    slug: "t-01",
    number: "01",
    title: "Caso de negocio y relevamiento organizacional",
    shortTitle: "Caso de negocio",
    stage: "diagnostico",
    status: "Disponible",
    sourceFile: "TPL 01 actualizado.docx",
    format: "DOCX",
    summary:
      "Presenta el modelo de franquicias de Fan de Pan y el problema que orienta la consultoría: la expansión de la red convive con prácticas de gestión financiera heterogéneas y una consolidación manual. Prioriza estandarizar la información y mejorar el acompañamiento entre la casa matriz y los locales.",
    question:
      "¿Qué problema de gestión justifica intervenir y para quién debe generar valor?",
    takeaways: [
      "La casa matriz ya tiene información de la red, pero es aproximada, manual y poco uniforme.",
      "La carga estandarizada, la visibilidad consolidada y la comunicación son las necesidades prioritarias.",
      "La adopción depende de que el franquiciado perciba ayuda y no solamente mayor control.",
    ],
    sections: [
      {
        title: "Una red descentralizada",
        body: "La marca combina una casa matriz liviana con locales operados por franquiciados. Las decisiones tecnológicas se concentran en la dirección y el soporte de sistemas se terceriza.",
      },
      {
        title: "El problema priorizado",
        body: "Cada local registra su información con criterios propios. El relevamiento conecta esa heterogeneidad con la dificultad para comparar resultados, detectar desvíos y sostener una comunicación financiera consistente.",
      },
      {
        title: "Necesidades y prioridades",
        body: "Las historias de usuario distinguen lo indispensable de las capacidades posteriores.",
        bullets: [
          "Herramienta común de carga y gestión por local.",
          "Visión consolidada para la casa matriz y comunicación bidireccional.",
          "Información para inversores y alertas como capacidades dependientes de una base confiable.",
        ],
      },
    ],
    caveat:
      "La madurez organizacional es una valoración del equipo. Las metas y los beneficios esperados no son resultados medidos; la línea base y los umbrales de la marca todavía deben construirse.",
    nextStep:
      "Contrastar las necesidades con los procesos, datos y aplicaciones existentes en T-02.",
  },
  {
    id: "T-02",
    slug: "t-02",
    number: "02",
    title: "Arquitectura empresarial actual",
    shortTitle: "Arquitectura actual",
    stage: "arquitectura",
    status: "Disponible",
    sourceFile: "TPL 02 actualizado.docx",
    format: "DOCX",
    summary:
      "Describe la situación relevada en negocio, datos, aplicaciones y tecnología. Muestra que disponer de plataformas en la nube no equivale a tener una operación integrada: las planillas y la mensajería todavía conectan manualmente buena parte del circuito de información.",
    question:
      "¿Cómo funciona hoy la organización y dónde se fragmenta la información?",
    takeaways: [
      "Los reportes de ventas, delivery y auditorías se consolidan mediante exportaciones y planillas.",
      "Excel, Sheets y WhatsApp sostienen tareas que no tienen integración formal entre sistemas.",
      "La infraestructura es liviana, sin servidores propios ni un equipo interno de sistemas.",
    ],
    sections: [
      {
        title: "Procesos del negocio",
        body: "El mapa separa procesos estratégicos, operativos y de soporte. Vincula la expansión, el onboarding y la supervisión con responsables y herramientas de la operación actual, sin confundirlos con la solución futura.",
      },
      {
        title: "Datos y aplicaciones",
        body: "Los sistemas de ventas, delivery y auditorías producen reportes separados. La consolidación manual y la planilla de caja de oficina dejan una dependencia importante de archivos compartidos y coordinación informal.",
      },
      {
        title: "Infraestructura y controles",
        body: "El acceso a servicios SaaS se realiza desde equipos de escritorio, notebooks y celulares. El relevamiento no documenta controles de acceso o cambios para los almacenes de datos identificados, ni un soporte formal unificado.",
      },
    ],
    caveat:
      "La falta de controles documentados no demuestra la ausencia de toda medida de seguridad. Se trata de un relevamiento de arquitectura, no de una auditoría técnica exhaustiva.",
    nextStep:
      "Definir en T-03 las capacidades de destino que resuelvan la fragmentación sin exigir una estructura de TI propia.",
  },
  {
    id: "T-03",
    slug: "t-03",
    number: "03",
    title: "Visión de arquitectura empresarial de destino",
    shortTitle: "Arquitectura destino",
    stage: "arquitectura",
    status: "Disponible",
    sourceFile: "TPL 03 actualizado.docx",
    format: "DOCX",
    summary:
      "Propone pasar de reportes dispersos a una gestión de la red basada en datos estandarizados. La visión combina captura de información, integración, tableros y acompañamiento al franquiciado; describe capacidades necesarias desde la perspectiva de la casa matriz, no una compra ya realizada.",
    question:
      "¿Qué capacidades necesita la red para gestionarse con información confiable?",
    takeaways: [
      "La secuencia propuesta es estandarizar la captura, medir una línea base y luego gestionar desvíos.",
      "La casa matriz necesita una vista consolidada y cada franquiciado un acceso limitado a sus locales.",
      "La disponibilidad real de integraciones y la calidad de los datos condicionan la transformación.",
    ],
    sections: [
      {
        title: "Transformar el acompañamiento",
        body: "La propuesta amplía el valor de la franquicia con información y seguimiento de gestión. El tablero no es un fin aislado: debe permitir conversar sobre desvíos y acordar acciones con cada local.",
      },
      {
        title: "Circuito de información propuesto",
        body: "Los sistemas de origen alimentarían una capa de integración, un repositorio central y vistas adaptadas a cada rol.",
        bullets: [
          "Captura estandarizada y validaciones en origen.",
          "Consolidación analítica y reglas comunes de negocio.",
          "Tableros, alertas y un canal formal de seguimiento.",
        ],
      },
      {
        title: "Gobierno y condiciones técnicas",
        body: "Se requieren aislamiento por franquicia, permisos por rol, trazabilidad y acceso móvil. La nube y el bajo mantenimiento responden a la estructura de la organización; las API deben verificarse antes de diseñar las conexiones.",
      },
    ],
    caveat:
      "Es una visión de destino, no una descripción de funciones implementadas. Su horizonte incluye capacidades que T-05 deja para etapas posteriores, como onboarding digital y análisis detallado por producto.",
    nextStep:
      "Comparar el estado actual y el destino en T-04 para delimitar las brechas y los escenarios viables.",
  },
  {
    id: "T-04",
    slug: "t-04",
    number: "04",
    title: "Matriz de brechas y análisis de escenarios",
    shortTitle: "Brechas y escenarios",
    stage: "arquitectura",
    status: "Disponible",
    sourceFile: "TPL 04 actualizado.docx",
    format: "DOCX",
    summary:
      "Traduce la diferencia entre arquitectura actual y destino en capacidades a incorporar o transformar. Compara modalidades de infraestructura y despliegue, y elige como escenario de trabajo una solución SaaS con piloto y expansión por oleadas para reducir la carga técnica y el riesgo de adopción.",
    question:
      "¿Qué debe cambiar y qué escenario permite hacerlo de forma gradual?",
    takeaways: [
      "La brecha incluye procesos y datos, no solamente aplicaciones nuevas.",
      "Las alternativas con servidores propios no encajan con la estructura tecnológica relevada.",
      "El escenario elegido por el equipo combina SaaS, piloto y despliegue modular.",
    ],
    sections: [
      {
        title: "Capacidades a transformar",
        body: "Se identifican nuevos circuitos de carga y monitoreo, un repositorio central, integraciones y herramientas de gestión. También se reconocen antecedentes parciales en reportes, planillas y mensajería que requieren reemplazo o reconfiguración.",
      },
      {
        title: "Comparación de escenarios",
        body: "El análisis cruza servidores propios o SaaS con despliegue simultáneo o modular. Descarta los servidores propios por mantenimiento y estructura; el despliegue simultáneo en la nube mantiene un riesgo alto de consultas y resistencia.",
      },
      {
        title: "Piloto antes de escalar",
        body: "El escenario seleccionado plantea probar con cinco franquicias y avanzar por oleadas. Esa transición permite ajustar la carga y el acompañamiento, aunque exige gestionar la convivencia temporal entre el sistema nuevo y las planillas.",
      },
    ],
    caveat:
      "La elección de escenario es una recomendación de diseño, no evidencia de un piloto ejecutado. Los beneficios mencionados en el documento son expectativas y no se presentan como resultados comprobados.",
    nextStep:
      "Delimitar en T-05 qué entrega la consultoría y qué deberá ejecutar luego la organización con el proveedor.",
  },
  {
    id: "T-05",
    slug: "t-05",
    number: "05",
    title: "Alcance del proyecto y análisis del mercado de soluciones",
    shortTitle: "Alcance y mercado",
    stage: "seleccion",
    status: "Disponible",
    sourceFile: "TPL 05 actualizado.docx",
    format: "DOCX",
    summary:
      "Define una consultoría de selección de productos existentes y una hoja de ruta de implementación. Establece exclusiones, prefiltros, criterios de evaluación y una preselección de alternativas; separa la recomendación del equipo de la contratación y puesta en marcha que corresponden a Fan de Pan.",
    question:
      "¿Qué se va a recomendar, con qué criterios y hasta dónde llega el trabajo?",
    takeaways: [
      "La consultoría recomienda una solución y una hoja de ruta; no contrata ni implementa el producto.",
      "Se comparan productos existentes SaaS, no un desarrollo a medida como solución principal.",
      "Ayres IT, Maxirest y Bistrosoft pasan a la evaluación; cambiar el POS exige contemplar la migración.",
    ],
    sections: [
      {
        title: "Alcance y exclusiones",
        body: "El trabajo abarca diagnóstico, evaluación comparativa y recomendación. No incluye adquisición, configuración, migración, capacitación ni soporte posterior del producto. La contabilidad formal, los impuestos, la liquidación de sueldos y la provisión de hardware también quedan fuera.",
      },
      {
        title: "Prefiltros y preselección",
        body: "Se exige una solución en la nube, disponible en el mercado, sostenible para la organización y capaz de cubrir carga por local y consolidación central. La preselección distingue ampliar el ecosistema actual de reemplazarlo mediante una transición ordenada.",
      },
      {
        title: "Hoja de ruta y adopción",
        body: "La implementación propuesta separa diseño, piloto y oleadas sujetas a una decisión de continuidad. El mapa de interesados plantea involucrar a franquiciados, Administración y Supervisión, con comunicación y responsabilidades diferenciadas.",
      },
    ],
    caveat:
      "La hoja de ruta no prueba ejecución ni aceptación de hitos. Las fichas preliminares contienen aspectos a confirmar y deben leerse junto con la evidencia posterior de T-06 y T-07.",
    nextStep:
      "Aplicar en T-06 los criterios ponderados y registrar por separado declaraciones, evidencia y faltantes.",
  },
  {
    id: "T-06",
    slug: "t-06",
    number: "06",
    title: "Matriz RFP y relevamiento de proveedores",
    shortTitle: "Matriz RFP",
    stage: "seleccion",
    status: "Disponible",
    sourceFile: "TPL 06 actualizado.xlsx",
    format: "XLSX",
    summary:
      "Organiza la evaluación en requisitos funcionales, técnicos, económicos y de proveedor. El libro contiene la matriz ponderada, las escalas y el relevamiento por candidato, con distinción entre respuestas a la RFP, reuniones e información pública; permite rastrear qué se conoce y qué exige confirmación.",
    question:
      "¿Cómo comparar alternativas con criterios comunes y evidencia trazable?",
    takeaways: [
      "La dimensión técnica tiene el mayor peso por la prioridad de incorporar la solución al ecosistema actual.",
      "La matriz distingue integración, migración, privacidad, trazabilidad y continuidad del servicio.",
      "El relevamiento separa información confirmada de declaraciones, estimaciones y dependencias futuras.",
    ],
    sections: [
      {
        title: "Una evaluación jerárquica",
        body: "Los aspectos se descomponen en categorías e ítems. La carga por local, el tablero central y el canal formal se contrastan con requisitos de integración, roles, auditoría y uso desde dispositivos móviles.",
      },
      {
        title: "Pesos de la versión actual",
        body: "La matriz registra la ponderación validada con el sponsor el 19 de octubre de 2026. Los porcentajes son pesos de evaluación, no resultados de proveedores.",
      },
      {
        title: "Evidencia y reservas",
        body: "Las hojas distinguen el origen de cada dato y recogen confirmaciones posteriores. No debe equipararse una promesa futura con una capacidad disponible: la dependencia de Bistrosoft con Odoo prevista para 2027 requiere una lectura explícita de las limitaciones metodológicas.",
      },
    ],
    matrix: {
      columns: ["Dimensión", "Peso", "Qué evalúa"],
      rows: [
        [
          "Técnico",
          "35%",
          "Integración o migración, seguridad, trazabilidad y acceso.",
        ],
        [
          "Funcional",
          "25%",
          "Carga estandarizada, consolidación, comunicación y alertas.",
        ],
        [
          "Económico",
          "25%",
          "Sostenibilidad del costo total y condiciones comerciales.",
        ],
        [
          "Proveedor",
          "15%",
          "Trayectoria, soporte local, implementación y continuidad.",
        ],
      ],
    },
    caveat:
      "El libro conserva notas de distintas revisiones y criterios sobre funcionalidades futuras. Este resumen no reproduce respuestas confidenciales, importes ni puntuaciones; la comparación debe considerar también las reservas de T-07.",
    nextStep:
      "Interpretar en T-07 el cumplimiento y los supuestos de cada propuesta, además de su cobertura de información.",
  },
  {
    id: "T-07",
    slug: "t-07",
    number: "07",
    title: "Comparación de cumplimiento y evaluación económica",
    shortTitle: "Evaluación comparativa",
    stage: "seleccion",
    status: "Disponible",
    sourceFile: "TPL 07 actualizado.docx",
    format: "DOCX",
    summary:
      "Compara las propuestas con la matriz RFP y recomienda ampliar el ecosistema de Ayres IT. El argumento central combina ajuste al entorno existente y menor necesidad de migración; el análisis también distingue datos de proveedores de supuestos del equipo y conserva reservas sobre funciones no demostradas.",
    question:
      "¿Qué alternativa recomienda el equipo y qué límites tiene esa comparación?",
    takeaways: [
      "El equipo recomienda Ayres IT por su encaje con el POS que ya utiliza la red.",
      "La comparación económica distingue cotizaciones recibidas de estimaciones propias de implementación y migración.",
      "La recomendación no elimina las verificaciones funcionales ni los compromisos de soporte y portabilidad pendientes.",
    ],
    sections: [
      {
        title: "Lectura de la recomendación",
        body: "La versión actual favorece la ampliación del sistema existente frente a sustituir el POS. Evitar esa migración reduce una fuente de complejidad, pero no demuestra por sí solo que todas las capacidades de gestión estén listas.",
      },
      {
        title: "Calidad de la comparación",
        body: "El análisis separa cumplimiento de cobertura de información y aclara el tratamiento de los ítems sin respuesta. Para Bistrosoft, parte de la puesta en marcha sigue estimada por el equipo y varias capacidades dependen de la alianza futura con Odoo.",
      },
      {
        title: "Reservas antes de contratar",
        body: "Quedan funciones declaradas sin demostración, dependencia de la carga de compras para el cálculo del CMV y trabajo adicional para automatizar el circuito de delivery. También deben precisarse los compromisos de soporte y devolución de datos.",
      },
    ],
    caveat:
      "Es una recomendación del equipo, no una adjudicación ni una aprobación general del sponsor. La evaluación incluye supuestos y dependencias futuras; el retorno efectivo no está medido y requiere la línea base del piloto.",
    nextStep:
      "Convertir la recomendación en condiciones de aceptación, negociación y validación en T-08.",
  },
  {
    id: "T-08",
    slug: "t-08",
    number: "08",
    title: "Análisis de la propuesta comercial y conclusiones de la selección",
    shortTitle: "Propuesta y selección",
    stage: "seleccion",
    status: "Borrador",
    sourceFile: "TPL 08 v1.docx",
    format: "DOCX",
    summary:
      "Desarrolla la justificación de avanzar con Ayres IT y clasifica las brechas según su tratamiento: negociación contractual, trabajo adicional, cambio de proceso o demostración pendiente. El documento no está terminado: la sección sobre la interacción con el proveedor y las conclusiones conservan consignas sin resolver.",
    question:
      "¿Qué condiciones deben cumplirse antes de avanzar con la propuesta recomendada?",
    takeaways: [
      "Las brechas de evidencia requieren demostraciones, no deben darse por capacidades comprobadas.",
      "Soporte, portabilidad de datos y capacitación necesitan compromisos escritos antes de contratar.",
      "La sección 3 y las conclusiones no están completadas en la fuente disponible.",
    ],
    sections: [
      {
        title: "Justificación y brechas",
        body: "El borrador retoma la recomendación de ampliar el sistema actual. Distingue lo que depende del proveedor de lo que exige acuerdos y cambios de operación con la casa matriz y el abastecimiento centralizado.",
      },
      {
        title: "Condiciones para avanzar",
        body: "Propone una demostración focalizada y acuerdos previos a la firma.",
        bullets: [
          "Verificar usabilidad, canal formal, alertas, comparativos y registro de cambios.",
          "Precisar soporte, devolución de datos y responsabilidades de capacitación.",
          "Delimitar el trabajo adicional de integración y comprobar el circuito de compras que alimentaría el CMV.",
        ],
      },
      {
        title: "Partes todavía sin desarrollar",
        body: "Falta narrar la interacción efectivamente realizada con el proveedor, sus compromisos y pendientes. También falta una conclusión final dirigida al cliente; no se infiere una demo realizada ni una contratación a partir del plan propuesto.",
      },
    ],
    caveat:
      "Borrador incompleto. El documento propone trabajo adicional que debe reconciliarse con las exclusiones de la consultoría en T-05; no representa una validación de funcionalidades ni una selección contractual cerrada.",
    nextStep:
      "Completar la sección 3 y las conclusiones con evidencia de reuniones, demostraciones y compromisos verificables.",
  },
  {
    id: "T-09",
    slug: "t-09",
    number: "09",
    title: "Oportunidad de innovación con IA generativa",
    shortTitle: "Oportunidad de IA",
    stage: "innovacion",
    status: "Borrador",
    sourceFile: "TPL 09.docx",
    format: "DOCX",
    summary:
      "Explora oportunidades de IA y prioriza asistir la captura de comprobantes locales desde imágenes o PDF. La propuesta busca precargar datos y sugerir categorías con controles y confirmación humana, no automatizar pagos ni sustituir la contabilidad; sigue siendo una hipótesis de trabajo sin validación aportada.",
    question:
      "¿La asistencia en la captura de comprobantes puede reducir el esfuerzo sin perder control?",
    takeaways: [
      "La oportunidad priorizada es capturar comprobantes y sugerir su registro con revisión humana.",
      "El borrador conserva reglas de consistencia, detección de duplicados y alternativa de carga manual.",
      "Las hipótesis de ahorro y precisión no están validadas y las referencias a T-07 están desactualizadas.",
    ],
    sections: [
      {
        title: "De las oportunidades al caso de uso",
        body: "Se exploran captura de comprobantes, explicación de desvíos, soporte operativo, innovación de menú y pronóstico de demanda. El borrador prioriza la captura por su relación con la carga manual y la adopción del sistema.",
      },
      {
        title: "Flujo propuesto y control humano",
        body: "El usuario aportaría una imagen o PDF y revisaría un formulario precargado. Los campos dudosos y las excepciones requerirían revisión; no se autorizan pagos, altas de proveedores ni cambios autónomos del plan de cuentas.",
      },
      {
        title: "Condiciones para experimentar",
        body: "Antes de probar deben acordarse las categorías, los permisos de integración y el tratamiento de imágenes sensibles. La propuesta pide minimizar datos enviados a terceros y comprobar si la plataforma ya ofrece una alternativa más simple.",
      },
    ],
    caveat:
      "Borrador con hipótesis no validadas. Conserva puntuaciones y reservas antiguas de T-07, además de referencias de API que deben actualizarse con T-06 y T-07 actuales. No acredita un prototipo construido ni mejoras medidas.",
    nextStep:
      "Actualizar los antecedentes y acordar una prueba acotada con criterios observables, revisión humana y datos autorizados para T-10.",
  },
  {
    id: "T-10",
    slug: "t-10",
    number: "10",
    title: "Diseño y validación de la solución de IA",
    shortTitle: "Prototipo de IA",
    stage: "innovacion",
    status: "Pendiente",
    sourceFile: null,
    format: null,
    summary:
      "El alcance de T-05 prevé diseñar y validar un prototipo a partir de la oportunidad de IA. No hay un documento resuelto de T-10 entre las fuentes autorizadas; por eso esta entrada señala el trabajo faltante y no presenta una solución desarrollada.",
    question:
      "¿Qué evidencia permitiría aceptar o rechazar la hipótesis de captura asistida?",
    takeaways: [
      "T-05 contempla un prototipo, no una puesta en producción de IA.",
      "T-09 propone hipótesis que todavía requieren una prueba documentada.",
      "No se dispone de resultados ni validaciones de T-10 en las fuentes autorizadas.",
    ],
    sections: [
      {
        title: "Base documental disponible",
        body: "T-05 define la actividad y T-09 plantea el caso de uso. Ninguno reemplaza un entregable de diseño y validación ni demuestra que el experimento haya ocurrido.",
      },
      {
        title: "Evidencia que falta",
        body: "Para explorar una entrega real faltan el prototipo, el protocolo de prueba, los resultados, los límites observados y el registro de revisión con los participantes y el sponsor. Estos elementos se enumeran como pendientes, no como contenido existente.",
      },
    ],
    caveat:
      "Sin fuente resuelta de T-10. Su aparición en un cronograma no acredita entrega, ejecución ni aprobación.",
    nextStep:
      "Producir y documentar la prueba antes de publicar resultados o marcar la entrega como disponible.",
  },
  {
    id: "T-11",
    slug: "t-11",
    number: "11",
    title: "Carpeta de cierre y presentación final",
    shortTitle: "Cierre del caso",
    stage: "cierre",
    status: "Pendiente",
    sourceFile: null,
    format: null,
    summary:
      "T-05 prevé una carpeta de cierre y una presentación final de la consultoría. No hay un documento resuelto de T-11 entre las fuentes autorizadas, por lo que no se presenta un cierre aceptado ni se da por terminada la selección o la validación de IA.",
    question:
      "¿Qué conclusiones y pendientes pueden entregarse con respaldo al cerrar la consultoría?",
    takeaways: [
      "El cierre figura como una actividad prevista en el alcance de T-05.",
      "T-08 y T-09 siguen siendo borradores y no existe una fuente resuelta de T-10.",
      "No se dispone de carpeta final ni de evidencia de aceptación de T-11.",
    ],
    sections: [
      {
        title: "Un hito previsto, no acreditado",
        body: "El plan contempla reunir el trabajo y presentarlo al sponsor. Esa previsión no demuestra que se haya entregado la carpeta ni realizado la presentación final.",
      },
      {
        title: "Qué debe quedar explícito",
        body: "El cierre deberá distinguir la recomendación de una contratación, identificar las condiciones abiertas y separar los resultados de pruebas reales de los beneficios esperados. Hasta contar con esa evidencia, no se publican conclusiones finales atribuidas al cliente.",
      },
    ],
    caveat:
      "Sin fuente resuelta de T-11. No se presume cierre aprobado, contratación del proveedor ni implementación del sistema.",
    nextStep:
      "Consolidar las versiones finales, registrar pendientes y documentar la presentación y su devolución antes de actualizar el estado.",
  },
];
