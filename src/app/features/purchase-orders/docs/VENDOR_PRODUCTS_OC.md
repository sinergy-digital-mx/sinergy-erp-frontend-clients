# Catálogo de productos al crear / editar OC

`GET /vendors/:vendorId/products` trae **todos los productos activos**, no solo los que ya tienen costo de ese proveedor.

## Query

| Param | Default | Efecto |
|---|---|---|
| `search` | — | Nombre / SKU / SKU externo |
| `include_without_cost` | `true` | Incluye productos sin costo |
| `only_with_cost` | — | `true` = solo con costo (comportamiento viejo) |

El front no manda `include_without_cost` (usa el default). Solo manda `only_with_cost` o `include_without_cost=false` si hace falta el listado viejo.

## Respuesta

Con costo: `has_vendor_cost: true` + UOMs con `cost`, IVA, IEPS y `currency` (`MXN` | `USD`).

Sin costo: `has_vendor_cost: false`. Cada UOM trae `currency: null` y costo 0.

`sku` y `product_sku` van los dos.

Tras `POST /products/:id/vendor-costs`, el siguiente GET ya lo marca con costo.

## Front

1. Al elegir proveedor: `GET /vendors/:id/products`.
2. El buscador de **Agregar producto** filtra esa lista (nombre / SKU).
3. Sin costo: sale en el autocomplete con “Sin costo de proveedor”. **Sí se puede agregar** capturando costo, impuestos y moneda.
4. **Configurar costo** abre el detalle en pestaña Costos. Al cerrar, refresca el GET.
5. Al crear la OC se manda `payment_currency` y `line_items[].currency`. Si no había costo, el backend lo crea.
