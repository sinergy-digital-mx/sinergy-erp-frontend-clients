import { describe, expect, it } from 'vitest';
import {
  ALL_BRANCHES_QUERY,
  branchIdFromQuery,
  branchQueryFromId,
  isAllBranchesQuery,
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
});
