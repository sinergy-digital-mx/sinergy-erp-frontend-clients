# UI — Reporte de ventas (vendedor vs comisionado)

Un solo módulo, **dos vistas** con un toggle. No dupliques pantallas.

| Vista | Query `view` | Agrupa por | Qué responde |
|-------|----------------|------------|----------------|
| **Ventas** (default) | `sales` | Quien **vendió** (`seller_user_id`) | Volumen, ticket, meta |
| **Comisiones** | `commissions` | Quien **comisiona** (`assigned_seller_user_id`) | Comisión $ y avance vs meta |

En la OV son personas distintas: `src/app/features/sales-orders/docs/UI_SALES_ORDER_SELLER.md`.

---

## 1. Header

- Título fijo: **Reporte de ventas**.
- Subtítulo: `view_label` + `filters_applied.period_label`.
- Toggle segmentado **Ventas** (verde `#1B7F5E`) / **Comisiones** (púrpura `#6B4C9A`). Al cambiar `view`, mismo periodo y mismos combos; recargar.
- **Descargar Excel** a la derecha del título. Mismos query params que el GET.
- Periodo: un solo chip activo. `Mes` / `Semana` / `Año` / `Hoy` **no** mandan `date_from`/`date_to`. Solo **Rango** muestra fechas y manda `period=range`.
- Cascada: razón social → sucursal. Cambiar razón resetea sucursal.

---

## 2. Endpoints

```
GET /api/tenant/sales-reports/by-seller
GET /api/tenant/sales-reports/by-seller/export/excel
GET /api/tenant/sales-reports/by-seller/orders
```

Query (los tres): `view`, `fiscal_configuration_id`, `billing_branch_id`, `period`, `date_from` / `date_to` (solo si `period=range`).

**No enviar** `commission_rate`. El % sale de Metas.

---

## 3. Cards KPI

Usar `summary.*`. Cuatro cards (móvil 2×2).

- Ventas: Vendedores, Ventas, Monto, Ticket promedio. Chip `Líder` si `summary.top`.
- Comisiones: Comisionados, Ventas, Monto, Comisión. Sin card ni columna de comisión en Ventas.
- Mini barras `summary.branches[]` si hay 2+ sucursales.

---

## 4. Tabla y drill-down

Click en la persona (o fila) → `GET .../by-seller/orders` con el **mismo** `view`.

Modal: Folio, Fecha, Cliente, Vendedor, Comisionado, Sucursal, Total, Pago. En Comisiones se resalta Comisionado; en Ventas, Vendedor.

---

## Checklist Pollux

- [x] Toggle **Ventas / Comisiones** (`view=sales` \| `commissions`)
- [x] Default **Ventas**. Comisiones no es la home del reporte
- [x] Subtítulo = `view_label` + `period_label`
- [x] **Descargar Excel** → `GET .../by-seller/export/excel` con los mismos params
- [x] Un solo chip de periodo; Rango es el único que manda fechas
- [x] Cascada razón → sucursal
- [x] Cards: 4 KPIs según vista; comisión **solo** en Comisiones
- [x] Chip líder `summary.top` si hay datos
- [x] Mini barras `summary.branches` si hay 2+ sucursales
- [x] Columna persona: Vendedor vs Comisionado
- [x] Click fila → orders con el **mismo** `view`
- [x] Modal muestra las dos personas (vendedor y comisionado)
- [x] Banner metas; progress gorda en Comisiones
- [x] Empty state con copy de la vista activa
- [x] Paleta verde (ventas) / púrpura (comisiones)
