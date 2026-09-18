# UI — Vigencia de cotizaciones por razón social

En cada razón social: **Días de vigencia de cotizaciones**. Vacío = no vencen.

El backend cancela cada día (1:00) las cotizaciones `Creada` que ya cumplieron esos días.

Campo: `quotation_expiration_days` en create/update de razón social (`null` para quitarla).

Listado de razones: columna **Vigencia cotiz.** (`15 d` o `—`).

Listado/detalle de cotizaciones: `expires_at`.
