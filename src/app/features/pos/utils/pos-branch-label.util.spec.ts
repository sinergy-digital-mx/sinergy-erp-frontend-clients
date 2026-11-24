import { describe, expect, it } from 'vitest';
import { posBranchCity, posBranchName, posBranchTitle } from './pos-branch-label.util';

describe('pos-branch-label.util', () => {
  it('la barra usa solo el nombre aunque el display traiga la ciudad', () => {
    const branch = {
      id: '1',
      code: 'BUENOS AIRES',
      city: 'Tijuana',
      display_name: 'BUENOS AIRES — Tijuana',
    };
    expect(posBranchName(branch)).toBe('BUENOS AIRES');
    expect(posBranchTitle(branch)).toBe('Buenos Aires');
    expect(posBranchCity(branch)).toBe('Tijuana');
  });

  it('si no hay separador, el nombre es el display y la ciudad sale del campo', () => {
    const branch = {
      id: '2',
      code: 'CENTRO',
      city: 'Mexicali',
      display_name: 'CENTRO',
    };
    expect(posBranchTitle(branch)).toBe('Centro');
    expect(posBranchCity(branch)).toBe('Mexicali');
  });
});
