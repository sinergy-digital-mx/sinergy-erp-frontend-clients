# Bugfix Requirements Document

## Introduction

El módulo de inventario tiene una estructura de carpetas inconsistente con el patrón arquitectónico del resto de la aplicación. Actualmente mantiene una separación artificial entre `pages/` y `components/` que no refleja la realidad funcional: los componentes en `pages/` son componentes principales que deberían estar directamente en `components/`. Además, existe un componente no utilizado (`adjustment-dialog`) que debe eliminarse. Esta refactorización estructural corregirá la organización del módulo para alinearlo con los estándares del proyecto.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN se navega a la estructura del módulo de inventario THEN existe una carpeta `pages/` con `inventory-batch-list` e `inventory-list` separada de `components/`

1.2 WHEN se revisa la carpeta `components/` THEN contiene `adjustment-dialog` que no se usa en ninguna parte del código

1.3 WHEN se importan componentes en `inventory.routes.ts` THEN las rutas apuntan a `pages/inventory-batch-list/` en lugar de `components/`

1.4 WHEN se compara con otros módulos de la aplicación THEN la estructura de inventario es inconsistente con el patrón establecido

### Expected Behavior (Correct)

2.1 WHEN se navega a la estructura del módulo de inventario THEN todos los componentes principales (`inventory-batch-list`, `inventory-list`, `inventory-filter-bar`, `inventory-table`) SHALL estar ubicados directamente en la carpeta `components/`

2.2 WHEN se revisa la carpeta `components/` THEN NO SHALL existir el componente `adjustment-dialog`

2.3 WHEN se importan componentes en `inventory.routes.ts` THEN las rutas SHALL apuntar a `components/inventory-batch-list/` y `components/inventory-list/`

2.4 WHEN se compara con otros módulos de la aplicación THEN la estructura de inventario SHALL ser consistente con el patrón arquitectónico establecido

### Unchanged Behavior (Regression Prevention)

3.1 WHEN se accede a las rutas de inventario desde la aplicación THEN el sistema SHALL CONTINUE TO cargar correctamente los componentes `InventoryBatchListComponent` e `InventoryListComponent`

3.2 WHEN `inventory-batch-list` renderiza su interfaz THEN SHALL CONTINUE TO usar su filter bar integrado en el HTML (no el componente `inventory-filter-bar`)

3.3 WHEN `inventory-list` utiliza componentes auxiliares THEN SHALL CONTINUE TO importar y usar correctamente `InventoryFilterBarComponent` e `InventoryTableComponent`

3.4 WHEN los servicios de inventario son invocados THEN SHALL CONTINUE TO funcionar sin cambios en su lógica de negocio

3.5 WHEN se aplican permisos de acceso THEN SHALL CONTINUE TO validarse correctamente mediante `permissionGuard` y `INVENTORY_PERMISSIONS`

3.6 WHEN se cargan datos de almacenes (warehouses) THEN SHALL CONTINUE TO funcionar correctamente desde `WarehouseService`

3.7 WHEN se formatea información de lotes y cantidades THEN SHALL CONTINUE TO usar correctamente `RemoveTrailingZerosPipe` y otros pipes

3.8 WHEN se navega entre páginas del módulo THEN SHALL CONTINUE TO mantener el estado y funcionalidad de paginación, filtros y búsqueda
