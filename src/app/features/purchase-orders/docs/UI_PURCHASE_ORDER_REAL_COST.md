# UI — Costo real en órdenes de compra (tab opcional)

Fuente de verdad: `sinergy-erp-backend-clients/src/api/purchase-orders/docs/UI_PURCHASE_ORDER_REAL_COST.md`

Tab **Costo real** opcional. Gastos **libres y agregables** (concepto + monto + MXN/USD). Sin catálogo.

```
PUT /api/tenant/purchase-orders/:id/real-cost
```

`extra_costs` es la lista completa. **+ Agregar gasto** = una fila más en ese array. Un concepto nuevo no requiere backend extra.

T.C. de aduana (`customs_exchange_rate`), no el del día al facturar.

USD rojo = `real_unit_cost_usd`. MXN verde = `real_unit_cost_mxn`.

Lote: `src/app/features/inventory/docs/UI_INVENTORY_BATCH_COST.md`
