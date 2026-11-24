# UI — Stats de órdenes de compra (MXN / USD)

## 2026-11-23 — Franja como clientes

El resumen es una franja de cinco columnas (Órdenes, Creadas, Recibidas, Pagadas, Deuda), con el alto y el skeleton del resumen de clientes. En móvil quedan en dos columnas. El número grande es el conteo; abajo el monto, MXN y USD por separado.

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

## Columnas

Cinco columnas en una franja. El total es la columna Órdenes. Deuda es la última.

Cada monto es un chip: `MXN $1,045,914.40` / `USD $500.00`. No mezclar. USD $0 en una fila se oculta.

| Card | Dónde | Conteo | Monto |
|------|-------|--------|-------|
| Por estado | Header | `stats.count` | `MXN.amount` / `USD.amount` |
| Por estado | Creadas | suma `Creada.count` | `by_status.Creada.amount` |
| Por estado | Recibidas | suma `Recibida.count` | `by_status.Recibida.amount` |
| Estado de pago | Header | `stats.count` | igual que Por estado |
| Estado de pago | Pagadas | suma `Pagado.count` | `by_payment.Pagado.amount` |
| Estado de pago | Deuda | suma `Pendiente.count` | `by_payment.Pendiente.amount` |

Deuda es la misma fila que Pagadas (barra + chips), no un banner suelto.

Si `USD.count === 0`, se oculta el renglón USD. Nunca un `$` genérico mezclado.

Barras: proporción **por conteo**. No un % sobre MXN+USD.
