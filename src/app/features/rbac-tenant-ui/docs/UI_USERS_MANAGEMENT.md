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

### 2026-10-24

Vista responsive en celular. Escritorio igual.
