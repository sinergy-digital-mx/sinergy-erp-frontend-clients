# UI — Productos en detalle de cliente

Secciones **Productos más comprados** y **Productos que le pueden interesar** en el detalle (`/customers/detail/:id`).

Implementado en `customer-product-insights` + `customer-detail`.

## Dónde

Entre la card de información (tabs) y Órdenes de venta. Desktop: dos columnas. Mobile: apiladas (más comprados arriba). No van como tabs del header.

## Endpoint

`GET /tenant/customers/:id/product-insights` — permiso `customers:Read`.

Query: `most_purchased_limit` y `recommended_limit` (default 8, máx. 20).

Carga al montar la sección, no embebida en `GET /customers/:id`.

## Cards

Foto (`photo` o placeholder) + nombre (2 líneas) + SKU.

- Más comprados: `times_ordered` (“X veces”) y `total_quantity`.
- Sugeridos: chip `reason_label` (Misma subcategoría / Misma categoría).

Click abre el modal de producto (`ProductDetailModalComponent`).

Fila con **carrusel**: flechas laterales si hay overflow. Sin scrollbar. En móvil también se puede deslizar.

## Vacío

| Caso | Texto |
|------|--------|
| Sin más comprados | Aún no hay compras registradas |
| Con compras y sin sugerencias | No hay sugerencias por categoría por ahora |
| Ambos vacíos | Las dos secciones se muestran con empty corto |
