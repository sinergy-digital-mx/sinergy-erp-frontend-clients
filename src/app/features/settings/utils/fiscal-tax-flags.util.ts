/** Tinyint / boolean de la razón social. Si no viene el dato, se asume habilitado. */
export function isFiscalFlagOn(value: unknown, fallback = true): boolean {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }
  if (value === false || value === 0 || value === '0' || value === 'false') {
    return false;
  }
  return value === true || value === 1 || value === '1' || value === 'true';
}
