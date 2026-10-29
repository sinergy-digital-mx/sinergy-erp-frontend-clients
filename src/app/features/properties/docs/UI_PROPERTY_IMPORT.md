# UI — Importar lotes

Modal en el listado de lotes. Descarga plantilla, llena y sube. Si una fila falla, no se crea ningún lote.

## Historial

- 2026-10-28: La plantilla ya no trae `ubicacion`. El grupo de cada fila es la ubicación.
- 2026-10-28: Si una fila ya existe, está repetida o está mal, se omite y el resto se importa. Al terminar, caja para copiar los que no entraron.
- 2026-10-27: El modal ya no pide un grupo único. El grupo va en cada fila del Excel (columna `grupo`). La plantilla trae la hoja **Grupos** con las ubicaciones actuales.
- 2026-10-27: Tras el POST, barra de progreso y poll `GET …/import/jobs/:jobId` (`Importando X de Y`).

## Modal

1. **Descargar plantilla** → `GET /tenant/properties/import/template` (`plantilla-lotes.xlsx`).
2. En la hoja **Grupos**, copiar el nombre a la columna `grupo` de cada lote (lista desplegable en la celda).
3. Subir el `.xlsx` e **Importar** → `POST /tenant/properties/import` solo con `file`.
4. Poll ~1 s mientras `queued` / `processing`. `completed` sin omitidos: toast y recargar. Con omitidos: dejar el modal abierto, **Copiar** la lista y recargar al cerrar. `failed` o `400` de archivo: dejar el modal abierto.
