# UI — Moneda de la orden de compra (MXN / USD)

Una OC es **toda en pesos o toda en dólares**. No se mezclan. La moneda sale del **costo de proveedor + UOM**.

Valores: `MXN` | `USD`. No usar `USA`, `MX`, `PESOS`.

## Badge

En crear / editar / detalle / listado, según `payment_currency`.

| Estado | Badge |
|--------|--------|
| Sin productos | `—` |
| Primer producto MXN | `MXN` |
| Primer producto USD | `USD` |

Tras el primer producto la moneda queda bloqueada. Si se quitan todas las líneas, vuelve a `—`. Cambiar de proveedor vacía las líneas y resetea el badge.

## Agregar producto

`GET /vendors/:id/products`: cada UOM trae `currency`.

- Con costo: prefill y moneda solo lectura.
- Sin costo (`null`): el usuario captura costo/IVA/IEPS/moneda y **sí se puede agregar**.
- Si `uom.currency` ≠ moneda de la OC: deshabilitar **Agregar**. Texto: `Esta orden está en MXN. No puedes agregar un producto en USD.`

## POST / PUT

Mandar `payment_currency` y `line_items[].currency` (iguales). Si el producto no tenía costo de ese proveedor, el backend lo crea al guardar la OC. No hay POST extra a vendor-costs. No convertir MXN ↔ USD.

Ver también: `src/app/features/settings/docs/UI_PRODUCT_VENDOR_COST_CURRENCY.md`.
