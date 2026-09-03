export const POS_API_ERROR_MESSAGES: Record<string, string> = {
  'Código de vendedor no válido': 'El código no existe o pertenece a un usuario POS.',
  'No hay corte global abierto en la sucursal':
    'No hay corte abierto en esta sucursal. La terminal de cobranza debe abrir el corte del día.',
  'Solo terminales de tipo COBRANZA pueden abrir el corte global':
    'Solo la terminal de cobranza puede abrir el corte del día.',
  'La orden no está pendiente de cobro': 'Esta venta ya fue cobrada o no está pendiente.',
  'No se puede cobrar una orden en cola':
    'Esta venta está en cola. Cobranza debe abrir el corte del día para asignarla antes de cobrar.',
  'No se puede cambiar el tipo POS de un usuario con corte global abierto':
    'No se puede modificar este usuario COBRANZA mientras tenga un corte abierto.',
  'No se puede cambiar el tipo POS ni la sucursal mientras hay un corte global abierto. Cierra el corte primero.':
    'Cierra el corte de esta sucursal antes de cambiar.',
  'Este cliente no tiene crédito activo con esta razón social':
    'Este cliente no tiene crédito activo con esta razón social',
  'Selecciona al menos dos formas de pago': 'Selecciona al menos dos formas de pago',
  'Completa RFC, razón social y CP del cliente': 'Completa RFC, razón social y CP del cliente',
  'Esta orden ya fue cobrada': 'Esta orden ya fue cobrada',
};

export function mapPosApiErrorMessage(message: string | undefined | null): string {
  if (!message) {
    return 'Ocurrió un error en el POS.';
  }
  const mapped = POS_API_ERROR_MESSAGES[message];
  if (mapped) {
    return mapped;
  }
  const lower = message.toLowerCase();
  if (lower.includes('crédito insuficiente') || lower.includes('credito insuficiente')) {
    return message.startsWith('Crédito insuficiente') ? message : `Crédito insuficiente. ${message}`;
  }
  if (lower.includes('no tiene crédito') || lower.includes('no tiene credito')) {
    return 'Este cliente no tiene crédito activo con esta razón social';
  }
  if (lower.includes('ya fue cobrada') || lower.includes('ya está cobrada') || lower.includes('ya esta cobrada')) {
    return 'Esta orden ya fue cobrada';
  }
  if (lower.includes('al menos dos')) {
    return 'Selecciona al menos dos formas de pago';
  }
  if (lower.includes('rfc') && (lower.includes('razón social') || lower.includes('razon social'))) {
    return 'Completa RFC, razón social y CP del cliente';
  }
  if (message.startsWith('El código') && message.includes('ya está asignado')) {
    return 'Ese código de vendedor ya está asignado a otro usuario.';
  }
  return message;
}
