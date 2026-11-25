# UI — POS Caja: método de pago

Contrato de API en `sinergy-erp-backend-clients/src/api/pos-shifts/docs/UI_POS_FLOW.md`.

## Tabs

Grid **3 columnas** de botones con icono + etiqueta. Nunca 4 o 5 en una sola fila.

Fila 1: Efectivo · Transferencia · Tarjeta  
Fila 2: Cheque · Mixto · Crédito (Crédito solo si el cliente lo tiene en esa razón social)

## Cambios

### 2026-11-25

En **Folios** de caja, la carta muestra la empresa y, debajo y más chica, la persona cuando son distintas. Sigue listando solo órdenes con saldo.

### 2026-11-24

En el cuadrito de **Corte abierto**, al pasar el cursor la terminal sale abajo como submenú. La barra no crece y no empuja el resto.

**Folios** en la barra (y Ctrl+Q) lista órdenes con saldo de la sucursal y la razón social de la sesión. **Abonar** registra el pago en la orden y el dinero en el corte abierto. Sin corte abierto no se registra. Los anticipos no entran.

En la barra de caja, el clic en el cuadrito de **Sucursal** abre el cambio. Ya no hace falta el texto Cambiar.

En el modal de imprimir, el campo de **Copias** queda corto (menos, número, más) y el ícono del botón Imprimir queda del tamaño del texto.

### 2026-11-23

En **Tarjeta** y en cada tarjeta de **Mixto** se elige Débito o Crédito. Pueden ser distintas. Si caja cambia el cliente antes de cobrar, ese cliente queda en la orden. Caja mantiene abierto un aviso en vivo: si Ventas regresa el folio que está cobrando, se suelta al momento y sale la ventana «{vendedor} regresó {folio} a POS Ventas». El latido de unos segundos queda de respaldo, con el mismo texto. **Ctrl+Q** (abonos) sigue pendiente; la **i** de la barra lo dice. F2 queda para el navegador.

### 2026-11-02

En **Cheque** (también dentro de mixto) hay dos botones: Pesos y Dólares. Un cheque es de una sola moneda. En dólares se usa el tipo de cambio del corte y se muestra a cuántos pesos equivale. El número, el nombre y el teléfono siguen igual.

En **Efectivo** hay tres botones: Pesos, Dólares y Ambas. Cada moneda tiene sus billetes y su monto. Si ocultas una, lo ya capturado sigue aplicado.

En **Mixto**, la tarjeta de efectivo pide pesos y dólares (aplica y recibió). Los dólares se suman al total con el tipo de cambio del cobro. El cambio sale en la moneda en que sobró.

### 2026-11-01

Al elegir el método de pago:

- **Transferencia** (también dentro de mixto): nombre o razón social. Con uno basta. No pide teléfono.
- **Tarjeta** y **cheque** (también dentro de mixto): nombre y teléfono de 10 dígitos. En varias tarjetas, el nombre y el teléfono van en la primera.
- Efectivo y crédito no piden esos datos.

Si el cliente ya tiene nombre, razón social o teléfono, se prellenan y se pueden cambiar. En público en general, si el ticket no trae nombre o teléfono, se copian de estos campos. Quedan en el desglose del cobro y en el ticket.

El crédito de la razón social es en pesos o en dólares (`credit_currency`). Si la orden está en la otra moneda, caja la convierte con el tipo de cambio de esa orden y lo compara con el disponible. La barra muestra la moneda del crédito.

### 2026-10-22

En anticipos (`kind: "advance"`) también sale **Mixto**. Crédito no. El desglose es el mismo que en una venta: efectivo, transferencia, tarjeta y/o cheque; mínimo dos. Solo el efectivo de ese mixto entra a caja.

**Regresar a ventas** también sale en el anticipo seleccionado. Misma confirmación y permiso `pos:ReturnToSales`. El folio COT aparece en Tickets de POS Ventas.

Badge **Anticipo** en la lista y en el folio. Debajo del cliente: RFC, razón social, CP y régimen. **Editar RFC** abre la pestaña fiscal. Si el RFC y el tipo de persona no cuadran, aviso con Corregir RFC / Regresar a ventas. El cobro ya no manda 612 sobre un RFC de persona moral.

## Mixto

El cajero elige formas con **botones** 2×2 (no checkboxes nativos). Mínimo dos.

Cada forma activa es **una tarjeta aparte**, numerada **Pago 1**, **Pago 2**. El resto que falta se completa con el botoncito **Completar resto** en el header de esa tarjeta.

Al escribir un monto, el último método marcado recibe la diferencia. Crédito no entra en mixto.

Inputs de monto (efectivo manual, mixto, TC, etc.): vacíos si el valor es 0. Nunca mostrar `0` para no obligar a borrar antes de teclear. Placeholder `0.00`.

En tarjeta, el campo opcional es **Número de voucher** (referencia del ticket de la terminal). No pedir últimos 4 dígitos.

## Ticket

Al cobrar (si está activo “Imprimir ticket al confirmar cobro”) se abre el modal de vista previa. Ahí eliges **Copias** (1–5) con un control corto (− número +) y pulsas Imprimir. Recuerda la última cantidad.

## Cliente

Default: **Público en General** (mostrador). No preseleccionar “Cliente registrado” cuando el cliente de la orden sea mostrador (flag, nombre “Público en General” o razón “VENTA DE MOSTRADOR”), aunque tenga ID en catálogo.
