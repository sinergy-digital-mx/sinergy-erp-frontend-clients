# UI — Logística (camiones + envíos)

Implementado en `src/app/features/logistics/`. Contrato de preview enriquecido del back.

## Wizard crear envío

1. Form: CEDIS origen, fecha, chofer, camión, notas, OV `Surtida` del mismo almacén.
2. **Vista previa** → `POST /tenant/shippings/preview`
3. Layout preview: lista A→B→C (km por tramo) + mapa (`route_points`)
4. Si CEDIS sin GPS → modal `PUT /tenant/warehouses/:id` + re-preview
5. Si cliente sin dirección `shipping` → modal crear; si sin GPS → editar + re-preview
6. **Crear** usa orden y `customer_address_id` del preview

## Tipos dirección

Preferir `type: "shipping"` (UI: Entrega).

## Distancia

Haversine del back (línea recta). El back reordena por cercanía al CEDIS.
