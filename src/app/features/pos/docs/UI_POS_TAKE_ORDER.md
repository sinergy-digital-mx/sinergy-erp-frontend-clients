# UI — POS Ventas: tomar pedido

Contrato de API en `sinergy-erp-backend-clients/src/api/pos-shifts/docs/UI_POS_FLOW.md`.

## Cliente

Fila del carrito:

- Sin cliente: hint de mostrador + botón **Existente** (abre el picker).
- Con cliente: iniciales + nombre + botón **Cambiar** + quitar.

El botón no debe mostrar ambos textos a la vez.

## Catálogo

En monitor caben **3 cartas** por fila. El ancho mínimo impide una cuarta columna; si el catálogo se angosta (iPad con el carrito al lado, o celular), bajan a 2 o a 1 y la carta sigue grande. La foto usa proporción 4:3.

Stock y unidad van en badges separados, con el texto centrado. Nº pieza usa la misma altura para que la etiqueta no se pegue al borde de arriba.

## Cambios

### 2026-11-23

La barra dice **POS** y la **i** abre los atajos. **F1** abre el cliente (también está en el botón Existente/Cambiar; el navegador ya no se queda con esa tecla). Al buscar, el primer resultado queda marcado: las flechas lo mueven y Enter agrega ese renglón. Esc limpia la búsqueda. F5 lista lo que está en caja para regresarlo a ventas.

La vista de lista tiene columnas (Producto, Nº pieza, Existencia, Unidad, Precio). El renglón marcado va en violeta. El renglón completo agrega; el precio ya no se ve como botón. Los iconos de tarjetas y lista van centrados, y el activo se pinta. Junto a la búsqueda hay tarjetas/lista; la vista queda en el navegador. El desplegable de sucursal solo consulta existencia: si no es la sucursal de la venta, no se puede agregar. Si el folio ya existe, **Cambiar** cliente lo actualiza en la orden.

### 2026-11-02

Cartas del catálogo más grandes: máximo 3 por fila en monitor e iPad anchos, 2 o 1 si el ancho no alcanza. Badges de stock y unidad con el texto centrado, sin pegarse entre sí ni al borde superior.

### 2026-10-22

Tarjeta del catálogo rearmada: nombre más chico, **Nº pieza** en violeta (ya no se pierde en negro), stock y unidad como chips gemelos, precio contenido al pie.

Chrome Translate partía el DOM de Angular y apilaba **Cambiar** / **Existente** (y nombres/precios). La app queda en `lang="es"` con `translate="no"` / `notranslate` para que el navegador no la traduzca.

Los anticipos que caja devolvió salen en **Tickets** (`kind: "advance"`). Al abrirlos se carga la cotización y **Enviar a caja** reabre el diálogo de anticipo con el monto anterior.
