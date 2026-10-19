# UI — Costo real en órdenes de compra (tab opcional)

Fuente de verdad: `sinergy-erp-backend-clients/src/api/purchase-orders/docs/UI_PURCHASE_ORDER_REAL_COST.md`

Tab **Costo real** opcional. Gastos **libres y agregables** (concepto + monto + MXN/USD). Sin catálogo.

```
PUT /api/tenant/purchase-orders/:id/real-cost
```

`extra_costs` es la lista completa. **+ Agregar gasto** = una fila más en ese array. Un concepto nuevo no requiere backend extra.

T.C. de aduana (`customs_exchange_rate`), no el del día al facturar.

USD rojo = `real_unit_cost_usd`. MXN verde = `real_unit_cost_mxn`.

## 2026-10-19

Con costo real, la columna **Total** del listado (`payable_total`) y cuentas por pagar usan el total factura, no el costo final. `requested_total` no cambia.

## 2026-10-14

Totales de análisis (`requested_total` no cambia):

- Casilla **Factura** en cada gasto (`include_in_invoice`): suma ese gasto al total de factura
- Total contratado = mercancía
- Total factura = mercancía + gastos marcados
- Costos operativos = gastos sin marcar
- Total costo final = factura + costos operativos
- Sidebar **TOTALES** y el resumen USD/MXN muestran ese desglose
- El inventario usa el costo real (costo final) en `GET /inventory/stats`

Si un gasto tiene monto y el concepto va vacío, se guarda como `Gasto`.

Lote: `src/app/features/inventory/docs/UI_INVENTORY_BATCH_COST.md`
