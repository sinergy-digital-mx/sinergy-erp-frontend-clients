# POS (Punto de Venta) Module

Este módulo proporciona una interfaz de punto de venta optimizada para crear y cobrar órdenes de venta de forma rápida y eficiente.

## Estructura

```
pos/
├── models/
│   └── pos.model.ts          # Modelos de carrito y pagos
├── pages/
│   ├── pos-home/             # Página principal con opciones
│   ├── take-order/           # Tomar orden (crear venta)
│   └── payment/              # Cobrar orden (procesar pago)
├── services/
│   └── pos.service.ts        # Servicio de carrito
└── pos.routes.ts             # Rutas del módulo
```

## Características

### Página Principal (POS Home)
- Dos opciones principales:
  - **Tomar Orden**: Crear nueva orden de venta
  - **Cobrar Orden**: Procesar pago de orden existente
- Diseño en pantalla completa con gradientes modernos
- Navegación intuitiva con iconos grandes

### Tomar Orden (Take Order)
- **Vista de pantalla completa** dividida en dos paneles:
  - Panel izquierdo: Grid de productos con búsqueda
  - Panel derecho: Carrito de compra
- Búsqueda rápida de productos por nombre o SKU
- Agregar productos al carrito con un click
- Gestión de cantidades con controles +/-
- Cálculo automático de totales (subtotal, IVA, IEPS)
- Selección de almacén
- Guardar orden como draft en Sales Orders

### Cobrar Orden (Payment)
- **Vista de pantalla completa** dividida en dos paneles:
  - Panel izquierdo: Lista de órdenes pendientes (draft)
  - Panel derecho: Procesamiento de pago
- Búsqueda de órdenes por ID o cliente
- Resumen completo de la orden seleccionada
- Métodos de pago:
  - 💵 Efectivo (con cálculo de cambio)
  - 💳 Tarjeta
  - 🏦 Transferencia
- Campo de referencia/autorización para pagos electrónicos
- Confirmación automática de orden (crea reservas de stock)

## Flujo de Trabajo

### Flujo 1: Tomar Orden
1. Usuario navega a `/pos`
2. Selecciona "Tomar Orden"
3. Busca y agrega productos al carrito
4. Ajusta cantidades si es necesario
5. Selecciona almacén
6. Guarda la orden (estado: draft)
7. Orden queda pendiente para cobro

### Flujo 2: Cobrar Orden
1. Usuario navega a `/pos`
2. Selecciona "Cobrar Orden"
3. Busca y selecciona orden pendiente
4. Revisa resumen de la orden
5. Selecciona método de pago
6. Ingresa monto recibido
7. Procesa pago
8. Orden cambia a estado "confirmed" (crea reservas automáticamente)

## Integración con Backend

### Sales Orders API
- **POST /tenant/sales-orders**: Crear orden desde carrito
- **GET /tenant/sales-orders**: Listar órdenes pendientes (draft)
- **PUT /tenant/sales-orders/:id**: Confirmar orden (procesar pago)

### Integración Automática con Inventory
Cuando una orden se confirma (pago procesado):
- ✅ Crea reservas de stock automáticamente
- ✅ Reduce `quantity_available`
- ✅ Incrementa `quantity_reserved`

## Modelos de Datos

### POSCartItem
```typescript
{
  product_id: string;
  product_name: string;
  product_sku: string;
  uom_id: string;
  uom_name: string;
  quantity: number;
  unit_price: number;
  iva_percentage: number;
  ieps_percentage: number;
  subtotal: number;
  iva_amount: number;
  ieps_amount: number;
  line_total: number;
}
```

### POSCart
```typescript
{
  items: POSCartItem[];
  total_subtotal: number;
  total_iva: number;
  total_ieps: number;
  grand_total: number;
}
```

### PaymentMethod
```typescript
type PaymentMethod = 'cash' | 'card' | 'transfer';
```

