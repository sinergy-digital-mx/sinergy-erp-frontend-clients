# Estatus y filtros de usuarios

Ubicación: `src/app/features/rbac-tenant-ui/` (detalle, modal Editar, listado y `UserService`).

## Catálogo

Al abrir Gestión de Usuarios se carga `GET /tenant/users/statuses` una vez.

| code | Badge | Select en modal Editar |
|------|-------|------------------------|
| `active` | Verde | Sí |
| `inactive` | Gris | Sí |
| `deleted` | Rojo | No (solo botón Eliminar) |

## Detalle

- Badge de estatus (solo lectura) junto al nombre.
- Botones **Editar** y **Eliminar** del mismo tamaño.
- **Eliminar** confirma y llama `DELETE /tenant/users/:userId` (soft delete → `deleted`).
- No se puede eliminar la cuenta de la sesión. El botón se oculta sin `User:Delete` o si ya está eliminado.

## Modal Editar

- Campo **Estatus** (Activo / Inactivo) en Información general.
- Al guardar, si cambió el estatus: `PUT /tenant/users/:userId/status` `{ "status_id" }`.
- No se puede cambiar el estatus de la cuenta de la sesión.

## Listado

A la derecha de **Filtrar por estado**: **Filtrar por rol**.

`GET /tenant/users?search=&status_id=&role_id=`

- Sin `status_id`: activos e inactivos (no eliminados).
- `Todos` omite el query param. No se envía `role_id` vacío.
