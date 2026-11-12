# Mallow · React + Motion

Landing pública de la consultora académica Mallow, desarrollada en React con Vite y Motion for React. La versión anterior en `Nueva carpeta/` se conserva sin modificaciones.

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

En esta sesión el desarrollo corre en `http://127.0.0.1:5178`.

## Editar

- `src/content.js`: servicios, etapas del método y siete integrantes.
- `src/App.jsx`: secciones y componentes; `HeroArt` es una ilustración propia en CSS/SVG, no una captura de un sistema real.
- `src/styles.css`: diseño y responsive.
- `src/readability.css`: ajustes de contraste y legibilidad sobre las superficies pastel.
- `public/mallow-mark.svg`: isotipo botánico original extraído de `Mallow.html`, con sus tres trazados y posiciones preservados.
- `src/brand.css`: identidad original: DM Serif Display en marca/títulos, Inter en interfaz, tinta `#111827`, niebla `#F8FAFC` y violeta `#6956E8`.

No se usan fotografías de personas inventadas. Las iniciales y la ilustración del caso son composiciones de diseño; las fotos del equipo y el logo oficial de Fan de Pan pueden incorporarse posteriormente. El logo de Mallow sí conserva la identidad original suministrada por el usuario.

## Alcance y privacidad

El sitio presenta a Mallow como consultora y a Fan de Pan como caso de diagnóstico y recomendación, no como una implementación ejecutada. Las cifras públicas se atribuyen al relevamiento del equipo.

El botón **Explorar el caso** abre un resumen público accesible. Esta versión no publica los documentos del cliente ni finge protegerlos con una contraseña en JavaScript. El espacio privado requiere autenticación real de servidor y sigue pendiente. Tampoco hay formularios que simulen enviar mensajes: el correo comercial aún no está definido.

La versión anterior NO se copia al build ni al directorio público. Publicar solamente `dist/`.

## Pruebas

```sh
npm test
```

Playwright usa Microsoft Edge instalado (`channel: 'msedge'`). Si no está disponible, instalar Chromium con `npx playwright install chromium` y quitar `channel` de `playwright.config.js`.

La suite prueba contenido, menú móvil, teclado en pestañas, apertura/cierre del diálogo y devolución del foco, ausencia de desbordes a 320/390/768/1440 px, movimiento reducido y auditoría automatizada WCAG AA con axe (no sustituye una auditoría manual completa). Genera capturas en `test-results/`.

Los tests de Python existentes corresponden a la versión estática anterior y no a esta landing React.

## Publicar

El `vercel.json` de la raíz configura Vite y `dist`. Usar la raíz del repositorio como Root Directory del proyecto Vercel. No se realizó ningún despliegue ni commit.

## Motion

Se consultó la documentación oficial `https://motion.dev/docs/react`. Se usan imports desde `motion/react`: revelados con `whileInView`, ilustración flotante, progreso de scroll con `useScroll`/`useSpring`, transiciones de pestañas con `AnimatePresence`/`layoutId`, y respeto de `prefers-reduced-motion`.
