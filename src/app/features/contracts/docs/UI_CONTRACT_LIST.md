# UI — Listado de contratos: grupo de cliente y stats filtrados

## Historial

- 2026-10-23: Badge **Enganche** / **Contrato** en cada fila. Siguiente pago con color distinto si es enganche (y **Último enganche** si es el último activo). Card **Vencidos**: total + desglose Contrato / Enganche. El Excel incluye Fase, Tipo Próximo Pago, Último Enganche y Vencidos Enganche.

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
| VENCIDOS | `overdue.value` (contrato + enganche) | Contratos / Pagos del total. Aparte: Contrato `overdue.contract` · Enganche `overdue.down_payment` |

Montos con `stats.currency` / `data[].currency` (`USD` hoy). Cards: `USD $2,913,337.14`. Tabla: `$25,000.00` + badge USD. No `MX$`. Columna opcional de grupo: `customer.group?.name ?? '—'`.

Fila: `payment_phase` → badge Enganche / Contrato. `next_payment_kind` colorea la fecha (`down_payment` ámbar, `contract` teal). Si `next_payment_is_last_down_payment`, chip **Último enganche**. Saldo pendiente no cambia de color.
