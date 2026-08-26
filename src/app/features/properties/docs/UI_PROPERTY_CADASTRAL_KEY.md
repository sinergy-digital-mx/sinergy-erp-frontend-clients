# UI — Clave catastral del lote

Contrato Pollux: pintar y editar `cadastral_key` en lotes (propiedades). Ya está en API; no hay endpoint nuevo.

Key exacta: **`cadastral_key`**. No usar `clave_catastral`, `claveCatastral` ni `catastro`.

## Campo

| UI | API | Tipo | Requerido | Máx. |
|----|-----|------|-----------|------|
| Clave catastral | `cadastral_key` | `string \| null` | No | 100 |

Placeholder: `Clave catastral`. Vacío → `null`. Texto libre (sin validar formato municipal).

## Dónde

- **Crear / Editar lote:** input junto a Manzana (`block`) y Número de lote (`lot_number`).
- **Listado de lotes:** columna `row.cadastral_key`. Si `null` / `''` → `—`. El `search` del listado ya cubre clave catastral.
- **Detalle de contrato:** ficha de solo lectura (código, manzana, número, área, precio). Clave catastral se edita y se ve en **Editar lote**.

## GET

`GET /properties/:id`, listado y `by-code` devuelven `cadastral_key`.

Editar lote: abrir modal → `GET /:id` → `form.cadastral_key = property.cadastral_key ?? ''`. No rellenar desde un objeto local recortado.

Contratos y formatos de reservación que anidan `property` también traen `property.cadastral_key` (solo lectura en esos GET).

## Create / Update

`POST /properties` y `PUT /properties/:id`. Payload con `cadastral_key`. Tras guardar, usar `response.cadastral_key` en form y fila.

Vacío se manda `null`. Trim en backend.

## Permisos

Sin cambio: `Property` + `Create` / `Update` / `Read`.
