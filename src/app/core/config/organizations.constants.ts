/** Madereria Zona Norte — no usa lotes ni contratos inmobiliarios. */
export const MADERERIA_ZONA_NORTE_ORGANIZATION_ID =
  'afff1757-dbcf-4715-a756-6b22bb2c59d5';

export function isMadereriaZonaNorte(
  organizationId: string | null | undefined,
): boolean {
  return organizationId === MADERERIA_ZONA_NORTE_ORGANIZATION_ID;
}
