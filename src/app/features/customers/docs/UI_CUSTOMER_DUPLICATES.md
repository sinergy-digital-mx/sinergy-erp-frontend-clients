# UI — Cliente similar al crear

Modal de aviso cuando al **crear** un cliente el correo, teléfono, nombre+apellido o RFC ya existen.

**No bloquea la creación.** Solo en Crear Cliente, no en editar.

Implementado en `customer-edit-modal` + `customer-duplicate-warning-dialog`.

## Flujo

Clic en Crear → `POST /tenant/customers/duplicates` → si `found === false`, `POST /customers`. Si `found === true`, abrir aviso con la lista.

- **Ver** / clic en la fila: abre `/customers/detail/:id` en otra pestaña. No crea. Deja el aviso y Crear abiertos.
- **Continuar de todos modos**: `POST /customers` con el form actual. Flag `duplicateWarningAccepted` para no volver a consultar en el mismo intento.
- **Cancelar** / **X**: cierra el aviso y no crea el cliente. El formulario de alta sigue abierto.

Si el check de duplicados falla, se crea igual (sin toast de error).

## Endpoint

`POST /tenant/customers/duplicates` — permiso `customers:Create`.

Enviar solo campos llenos: `email`, `phone` + `phone_code`, `name` + `lastname` (los dos), `fiscal_rfc`.
