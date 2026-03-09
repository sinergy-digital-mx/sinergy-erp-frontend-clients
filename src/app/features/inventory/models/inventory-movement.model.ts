/**
 * Movement type enum
 */
export type MovementType = 
  | 'Entrada' 
  | 'Salida' 
  | 'Ajuste' 
  | 'Transferencia' 
  | 'Reserva' 
  | 'Liberación';

/**
 * Inventory Movement entity
 */
export interface InventoryMovement {
  id: string;
  tenant_id: string;
  product_id: string;
  warehouse_id: string;
  movement_type: MovementType;
  quantity: number;
  unit_cost?: number;
  reference_type?: string;
  reference_id?: string;
  notes?: string;
  created_by: string;
  product?: {
    id: string;
    name: string;
    sku: string;
  };
  warehouse?: {
    id: string;
    name: string;
  };
  created_at: string;
}
