# Estrategia de Unificación de Diseño de Tablas

## Problema Identificado
Las tablas de **Órdenes de Venta**, **Órdenes de Compra** e **Inventario** no coinciden con el patrón visual de otras tablas como **Leads**, **Clientes**, **Lotes** y **Contratos**.

### Diferencias Actuales:
- **Leads**: Usa `app-datatable-wrapper` (componente reutilizable)
  - Estructura consistente con stats, filtros, paginación
  - Responsive (desktop table + mobile cards)
  - Diseño moderno con badges y estados
  
- **Órdenes de Compra**: Tabla HTML básica
  - Estructura simple sin componente wrapper
  - Responsive pero con estilos propios
  - Falta de consistencia visual
  
- **Órdenes de Venta**: Tabla HTML básica
  - Estructura simple sin componente wrapper
  - Falta de stats dashboard
  - Diseño inconsistente
  
- **Inventario**: Tabla HTML básica
  - Estructura simple sin componente wrapper
  - Falta de stats dashboard
  - Diseño inconsistente

## Solución Propuesta

### Fase 1: Refactorización de Componentes de Tabla
Convertir las tres tablas para usar `app-datatable-wrapper`:

1. **Órdenes de Compra** (`orders-table.component`)
   - Migrar a `app-datatable-wrapper`
   - Mantener funcionalidad existente
   - Agregar stats dashboard similar a Leads

2. **Órdenes de Venta** (`sales-table.component`)
   - Migrar a `app-datatable-wrapper`
   - Mantener funcionalidad existente
   - Agregar stats dashboard

3. **Inventario** (`inventory-table.component`)
   - Migrar a `app-datatable-wrapper`
   - Mantener funcionalidad existente
   - Agregar stats dashboard

### Fase 2: Estandarización de Estructura
Todas las páginas de lista seguirán este patrón:

```
1. Header (Título + Botón Crear)
2. Stats Dashboard (Tarjetas de resumen)
3. Filter Bar (Filtros)
4. Datatable Wrapper (Tabla + Paginación)
```

### Fase 3: Consistencia Visual
- Usar los mismos estilos de badges y estados
- Responsive design consistente (desktop table + mobile cards)
- Iconografía uniforme
- Espaciado y tipografía consistente

## Beneficios
✅ Experiencia de usuario consistente
✅ Mantenimiento más fácil
✅ Código reutilizable
✅ Mejor responsive design
✅ Interfaz más profesional

## Implementación
Se refactorizarán los componentes de tabla manteniendo toda la funcionalidad existente.
