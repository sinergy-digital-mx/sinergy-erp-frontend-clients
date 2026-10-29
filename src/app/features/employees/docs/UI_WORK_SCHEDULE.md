# UI — Horario laboral

## Historial

- 2026-10-29: El admin lo captura en **Editar usuario → Empleado** y con **Editar** en el expediente. También se ve en el portal.
- 2026-10-29: Sección lun–dom en el portal de empleado y en el expediente. Cada día es laboral (entrada/salida) o descanso. El total de horas lo calcula el backend.

## Dónde

- Portal: `app-work-schedule-section` con `source=portal`. El empleado guarda el suyo.
- Expediente: misma sección con `source=employee` y `canEdit` si tiene `Employee:Update`.

## API

```http
GET /tenant/employee-portal/me
PUT /tenant/employee-portal/me/work-schedule
PUT /tenant/employees/:id/work-schedule
```

`work_schedule` es `null` hasta el primer guardado. `weekday` 1=lunes … 7=domingo.
