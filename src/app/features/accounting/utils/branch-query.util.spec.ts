import { describe, expect, it } from 'vitest';
import {
  ALL_BRANCHES_QUERY,
  branchIdFromQuery,
  branchQueryFromId,
  isAllBranchesQuery,
  sharedBranchIdFromParams,
} from './branch-query.util';

describe('branch query', () => {
  it('guarda el id de la sucursal y usa all cuando no hay filtro', () => {
    expect(branchQueryFromId('br-1')).toBe('br-1');
    expect(branchQueryFromId('  ')).toBe(ALL_BRANCHES_QUERY);
    expect(branchQueryFromId('')).toBe('all');
  });

  it('restaura el id y trata all como todas las sucursales', () => {
    expect(branchIdFromQuery('br-1')).toBe('br-1');
    expect(branchIdFromQuery(' all ')).toBe('');
    expect(branchIdFromQuery(null)).toBe('');
    expect(branchIdFromQuery(undefined)).toBe('');
    expect(isAllBranchesQuery('all')).toBe(true);
    expect(isAllBranchesQuery('br-1')).toBe(false);
    expect(isAllBranchesQuery(null)).toBe(false);
  });

  it('lee la sucursal compartida y no pisa un all con el parámetro viejo', () => {
    const params = (values: Record<string, string>) => ({
      has: (name: string) => Object.prototype.hasOwnProperty.call(values, name),
      get: (name: string) => values[name] ?? null,
    });
    expect(sharedBranchIdFromParams(params({ billing_branch_id: 'br-1' }))).toBe('br-1');
    expect(sharedBranchIdFromParams(params({ billing_branch_id: 'all', debt_branch_id: 'br-2' }))).toBe('');
    expect(sharedBranchIdFromParams(params({ debt_branch_id: 'br-2' }))).toBe('br-2');
    expect(sharedBranchIdFromParams(params({}))).toBe('');
  });
});
