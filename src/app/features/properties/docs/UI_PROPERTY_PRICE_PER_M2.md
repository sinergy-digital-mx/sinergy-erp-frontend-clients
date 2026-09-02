# UI — Precio por m² en lotes

Al crear o editar un lote el precio por m² es **opcional**. Si lo capturan, el
API calcula el monto total.

Key exacta: **`price_per_m2`**.

## Campos

| Campo | Tipo | Alta | Edición |
| ----- | ---- | ---- | ------- |
| `total_area` | number | obligatorio | opcional |
| `total_price` | number | uno de los dos | opcional |
| `price_per_m2` | number | uno de los dos | opcional |

`POST /properties` y `PUT /properties/:id`.

`currency` opcional: `USD` \| `MXN`. Default **USD**. Cards y tabla pintan con esa moneda, no `MX$`.

## UI

1. **Área (m²)** (`total_area`).
2. **Precio por m²** (`price_per_m2`) — opcional.
3. **Precio total** (`total_price`).
4. Si el usuario escribe precio/m² (y hay área), el form prellena el total:
   `área × precio/m²`. El API hace el mismo cálculo si mandan `price_per_m2`.
5. Si solo escriben el total, no se manda `price_per_m2`. El API lo deriva en
   la respuesta.

Alta sin `total_price` ni `price_per_m2` → 400.

## Ejemplos

Precio por m² → total calculado:

```json
{ "total_area": 200, "price_per_m2": 1850 }
```

→ `total_price: 370000`

Solo total:

```json
{ "total_area": 200, "total_price": 400000 }
```

→ `price_per_m2: 2000` (derivado)

Editar área con precio/m² ya guardado: se recalcula el total.

## Dónde

- **Crear / Editar lote:** `PropertyEditModalComponent`.
- **Detalle de contrato:** ficha del lote muestra Precio / m² si el API lo trae.

## Permisos

Sin cambio: `Property` + `Create` / `Update` / `Read`.
