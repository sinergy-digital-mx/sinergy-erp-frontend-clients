import {
  normalizeCustomerListPrefilter,
  shouldPrefilterCustomerList,
} from './customer-list-prefilter.util';

describe('customer-list-prefilter', () => {
  it('normaliza valores desconocidos a sellers', () => {
    expect(normalizeCustomerListPrefilter(undefined)).toBe('sellers');
    expect(normalizeCustomerListPrefilter('off')).toBe('off');
  });

  it('solo vendedores entran prefiltrados cuando el modo es sellers', () => {
    expect(shouldPrefilterCustomerList('sellers', false)).toBe(true);
    expect(shouldPrefilterCustomerList('sellers', true)).toBe(false);
    expect(shouldPrefilterCustomerList('everyone', true)).toBe(true);
    expect(shouldPrefilterCustomerList('off', false)).toBe(false);
  });
});
