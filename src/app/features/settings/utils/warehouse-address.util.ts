export interface WarehouseLocationInput {
  name?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zip_code?: string | null;
  country?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
}

const TEXT_LIMIT = 255;
const POSTAL_LIMIT = 20;

/** Misma regla que el API: null si la dirección del almacén se puede guardar. */
export function describeWarehouseLocationIssue(input: WarehouseLocationInput): string | null {
  const name = readText(input.name);
  const street = readText(input.street);
  const city = readText(input.city);
  const state = readText(input.state);
  const zip = readText(input.zip_code);
  const country = readText(input.country);

  const missing: string[] = [];
  if (street.length < 5) missing.push('calle');
  if (city.length < 2) missing.push('ciudad');
  if (state.length < 2) missing.push('estado');
  if (!zip) missing.push('código postal');
  if (country.length < 2) missing.push('país');

  if (missing.length) {
    return `${warehouseSubject(name)} necesita dirección (${missing.join(', ')}). Usa la de la sucursal o captura una.`;
  }

  if (street.length > TEXT_LIMIT) {
    return `La calle ${ofWarehouse(name)} no puede pasar de ${TEXT_LIMIT} caracteres.`;
  }
  if (city.length > TEXT_LIMIT) {
    return `La ciudad ${ofWarehouse(name)} no puede pasar de ${TEXT_LIMIT} caracteres.`;
  }
  if (state.length > TEXT_LIMIT) {
    return `El estado ${ofWarehouse(name)} no puede pasar de ${TEXT_LIMIT} caracteres.`;
  }
  if (country.length > TEXT_LIMIT) {
    return `El país ${ofWarehouse(name)} no puede pasar de ${TEXT_LIMIT} caracteres.`;
  }
  if (zip.length > POSTAL_LIMIT) {
    return `El código postal ${ofWarehouse(name)} no puede pasar de ${POSTAL_LIMIT} caracteres.`;
  }

  if (isMexico(country) && !/^\d{5}$/.test(zip)) {
    return `El código postal ${ofWarehouse(name)} debe tener 5 dígitos. Usa la dirección de la sucursal o corrige el C.P.`;
  }
  if (!isMexico(country) && !/^[A-Za-z0-9][A-Za-z0-9 -]{2,19}$/.test(zip)) {
    return `El código postal ${ofWarehouse(name)} no es válido. Usa la dirección de la sucursal o corrige el C.P.`;
  }

  const latitude = readCoord(input.latitude);
  const longitude = readCoord(input.longitude);
  if (latitude === 'invalid' || longitude === 'invalid') {
    return `Las coordenadas ${ofWarehouse(name)} no son válidas. Déjalas vacías o ubica el almacén en el mapa.`;
  }
  if ((latitude == null) !== (longitude == null)) {
    return `${warehouseSubject(name)} necesita latitud y longitud juntas, o ninguna. Ubícalo en el mapa o borra la coordenada suelta.`;
  }
  if (typeof latitude === 'number' && (latitude < -90 || latitude > 90)) {
    return `La latitud ${ofWarehouse(name)} debe estar entre -90 y 90.`;
  }
  if (typeof longitude === 'number' && (longitude < -180 || longitude > 180)) {
    return `La longitud ${ofWarehouse(name)} debe estar entre -180 y 180.`;
  }

  return null;
}

function warehouseSubject(name: string): string {
  return name ? `El almacén "${name}"` : 'Este almacén';
}

function ofWarehouse(name: string): string {
  return name ? `del almacén "${name}"` : 'del almacén';
}

function readText(value: unknown): string {
  return String(value ?? '').trim();
}

function readCoord(value: unknown): number | null | 'invalid' {
  if (value === null || value === undefined || value === '') return null;
  const parsed = typeof value === 'number' ? value : Number(String(value).trim());
  if (!Number.isFinite(parsed)) return 'invalid';
  return Number(parsed.toFixed(6));
}

function isMexico(country: string): boolean {
  const normalized = country
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return normalized === 'mexico' || normalized === 'mx';
}
