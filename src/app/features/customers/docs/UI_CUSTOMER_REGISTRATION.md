# UI — Tab Registro (razón, sucursal, vendedor asignado e historial)

Tab **Registro** en Crear / Editar cliente y en el detalle. Datos **solo informativos**: no filtran ventas ni POS.

Hay dos bloques:

1. **Registro** — razón social / sucursal de alta. No restringe dónde puede comprar.
2. **Vendedor asignado** — quién comisiona por default. Independiente de quién lo registró.

No usar `warehouse_id`. El cliente no lleva almacén.

Implementado en `customer-edit-modal` y `customer-detail`.

## Dónde

Cuarto tab, después de Información Fiscal:

1. Información del Cliente
2. Credito
3. Información Fiscal
4. **Registro**

Ningún campo es obligatorio.

## Catálogo

`GET /tenant/customers/registration-options` — permiso `customers:Read`.

Respuesta: `fiscal_configurations[]` con `branches` anidadas, `users` y `sellers` (usuarios con código POS).

`users` y `sellers` solo **activos**. Inactivos y eliminados no se listan. Si el cliente ya tiene uno inactivo asignado, el select conserva ese valor para no perderlo.

No usar `branches` plano (repetía CEDIS Ensenada por cada razón). No cachear entre organizaciones ni en localStorage.

Cascada: sucursal deshabilitada hasta elegir razón; al cambiar razón se resetea la sucursal.

## Prefill al crear

| Campo | Prefill |
|-------|---------|
| Razón social de registro | Razón de `user.billing_branch_id` si esa sucursal está en el catálogo |
| Sucursal de registro | `user.billing_branch_id` de la sesión si pertenece a esa razón |
| Registrado por | `user.id` de la sesión |
| Vendedor asignado | `null` |

En editar se pinta lo guardado; no se pisa con la sesión.

Vacío → `null`. Si no se envía `registered_by_user_id` al crear, el back asigna al usuario de la sesión.

## Guardar / leer

`POST /tenant/customers` y `PUT /tenant/customers/:id` con:

- `registered_fiscal_configuration_id`
- `registered_billing_branch_id`
- `registered_by_user_id`
- `assigned_seller_user_id`

Detalle: `registered_fiscal_configuration.razon_social`, `registered_billing_branch.code`, `{first_name} {last_name}` y vendedor `{nombre} ({pos_user_code})`.

Historial: `assignment_history` del GET. Cada evento muestra `title`, fecha y `actor_name` si existe. Los cambios se listan desde `changes[]` (o se parte `description` si viene concatenada). El bloque y cada evento son colapsables.

El vendedor asignado del cliente **no** es el **Vendedor** de la OV (quien vendió). Al crear la OV se copia a **Comisionado**. Ver `src/app/features/sales-orders/docs/UI_SALES_ORDER_SELLER.md`.
