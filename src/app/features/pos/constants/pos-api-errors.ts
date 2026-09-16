const UUID_PATTERN =
  '[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';

export const POS_API_ERROR_MESSAGES: Record<string, string> = {
  'Código de vendedor no válido': 'El código no existe o pertenece a un usuario POS.',
  'No hay corte global abierto en la sucursal':
    'No hay corte abierto en esta sucursal. La terminal de caja debe abrir el corte del día.',
  'Solo terminales de tipo COBRANZA pueden abrir el corte global':
    'Solo la terminal de caja puede abrir el corte del día.',
  'La orden no está pendiente de cobro': 'Esta venta ya fue cobrada o no está pendiente.',
  'No se puede cobrar una orden en cola':
    'Esta venta está en cola. Caja debe abrir el corte del día para asignarla antes de cobrar.',
  'No se puede cambiar el tipo POS de un usuario con corte global abierto':
    'No se puede modificar este usuario de caja mientras tenga un corte abierto.',
  'La orden está en ventas. Debe enviarse a caja antes de cobrar':
    'Esta venta está en ventas. Debe enviarse a caja antes de cobrar.',
  'No se puede cambiar el tipo POS ni la sucursal mientras hay un corte global abierto. Cierra el corte primero.':
    'Cierra el corte de esta sucursal antes de cambiar.',
  'Este cliente no tiene crédito activo con esta razón social':
    'Este cliente no tiene crédito activo con esta razón social',
  'Selecciona al menos dos formas de pago': 'Selecciona al menos dos formas de pago',
  'Completa RFC, razón social y CP del cliente': 'Completa RFC, razón social y CP del cliente',
  'Esta orden ya fue cobrada': 'Esta orden ya fue cobrada',
};

export function formatPosProductLabel(
  name?: string | null,
  sku?: string | null,
): string {
  return name?.trim() || sku?.trim() || 'este producto';
}

export function posProductLabelsById(
  items?: Array<{ product_id?: string; product_name?: string; product_sku?: string }> | null,
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const item of items ?? []) {
    if (!item.product_id) {
      continue;
    }
    map[item.product_id] = formatPosProductLabel(item.product_name, item.product_sku);
  }
  return map;
}

export function mapPosApiErrorMessage(
  message: string | string[] | undefined | null,
  productLabelsById?: Record<string, string>,
): string {
  const raw = Array.isArray(message) ? message[0] : message;
  if (!raw) {
    return 'Ocurrió un error en el POS.';
  }
  const withoutIds = hideProductIdsInPosMessage(String(raw), productLabelsById);
  const stockMessage = rewriteInsufficientStockMessage(withoutIds);
  const mapped = POS_API_ERROR_MESSAGES[stockMessage] ?? POS_API_ERROR_MESSAGES[withoutIds];
  if (mapped) {
    return mapped;
  }
  const lower = stockMessage.toLowerCase();
  if (lower.includes('crédito insuficiente') || lower.includes('credito insuficiente')) {
    return stockMessage.startsWith('Crédito insuficiente')
      ? stockMessage
      : `Crédito insuficiente. ${stockMessage}`;
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
  if (stockMessage.startsWith('El código') && stockMessage.includes('ya está asignado')) {
    return 'Ese código de vendedor ya está asignado a otro usuario.';
  }
  return stockMessage;
}

function hideProductIdsInPosMessage(
  message: string,
  productLabelsById?: Record<string, string>,
): string {
  let out = message;
  if (productLabelsById) {
    for (const [id, label] of Object.entries(productLabelsById)) {
      if (id && label) {
        out = out.split(id).join(label);
      }
    }
  }
  return out
    .replace(new RegExp(UUID_PATTERN, 'gi'), '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,;:])/g, '$1')
    .trim();
}

function rewriteInsufficientStockMessage(message: string): string {
  const match = message.match(
    /stock insuficiente para el producto\s*(.*?)\.\s*requerido:\s*([^,]+),\s*disponible:\s*(.+)$/i,
  );
  if (!match) {
    return message;
  }
  const product = match[1].trim();
  const needed = match[2].trim();
  const available = match[3].trim();
  if (product) {
    return `No hay stock suficiente de ${product}. Pediste ${needed} y hay ${available} disponible.`;
  }
  return `No hay stock suficiente. Pediste ${needed} y hay ${available} disponible.`;
}
