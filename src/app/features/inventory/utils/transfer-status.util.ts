export function transferStatusLabel(status: string | null | undefined): string {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'in_transit':
      return 'En envío';
    case 'received':
      return 'Recibida';
    case 'received_with_difference':
      return 'Recibida con diferencia';
    case 'completed':
      return 'Completada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return status || '—';
  }
}

export function transferStatusTone(status: string | null | undefined): string {
  switch (status) {
    case 'pending':
      return 'pending';
    case 'in_transit':
      return 'transit';
    case 'received':
    case 'completed':
      return 'ok';
    case 'received_with_difference':
      return 'diff';
    default:
      return 'muted';
  }
}
