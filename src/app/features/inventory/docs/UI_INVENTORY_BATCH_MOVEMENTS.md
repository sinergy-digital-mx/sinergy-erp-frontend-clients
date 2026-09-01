# UI — Movimientos del lote

Tab **Movimientos** en el detalle de lote. Timeline de todo lo que le pasó al lote: se creó, salió por venta, se transfirió, se ajustó por auditoría.

Las cards de **General** leen `movement_summary`. El tab pinta `movements`. No armar el copy en el front: usar `title` + `description`.

## Dónde

`batch-detail-dialog`, entre General y Transferencias.

```
General | Movimientos (3) | Transferencias | Auditorías | Foto | Etiqueta
```

Badge = `movements_count`. Transferencias y Auditorías se quedan.

## Endpoints

| Uso | Ruta |
|-----|------|
| Tab (viene en el detalle) | `GET /inventory/batches/:id` → `movements` + `movements_count` + `movement_summary` |
| Solo historial / refresh | `GET /inventory/batches/:id/movements` |

Permiso: `inventory:read`.

Orden: más reciente primero. Si `data` viene `[]`: *Sin movimientos.*

## Fila

| UI | Campo |
|----|--------|
| Chip | `type` + `type_label` |
| Título | `title` |
| Texto | `description` |
| Cantidad | `quantity` + `direction` |
| Usuario | `actor_name` (si null: `—`) |
| Autorizó | `authorized_by_name` solo si no es null |
| Fecha | `occurred_at` |
| Diff | `changes[]` si `length > 0` (`field_label` de → a) |

Cantidad: `in` → verde `+{quantity}`; `out` → rojo `−{quantity}`; `adjust` → el valor ya trae signo.

## `type`

| `type` | Chip | Tono |
|--------|------|------|
| `created` | Lote creado | gris |
| `purchase_received` | Entrada por compra | verde |
| `imported` | Entrada por importación | verde |
| `transfer_in` | Entrada por transferencia | verde |
| `transfer_out` | Salida por transferencia | naranja |
| `stock_sold` | Salida por venta | naranja/rojo |
| `inventory_adjusted` | Ajuste de inventario | morado |

Filtros: chips por `type`. Default: todos.

## Cards de General (`movement_summary`)

| Card | Campo |
|------|--------|
| Total Movimientos | `movement_summary.total_movements` (= `movements_count`) |
| Órdenes | `by_type.orders` |
| Transferencias salida | `by_type.transfers_out` |
| Transferencias entrada | `by_type.transfers_in` |
| Ajustes | `by_type.adjustments` |

Si hubo venta, **Órdenes** debe ser ≥ 1. `total_in` / `total_out` son sumas de cantidad, no de filas.

## Enlaces (`metadata`)

No se navega por URL: se abre el mismo modal de detalle.

| Origen | Campos | Abre |
|--------|--------|------|
| Venta | `sales_order_id`, `sales_order_folio` | detalle OV |
| Compra | `purchase_order_id`, `purchase_order_folio` | detalle OC |
| Transferencia | `transfer_id`, `transfer_folio`, `related_batch_id` | detalle TRF / lote |
| Auditoría | `audit_id`, `audit_folio` | detalle AUD |

Implementado en `inventory-batch-movements-tab`. Si el detalle no trae `movements`, el tab pide `GET /inventory/batches/:id/movements`.
