# UI — Stats y filtros del listado de lotes

Un solo catálogo: **grupos de clientes**. `property_groups` / “Proyecto” ya no aplica al lote.

Tira de **4 cards** encima de la tabla. Los números salen de `GET /tenant/properties/stats` con los **mismos filtros** que el listado. No sumar `data[]`.

## Layout

Filtros → KPIs → tabla. Grid: 1 col mobile, 2 tablet, 4 desktop. No clickeables.

```
[ Buscar… ] [ Estado ▼ ] [ Grupo de cliente ▼ ]
[ TOTAL ] [ DISPONIBLES ] [ ACTIVOS EN PAGO ] [ PRECIO PROM. $/M² ]
[ Tabla ]
```

## Filtros

| UI | Query param | Catálogo |
|----|-------------|----------|
| Grupo de cliente | `group_id` | `GET /tenant/customers/groups` |
| Estado | `status` | `disponible` \| `vendido` \| `reservado` \| `cancelado` |
| Búsqueda | `search` | ya existía |

No enviar `groupId` ni `customer_group_id`. El grupo del lote es el mismo `group_id` que Clientes/Contratos.

“Todos …” = omitir el param.

Al cambiar cualquier filtro: **lista + stats en paralelo**. Paginar no vuelve a pedir stats.

## Crear / editar lote

El select de grupo usa `GET /tenant/customers/groups`. El payload manda `group_id` (UUID del catálogo). Un UUID viejo de “proyecto” falla el FK hasta que corra la migración `1786900000000`.

## Stats

```
GET /tenant/properties/stats?group_id={uuid}&status=disponible
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

Columna de grupo: `group.name`. Una sola, no “Proyecto” + “Grupo”.
