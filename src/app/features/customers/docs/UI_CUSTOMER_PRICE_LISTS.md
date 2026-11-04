# UI — Listas de precio del cliente

## 2026-11-04

Detalle del cliente, tab **Listas de precio**, junto a Crédito e Información fiscal.

1. Se listan las listas activas del catálogo.
2. Se marcan una o varias para el cliente.
3. Una queda como **Predeterminada**.
4. Guardar llama `PUT /api/tenant/customers/:id/price-lists`.

En la alta de orden de venta y de cotización, al elegir el cliente se preselecciona esa lista si el producto la tiene. El selector solo muestra las listas habilitadas para ese cliente. Contrato: `src/api/customers/docs/UI_CUSTOMER_PRICE_LISTS.md` del backend.
