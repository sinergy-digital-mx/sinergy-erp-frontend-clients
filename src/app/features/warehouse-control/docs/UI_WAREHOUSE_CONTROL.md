# UI — Mesa de Control

Picking por almacén, posiciones de piso y armado. Solo OV MANUAL con checkbox **Necesita proceso de selección y armado**.

Ruta API: `/api/tenant/warehouse-control`  
Código módulo RBAC: `warehouse_control`  
Menú: **Mesa de Control** (`WarehouseControl` + `ViewMenu`).

POS no entra. OV sin checkbox siguen `Creada` → fulfill.

## Flujo

```
Crear OV + checkbox ON
        ↓
Job + 1 tarea por almacén
        ↓
Cada almacén surte (start → complete)
        ↓
Posición de piso
        ↓
Marcar armando → Corroborar
        ↓
Lista para entrega
```

Mientras el job está vivo la OV queda `En Selección`. Al corroborar: `Lista para entrega`. Los status de abajo son solo de Mesa de Control.

| Status job | UI | Tooltip |
|------------|----|---------|
| `released` | Por surtir | Liberada a los almacenes. Todavía nadie empezó a surtir. |
| `picking` | Picking | Al menos un almacén ya está surtiendo esta orden. |
| `waiting_assembly` | Esperando armado | Todos los almacenes cerraron. Lista para juntar en la posición. |
| `assembling` | Armando | Se está armando el pedido en el piso. |
| `assembled` | Armada | Armada. Falta corroborar para pasar a entrega. |

Vista default: `assigned_warehouses` vacío o Admin → tablero admin. Uno o más almacenes sin Admin → jefe (`view=warehouse`).

## Pantallas

- Tablero admin: cards `stats` (no sumar `jobs[]`), mapa `positions[]`, cola `queue[]`.
- Panel OV: `GET /:jobId`, agrupar `tasks[]`, `missing[]`, assign / assemble / corroborate.
- Vista jefe: `pick_tasks[]`, start / complete. Mapa solo lectura.
- Jefe: `scope_label` (chip Almacén Frío / Bodega Seca), combo con `billing_branches[]` (no el catálogo admin). Si hay una sucursal, el board manda `billing_branch_id` y pinta el mapa. `assigned_warehouses` también viene del login.
- Cliente: pintar `customer.name` / `customer_name` / `customer_display_name` (no solo `display_name`).
- Configurar: `WarehouseControl:Create` → `/warehouse-control/positions`.

Hay que correr la migración nueva en API antes de usar el módulo.
