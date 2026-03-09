# Purchase Orders Module

Módulo completo de gestión de Órdenes de Compra para el sistema ERP Sinergy.

## 📋 Descripción

El módulo de Purchase Orders permite gestionar el ciclo completo de órdenes de compra, desde su creación hasta su recepción y pago, incluyendo:

- Creación y edición de órdenes de compra
- Gestión de líneas de productos con cálculos automáticos de impuestos
- Control de estados (En Proceso, Recibida, Cancelada)
- Registro de pagos parciales y totales
- Integración automática con inventario al recibir órdenes
- Filtrado y búsqueda avanzada
- Validaciones robustas y manejo de errores

## 🚀 Características Principales

### 1. CRUD Completo
- ✅ Crear nuevas órdenes de compra
- ✅ Ver lista paginada con filtros
- ✅ Ver detalle completo de orden
- ✅ Editar órdenes en estado "En Proceso"
- ✅ Eliminar órdenes canceladas sin pagos

### 2. Gestión de Líneas de Productos
- ✅ Agregar/eliminar productos dinámicamente
- ✅ Selección de producto con autocarga de precio y UOM
- ✅ Cálculo automático de impuestos (IVA, IEPS)
- ✅ Cálculo automático de totales por línea
- ✅ Validación de cantidades y precios

### 3. Cálculos Financieros Automáticos
```typescript
// Fórmulas implementadas:
subtotal = cantidad × precio_unitario
iva_amount = subtotal × (iva_percentage / 100)
ieps_amount = subtotal × (ieps_percentage / 100)
line_total = subtotal + iva_amount + ieps_amount

// Totales de orden:
total_subtotal = Σ(line_items.subtotal)
total_iva = Σ(line_items.iva_amount)
total_ieps = Σ(line_items.ieps_amount)
grand_total = Σ(line_items.line_total)
```

### 4. Gestión de Estados
- **En Proceso**: Orden creada, editable
- **Recibida**: Mercancía recibida, inventario actualizado automáticamente
- **Cancelada**: Orden cancelada con razón registrada

### 5. Registro de Pagos
- ✅ Pagos parciales y totales
- ✅ Cálculo automático de saldo pendiente
- ✅ Estados de pago: Pagada, Parcial, No pagado
- ✅ Historial completo de pagos

### 6. Integraciones
- **Vendors**: Selección de proveedores activos
- **Products**: Búsqueda y selección de productos
- **Warehouses**: Selección de almacén de destino
- **Inventory**: Actualización automática al recibir orden

## 📁 Estructura del Módulo

```
src/app/features/purchase-orders/
├── models/                          # Modelos de datos TypeScript
│   ├── purchase-order.model.ts     # Orden principal
│   ├── line-item.model.ts          # Líneas de productos
│   ├── payment.model.ts            # Pagos
│   ├── vendor.model.ts             # Proveedores
│   ├── product.model.ts            # Productos
│   ├── warehouse.model.ts          # Almacenes
│   └── filters.model.ts            # Filtros y utilidades
├── services/                        # Servicios
│   ├── purchase-order.service.ts   # CRUD de órdenes
│   ├── tax-calculator.service.ts   # Cálculos de impuestos
│   ├── vendor.service.ts           # Integración vendors
│   ├── product.service.ts          # Integración products
│   └── warehouse.service.ts        # Integración warehouses
├── pages/                           # Componentes de página
│   ├── purchase-order-list/        # Lista de órdenes
│   ├── purchase-order-detail/      # Detalle de orden
│   └── purchase-order-form/        # Formulario crear/editar
├── utils/                           # Utilidades
│   └── order-validators.ts         # Validadores personalizados
├── purchase-orders.routes.ts       # Configuración de rutas
└── README.md                        # Esta documentación
```

## 🔌 API Endpoints

### Base URL
```
/tenant/purchase-orders
```

### Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/tenant/purchase-orders` | Listar órdenes (con filtros y paginación) |
| GET | `/tenant/purchase-orders/:id` | Obtener detalle de orden |
| POST | `/tenant/purchase-orders` | Crear nueva orden |
| PUT | `/tenant/purchase-orders/:id` | Actualizar orden |
| PUT | `/tenant/purchase-orders/:id/status` | Cambiar estado |
| POST | `/tenant/purchase-orders/:id/cancel` | Cancelar orden |
| DELETE | `/tenant/purchase-orders/:id` | Eliminar orden |
| POST | `/tenant/purchase-orders/:id/payments` | Registrar pago |

### Parámetros de Filtrado

