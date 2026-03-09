# Inventario Module

Este módulo gestiona el inventario de productos en los almacenes del sistema.

## Estructura

```
inventory/
├── components/
│   ├── inventory-filter-bar/    # Barra de filtros para inventario
│   ├── inventory-table/          # Tabla de artículos de inventario
│   └── adjustment-dialog/        # Diálogo para ajustes de inventario
├── models/
│   ├── inventory-item.model.ts  # Modelo de artículo de inventario
│   ├── inventory-movement.model.ts  # Modelo de movimiento de inventario
│   └── stock-reservation.model.ts   # Modelo de reserva de stock
├── pages/
│   └── inventory-list/          # Página principal de lista de inventario
├── services/
│   └── inventory.service.ts     # Servicio HTTP para inventario
└── inventory.routes.ts          # Rutas del módulo
```

## Características

### Lista de Artículos de Inventario
- Visualización de todos los artículos en inventario
- Filtros por almacén, búsqueda y stock bajo
- Tarjetas de resumen con estadísticas clave
- Tabla con columnas: Producto, SKU, Almacén, En Mano, Reservado, Disponible, Ubicación, Costo Unitario, Valor Total
- Botón para crear ajustes de inventario

### Ajuste de Inventario
- Diálogo modal para crear ajustes manuales
- Búsqueda de productos con autocomplete
- Selector de almacén
- Campo de cantidad (positivo para agregar, negativo para reducir)
- Campo de notas para documentar la razón del ajuste
- Validación de formulario
- Notificaciones de éxito/error
- Recarga automática de la lista después del ajuste

### Modelos de Datos

#### InventoryItem
- `id`: ID único del artículo
- `product_id`: ID del producto
- `warehouse_id`: ID del almacén
- `quantity_on_hand`: Cantidad física en mano
- `quantity_reserved`: Cantidad reservada
- `quantity_available`: Cantidad disponible (on_hand - reserved)
- `location`: Ubicación en el almacén
- `unit_cost`: Costo unitario
- `total_value`: Valor total del inventario

#### InventoryMovement
- Tipos: Entrada, Salida, Ajuste, Transferencia, Reserva, Liberación
- Registra todos los movimientos de inventario

#### StockReservation
- Estados: Activa, Liberada, Expirada
- Gestiona reservas de stock para órdenes

## API Endpoints

Base URL: `/tenant/inventory`

### Artículos
- `GET /items` - Lista de artículos con filtros
- `GET /items/:id` - Detalle de artículo

### Movimientos
- `GET /movements` - Lista de movimientos
- `POST /adjustments` - Crear ajuste de inventario

### Reservas
- `GET /reservations` - Lista de reservas

### Reportes
- `GET /reports/stock` - Reporte de stock

## Permisos RBAC

- `inventory:Create` - Crear ajustes y movimientos
- `inventory:Read` - Ver inventario
- `inventory:Update` - Actualizar inventario
- `inventory:Delete` - Eliminar registros

## Integración

El módulo se integra con:
- **Products**: Para información de productos
- **Warehouses**: Para información de almacenes
- **Purchase Orders**: Actualización automática al recibir órdenes
- **Sales Orders**: Reservas automáticas al crear ventas

## Estilos

El módulo sigue el mismo patrón de diseño que el módulo de Purchase Orders:
- Gradientes modernos (purple/blue)
- Efectos glassmorphism
- Animaciones hover con elevación
- Bordes redondeados y sombras suaves
- Badges de estado con colores consistentes
