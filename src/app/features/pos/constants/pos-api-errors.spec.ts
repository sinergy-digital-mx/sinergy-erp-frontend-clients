import { describe, expect, it } from 'vitest';
import { mapPosApiErrorMessage, posProductLabelsById } from './pos-api-errors';

describe('mapPosApiErrorMessage', () => {
  const productId = '6af9755e-a241-4493-8a5d-651e858a98a0';

  it('reemplaza el id de stock insuficiente por el nombre del carrito', () => {
    const labels = posProductLabelsById([
      {
        product_id: productId,
        product_name: 'ALDER 4/4 SELECTO 1-CARA',
        product_sku: 'ALS1',
      },
    ]);

    const msg = mapPosApiErrorMessage(
      `Stock insuficiente para el producto ${productId}. Requerido: 2, disponible: 0`,
      labels,
    );

    expect(msg).toBe(
      'No hay stock suficiente de ALDER 4/4 SELECTO 1-CARA. Pediste 2 y hay 0 disponible.',
    );
    expect(msg).not.toContain('ALS1');
    expect(msg).not.toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-/i);
  });

  it('nunca deja un UUID aunque no haya nombre en el carrito', () => {
    const msg = mapPosApiErrorMessage(
      `Stock insuficiente para el producto ${productId}. Requerido: 2, disponible: 0`,
    );

    expect(msg).toBe('No hay stock suficiente. Pediste 2 y hay 0 disponible.');
    expect(msg).not.toContain(productId);
  });
});
