# Alta de contrato — selector de lote

## Historial

- 2026-11-10: El selector ya no se queda en los primeros 100 lotes disponibles. Sin texto carga todas las páginas; al escribir busca en el servidor (`search` + `status=disponible`).

## Qué veía el usuario

En Lotes, manzana 5 sale como **disponible**. Al crear contrato no aparecía: el alta pedía `GET /tenant/properties?status=disponible&limit=100` y filtraba solo esa página en el navegador. Orden del API: `code` ASC. Con 193 disponibles, los 9 de manzana 5 empiezan después del lote 100 (`LOT-5-*` va detrás de manzanas 1, 2 y 10–15).

## Comportamiento

| Acción | Request |
|--------|---------|
| Abrir el alta | `status=disponible`, páginas de 100 hasta `totalPages` (tope 10) |
| Escribir en el lote | `status=disponible&search=` + una página de 100 |

`search` compara código, nombre, manzana y número de lote. «manzana 5» y «LOT-5» regresan solo esa manzana.
