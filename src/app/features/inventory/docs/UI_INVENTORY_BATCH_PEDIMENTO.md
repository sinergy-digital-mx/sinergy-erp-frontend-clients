# UI — Pedimento en detalle de lote

El pedimento **no se guarda en el lote**. Vive en la orden de compra. El lote ya apunta a esa OC (`purchase_order_batch_id`); al recibir se copia esa relación, y al transferir se conserva.

## Endpoint

`GET /inventory/batches/:id` — campo nuevo `pedimento_number`.

| Campo | Tipo | Cuándo viene |
|-------|------|----------------|
| `pedimento_number` | `string \| null` | Pedimento de la OC de origen. `null` si no hay OC, o la OC no tiene pedimento. |

Sigue igual: `purchase_order_id`, `purchase_order_folio`.

No hace falta un GET extra a la OC: el detalle del lote ya trae el valor.

## Dónde

Tab **General** del detalle de lote (`batch-detail-dialog`). Card **PEDIMENTO** al lado de **REQUISICIÓN**.

Solo lectura. El pedimento se cambia en la OC (`PATCH /purchase-orders/:id/pedimento`). Al cerrar el detalle de la OC se recarga el lote.

## Bindings

```ts
const folio = batch.purchase_order_folio ?? '—';
const pedimento = batch.pedimento_number?.trim() || null;
```

| Condición | UI |
|-----------|-----|
| `pedimento_number` con valor | Mostrar el número (mismo formato que en OC; no validar SAT) |
| `pedimento_number` null / vacío | No mostrar la card |
| Sin OC (`purchase_order_folio` vacío) | No hay pedimento |

Lote de transferencia: mismo `pedimento_number` que el lote origen (misma OC).
