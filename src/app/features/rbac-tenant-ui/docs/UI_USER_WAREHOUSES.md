# UI — Almacenes Mesa de Control (usuario)

Bloque **Almacén(es) Mesa de Control** en el modal de usuario, en la pestaña **Sucursales asignadas**.

Sirve para el rol **Jefe de almacén** (`WarehouseControl` en RBAC). La asignación recorta el tablero a esos almacenes.

Si el usuario tiene sucursal (`billing_branch_id`), el combo solo lista almacenes de esa sucursal.

## Cargar

`GET /tenant/users/:userId` (y login / refresh) incluye `assigned_warehouses[]`.

## Guardar

En crear / editar se manda `{ "warehouse_ids": ["uuid"] }`. `[]` quita todos.

El almacén debe ser de la sucursal del usuario si tiene sucursal. Al cambiar de sucursal se sueltan los que ya no pertenecen.

Mesa de Control usa `user.assigned_warehouses` del login para elegir vista admin vs jefe.