## Servicios

### POSService
Gestiona el estado del carrito de compra:
- `addItem(item)`: Agregar producto al carrito
- `updateItemQuantity(index, quantity)`: Actualizar cantidad
- `removeItem(index)`: Eliminar producto
- `clearCart()`: Limpiar carrito
- `getCartForOrder(warehouse_id)`: Obtener datos para crear orden

## Rutas

- `/pos` - Página principal con opciones
- `/pos/take-order` - Tomar orden (pantalla completa)
- `/pos/payment` - Cobrar orden (pantalla completa)

## Permisos RBAC

- `pos:Read` - Ver módulo POS
- `pos:Create` - Tomar órdenes
- `pos:Update` - Cobrar órdenes

## Diseño de Pantalla Completa

Ambas vistas (Tomar Orden y Cobrar Orden) utilizan:
- `height: 100vh` - Altura completa de la ventana
- `overflow: hidden` - Sin scroll en el contenedor principal
- Grid layout para dividir la pantalla
- Paneles con scroll independiente
- Sin header ni sidebar visible (layout limpio)

## Estilos

- Gradientes modernos (purple/blue)
- Diseño limpio y espacioso
- Iconos grandes y claros
- Controles táctiles amigables
- Feedback visual inmediato
- Animaciones suaves

## Ejemplo de Uso

```typescript
// Agregar producto al carrito
const cartItem: POSCartItem = {
  product_id: 'uuid',
  product_name: 'Producto A',
  product_sku: 'SKU001',
  uom_id: 'uom-uuid',
  uom_name: 'Pieza',
  quantity: 1,
  unit_price: 100,
  iva_percentage: 16,
  ieps_percentage: 0,
  subtotal: 100,
  iva_amount: 16,
  ieps_amount: 0,
  line_total: 116
};

posService.addItem(cartItem);

// Crear orden desde carrito
const orderData = posService.getCartForOrder('warehouse-uuid');
salesOrderService.createOrder(orderData).subscribe(order => {
  console.log('Orden creada:', order.id);
  posService.clearCart();
});

// Procesar pago
salesOrderService.updateOrder(orderId, { 
  status: 'confirmed',
  metadata: {
    payment: {
      method: 'cash',
      amount: 1000,
      paid_at: new Date().toISOString()
    }
  }
}).subscribe(() => {
  console.log('Pago procesado');
});
```

## Mejores Prácticas

1. **Limpiar carrito después de guardar orden**
   ```typescript
   this.posService.clearCart();
   ```

2. **Validar stock antes de confirmar**
   - El backend valida automáticamente al confirmar
   - Mostrar mensaje claro si hay error de stock

3. **Calcular cambio para efectivo**
   ```typescript
   const change = paymentAmount - order.grand_total;
   ```

4. **Guardar información de pago en metadata**
   ```typescript
   metadata: {
     payment: {
       method: 'card',
       amount: 1000,
       reference: 'AUTH123',
       paid_at: new Date().toISOString()
     }
   }
   ```

## Notas Importantes

- Las órdenes se crean en estado `draft` desde "Tomar Orden"
- Las órdenes se confirman (estado `confirmed`) desde "Cobrar Orden"
- La confirmación crea reservas de stock automáticamente
- El carrito se mantiene en memoria (se pierde al recargar)
- Los precios se toman del campo `cost` del producto
- IVA por defecto: 16%, IEPS por defecto: 0%

## Troubleshooting

### Problema: Productos no aparecen
**Solución**: Verificar que los productos tengan UoMs configuradas

### Problema: Error al guardar orden
**Solución**: Verificar que el almacén esté seleccionado y haya productos en el carrito

### Problema: Error al confirmar orden (pago)
**Solución**: Verificar que haya stock disponible en el almacén seleccionado

### Problema: Cambio negativo
**Solución**: El monto recibido debe ser mayor o igual al total de la orden
