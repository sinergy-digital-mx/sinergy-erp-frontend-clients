# UI — Nav y menú en celular

El header móvil usa el mismo índigo del sidebar (`#1e1b4b`). En el celular no debe verse una franja blanca arriba (barra del sistema).

El menú ocupa toda la pantalla y tapa el header. El botón de cerrar queda visible, no debajo del nav.

## Dónde

`main-layout` + `sidebar`. `theme-color` en `index.html`.

## Cambios

### 2026-10-24

Header más chico: logo reducido y menos padding. La barra del sistema toma el color del nav.

El overlay del menú sale del flujo (ya no lo recorta el `overflow` del contenido). En celular cubre el header; el cierre (X) queda usable.
