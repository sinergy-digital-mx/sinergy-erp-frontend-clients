# UI — Listado de contratos: grupo de cliente y stats filtrados

Las 4 cards de **Contratos** se recalculan con los **mismos filtros** que la tabla (no con toda la organización ni con `data[]` paginado).

## Filtro Grupo de cliente

Dropdown junto a búsqueda. Catálogo:

```
GET /tenant/customers/groups
```

Permiso: `customers:Read`. Mismo catálogo que Clientes. No hardcodear ni usar el CRUD de Configuración (`/customer-groups`).

| UI | Query param |
|----|-------------|
| Todos los grupos | omitir `group_id` |
| Un grupo | `group_id` (UUID) |

En contratos el param es **`group_id`**. Incluye el contrato si el **cliente o el lote** está en ese grupo.

## Endpoints — mismos params

| Uso | Ruta | page/limit |
|-----|------|------------|
| Tabla | `GET /tenant/contracts` | sí |
| Cards | `GET /tenant/contracts/stats` | no |
| Excel | `GET /tenant/contracts/export/excel` | no |

Params opcionales: `group_id`, `search`, `status` (`activo` \| `completado` \| `cancelado` \| `suspendido`), `hasOverdue=true`, `customerId`, `propertyId`.

Al cambiar grupo, búsqueda, estatus o vencidos: **lista + stats en paralelo**. Paginar no vuelve a pedir stats.

## Cards

Leer `GET /tenant/contracts/stats`. Vacío / error: `0` / `$0.00`. Skeletons mientras carga. Error no tumba la tabla.

| Card | Valor | Sub |
|------|--------|-----|
| TOTAL | `total.value` | `total.count` contratos |
| COMPLETADOS | `completed.value` | `completed.count` |
| ACTIVOS | `pending.value` | Pagado `pending.paid` · Pendiente `pending.remaining` |
| VENCIDOS | `overdue.value` | Contratos `overdue.contracts_count` · Pagos `overdue.payments_count` |

Montos MXN. Columna opcional de grupo: `customer.group?.name ?? '—'`.
