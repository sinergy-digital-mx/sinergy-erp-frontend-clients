# UI — Editar / eliminar líneas de orden de compra

El detalle de la OC **sí se puede editar por línea** mientras `general_status === 'Creada'`. El API ya lo hace.

No uses `PUT /purchase-orders/:id` para cambiar el IVA o el precio de **una** línea: ese endpoint reemplaza **todas** las líneas. Usa PATCH/DELETE/POST de línea.

## Cuándo hay acciones

| `general_status` | Editar línea | Eliminar línea | Agregar producto |
|------------------|--------------|----------------|------------------|
| `Creada` | Sí | Sí | Sí |
| `Recibida` | No | No | No |
| `Cancelada` | No | No | No |

Campo de apoyo: `can_edit_lines` (`true` solo en **Creada**).

Si `can_edit_lines === false`: oculta lápiz, basura y “Agregar producto”. La tabla queda solo lectura.

## Tabla Productos (detalle)

Cada fila = `line_items[]`. La moneda de **toda** la OC es `payment_currency` (`MXN` | `USD`). No concatenar `"USD 2.22"`.

`unit_total` es costo **sin impuestos**. El importe `line_subtotal` es **sin IVA**. El IVA de esa línea es `line_iva`. El total con impuestos es `line_total`.

Estos montos **vienen persistidos** en el GET. Pollux no calcula: pinta `unit_total`, `line_subtotal`, `line_iva`, `line_ieps` y `line_total`.

| Columna | Fuente | Cómo pintar |
|---------|--------|-------------|
| Producto | `product.name` + código | igual que ahora |
| Costo | `unit_total` | **sin IVA**. Número + badge `payment_currency`. Pintar el valor persistido **sin redondear a 2 decimales** |
| Importe | `line_subtotal` y `line_total` | misma columna: gris s/IVA, negrita c/IVA. Un solo badge. Si IVA e IEPS son 0, un solo monto |
| IVA | `iva_percentage` | badge `%`. **Ocultar columna** si todas las líneas van en 0. En la fila, si es 0 no pintar badge |
| IEPS | `ieps_percentage` | igual que IVA |
| Solicitadas | `quantity` + UOM | igual |
| Recibidas | recepción | igual; `—` si aún no hay recepción |
| Acciones | — | lápiz + basura **solo si** `can_edit_lines` |

| Campo persistido | Qué es |
|------------------|--------|
| `unit_total` | Costo unitario **sin** IVA/IEPS |
| `iva_percentage` / `ieps_percentage` | % de la línea |
| `iva_unit` / `ieps_unit` | Impuesto **por unidad** |
| `line_subtotal` | Importe **sin** impuestos |
| `line_iva` | IVA de la línea |
| `line_ieps` | IEPS de la línea |
| `line_total` | Importe **con** IVA + IEPS |

En el modal de editar, IEPS % sí se muestra (puede ser 0).

Al cambiar IVA 16 → 0 en el PATCH, `line_iva` pasa a `0` y `line_total` queda igual a `line_subtotal`. El footer `requested_*` es la suma de esas columnas.

### Badge de moneda

Mismo componente que el header de crear OC (`UI_PURCHASE_ORDER_CURRENCY.md`).

```
[USD]  2.22
[USD]  6,660.00
```

Nunca `USD 2.22` como texto plano. El código de moneda sale de `payment_currency` del header, no de cada línea.

## Footer de totales

Siempre visible en el tab Productos. Montos del **header**, no sumes la tabla en el cliente.

| Etiqueta | Campo |
|----------|--------|
| Subtotal | `requested_subtotal` |
| IVA | `requested_iva_total` |
| IEPS | `requested_ieps_total` (ocultar si es 0) |
| **Total** | `requested_total` |

Cada monto con badge `payment_currency`.

Si unas líneas van a 16% y otras a 0%, el footer muestra la **suma** de IVA (`requested_iva_total`). El % por línea va en la columna IVA %.

## Endpoints

| Acción | Método |
|--------|--------|
| Editar | `PATCH /purchase-orders/:orderId/line-items/:lineItemId` |
| Eliminar | `DELETE /purchase-orders/:orderId/line-items/:lineItemId` |
| Agregar | `POST /purchase-orders/:orderId/line-items` |

La respuesta 200/201 es la OC completa (igual que el GET). Pintar `line_items` y `requested_*` con ese objeto. No hace falta un GET extra.

PATCH solo IVA a 0:

```json
{ "iva_percentage": 0 }
```

PATCH precio e IVA:

```json
{
  "unit_total": 2.22,
  "iva_percentage": 0,
  "quantity": 3000
}
```

POST body = misma forma que al crear (`product_id`, `uom_id`, `quantity`, `unit_total`, `iva_percentage`, `ieps_percentage`, `currency` = `payment_currency` de la OC).

400 si la OC ya no está en Creada. 404 si la línea no existe.

## Modal editar línea

Prefill con la fila actual. Moneda **no** se edita en la línea.

| Campo UI | Body PATCH | Notas |
|----------|------------|--------|
| Cantidad | `quantity` | `> 0` |
| Costo unitario | `unit_total` | `>= 0` |
| IVA % | `iva_percentage` | `0`–`100`. Atajos 0 / 8 / 16 + input |
| IEPS % | `ieps_percentage` | `0`–`100`. Opcional |

## Eliminar línea

Confirmación: `¿Eliminar {product.name} de esta orden? Se recalcularán los totales.`

## Qué no hacer

- No concatenar moneda + monto.
- No usar PUT de la OC para un cambio de una línea.
- No editar líneas en Recibida / Cancelada (el API responde 400).
- No sumar MXN + USD (una OC es una sola moneda).
- No asumas que IVA es siempre 16: cada línea tiene su `iva_percentage`.
