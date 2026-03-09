import { UnitOfMeasure } from './line-item.model';

/**
 * Product entity (from external module)
 */
export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  cost: number;
  base_uom_id: string;
  uoms: UnitOfMeasure[];
}
