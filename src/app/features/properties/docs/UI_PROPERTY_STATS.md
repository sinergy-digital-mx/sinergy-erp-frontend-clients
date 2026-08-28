# UI — Stats y filtros del listado de lotes

Tira de **4 cards** encima de la tabla. Los números salen de `GET /tenant/properties/stats` con los **mismos filtros** que el listado. No sumar `data[]`.

## Layout

Filtros → KPIs → tabla. Grid: 1 col mobile, 2 tablet, 4 desktop. No clickeables. Estilo Contratos (pastel + borde de color) con valor grande, label caps y una línea de sub.

## Filtros

| UI | Query param | Notas |
|----|-------------|--------|
| Proyecto | `groupId` | `GET /tenant/property-groups` |
| Grupo de cliente | `customer_group_id` | `GET /tenant/customers/groups` |
| Estado | `status` | `disponible` \| `vendido` \| `reservado` \| `cancelado` |
| Búsqueda | `search` | ya existía |

**`groupId` ≠ `customer_group_id`.** No enviar `group_id` en lotes.

“Todos …” = omitir el param. `customer_group_id` deja fuera lotes sin contrato (disponibles sin cliente).

Al cambiar cualquier filtro: **lista + stats en paralelo**. Paginar no vuelve a pedir stats.

## Stats

```
GET /tenant/properties/stats?groupId={proyecto}&customer_group_id={grupo}&status=disponible
```

Permiso: `Property:Read`. Path `/properties/stats` (antes de `/:id`).

| Card | Valor | Sub |
|------|--------|-----|
| TOTAL | `total.count` | `{total.area} m² · {total.value}` |
| DISPONIBLES | `available.count` | valor + m² |
| ACTIVOS EN PAGO | `active_in_payment.count` | Pendiente `{remaining_balance}` |
| PRECIO PROM. $/M² | `avg_price_per_m2` | Sobre el filtro actual |

Chip opcional en TOTAL si > 0: `{sold.count} vendidos · {reserved.count} reservados`. No abrir más cards.

Montos MXN, m² a 2 decimales. Loading: 4 skeletons. Error: toast + cards en 0; la tabla sigue.

Columna grupo: `customer.group?.name ?? '—'`.
