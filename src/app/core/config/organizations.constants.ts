/** Madereria Zona Norte — no usa lotes ni contratos inmobiliarios. */
export const MADERERIA_ZONA_NORTE_ORGANIZATION_ID =
  'afff1757-dbcf-4715-a756-6b22bb2c59d5';

/** Costa Campestre Divino — inmobiliario, sin inventario, cotizaciones ni punto de venta. */
export const COSTA_CAMPESTRE_DIVINO_ORGANIZATION_ID =
  '54481b63-5516-458d-9bb3-d4e5cb028864';

export function isMadereriaZonaNorte(
  organizationId: string | null | undefined,
): boolean {
  return organizationId === MADERERIA_ZONA_NORTE_ORGANIZATION_ID;
}

export function isCostaCampestreDivino(
  organizationId: string | null | undefined,
): boolean {
  return organizationId === COSTA_CAMPESTRE_DIVINO_ORGANIZATION_ID;
}
