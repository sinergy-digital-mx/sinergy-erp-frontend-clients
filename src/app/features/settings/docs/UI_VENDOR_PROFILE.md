# UI — Completitud, parecidos y baja de proveedores

Listado y modal de proveedores. Contrato: `src/api/vendor/docs/UI_VENDOR_PROFILE.md` del backend.

## 2026-11-12 — Menú con Ver proveedores

El ítem **Proveedores** del menú también aparece con `vendors:Read` / `Vendor:Read`. `vendor` y `vendors` cuentan como la misma entidad.

## 2026-11-04 — Constancia SAT

En **Nuevo proveedor** (nacional) el modal abre en **Información Fiscal**. El botón **Cargar constancia SAT** llena RFC, razón social, tipo de persona y domicilio. Esos campos se pueden corregir antes de **Crear proveedor**. Al editar, el mismo botón está en ese tab.

Contrato: `src/api/vendor/docs/UI_VENDOR_FISCAL_CONSTANCIA.md` del backend.

## 2026-11-02 — Sin campo Nombre

El modal pide **Nombre de empresa** (obligatorio) y **Razón social**. Ya no hay input **Nombre**. El listado muestra una sola columna **Empresa**. Compras, costos y cuentas por pagar usan ese nombre.

## Listado

- Columna **Ficha**: barra + `%` (`profile_completeness`).
- Columna **Similar**: badge **Parecido** si `looks_similar`. Tooltip con nombres y motivos.
- Filtro **Solo parecidos** → `similar_only=true`.
- **Eliminar** en la fila (`vendors:Delete`).

## Modal

- Barra **Ficha N%** (se actualiza al llenar el form).
- Banner naranja si `similar_vendors` tiene datos.
- **Eliminar** a la izquierda del footer.

## Crear

Antes de `POST /vendors`: `POST /tenant/vendors/duplicates`. Si `found`, modal de aviso. Continuar crea igual. Ver abre el existente.

## DELETE

Usar `message` del body. Acciones: `deleted` | `merged` (compras pasan al parecido) | `deactivated` (tiene compras y no hay parecido).
