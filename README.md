# Mallow · React + Motion

Landing pública y carpeta navegable del caso Fan de Pan, desarrolladas en React con Vite y Motion for React.

## Ejecutar

Requiere Node compatible con Vite 7 (Node 20.19+ o 22.12+).

```sh
npm ci
npm run dev
```

Para generar y revisar la versión de producción:

```sh
npm run build
npm run preview
```

La suite utiliza el sitio en `http://127.0.0.1:5178`. Los originales funcionan también en el build estático, sin necesitar un modo local especial.

## Editar

- `src/content.js`: servicios, etapas del método y siete integrantes.
- `src/App.jsx`: secciones y componentes; `HeroArt` es una ilustración propia en CSS/SVG, no una captura de un sistema real.
- `src/styles.css`: diseño y responsive.
- `src/readability.css`: ajustes de contraste y legibilidad sobre las superficies pastel.
- `public/mallow-mark.svg`: isotipo botánico original extraído de `Mallow.html`, con sus tres trazados y posiciones preservados.
- `public/fan-de-pan-logo.png`: logotipo naranja original de la cabecera de `https://fandepan.com.ar/`, descargado de `/wp-content/uploads/2026/01/logo-naranja.png` sin modificar sus bytes, colores ni proporciones. Se usa en la tarjeta, el modal y la cabecera del caso; `e2e/client-brand.spec.js` comprueba su integridad y presentación responsive.
- `src/brand.css`: identidad original: DM Serif Display en marca/títulos, Inter en interfaz, tinta `#111827`, niebla `#F8FAFC` y violeta `#6956E8`.
- `src/CasePage.jsx`, `src/case.css`: página del caso, índice, introducciones breves, pestañas y visor PDF nativo del navegador.
- `src/caseContent.js`: once entregas, fuentes, estados e introducciones basadas en los PDF actualizados.
- `src/CaseAccessGate.jsx`, `src/caseAccess.js`: contraseña académica en frontend, persistencia por pestaña y salida del caso.
- `public/case-documents/`: nueve archivos editables DOCX/XLSX, once PDF de lectura y su catálogo estático.
- `public/case-documents/t10-demo/`: dos paquetes ZIP con los comprobantes sintéticos y la evidencia técnica, más cuatro archivos de prueba destacados y seis capturas visibles desde el resumen de T-10.
- `server/caseDocuments.mjs`: acceso documental local optativo y cerrado por defecto; no es una autenticación de producción.

No se usan fotografías de personas inventadas. Las iniciales y la ilustración del caso son composiciones de diseño; las fotos del equipo y el logo oficial de Fan de Pan pueden incorporarse posteriormente. El logo de Mallow sí conserva la identidad original suministrada por el usuario.

## Alcance y privacidad

El sitio presenta a Mallow como consultora y a Fan de Pan como caso de diagnóstico y recomendación, no como una implementación ejecutada. Las cifras públicas se atribuyen al relevamiento del equipo.

El botón **Explorar el caso** abre un resumen con **Ir al caso Fan de Pan**. La ruta `/caso-fan-de-pan` ofrece una vista ejecutiva y navegación T-01 a T-11; `?entrega=t-01` permite compartir y recargar una entrega concreta. Incluye navegación anterior/siguiente, historial del navegador y selector móvil.

Cada entrega tiene una breve introducción y una pestaña de documentos. T-01–T-11 tienen PDF. Disponible significa que existe un documento, no que esté aprobado por el sponsor. El prototipo T-10 tiene QA técnica, pero no validación con usuarios ni integración productiva.

Por decisión explícita del usuario, el caso usa la contraseña académica `fce2026` definida en texto plano en el frontend. El acceso se recuerda en `sessionStorage`, conserva los enlaces directos a entregas y puede cerrarse con **Salir del caso**. Es una barrera de presentación, no autenticación de servidor: los archivos estáticos se pueden consultar mediante su URL. El usuario también autorizó incluir los originales en el sitio; ya no se bloquean detrás de un requisito de servidor. El correo comercial sigue sin definirse y no se simulan envíos.

