/** Campos comunes de un producto en insights del cliente. */
export interface ProductInsightBase {
  product_id: string;
  name: string | null;
  sku: string | null;
  photo: string | null;
  category_id: string | null;
  category_name: string | null;
  subcategory_id: string | null;
  subcategory_name: string | null;
}

/** Producto agrupado de OV no canceladas, ordenado por cantidad total. */
export interface MostPurchasedProduct extends ProductInsightBase {
  times_ordered: number;
  total_quantity: number;
  total_amount: number;
  last_purchased_at: string | null;
}

export type ProductInsightReason = 'same_subcategory' | 'same_category';

/** Producto activo de la misma subcategoría/categoría que el cliente aún no ha comprado. */
export interface RecommendedProduct extends ProductInsightBase {
  reason: ProductInsightReason | string;
  reason_label: string;
}

export interface CustomerProductInsights {
  customer_id: number;
  most_purchased: MostPurchasedProduct[];
  recommended: RecommendedProduct[];
}

export interface CustomerProductInsightsQuery {
  most_purchased_limit?: number;
  recommended_limit?: number;
}
