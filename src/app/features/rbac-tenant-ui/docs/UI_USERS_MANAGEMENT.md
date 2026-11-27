# UI — Gestión de usuarios

Lista a la izquierda y detalle a la derecha en escritorio. En celular no se parten en dos columnas.

## Dónde

`users-management` + `user-details`. Ruta `/settings/users`.

## Escritorio

Sin cambio: dos columnas, lista 1/3 y detalle el resto.

## Celular

Lista a pantalla completa. Al tocar un usuario se abre el detalle a pantalla completa, con **Usuarios** para volver.

El modal crear/editar respeta el ancho de la pantalla (`max-width: calc(100vw - 1rem)`).

## Cambios

### 2026-11-27

En el detalle, cada rol muestra cuántos módulos cubre y la lista de esos módulos (se puede ocultar). Salen de `modules` en `GET /tenant/users/:id/roles`. Si esa respuesta aún no trae `modules`, se arman con `GET /tenant/roles/:roleId/permissions/available` (solo módulos con algún permiso asignado). Si la sesión puede editar roles (`role:Update` o `role:ViewMenu`), **Editar rol** abre `/settings/roles?role=<id>` con ese rol seleccionado.

La búsqueda de usuarios queda en `?search=`. Al refrescar, el texto sigue en el campo y el listado vuelve a pedir ese filtro.

### 2026-10-24

Vista responsive en celular. Escritorio igual.