Publicar solamente `dist/`, generado por Vite.

## Documentos originales y PDFs

Los nueve archivos editables Word y Excel se leen desde `../../Contexto/Templates Resueltos` respecto de la raíz del repositorio. Los once PDF actualizados (T-01 a T-11) se leen desde `.local-documents/Nuevos PDF actualizados/`. Se admiten nombres con el número de entrega seguido de guion o guion bajo, sin renombrar las fuentes. Para publicar los documentos:

```sh
npm run documents:publish
```

La publicación copia los nueve editables y los once PDF a `public/case-documents/` y verifica cada copia por SHA-256. Los PDF son informes actualizados suministrados por separado: no se generan de los editables publicados, que pueden conservar versiones anteriores. T-06 ofrece un resumen PDF y la matriz completa XLSX; T-10 y T-11 solo tienen PDF. El comando `documents:prepare` sigue siendo una utilidad para convertir los Word legados en una caché local, pero no alimenta la publicación de estos PDF.

Después de ingresar al caso se pueden previsualizar once PDF y descargar nueve editables DOCX/XLSX, tanto en desarrollo como en producción. El visor se carga solo al abrir la pestaña y ofrece apertura en otra pestaña si el navegador no integra PDF. Los enlaces de descarga conservan el nombre del archivo editable. T-11 incorpora la carpeta de cierre del proyecto.

El resumen T-10 enlaza directamente al formulario externo de n8n y ofrece los comprobantes mencionados en el informe en PNG/PDF. Para compartir el conjunto completo de archivos de prueba (incluido el PDF intencionalmente inválido) y la evidencia de QA, publicar los paquetes desde las carpetas `Trabajo revisado/Demo n8n T10/comprobantes_sinteticos` y `evidencia` con `npm run documents:publish-t10-demo`. La evidencia incluye capturas, trazas de ensayo y resultados TAP; corresponde a QA técnica, no a validación por usuarios de Fan de Pan. Los ZIP y las capturas son archivos estáticos accesibles mediante su URL, independientemente de la contraseña visual del caso.

El build copia los archivos aprobados desde `public/case-documents/`; no incluye rutas del disco, el directorio original de contexto ni la caché `.local-documents/`. El servidor local opcional y sus endpoints quedan cerrados por defecto, pero la interfaz ya no depende de ellos. Esa restricción del directorio de trabajo no se aplica a las copias estáticas que el usuario pidió habilitar.

## Pruebas

```sh
npm test
npm run test:documents
```

Playwright usa Microsoft Edge instalado (`channel: 'msedge'`). Si no está disponible, instalar Chromium con `npx playwright install chromium` y quitar `channel` de `playwright.config.js`.

La suite de navegador prueba landing, identidad, recorrido modal/caso, las once entregas, estados, enlaces directos, historial, acceso a la matriz Excel, menú y selector móvil, pestañas, PDF bajo demanda, descargas reales y desbordes a 320/390/768/1440 px. También ejecuta axe WCAG AA (no sustituye auditoría manual completa). Genera capturas en `test-results/`.

Las pruebas de integración verifican las copias reales incluidas en el sitio, la clave, la descarga y el visor bajo demanda. Las cuatro pruebas Node del servidor auxiliar cubren cierre por defecto, lista de archivos, rutas de la caché, origen/host, métodos y conversiones desactualizadas; no implican que los archivos publicados tengan autenticación. Sus fixtures nunca se muestran en la UI.

## Publicar

El `vercel.json` de la raíz configura Vite, `dist` y el acceso directo a `/caso-fan-de-pan`. Usar la raíz del repositorio como Root Directory del proyecto Vercel. Los commits de referencia son `4ccb7e4` (landing) y `9dbab76` (caso navegable y documentos). El push y el despliegue son pasos separados.

## Motion

Se consultó la documentación oficial `https://motion.dev/docs/react`. Se usan imports desde `motion/react`: revelados con `whileInView`, ilustración flotante, progreso de scroll con `useScroll`/`useSpring`, transiciones de pestañas con `AnimatePresence`/`layoutId`, y respeto de `prefers-reduced-motion`.
