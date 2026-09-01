# UI — Vendedor vs Comisionado en la orden de venta

En el detalle hay **dos personas distintas**. No uses “Vendedor asignado” en la OV: se confunde con Vendedor.

| UI | Campo API | Qué es |
|----|-----------|--------|
| **Vendedor** | `seller_user` | Quien vendió |
| **Comisionado** | `assigned_seller_user` | Quien cobra la comisión de esta orden |

El API no cambia: sigue `assigned_seller_user`. En el cliente el default se llama **Vendedor asignado** y al vender se copia al Comisionado.

Helper bajo Comisionado: `Quien comisiona esta venta`.

**Sin historial en la OV.** El historial de asignaciones es del cliente (tab Registro): `GET /customers/:id` → `assignment_history`.

## Alta

No hace falta mandar `assigned_seller_user_id`. El backend:

1. Si el cliente tiene vendedor asignado → ese es el Comisionado.
2. Si no → Comisionado = Vendedor.

Snapshot. Cambiar el asignado del cliente no mueve órdenes ya hechas.

## Detalle

Cards: **Razón social → Sucursal → Cliente**.

- Vendedor: `{nombre} ({pos_user_code})` o `Sin vendedor` — Cambiar → `PATCH .../seller`
- Comisionado: igual, o `Sin comisionado` — Cambiar → `PATCH .../assigned-seller`
- Helper: `Quien comisiona esta venta`

Deshabilitar cambios si la orden está `Cancelada`. Catálogo: `sellers` activos de `GET /tenant/customers/registration-options`. Inactivos y eliminados no se listan; si la OV ya tiene uno de esos, se conserva en el select.

El reporte de comisiones agrupa por **Comisionado**.
