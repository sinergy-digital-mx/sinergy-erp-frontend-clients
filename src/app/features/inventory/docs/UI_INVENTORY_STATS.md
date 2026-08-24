# UI — Cards de stats de inventario

Fila de KPI cards encima de filtros / tabs en **Por Lotes** (`/inventory/lotes`) y **Totalizado** (`/inventory/totalizado`).
`/inventory` redirige a **totalizado**. Por defecto se selecciona la primera razón social.
Header, stats y filtros viven en el shell y se comparten al cambiar de pestaña.
Los números siguen la cascada razón social → sucursal → almacén. No cambian con search ni paginación.

**POS no cambia.**

## Dónde

`inventory-batch-list` → `app-inventory-stats-cards`. Encima de la barra de filtros.

Al cambiar razón / sucursal / almacén: `GET /tenant/inventory/stats` + listado en paralelo.

## Endpoint

`GET /tenant/inventory/stats` — permiso `inventory:Read`.

Query params (todas = no enviar):

- `fiscal_configuration_id`
- `billing_branch_id` (solo si hay almacén / sucursal)
- `warehouse_id`

Implementado en `InventoryService.getStats()`.

## Cards

| Card | Valor | Sub |
|------|--------|-----|
| Lotes | `total_batches` | con stock / agotados |
| Costo en inventario | `total_cost` MXN | promedio / u |
| Valor a precio de venta | `total_sale_value` MXN | promedio / u |
| Margen bruto | `gross_margin` MXN | `%` verde ≥ 0, rojo < 0 |
| Existencia | `total_available_quantity` | productos · almacenes |

Chips warning si `batches_without_cost > 0` o `products_without_price > 0`.

## Estados

- Loading: 5 skeletons (no bloquean la tabla)
- Error: toast con `message`; cards en `—` / 0
- Vacío: `0` / `$0.00` / `0%`
