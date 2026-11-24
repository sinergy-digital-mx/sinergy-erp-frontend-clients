export interface PosBranchStockBranch {
  id: string;
  name: string;
  city: string | null;
}

export interface PosBranchStockCell {
  billing_branch_id: string;
  quantity: string;
  uom_name: string | null;
}

export interface PosBranchStockProduct {
  product_id: string;
  sku: string;
  name: string;
  uom_name: string;
  total_quantity: string;
  branches: PosBranchStockCell[];
}

export interface PosBranchStockResponse {
  search: string;
  has_more: boolean;
  branches: PosBranchStockBranch[];
  products: PosBranchStockProduct[];
}

export function normalizePosBranchStock(raw: unknown): PosBranchStockResponse {
  const root = unwrapBranchStock(raw);
  const branches = Array.isArray(root['branches']) ? root['branches'] : [];
  const products = Array.isArray(root['products']) ? root['products'] : [];
  return {
    search: text(root['search']),
    has_more: Boolean(root['has_more']),
    branches: branches.map(normalizeBranch).filter((branch) => branch.id),
    products: products.map(normalizeProduct).filter((product) => product.product_id),
  };
}

function unwrapBranchStock(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== 'object') {
    return {};
  }
  const root = raw as Record<string, unknown>;
  const inner = root['data'];
  if (inner && typeof inner === 'object' && !Array.isArray(inner)) {
    const payload = inner as Record<string, unknown>;
    if ('products' in payload || 'branches' in payload) {
      return payload;
    }
  }
  return root;
}

function normalizeBranch(raw: unknown): PosBranchStockBranch {
  const row = asRecord(raw);
  return {
    id: text(row['id']),
    name: text(row['name']),
    city: text(row['city']) || null,
  };
}

function normalizeProduct(raw: unknown): PosBranchStockProduct {
  const row = asRecord(raw);
  const branches = Array.isArray(row['branches']) ? row['branches'] : [];
  return {
    product_id: text(row['product_id']),
    sku: text(row['sku']),
    name: text(row['name']) || 'Producto',
    uom_name: text(row['uom_name']) || 'Pieza',
    total_quantity: text(row['total_quantity']) || '0',
    branches: branches.map(normalizeCell).filter((cell) => cell.billing_branch_id),
  };
}

function normalizeCell(raw: unknown): PosBranchStockCell {
  const row = asRecord(raw);
  const uom = text(row['uom_name']);
  return {
    billing_branch_id: text(row['billing_branch_id']),
    quantity: text(row['quantity']) || '0',
    uom_name: uom || null,
  };
}

function asRecord(raw: unknown): Record<string, unknown> {
  return raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
}

function text(value: unknown): string {
  return value == null ? '' : String(value).trim();
}
