# UI — Costo y precio en detalle de lote

Fuente de verdad: `sinergy-erp-backend-clients/src/api/inventory/docs/UI_INVENTORY_BATCH_COST.md`

`GET /api/tenant/inventory/batches/:id` ahora trae:

- `unit_cost` + `payment_currency`
- `real_unit_cost_usd` / `real_unit_cost_mxn` (null si la OC no usó el tab)
- `customs_exchange_rate`
- `suggested_unit_price` + `suggested_price_currency`

Card COSTOS en tab General: proveedor, real USD (rojo), real MXN (verde), T.C. aduana, precio sugerido.
