# UI — Costo real en órdenes de compra (tab opcional)

Fuente de verdad: `sinergy-erp-backend-clients/src/api/purchase-orders/docs/UI_PURCHASE_ORDER_REAL_COST.md`

Tab **Costo real** opcional. Gastos **libres y agregables** (concepto + monto + MXN/USD). Sin catálogo.

```
PUT /api/tenant/purchase-orders/:id/real-cost
```

`extra_costs` es la lista completa. **+ Agregar gasto** = una fila más en ese array. Un concepto nuevo no requiere backend extra.

T.C. de aduana (`customs_exchange_rate`), no el del día al facturar.

USD rojo = `real_unit_cost_usd`. MXN verde = `real_unit_cost_mxn`.

Totales de análisis (no cambian pagos ni `requested_total`):

- GET: `landed_extras_usd`, `landed_total_usd`, `landed_total_mxn`
- Sidebar **TOTALES**: Gastos + Total final si hay gastos
- Resumen al lado de Gastos: Valor aduana, Gastos y Total final, con badge USD / MXN (preview en vivo)

Si un gasto tiene monto y el concepto va vacío, se guarda como `Gasto`.

Lote: `src/app/features/inventory/docs/UI_INVENTORY_BATCH_COST.md`
