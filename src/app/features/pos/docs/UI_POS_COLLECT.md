# UI — POS Caja: método de pago

Contrato de API en `sinergy-erp-backend-clients/src/api/pos-shifts/docs/UI_POS_FLOW.md`.

## Tabs

Grid **3 columnas** de botones con icono + etiqueta. Nunca 4 o 5 en una sola fila.

Fila 1: Efectivo · Transferencia · Tarjeta  
Fila 2: Cheque · Mixto · Crédito (Crédito solo si el cliente lo tiene en esa razón social)

## Mixto

El cajero elige formas con **botones** 2×2 (no checkboxes nativos). Mínimo dos.

Cada forma activa es **una tarjeta aparte**, numerada **Pago 1**, **Pago 2**. El resto que falta se completa con el botoncito **Completar resto** en el header de esa tarjeta.

Al escribir un monto, el último método marcado recibe la diferencia. Crédito no entra en mixto.

Inputs de monto (efectivo manual, mixto, TC, etc.): vacíos si el valor es 0. Nunca mostrar `0` para no obligar a borrar antes de teclear. Placeholder `0.00`.

## Ticket

Al cobrar (si está activo “Imprimir ticket al confirmar cobro”) se abre el modal de vista previa. Ahí eliges **Copias** (1–5) y pulsas Imprimir. Recuerda la última cantidad.

## Cliente

Default: **Público en General** (mostrador). No preseleccionar “Cliente registrado” cuando el cliente de la orden sea mostrador (flag, nombre “Público en General” o razón “VENTA DE MOSTRADOR”), aunque tenga ID en catálogo.