```typescript
// GET /tenant/purchase-orders
{
  page: number,           // Página actual (default: 1)
  limit: number,          // Items por página (default: 20, max: 100)
  search?: string,        // Búsqueda por texto
  vendor_id?: string,     // Filtrar por proveedor
  status?: OrderStatus,   // Filtrar por estado
  start_date?: string,    // Fecha inicio (YYYY-MM-DD)
  end_date?: string       // Fecha fin (YYYY-MM-DD)
}
```

## 🎨 Componentes

### 1. PurchaseOrderListComponent
**Ruta**: `/purchase-orders`

Lista paginada de órdenes con:
- Tabla responsive con columnas: FOLIO, PROVEEDOR, CEDIS, ESTADO, TOTAL, PAGO, FECHA
- Badges de estado con colores distintivos
- Filtros de búsqueda
- Botón "Crear" para nuevas órdenes
- Click en fila para ver detalle

### 2. PurchaseOrderDetailComponent
**Ruta**: `/purchase-orders/:id`

Vista detallada con:
- Información general (proveedor, almacén, fechas, propósito)
- Tabla de líneas de productos con cálculos
- Lista de pagos registrados
- Acciones disponibles según estado:
  - **En Proceso**: Editar, Marcar como Recibida, Cancelar
  - **Cancelada**: Eliminar (si no tiene pagos)
  - **Recibida**: Solo visualización

### 3. PurchaseOrderFormComponent
**Rutas**: 
- `/purchase-orders/create` (crear)
- `/purchase-orders/:id/edit` (editar)

Formulario con:
- **Sección 1**: Información general
  - Proveedor (dropdown)
  - Almacén (dropdown)
  - Propósito (textarea)
  - Fecha estimada de recepción (date picker)
  
- **Sección 2**: Líneas de productos
  - Agregar/eliminar productos dinámicamente
  - Campos por línea: Producto, UOM, Cantidad, Precio, IVA%, IEPS%
  - Cálculos automáticos en tiempo real
  
- **Sección 3**: Totales
  - Subtotal, Total IVA, Total IEPS, Gran Total
  - Actualización automática al modificar líneas

## 🔐 Permisos RBAC

El módulo requiere los siguientes permisos:

| Permiso | Descripción | Acciones |
|---------|-------------|----------|
| `purchase_orders:Read` | Ver órdenes | Listar, ver detalle |
| `purchase_orders:Create` | Crear órdenes | Botón crear, formulario nuevo |
| `purchase_orders:Update` | Actualizar órdenes | Editar, cambiar estado, cancelar |
| `purchase_orders:Delete` | Eliminar órdenes | Eliminar órdenes canceladas |

## ✅ Validaciones

### Formulario Principal
- ✅ Proveedor: Requerido
- ✅ Almacén: Requerido
- ✅ Propósito: Requerido
- ✅ Fecha estimada: Requerida
- ✅ Líneas de productos: Al menos 1 requerida

### Líneas de Productos
- ✅ Producto: Requerido
- ✅ UOM: Requerido
- ✅ Cantidad: Requerida, > 0
- ✅ Precio unitario: Requerido, >= 0
- ✅ IVA %: Requerido, 0-100
- ✅ IEPS %: Requerido, 0-100

### Pagos
- ✅ Monto: Requerido, > 0, <= saldo pendiente
- ✅ Fecha: Requerida
- ✅ Método de pago: Requerido

## 🎯 Flujos de Trabajo

### Crear Orden de Compra
1. Click en "Crear" desde la lista
2. Llenar información general
3. Agregar líneas de productos
4. Verificar totales calculados
5. Click en "Crear Orden"
6. Redirección a detalle de orden creada

### Recibir Mercancía
1. Abrir detalle de orden en estado "En Proceso"
2. Click en "Marcar como Recibida"
3. Confirmar acción
4. Backend actualiza inventario automáticamente
5. Estado cambia a "Recibida"

### Registrar Pago
1. Abrir detalle de orden
2. Click en "Registrar Pago"
3. Ingresar monto (validado contra saldo pendiente)
4. Confirmar
5. Payment_status se actualiza automáticamente

### Cancelar Orden
1. Abrir detalle de orden en estado "En Proceso"
2. Click en "Cancelar Orden"
3. Ingresar razón de cancelación
4. Confirmar
5. Estado cambia a "Cancelada"

## 🎨 Estilos y Colores

