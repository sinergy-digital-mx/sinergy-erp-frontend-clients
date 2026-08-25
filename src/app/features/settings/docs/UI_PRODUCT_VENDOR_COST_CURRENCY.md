# UI — Moneda en costo de proveedor (MXN / USD)

El costo de un producto **por proveedor + UOM** tiene moneda. Eso define si las OC de ese proveedor con ese producto van en **MXN** o **USD**.

Valores: `MXN` | `USD`. Default al crear: `MXN`.

## Modal Agregar / Editar Costo

Radio obligatorio junto a **Costo**. Mandar siempre `currency` en:

- `POST /products/:id/vendor-costs`
- `PATCH /products/:id/vendor-costs/:id`

## Tabla (tab Costos)

Columna **Moneda** (badge `MXN` / `USD`). Una fila = proveedor + UOM + una moneda.

No convertir montos. El número `cost` ya está en esa moneda.

Ver también: `src/app/features/purchase-orders/docs/UI_PURCHASE_ORDER_CURRENCY.md`.
