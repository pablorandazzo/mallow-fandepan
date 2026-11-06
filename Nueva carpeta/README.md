# Mallow × Fan de Pan — sitio web (APLSI · FCE-UBA · Grupo 2)

Sitio estático (HTML + CSS + JS vanilla, **sin módulos ES ni build**). Funciona abriendo `index.html` directamente o publicado en Vercel.

## Archivos
- `index.html` landing pública · `caso-fan-de-pan.html` caso privado (con pantalla de acceso) · `404.html`
- `css/` tokens, base, componentes, landing y caso
- `js/` `config.js` (editable), `main.js`, `gate.js`, `tables.js`, `charts.js`, `gantt.js`, `caso.js` (render de capítulos)
- `data/` todo el contenido (T-01 a T-11) como objetos `window.DATA.*`
- `assets/` logos e imágenes oficiales (ver `assets/LEEME-assets.txt`)

## Cambiar la clave de acceso
La clave por defecto es `mallow2026`. **Cambiala antes de publicar.**
1. Generá el SHA-256 de la nueva clave:
   - Terminal: `echo -n "miClave" | sha256sum`
   - Consola del navegador: `crypto.subtle.digest('SHA-256', new TextEncoder().encode('miClave')).then(b=>console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))`
2. Pegá el resultado en `js/config.js` → `accessKeyHash`.

> **Importante:** la protección es solo **visual** (control del lado del cliente). Cualquier persona con acceso al código fuente puede leer el hash y los datos. No es seguridad real: para confidencialidad verdadera usá autenticación del lado del servidor (por ejemplo, Vercel Password Protection).

## Completar mail, links y equipo (`js/config.js`)
- `contactEmail`: si está vacío se muestra "a definir" y el botón "Escribinos" queda deshabilitado.
- `links.entregables.T01…T11`: URL del PDF de cada entregable. Vacío = botón "Próximamente".
- `links.matrizBrechasExcel`: link del Excel de la matriz de brechas.
- `today`: `null` usa la fecha actual para la línea "hoy" del Gantt; o fijá `"2026-11-06"`.
- `team[].foto`: ruta de una foto para reemplazar las iniciales.

## Agregar o activar un capítulo (T-06 a T-11)
Editá `data/capitulos-pendientes.js`. Cada objeto de `DATA.pend` es un capítulo; si le agregás `contenido` (HTML con los mismos bloques/clases de los capítulos 01–05, p. ej. `.sub`, `.table-wrap`, `.callout`) se renderiza completo en lugar de la tarjeta "En elaboración". Para cambiar el estado de un entregable en la grilla de cierre, editá `DATA.entregables[].est` (`"Completo"` / `"En elaboración"`).

Alcance T-05: completá `DATA.alcance.alcance` en `data/alcance-cronograma.js` (`objetivoGeneral`, `objetivosEspecificos[]`, `beneficios[]`). Mientras estén vacíos se muestra "Alcance — en revisión".

## Publicar en Vercel
Importá la carpeta como proyecto estático (sin framework, sin build). `vercel.json` activa `cleanUrls` y cabeceras de caché.

## Notas de contenido
- Las cifras de resultados (30 %, −30 % de desvíos, ≤ 5 días) son metas o estimaciones del sponsor, no resultados logrados. La implementación (Fase B) está fuera del alcance (EX4).
- El "AE de Transición" del radar es una proyección del equipo.
- La selección de ítems por estrategia FODA y las marcas "se incorpora / se transforma" de la grilla destino son interpretación del equipo: están en `data/empresa.js` (`estrategias[].m`) y `data/arquitectura-destino.js` (`ae.nuevos`, `ae.transforman`).
