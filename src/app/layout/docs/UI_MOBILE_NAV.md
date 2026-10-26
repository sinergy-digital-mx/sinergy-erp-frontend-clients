# UI — Nav y menú en celular

El header móvil usa el mismo índigo del sidebar (`#1e1b4b`). En el celular no debe verse una franja blanca arriba (barra del sistema).

En celular el header y el menú van en color plano `#1e1b4b`, el mismo fondo de `html`/`body`. El degradado del sidebar se queda solo en escritorio, para que la barra de arriba y el menú se vean de una pieza.

El menú ocupa toda la pantalla y tapa el header. El botón de cerrar queda visible, no debajo del nav.

## Dónde

`main-layout` + `sidebar`. `theme-color` en `index.html`.

## Cambios

### 2026-10-26

En celular se quitó el degradado del header y del menú. Quedan en `#1e1b4b` para unirse al fondo de la aplicación. En escritorio el sidebar conserva el degradado.

La barra con hamburguesa solo existe bajo 1024px. En escritorio el estilo del componente la ocultaba mal (`display: flex` le ganaba a `lg:hidden`) y, si el drawer quedaba abierto, las etiquetas salían cortadas en el sidebar.

### 2026-10-24

Header más chico: logo reducido y menos padding. La barra del sistema toma el color del nav.

El overlay del menú sale del flujo (ya no lo recorta el `overflow` del contenido). En celular cubre el header; el cierre (X) queda usable.
