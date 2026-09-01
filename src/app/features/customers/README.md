# Customers Module

Gestión de clientes, detalle, documentos, direcciones y órdenes de venta asociadas.

## Detalle del cliente (`/customers/:id`)

Secciones visibles según permisos RBAC:

| Sección | Permiso | Fuente de datos |
|---------|---------|-----------------|
| Información / Crédito / Fiscal | `customers:read` | `GET /tenant/customers/:id` |
| Productos más comprados / sugeridos | `customers:read` | `GET /tenant/customers/:id/product-insights` |
| Propiedades y contratos | `contracts:read` | `customer.contracts` en el detalle |
| Órdenes de venta | `customers:read` (mismo que documentos) | `GET /tenant/sales-orders?customer_id=:id` |
| Documentos | `customers:read` | API de documentos del cliente |
| Direcciones / Actividades | `customers:read` | `customer.addresses` / `customer.activities` |

### Productos más comprados / sugeridos

El componente `CustomerProductInsightsComponent` (`components/customer-product-insights/`) llama:

```
GET /tenant/customers/:id/product-insights?most_purchased_limit=8&recommended_limit=8
```

- **Más comprados:** OV del cliente (`general_status != Cancelada`), agrupado por producto.
- **Sugeridos:** productos activos de la misma subcategoría (prioridad) o categoría, que el cliente no ha comprado.
- Click en card abre `ProductDetailModalComponent`.
- Sin historial de OV ambas listas salen vacías (secciones visibles con empty).

Ver `docs/UI_CUSTOMER_PRODUCT_INSIGHTS.md`.

### Órdenes de venta en detalle

El componente `CustomerSalesOrdersComponent` (`components/customer-sales-orders/`) lista las OV del cliente:

- Filtra con `SalesOrderService.getOrders({ customer_id }, { page, limit })`.
- Misma API que el listado global; no se usa un endpoint anidado `/customers/:id/orders`.
- Clic en fila o folio abre `SalesOrderDetailDialogComponent` (mismo modal que en `/sales-orders`).
- Botón **Nueva orden** (`sales_orders:Create`) abre el modal de creación con el cliente precargado (`data.customerId`).

Ejemplo de petición:

```
GET /tenant/sales-orders?customer_id=123&page=1&limit=15
```

## Componentes relacionados

```
customers/
├── components/
│   ├── customer-documents/          # Documentos del cliente
│   ├── customer-product-insights/   # Más comprados + sugeridos
│   └── customer-sales-orders/       # OV filtradas por customer_id
└── pages/
    └── customer-detail/             # Vista principal de detalle
```
