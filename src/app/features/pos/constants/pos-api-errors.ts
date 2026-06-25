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
};

export function mapPosApiErrorMessage(message: string | undefined | null): string {
  if (!message) {
    return 'Ocurrió un error en el POS.';
  }
  if (message.startsWith('El código') && message.includes('ya está asignado')) {
    return 'Ese código de vendedor ya está asignado a otro usuario en el tenant.';
  }
  return POS_API_ERROR_MESSAGES[message] ?? message;
}
