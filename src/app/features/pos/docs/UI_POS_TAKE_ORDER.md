# UI — POS Ventas: tomar pedido

Contrato de API en `sinergy-erp-backend-clients/src/api/pos-shifts/docs/UI_POS_FLOW.md`.

## Cliente

Fila del carrito:

- Sin cliente: hint de mostrador + botón **Existente** (abre el picker).
- Con cliente: iniciales + nombre + botón **Cambiar** + quitar.

El botón no debe mostrar ambos textos a la vez.

## Catálogo

En monitor caben **3 cartas** por fila y se ven grandes (foto 4:3). El ancho mínimo impide una cuarta columna. Si el catálogo se angosta o la pantalla es baja, las cartas se achican (foto más baja, menos padding y letra más chica) y siguen en 3, 2 o 1 según el ancho.

Stock y unidad van en badges separados, con el texto centrado. Nº pieza usa la misma altura para que la etiqueta no se pegue al borde de arriba.

## Cambios

### 2026-11-25

En el catálogo, **Bodega** (Todas las bodegas) y **Sin inventario** salen del botón **Filtros**, para que la búsqueda no se corte. Si hay alguno activo, el botón muestra el número. La sucursal, **Filtros** y el cambio de vista miden 26px, el mismo alto.

En pantallas chicas la barra de POS Ventas baja el texto y no se parte en dos filas. Si queda angosta, se ocultan las palabras Sucursal y Vendedor y se dejan el nombre y los botones Folios, En caja y Tickets más chicos. Las cartas de la cuadrícula se achican cuando el catálogo es angosto o la ventana es baja. El carrito no cambia.

En **Folios**, ventas y cotizaciones no se mezclan: hay dos filtros, **Ventas** y **Cotizaciones**. Cada carta muestra la empresa y, debajo y más chica, la persona cuando son distintas.

**Cotizaciones** lista todas las de la sucursal y la razón social, de cualquier vendedor (`GET /tenant/pos/folio-quotations`). No se recortan al usuario de la sesión ni a las primeras 30.

### 2026-11-24

En el cuadrito de **Corte abierto**, al pasar el cursor la terminal sale abajo como submenú. La barra no crece y no empuja el resto.

**Folios** en la barra lista cotizaciones y ventas de la sucursal y la razón social. **Llevar a carrito** las copia a C1, C2 o C3. Esos carritos guardan cliente y productos, sin precio, y al usarlos cobran el precio vigente. Un ticket regresado de caja no se mezcla con ellos hasta enviarlo o soltarlo.

En la barra, **Sucursal** y **Vendedor** ya no muestran el texto Cambiar. El clic en el cuadrito abre el cambio de sucursal o el código del vendedor. En una laptop chica ese enlace quedaba fuera del cuadrito.

### 2026-11-23

El modal de **Ventas en caja** es ancho (hasta 1120px). Los folios van en cartas apaisadas del mismo ancho y alto (unas tres por fila): folio, cliente, monto y un resumen (productos, hora, vendedor). Al abrir una, ocupa el ancho del modal y los productos salen en tabla (pieza, cantidad, precio, importe) con scroll, para listas de unos diez renglones. **Regresar a ventas** queda a un lado, en tamaño medio. **En caja** y **Tickets** en la barra suben un poco de tamaño.

Si caja tiene ese folio abierto (lo está cobrando o editando), al regresarlo se le quita al momento. Caja abre una ventana: «{vendedor} regresó {folio} a POS Ventas». El nombre es el vendedor con código abierto en esa terminal.

En cada línea del carrito, quien tenga el permiso **Ver y aplicar descuento porcentual al precio en POS Ventas** (`pos:ApplyPriceDiscount`) ve el botón **%** con una flecha. Al abrirlo salen el **5%**, el **3%** y otro porcentaje en un panel flotante, encima de la carta: la línea no crece. El precio de lista se tacha, sale el precio nuevo y la pastilla `−5%`. No es descuento de producto ni global: se guarda en `discount_percentage` de la línea. Sin el permiso no se ve el botón; si el ticket ya traía el descuento, se muestra y se conserva al reenviar. Clic afuera o Esc cierra el panel.

La barra dice **POS** y la **i** abre los atajos. **Ctrl+I** abre el cliente (también está en el botón Existente/Cambiar). Al buscar, el primer resultado queda marcado: las flechas lo mueven y Enter agrega ese renglón. Esc limpia la búsqueda y un segundo Esc sale de pantalla completa. **Ctrl+M** abre un modal al centro con las ventas en caja: folio, cliente, productos, totales y el botón para regresarla a ventas. F1 y F5 quedan para el navegador.

La vista de lista tiene columnas (Producto, Nº pieza, Existencia, Unidad, Precio). El renglón marcado va en violeta. El renglón completo agrega; el precio ya no se ve como botón. Los iconos de tarjetas y lista van centrados, y el activo se pinta. Junto a la búsqueda hay tarjetas/lista; la vista queda en el navegador. El desplegable de sucursal solo consulta existencia: si no es la sucursal de la venta, no se puede agregar. Si el folio ya existe, **Cambiar** cliente lo actualiza en la orden.

### 2026-11-02

Cartas del catálogo más grandes: máximo 3 por fila en monitor e iPad anchos, 2 o 1 si el ancho no alcanza. Badges de stock y unidad con el texto centrado, sin pegarse entre sí ni al borde superior.

### 2026-10-22

Tarjeta del catálogo rearmada: nombre más chico, **Nº pieza** en violeta (ya no se pierde en negro), stock y unidad como chips gemelos, precio contenido al pie.

Chrome Translate partía el DOM de Angular y apilaba **Cambiar** / **Existente** (y nombres/precios). La app queda en `lang="es"` con `translate="no"` / `notranslate` para que el navegador no la traduzca.

Los anticipos que caja devolvió salen en **Tickets** (`kind: "advance"`). Al abrirlos se carga la cotización y **Enviar a caja** reabre el diálogo de anticipo con el monto anterior.
