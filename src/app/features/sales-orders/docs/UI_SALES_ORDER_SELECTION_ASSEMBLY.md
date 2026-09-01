# UI — Selección y armado (OV)

Checkbox **Necesita proceso de selección y armado** (`requires_selection_assembly`) en alta/edición MANUAL.

Helper: “La orden se surtirá por almacén (picking y armado en Mesa de Control)”.

No pedir almacén por línea. POS no entra.

Si el checkbox va OFF, la OV sigue `Creada` → fulfill.

## Detalle

Si `header.control_desk` no es `null`:

- Progreso `progress.warehouses_done` / `warehouses_total`
- `position.code`
- `missing[]`
- Link a Mesa de Control con `job_id`

Editar líneas solo si el picking no empezó.
