# UI — Importación masiva de costos y precios por proveedor

Catálogo de productos. Actualiza el catálogo **actual**. **No** modifica OC ni OV ya creadas.

Un botón **Importar** junto a **Descargar catálogo** / **Nuevo producto**. Solo con `Product:Update` (o admin).

## Dónde

Toolbar del listado de Productos. Sin `Product:Update`: no se muestra el botón.

## Modal

Al abrir **Importar**:

1. Elige **proveedor**.
2. Elige **lista de precios** (se preselecciona la default).
3. Descarga el template (costo y precio en el mismo Excel) y súbelo.

Copy: *Llena Nuevo costo y/o Nuevo precio en el mismo Excel. Vacío = no cambia esa columna. No afecta órdenes de compra ni de venta pasadas.*

## Endpoints

Preview:

- `GET /api/tenant/products/import/vendor-catalog/preview?vendor_id=&price_list_id=`

Template (`responseType: 'blob'`; filename desde `Content-Disposition`):

- `GET /api/tenant/products/import/vendor-catalog/template?vendor_id=&price_list_id=`

Import (`multipart/form-data`):

- `POST /api/tenant/products/import/vendor-catalog` — `file` + `vendor_id` + `price_list_id`

Proveedores: `GET /api/tenant/vendors?status=active&limit=100&search=`. Label `name`, valor `id`.

Listas: `GET /api/tenant/price-lists`. Label `name`, valor `id`.

## Resultado del POST

`{ updated, created, skipped, costs_updated, prices_updated, prices_created, errors[] }`.

Toast: `{costs_updated} costos actualizados, {prices_updated} precios actualizados` (y `{prices_created} precios creados` si aplica), `{skipped} sin cambios`. Si hay `errors`, tabla fila / SKU / mensaje y el modal no se cierra.

## Excel

Lo genera el backend. Columnas amarillas **Nuevo costo** y **Nuevo precio**: vacío = no tocar esa columna. No reordenar columnas.
