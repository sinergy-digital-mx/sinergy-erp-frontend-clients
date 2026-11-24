# UI — Resumen del listado de órdenes de venta

## 2026-11-23 — Totales del filtro, sin Surtidas

Cuatro columnas: Órdenes, Creadas, Pagadas y Pendientes. Se quitó Surtidas.

Conteo y monto salen de `stats` en el GET del listado. Cubren todas las órdenes de los filtros actuales (razón social, sucursal, cliente, búsqueda, fechas). No se calculan con la página. El monto es `total`, el mismo de la columna Total. Si hay órdenes en USD, el pie va partido (`MXN $… · USD $…`) y no se suman.

| Card | Conteo | Monto |
|------|--------|-------|
| Órdenes | `stats.count` | `by_currency.MXN.amount` y, si hay, `USD.amount` |
| Creadas | `created.count` de MXN + USD | `created.amount` |
| Pagadas | `paid.count` | `paid.amount` |
| Pendientes | `pending.count` | `pending.amount`. En cero dice Sin pendiente |

Creadas es solo `general_status = Creada`. Pagadas es `payment_status = Pagado`. Pendientes es `Pendiente`. Órdenes es todo el filtro, incluidos surtidas y canceladas.

Sin `sales_orders:ViewStats` el GET no trae `stats` y no se pintan las tarjetas.

## 2026-11-23 — Franja como clientes

La franja usa el mismo alto y skeleton que el resumen de clientes. En tablet quedan en tres columnas y en móvil en dos.

## 2026-11-23 — Bolitas junto a recargar

Las bolitas que cambian entre el resumen y la gráfica de 12 meses quedan a la izquierda del botón de recargar, después de limpiar filtros. Un clic fija la vista y detiene el cambio automático.
