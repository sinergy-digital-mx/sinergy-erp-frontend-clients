/** Tres tipos de documento de OV. El PDF A4 de salida es ENTREGA, no RECIBO. */
export type SalesOrderDocumentKind = 'original' | 'delivery' | 'ticket' | 'unknown';

function normalizeTypeName(typeName: string | null | undefined): string {
  return (typeName || '').trim().toUpperCase();
}

export function getSalesOrderDocumentKind(
  typeName: string | null | undefined
): SalesOrderDocumentKind {
  const type = normalizeTypeName(typeName);
  if (type === 'DOCUMENTO_ORIGINAL') {
    return 'original';
  }
  if (type === 'ENTREGA') {
    return 'delivery';
  }
  if (type === 'TICKET / RECIBO' || type === 'TICKET_RECIBO') {
    return 'ticket';
  }
  // Dato viejo: el A4 se copió de OC como RECIBO (receipt ≠ entrega).
  if (type === 'RECIBO' || type === 'DOCUMENTO_RECIBO') {
    return 'delivery';
  }
  return 'unknown';
}

/** Chip de la tabla. RECIBO legado se pinta como Entrega. */
export function getSalesOrderDocumentChipLabel(typeName: string | null | undefined): string {
  switch (getSalesOrderDocumentKind(typeName)) {
    case 'original':
      return 'Original';
    case 'delivery':
      return 'Entrega';
    case 'ticket':
      return 'Ticket';
    default:
      return (typeName || '').trim() || '—';
  }
}

export function isSalesOrderTicketDocument(typeName: string | null | undefined): boolean {
  return getSalesOrderDocumentKind(typeName) === 'ticket';
}

/** El API aún manda RECIBO en el PDF A4: hay que regenerar. */
export function isLegacySalesOrderReciboType(typeName: string | null | undefined): boolean {
  const type = normalizeTypeName(typeName);
  return type === 'RECIBO' || type === 'DOCUMENTO_RECIBO';
}
