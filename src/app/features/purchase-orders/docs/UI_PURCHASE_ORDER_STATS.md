# UI — Stats de órdenes de compra (MXN / USD)

Las cards **Por Estado** y **Estado de Pago** no suman pesos y dólares. El listado trae `stats` partido por moneda. No hay endpoint extra.

Nunca `MXN + USD`. No convertir. El monto es `requested_total` (la misma cifra que la columna Total).

## GET

Mismo listado. `stats` cubre **todas** las OC de los filtros actuales, no solo la página.

```
GET /purchase-orders?...mismos filtros
```

No sumar `data[]`. Eso mezcla monedas y se corta con la paginación.

## Shape

`stats.by_currency.MXN` y `.USD` siempre vienen. Si no hay OC en esa moneda: `count: 0`, `amount: 0`.

## Cards

Dos cards. Cada monto en **dos renglones**: `MXN $1,045,914.40` / `USD $500.00`.

| Card | Fila | Conteo | Monto |
|------|------|--------|-------|
| Por Estado | Total | `stats.count` | `MXN.amount` / `USD.amount` |
| Por Estado | Creadas | suma `Creada.count` | `by_status.Creada.amount` |
| Por Estado | Recibidas | suma `Recibida.count` | `by_status.Recibida.amount` |
| Estado de Pago | Total | `stats.count` | igual que Total de estado |
| Estado de Pago | Pagadas | suma `Pagado.count` | `by_payment.Pagado.amount` |
| Estado de Pago | Pendientes | suma `Pendiente.count` | `by_payment.Pendiente.amount` |

Si `USD.count === 0`, se oculta el renglón USD. Nunca un `$` genérico mezclado.

Barras: proporción **por conteo**. No un % sobre MXN+USD.
