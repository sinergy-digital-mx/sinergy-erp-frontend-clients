# Customers Module

Gestión de clientes, detalle, documentos, direcciones y órdenes de venta asociadas.

## Detalle del cliente (`/customers/:id`)

Secciones visibles según permisos RBAC:

| Sección | Permiso | Fuente de datos |
|---------|---------|-----------------|
| Información / Crédito / Fiscal | `customers:read` | `GET /tenant/customers/:id` |
| Propiedades y contratos | `contracts:read` | `customer.contracts` en el detalle |
| Órdenes de venta | `customers:read` (mismo que documentos) | `GET /tenant/sales-orders?customer_id=:id` |
| Documentos | `customers:read` | API de documentos del cliente |
| Direcciones / Actividades | `customers:read` | `customer.addresses` / `customer.activities` |

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
│   ├── customer-documents/       # Documentos del cliente
│   └── customer-sales-orders/    # OV filtradas por customer_id
└── pages/
    └── customer-detail/          # Vista principal de detalle
```
