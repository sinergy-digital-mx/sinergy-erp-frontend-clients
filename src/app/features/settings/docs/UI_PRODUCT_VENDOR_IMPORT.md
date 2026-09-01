# UI — Importación masiva de costos y precios por proveedor

Catálogo de productos. Actualiza el catálogo **actual**. **No** modifica OC ni OV ya creadas.

Un botón **Importar** junto a **Descargar catálogo** / **Nuevo producto**. Solo con `Product:Update` (o admin).

## Dónde

Toolbar del listado de Productos. Sin `Product:Update`: no se muestra el botón.

## Modal

Al abrir **Importar**:

1. Elige **tipo**: Costos o Precios.
2. Elige **proveedor**.
3. Si el tipo es Precios, elige también **lista de precios**.
4. Descarga el template y sube el Excel.

Copy: *No afecta órdenes de compra ni de venta pasadas.*

## Endpoints

Preview:

- `GET /api/tenant/products/import/vendor-costs/preview?vendor_id=`
- `GET /api/tenant/products/import/vendor-prices/preview?vendor_id=&price_list_id=`

Template (`responseType: 'blob'`; filename desde `Content-Disposition`):

- `GET /api/tenant/products/import/vendor-costs/template?vendor_id=`
- `GET /api/tenant/products/import/vendor-prices/template?vendor_id=&price_list_id=`

Import (`multipart/form-data`):

- `POST /api/tenant/products/import/vendor-costs` — `file` + `vendor_id`
- `POST /api/tenant/products/import/vendor-prices` — `file` + `vendor_id` + `price_list_id`

Proveedores: `GET /api/tenant/vendors?status=active&limit=100&search=`. Label `name`, valor `id`.

Listas: `GET /api/tenant/price-lists`. Label `name`, valor `id`.

## Resultado del POST

`{ updated, created, skipped, errors[] }`. Toast: `{updated} actualizados, {skipped} sin cambios` (y `{created} creados` si aplica). Si hay `errors`, tabla fila / SKU / mensaje y el modal no se cierra.

## Excel

Lo genera el backend. Columna amarilla **Nuevo costo / Nuevo precio**: vacío = no tocar. No reordenar columnas.