### Badges de Estado
```scss
En Proceso:  #fef3c7 (fondo) / #92400e (texto)  // Amarillo
Recibida:    #d1fae5 (fondo) / #065f46 (texto)  // Verde
Cancelada:   #fee2e2 (fondo) / #991b1b (texto)  // Rojo
```

### Badges de Estado de Pago
```scss
Pagada:      #d1fae5 (fondo) / #065f46 (texto)  // Verde
Parcial:     #fed7aa (fondo) / #92400e (texto)  // Naranja
No pagado:   #e5e7eb (fondo) / #374151 (texto)  // Gris
```

## 🔧 Servicios

### TaxCalculatorService
Servicio para cálculos de impuestos y totales.

```typescript
// Calcular línea de producto
calculateLineItem(
  quantity: number,
  unitPrice: number,
  ivaPercentage: number,
  iepsPercentage: number
): LineItemCalculations

// Calcular totales de orden
calculateOrderTotals(lineItems: LineItem[]): TotalCalculations

// Calcular saldo pendiente
calculateRemainingAmount(grandTotal: number, payments: Payment[]): number

// Determinar estado de pago
determinePaymentStatus(grandTotal: number, paidAmount: number): PaymentStatus

// Formatear moneda
formatCurrency(amount: number): string
```

### PurchaseOrderService
Servicio principal para CRUD de órdenes.

```typescript
// Listar órdenes con filtros
getOrders(filters: OrderFilters, pagination: PaginationParams): Observable<PaginatedResponse<PurchaseOrder>>

// Obtener orden por ID
getOrderById(id: string): Observable<PurchaseOrder>

// Crear orden
createOrder(data: PurchaseOrderFormData): Observable<PurchaseOrder>

// Actualizar orden
updateOrder(id: string, data: Partial<PurchaseOrderFormData>): Observable<PurchaseOrder>

// Cambiar estado
changeStatus(id: string, status: string): Observable<PurchaseOrder>

// Cancelar orden
cancelOrder(id: string, data: CancelOrderData): Observable<PurchaseOrder>

// Eliminar orden
deleteOrder(id: string): Observable<void>

// Registrar pago
registerPayment(orderId: string, payment: PaymentFormData): Observable<Payment>
```

## 🐛 Manejo de Errores

El módulo maneja los siguientes errores HTTP:

| Código | Descripción | Acción |
|--------|-------------|--------|
| 401 | No autorizado | Redirección a login |
| 403 | Sin permisos | Mensaje "No tienes permisos" |
| 404 | No encontrado | Mensaje "Orden no encontrada" |
| 422 | Validación | Mostrar errores específicos |
| 500 | Error servidor | Mensaje genérico |
| 0 | Red | Mensaje "Error de conexión" |

## 📱 Responsive Design

El módulo es completamente responsive:

- **Desktop (>1024px)**: Tabla completa con todas las columnas
- **Tablet (768-1024px)**: Tabla con scroll horizontal
- **Mobile (<768px)**: Cards en lugar de tabla

## 🔄 Integración con Inventario

Cuando una orden cambia a estado "Recibida", el backend automáticamente:

1. Crea movimientos de inventario tipo `purchase_receipt`
2. Actualiza el stock en el almacén especificado
3. Registra el costo unitario de cada producto
4. Actualiza la valorización del inventario

**No se requiere ninguna acción adicional desde el frontend.**

## 📝 Ejemplo de Uso

```typescript
// En tu componente
import { PurchaseOrderService } from './services/purchase-order.service';

// Crear orden
const orderData = {
  vendor_id: 'vendor-uuid',
  warehouse_id: 'warehouse-uuid',
  purpose: 'Compra de materiales',
  tentative_receipt_date: '2026-03-15',
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

this.purchaseOrderService.createOrder(orderData).subscribe({
  next: (order) => console.log('Orden creada:', order),
  error: (error) => console.error('Error:', error)
});
```

## 🚀 Próximas Mejoras

Funcionalidades pendientes para futuras versiones:

- [ ] Dashboard con gráficos (PrimeNG Charts)
- [ ] Filtros avanzados con date range picker
- [ ] Diálogos modales para pagos y cancelación
- [ ] Exportación a PDF y Excel
- [ ] Tests unitarios y property-based tests
- [ ] Mejoras de accesibilidad (ARIA completo)
- [ ] Virtual scrolling para listas grandes
- [ ] Modo offline con sincronización

## 📞 Soporte

Para reportar bugs o solicitar nuevas funcionalidades, contacta al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Última actualización**: Marzo 2026  
**Autor**: Equipo de Desarrollo Sinergy ERP
