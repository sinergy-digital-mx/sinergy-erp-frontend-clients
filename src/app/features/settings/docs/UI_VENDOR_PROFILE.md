# UI — Completitud, parecidos y baja de proveedores

Listado y modal de proveedores. Contrato: `src/api/vendor/docs/UI_VENDOR_PROFILE.md` del backend.

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
