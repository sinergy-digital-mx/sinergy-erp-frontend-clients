# UI — Tab Registro (sucursal y quién registró)

Tab **Registro** en Crear / Editar cliente y en el detalle. Datos **solo informativos**: no filtran ventas ni POS.

Implementado en `customer-edit-modal` y `customer-detail`.

## Dónde

Cuarto tab, después de Información Fiscal:

1. Información del Cliente
2. Credito
3. Información Fiscal
4. **Registro**

Campos opcionales. El cliente se puede guardar sin llenarlos.

## Endpoint de catálogo

`GET /tenant/customers/registration-options` — permiso `customers:Read`.

No usar `/billing/branches` ni `/users`.

Cargar al abrir el modal. No cachear entre organizaciones ni en localStorage.

## Prefill al crear

| Campo | Prefill |
|-------|---------|
| Sucursal de registro | `user.billing_branch_id` de la sesión si está en el catálogo |
| Registrado por | usuario actual (`sub`) si está en el catálogo |

En editar se pinta lo guardado; no se pisa con la sesión.

Vacío → `null`. Si no se envía `registered_by_user_id` al crear, el back asigna al usuario de la sesión.

## Guardar / leer

`POST /tenant/customers` y `PUT /tenant/customers/:id` con `registered_billing_branch_id` y `registered_by_user_id`.

Detalle: `registered_billing_branch.code` y `{first_name} {last_name}` (fallback `email`).
