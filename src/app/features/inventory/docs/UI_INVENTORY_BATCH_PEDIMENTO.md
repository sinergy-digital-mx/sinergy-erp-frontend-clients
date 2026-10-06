# UI — Pedimento en detalle de lote

Si el lote viene de una orden de compra, el pedimento vive en la OC. El lote apunta a esa OC (`purchase_order_batch_id`); al recibir se copia esa relación, y al transferir se conserva.

Si el lote se creó con **Importación de inventario** (reporte CLAVE SAT / pedimentos), el pedimento se guarda en el lote: `pedimento_number` (el de fecha más reciente) y la lista completa. Al transferir se copian esos campos.

## Endpoint

`GET /inventory/batches/:id` — campo nuevo `pedimento_number`.

| Campo | Tipo | Cuándo viene |
|-------|------|----------------|
| `pedimento_number` | `string \| null` | Pedimento principal. El de la OC si existe. Si no hay OC, el más reciente guardado en el lote. |
| `pedimento_numbers` | `string[]` | Todos los pedimentos a mostrar. Uno si viene de la OC; todos los del reporte si el lote se importó. |
| `vendor_invoice_number` | `string \| null` | Primera factura del proveedor de la OC. `null` si no hay OC o no hay factura. |
| `vendor_invoice_numbers` | `string[]` | Todas las facturas de la OC. Vacío si no hay OC o no hay facturas. |

Sigue igual: `purchase_order_id`, `purchase_order_folio`.

No hace falta un GET extra a la OC: el detalle del lote ya trae el valor.

## Dónde

Tab **General** del detalle de lote (`batch-detail-dialog`). Card **PEDIMENTO** y **NO. FACTURA DE PROVEEDOR** al lado de **REQUISICIÓN**.

Solo lectura. El pedimento se cambia en la OC (`PATCH /purchase-orders/:id/pedimento`). Al cerrar el detalle de la OC se recarga el lote.

## Bindings

```ts
const folio = batch.purchase_order_folio ?? '—';
const pedimentos = batch.pedimento_numbers?.filter((value) => value.trim()) ?? [];
```

| Condición | UI |
|-----------|-----|
| `pedimento_numbers` con valores | Mostrar cada número (mismo formato que en OC; no validar SAT) |
| Lista vacía y `pedimento_number` vacío | No mostrar la card |
| Sin OC y sin pedimento en el lote | No hay pedimento |

Lote de transferencia: mismos pedimentos que el lote origen (la OC, o los copiados del lote importado).
