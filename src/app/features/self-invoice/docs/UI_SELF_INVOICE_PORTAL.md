# UI — Portal de autofactura

Rutas públicas **sin login** ni JWT: `/facturar` y `/facturar/:code`. Query `email` opcional (viene del QR).

El backend arma XML, timbra, genera el folio y mete QR + link en el ticket. Pollux **no** dibuja el QR: el POS sigue imprimiendo `receipt.escpos_base64`.

## Flujo

1. Sin `:code`: campo **Número de recibo** → `GET /api/public/self-invoice/{code}`. 404: *Recibo no encontrado. Revisa el folio completo.*
2. Preview: empresa, sucursal, total (solo lectura), folio.
3. Si `already_invoiced`: solo Descargar PDF / XML.
4. Paso 1: correo + teléfono → `POST .../identify`. `matched` autofill CSF; si no, form vacío (no decir que el cliente no existe).
5. Paso 2: mismos campos que **Editar Cliente → Información Fiscal** + catálogos SAT del GET (`uso_cfdi`, régimen, forma/método de pago).
6. `POST .../stamp`. Error SAT (`message`): toast y se queda en el form. *Este recibo ya tiene una factura vigente*: pantalla de descargas.

PDF: `pdf_url` o `GET .../invoice/pdf` → `signedUrl`. XML: `GET .../invoice/xml` (blob).

## POS

Tras cobro, el ESC/POS ya trae folio público, URL y QR. Campos extra: `receipt.public_invoice_code`, `receipt.self_invoice_url`. Tickets viejos: regenerar en cobranza.
