# UI — POS Ventas: tomar pedido

Contrato de API en `sinergy-erp-backend-clients/src/api/pos-shifts/docs/UI_POS_FLOW.md`.

## Cliente

Fila del carrito:

- Sin cliente: hint de mostrador + botón **Existente** (abre el picker).
- Con cliente: iniciales + nombre + botón **Cambiar** + quitar.

El botón no debe mostrar ambos textos a la vez.

## Cambios

### 2026-10-22

Chrome Translate partía el DOM de Angular y apilaba **Cambiar** / **Existente** (y nombres/precios). La app queda en `lang="es"` con `translate="no"` / `notranslate` para que el navegador no la traduzca.

Los anticipos que caja devolvió salen en **Tickets** (`kind: "advance"`). Al abrirlos se carga la cotización y **Enviar a caja** reabre el diálogo de anticipo con el monto anterior.
