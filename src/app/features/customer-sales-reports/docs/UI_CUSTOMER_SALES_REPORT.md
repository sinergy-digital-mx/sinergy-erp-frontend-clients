# UI — Reporte de ventas clientes

Misma barra de periodo y combos que el reporte de ventas. Sin toggle de vistas.

- Título: **Reporte de ventas clientes**
- Subtítulo: `view_label` + `filters_applied.period_label`
- Métricas: ventas (órdenes) y total comprado. Sin unidades/consumo.
- Filtros: razón social → sucursal
- Periodo: `app-report-period-selector` con `includeYear` y `monthAsServerPreset`
- Excel: `GET /tenant/customer-sales-reports/export/excel`

Permiso de menú: `customer_sales_report:ViewMenu`.
