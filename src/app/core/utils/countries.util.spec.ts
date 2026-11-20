import { describe, expect, it } from 'vitest';
import { COUNTRIES, isMexicoCountry, resolveCountryName } from './countries.util';

describe('countries.util', () => {
  it('incluye todos los países ISO, sin repetidos', () => {
    expect(COUNTRIES.length).toBe(249);
    expect(new Set(COUNTRIES.map((c) => c.name)).size).toBe(249);
    expect(COUNTRIES.find((c) => c.code === 'UY')?.name).toBe('Uruguay');
  });

  it('conserva los nombres que ya se guardan en BD', () => {
    for (const name of ['México', 'Estados Unidos', 'Canadá', 'China', 'España', 'Perú', 'Reino Unido', 'Alemania']) {
      expect(resolveCountryName(name)).toBe(name);
    }
  });

  it('normaliza mayúsculas, acentos y alias importados', () => {
    expect(resolveCountryName('USA')).toBe('Estados Unidos');
    expect(resolveCountryName('CHINA')).toBe('China');
    expect(resolveCountryName('CANADA')).toBe('Canadá');
    expect(resolveCountryName(' uruguay ')).toBe('Uruguay');
    expect(resolveCountryName('Narnia')).toBeNull();
    expect(resolveCountryName('')).toBeNull();
  });

  it('detecta México con o sin acento', () => {
    expect(isMexicoCountry('Mexico')).toBe(true);
    expect(isMexicoCountry('MÉXICO')).toBe(true);
    expect(isMexicoCountry('Uruguay')).toBe(false);
  });
});
