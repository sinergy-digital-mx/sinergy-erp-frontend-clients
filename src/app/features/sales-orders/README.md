# Sales Orders Module

Este módulo gestiona las órdenes de venta del sistema con soporte completo para line items, clientes, almacenes y cálculos automáticos de impuestos.

## Estructura

```
sales-orders/
├── components/
│   ├── sales-filter-bar/    # Barra de filtros
│   └── sales-table/          # Tabla de órdenes
├── models/
│   ├── sales-order.model.ts      # Modelo principal
│   └── sales-order-line.model.ts # Modelo de líneas
├── pages/
│   ├── sales-order-list/     # Página principal de lista
│   └── sales-order-form/     # Formulario crear/editar
├── services/
│   └── sales-order.service.ts # Servicio HTTP
└── sales-orders.routes.ts    # Rutas del módulo
```

## Características

### Lista de Órdenes de Venta
- Visualización de todas las órdenes
- Filtros por búsqueda, estado, cliente y almacén
- Tabla con columnas: ID, Cliente, Almacén, Estado, Fecha Entrega, Subtotal, IVA, IEPS, Total, Fecha Creación, Acciones
- Cambio rápido de estado desde la tabla
- Eliminación de órdenes
- Click en fila para ver detalle

### Formulario de Orden
- Selección de cliente (opcional)
- Selección de almacén (requerido)
- Fecha de entrega (opcional)
- Gestión de line items:
  - Agregar/eliminar productos
  - Selección de producto y UoM
  - Cantidad y precio unitario
  - Porcentajes de IVA e IEPS
  - Cálculos automáticos por línea
- Totales generales calculados automáticamente

### Estados de Orden

| Estado | Descripción | Color |
|--------|-------------|-------|
| `draft` | Borrador | Gris |
| `confirmed` | Confirmada (crea reservas de stock) | Azul |
| `processing` | En proceso | Naranja |
| `completed` | Completada (crea movimientos de salida) | Verde |
| `cancelled` | Cancelada (libera reservas) | Rojo |

### Integración con Inventory

El backend maneja automáticamente:
- **Confirmed**: Crea reservas de stock
- **Completed**: Crea movimientos de salida
- **Cancelled**: Libera reservas de stock

## API Endpoints

Base URL: `/tenant/sales-orders`

### Órdenes
- `GET /` - Lista de órdenes con filtros y paginación
  - Query params: `page`, `limit`, `search`, `status`, `customer_id`, `warehouse_id`
- `GET /:id` - Detalle de orden
- `POST /` - Crear orden
  ```json
  {
    "customer_id": 123,
    "warehouse_id": "uuid",
    "delivery_date": "2024-12-31",
    "line_items": [
      {
        "product_id": "uuid",
        "uom_id": "uuid",
        "quantity": 10,
        "unit_price": 100,
        "iva_percentage": 16,
        "ieps_percentage": 0
      }
    ]
  }
  ```
- `PUT /:id` - Actualizar orden
- `DELETE /:id` - Eliminar orden

## Permisos RBAC

- `sales_orders:Create` - Crear órdenes
- `sales_orders:Read` - Ver órdenes
- `sales_orders:Update` - Actualizar órdenes
- `sales_orders:Delete` - Eliminar órdenes

## Modelos de Datos

### SalesOrder
- `id`: ID único
- `tenant_id`: ID del tenant
- `customer_id`: ID del cliente (opcional)
- `warehouse_id`: ID del almacén (requerido)
- `delivery_date`: Fecha de entrega (opcional)
- `status`: Estado de la orden
- `total_subtotal`: Suma de subtotales
- `total_iva`: Suma de IVA
- `total_ieps`: Suma de IEPS
- `grand_total`: Total general
- `lines`: Array de SalesOrderLine
- `customer`: Objeto Customer (expandido)
- `warehouse`: Objeto Warehouse (expandido)
- `metadata`: Datos adicionales en JSON
- `created_at`: Fecha de creación
- `updated_at`: Fecha de actualización

### SalesOrderLine
- `id`: ID único
- `sales_order_id`: ID de la orden
- `product_id`: ID del producto
- `uom_id`: ID de la unidad de medida
- `quantity`: Cantidad
- `unit_price`: Precio unitario
- `subtotal`: Cantidad × Precio unitario
- `iva_percentage`: Porcentaje de IVA
- `iva_amount`: Monto de IVA
- `ieps_percentage`: Porcentaje de IEPS
- `ieps_amount`: Monto de IEPS
- `line_total`: Total de la línea
- `product`: Objeto Product (expandido)
- `uom`: Objeto UnitOfMeasure (expandido)

## Cálculos Automáticos

### Por Línea
```
subtotal = quantity × unit_price
iva_amount = subtotal × (iva_percentage / 100)
ieps_amount = subtotal × (ieps_percentage / 100)
line_total = subtotal + iva_amount + ieps_amount
```

### Totales
```
total_subtotal = Σ(subtotal de cada línea)
total_iva = Σ(iva_amount de cada línea)
total_ieps = Σ(ieps_amount de cada línea)
grand_total = total_subtotal + total_iva + total_ieps
```

## Rutas

- `/sales-orders` - Lista de órdenes
- `/sales-orders/create` - Crear nueva orden
- `/sales-orders/:id/edit` - Editar orden existente

## Estilos

El módulo sigue el mismo patrón de diseño que Purchase Orders:
- Gradientes modernos (purple/blue)
- Efectos glassmorphism
- Animaciones hover con elevación
- Bordes redondeados y sombras suaves
- Badges de estado con colores consistentes

## Flujo de Trabajo

1. **Crear orden en draft** con line items
2. **Confirmar orden** (crea reservas automáticamente)
3. **Procesar orden**
4. **Completar orden** (crea movimientos de salida)

O cancelar en cualquier momento (libera reservas si estaba confirmada).

## Ejemplo de Uso

```typescript
// Crear una orden de venta
const orderData: SalesOrderFormData = {
  customer_id: 123,
  warehouse_id: 'warehouse-uuid',
  delivery_date: '2024-12-31',
  line_items: [
    {
      product_id: 'product-uuid',
      uom_id: 'uom-uuid',
      quantity: 10,
      unit_price: 100,
      iva_percentage: 16,
      ieps_percentage: 0
    }
  ]
};

salesOrderService.createOrder(orderData).subscribe(order => {
  console.log('Orden creada:', order.id);
  console.log('Total:', order.grand_total);
});
```
