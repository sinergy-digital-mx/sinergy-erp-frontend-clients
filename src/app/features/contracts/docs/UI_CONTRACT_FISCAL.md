# UI — Razón social del contrato

## Historial

- 2026-10-23: Selector de razón social en alta y edición. El recibo PDF y el correo toman logo y nombre de esa asignación.

En **Crear contrato** y **Editar contrato** hay **Razón social ***. Catálogo:

```
GET /tenant/fiscal-configurations?status=active&limit=100
```

Label: `razon_social · RFC`. No hardcodear nombres.

Al crear es obligatorio. Si solo hay una razón social, se preselecciona. Si hay varias (Val de Tierra y Val de la NSA), el usuario elige.

Al editar: prefill de `fiscal_configuration_id`. Si esa razón quedó inactiva, igual aparece.

`POST` y `PUT` mandan `fiscal_configuration_id`. El recibo de enganche y de mensualidad usa esa razón social, no la de la plantilla.

## Checklist

- [ ] Crear no guarda sin razón social
- [ ] Editar muestra la guardada y permite cambiarla
- [ ] Recibo de un contrato de Val de Tierra usa su logo
