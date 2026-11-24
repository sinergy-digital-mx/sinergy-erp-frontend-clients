# UI — Resumen del listado de órdenes de venta

## 2026-11-24 — Listado móvil como clientes

En celular el título queda junto a dos botones chicos (descargar y crear). La búsqueda se queda afuera y el resto entra en Filtros, como una hoja abajo. Las cards del resumen son cinco, cada una con su conteo y el monto en su renglón (MXN y, si hay, USD). Abiertas y Entregadas ya no comparten celda. Cada orden es una tarjeta: cliente, estado, folio, total, pago y factura.

## 2026-11-23 — Barra a la misma altura

En Abiertas y Entregadas la barra queda en el mismo renglón que Órdenes, Pagadas y Pendientes. Los montos de cada columna van debajo de esa barra, en su propio renglón. Si hay dólares, siguen en la línea de abajo.

## 2026-11-23 — Abiertas contra entregadas

La segunda card se parte en dos columnas: Abiertas y Entregadas. Cada una trae su conteo y su monto en líneas aparte. Si hay dólares, van en su propio renglón.

Abiertas es lo que no está Surtida ni Cancelada. Entregadas es Surtida. La barra repite esa comparación. Las canceladas no entran.

## 2026-11-23 — Totales del filtro, sin Surtidas

Cuatro columnas: Órdenes, Abiertas, Pagadas y Pendientes. Se quitó Surtidas.

Conteo y monto salen de `stats` en el GET del listado. Cubren todas las órdenes de los filtros actuales (razón social, sucursal, cliente, búsqueda, fechas). No se calculan con la página. El monto es `total`, el mismo de la columna Total. Si hay órdenes en USD, el pie va partido (`MXN $… · USD $…`) y no se suman.

| Card | Conteo | Monto |
|------|--------|-------|
| Órdenes | `stats.count` | `by_currency.MXN.amount` y, si hay, `USD.amount` |
| Abiertas | `open.count` de MXN + USD | `open.amount`. La línea verde usa `delivered` |
| Pagadas | `paid.count` | `paid.amount` |
| Pendientes | `pending.count` | `pending.amount`. En cero dice Sin pendiente |

`open` es todo lo que no está Surtida ni Cancelada. `delivered` es Surtida. Pagadas es `payment_status = Pagado`. Pendientes es `Pendiente`. Órdenes es todo el filtro, incluidas entregadas y canceladas.

Sin `sales_orders:ViewStats` el GET no trae `stats` y no se pintan las tarjetas.

## 2026-11-23 — Franja como clientes

La franja usa el mismo alto y skeleton que el resumen de clientes. En tablet quedan en tres columnas y en móvil en dos.

## 2026-11-23 — Bolitas junto a recargar

Las bolitas que cambian entre el resumen y la gráfica de 12 meses quedan a la izquierda del botón de recargar, después de limpiar filtros. Un clic fija la vista y detiene el cambio automático.
