# Propiedades de PaymentStats por Tarjeta

## Estructura esperada de `PaymentStats`

Cada tarjeta en el modal de detalles del contrato espera las siguientes propiedades:

### 1. **Tarjeta "Total Pagos"** (Gris)
```
- total_payments: number (total de meses/pagos)
- financed_amount: number (monto financiado)
```
**Muestra:**
- Número grande: cantidad total de pagos
- Texto: "meses"
- Monto: cantidad financiada

---

### 2. **Tarjeta "Pagados"** (Verde)
```
- paid_count: number (cantidad de pagos completos)
- paid_amount_complete: number (monto total pagado en pagos completos)
- paid_amount_partial: number (monto pagado en pagos parciales)
- total_paid_from_payments: number (total pagado = completos + parciales)
```
**Muestra:**
- Número grande: cantidad de pagos completos
- Texto: "completos"
- Cálculo: `paid_count × (paid_amount_complete / paid_count)` = monto por pago
- Si hay parciales: suma `paid_amount_partial` al total

---

### 3. **Tarjeta "Parciales"** (Azul)
```
- partial_count: number (cantidad de pagos parciales)
- partial_overdue_count: number (cantidad de parciales vencidos)
- partial_payment: {
    installment_number: number (número del pago)
    amount_paid: number (monto abonado)
    remaining_amount: number (monto faltante)
    is_overdue: boolean (si está vencido)
  }
```
**Muestra:**
- Número grande: `partial_count + partial_overdue_count`
- Si hay `partial_payment`:
  - Pago #X
  - Abonado: monto pagado
  - Faltante: monto pendiente
- Si hay vencidos: badge rojo con cantidad

---

### 4. **Tarjeta "Pendientes"** (Amarillo)
```
- pending_count: number (cantidad de pagos pendientes)
- pending_overdue_count: number (cantidad de pendientes vencidos)
- total_pending: number (monto total pendiente)
- partial_payment: { remaining_amount: number } (si hay pago parcial)
```
**Muestra:**
- Número grande: `pending_count + pending_overdue_count`
- Texto: "meses"
- Si hay pago parcial: suma el `remaining_amount`
- Monto total pendiente
- Si hay vencidos: badge rojo con cantidad

---

### 5. **Tarjeta "Vencidos"** (Rojo)
```
- overdue_count: number (total de pagos vencidos)
- partial_overdue_count: number (cantidad de parciales vencidos)
- pending_overdue_count: number (cantidad de pendientes vencidos)
```
**Muestra:**
- Número grande: `overdue_count`
- Texto: "meses"
- Desglose: cantidad de pendientes y parciales vencidos

---

## Ejemplo de respuesta correcta

```json
{
  "total_payments": 10,
  "paid_count": 4,
  "pending_count": 5,
  "partial_count": 1,
  "overdue_count": 1,
  "partial_overdue_count": 0,
  "pending_overdue_count": 1,
  "total_paid": 10000,
  "total_paid_from_payments": 10000,
  "paid_amount_complete": 10000,
  "paid_amount_partial": 0,
  "total_pending": 15000,
  "pending_full_payments": 5,
  "total_expected": 25000,
  "financed_amount": 25000,
  "total_price": 50000,
  "down_payment": 25000,
  "paid_months": 4,
  "partial_payment": {
    "installment_number": 5,
    "amount_paid": 2500,
    "remaining_amount": 2500,
    "status": "parcial",
    "is_overdue": false
  },
  "next_payment": {
    "payment_number": 6,
    "due_date": "2026-05-05",
    "amount": 2500
  }
}
```

---

## Qué espera cada propiedad

| Propiedad | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `total_payments` | number | Total de cuotas/meses | 10 |
| `paid_count` | number | Cuotas pagadas completamente | 4 |
| `pending_count` | number | Cuotas pendientes | 5 |
| `partial_count` | number | Cuotas con pago parcial | 1 |
| `overdue_count` | number | Total de cuotas vencidas | 1 |
| `partial_overdue_count` | number | Cuotas parciales vencidas | 0 |
| `pending_overdue_count` | number | Cuotas pendientes vencidas | 1 |
| `paid_amount_complete` | number | Monto pagado en cuotas completas | 10000 |
| `paid_amount_partial` | number | Monto pagado en cuotas parciales | 0 |
| `total_paid_from_payments` | number | Total pagado (completas + parciales) | 10000 |
| `total_pending` | number | Monto total pendiente | 15000 |
| `financed_amount` | number | Monto financiado (sin enganche) | 25000 |
| `partial_payment.installment_number` | number | Número de la cuota parcial | 5 |
| `partial_payment.amount_paid` | number | Monto abonado en la cuota parcial | 2500 |
| `partial_payment.remaining_amount` | number | Monto faltante en la cuota parcial | 2500 |
| `partial_payment.is_overdue` | boolean | Si la cuota parcial está vencida | false |

---

## Errores comunes

❌ **Devolver `$0.0.0`**: Significa que el backend está devolviendo un formato incorrecto o valores nulos
❌ **Devolver "vendidos"**: Eso no es una propiedad de PaymentStats, es del contrato (`status`)
❌ **Devolver "completos"**: Eso es un label, no una propiedad. Usa `paid_count`

---

## Cómo verificar tu respuesta

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Pagos" del contrato
3. Busca en la consola: `Payment stats received:`
4. Verifica que todas las propiedades listadas arriba estén presentes
