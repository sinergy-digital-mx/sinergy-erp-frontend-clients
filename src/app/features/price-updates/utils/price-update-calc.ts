/** Misma fórmula que el backend en price-update.util.ts. */

export interface PriceListColumn {
  id: string;
  name: string;
  list_number: number | null;
  margin_percent: number | null;
  label: string;
}

export interface PriceUom {
  id: string;
  name: string;
  factor: number;
  is_base: boolean;
}

export interface SavedPrice {
  price_list_id: string;
  product_uom_id: string;
  price: number;
}

export interface PurchaseRef {
  folio: string;
  purchased_at: string;
}

export interface PriceUpdateApiRow {
  id: string;
  sku: string;
  code: string;
  name: string;
  uoms: PriceUom[];
  cost_1: number | null;
  cost_2: number | null;
  average_cost: number | null;
  purchase_1: PurchaseRef | null;
  purchase_2: PurchaseRef | null;
  prices: SavedPrice[];
}

export interface ViewSlot {
  key: string;
  listId: string;
  uomId: string | null;
  uomName: string;
  uomTitle: string;
  factor: number;
  price: number | null;
  calculated: number | null;
  manual: boolean;
  suggested: boolean;
  text: string;
  groupStart: boolean;
}

export interface ViewRow {
  id: string;
  code: string;
  name: string;
  baseLabel: string;
  uoms: PriceUom[];
  prices: SavedPrice[];
  cost1: number | null;
  cost2: number | null;
  average: number | null;
  cost1Text: string;
  cost2Text: string;
  averageText: string;
  purchase1Title: string;
  purchase2Title: string;
  slots: ViewSlot[];
}

const money = new Intl.NumberFormat('es-MX', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
});

export function meanCost(costs: Array<number | null>): number | null {
  const values = costs.filter((value): value is number => value != null && Number.isFinite(value));
  if (!values.length) return null;
  return round4(values.reduce((sum, value) => sum + value, 0) / values.length);
}

export function priceFromMargin(
  averageCost: number,
  marginPercent: number,
  uomFactor: number,
  baseFactor: number,
): number {
  const base = baseFactor > 0 ? baseFactor : 1;
  const factor = (uomFactor > 0 ? uomFactor : 1) / base;
  return round4(averageCost * factor * (1 + marginPercent / 100));
}

export function formatMoney(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return '—';
  return money.format(value);
}

export function editorValue(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return '';
  return String(round4(value));
}

export function parseAmount(raw: string): number | null | 'invalid' {
  const text = raw.trim().replace(/\s/g, '');
  if (!text) return null;
  const normalized = text.includes('.') ? text.replace(/,/g, '') : text.replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(normalized)) return 'invalid';
  return round4(Number(normalized));
}

export function toView(row: PriceUpdateApiRow, lists: PriceListColumn[]): ViewRow {
  const view: ViewRow = {
    id: row.id,
    code: row.code,
    name: row.name,
    baseLabel: row.uoms[0] ? `Base: ${row.uoms[0].name}` : 'Sin unidad',
    uoms: row.uoms,
    prices: row.prices,
    cost1: row.cost_1,
    cost2: row.cost_2,
    average: row.average_cost,
    cost1Text: '',
    cost2Text: '',
    averageText: '',
    purchase1Title: purchaseTitle(row.purchase_1, 'Última compra, en unidad base'),
    purchase2Title: purchaseTitle(row.purchase_2, 'Compra anterior, en unidad base'),
    slots: [],
  };
  return refreshView(view, lists);
}

export function refreshView(row: ViewRow, lists: PriceListColumn[]): ViewRow {
  const baseFactor = row.uoms[0]?.factor ?? 1;
  const slots: ViewSlot[] = [];
  for (const list of lists) {
    for (let index = 0; index < 2; index += 1) {
      const uom = row.uoms[index] ?? null;
      const saved = uom
        ? row.prices.find(
            (price) => price.price_list_id === list.id && price.product_uom_id === uom.id,
          )
        : undefined;
      const calculated =
        uom && row.average != null && list.margin_percent != null
          ? priceFromMargin(row.average, list.margin_percent, uom.factor, baseFactor)
          : null;
      const price = saved ? saved.price : null;
      const manual =
        price != null && calculated != null && Math.abs(price - calculated) > 0.0001;
      const shown = price ?? calculated;
      slots.push({
        key: uom ? `${list.id}:${uom.id}` : `${list.id}:empty:${index}`,
        listId: list.id,
        uomId: uom?.id ?? null,
        uomName: uom?.name ?? '',
        uomTitle: uom ? `${uom.name}${uom.factor !== 1 ? ` × ${uom.factor}` : ''}` : '',
        factor: uom?.factor ?? 1,
        price,
        calculated,
        manual,
        suggested: price == null && calculated != null,
        text: formatMoney(shown),
        groupStart: index === 0,
      });
    }
  }
  return {
    ...row,
    cost1Text: formatMoney(row.cost1),
    cost2Text: formatMoney(row.cost2),
    averageText: formatMoney(row.average),
    slots,
  };
}

export function applyMarginPrices(row: ViewRow, lists: PriceListColumn[]): ViewRow {
  if (row.average == null || row.uoms.length === 0) return refreshView(row, lists);
  const baseFactor = row.uoms[0]?.factor ?? 1;
  const prices = row.prices.filter(
    (price) => !lists.some((list) => list.id === price.price_list_id && list.margin_percent != null),
  );
  for (const list of lists) {
    if (list.margin_percent == null) continue;
    for (const uom of row.uoms) {
      prices.push({
        price_list_id: list.id,
        product_uom_id: uom.id,
        price: priceFromMargin(row.average, list.margin_percent, uom.factor, baseFactor),
      });
    }
  }
  return refreshView({ ...row, prices }, lists);
}

function purchaseTitle(purchase: PurchaseRef | null, fallback: string): string {
  if (!purchase) return fallback;
  return `${purchase.folio} · ${shortDate(purchase.purchased_at)}. ${fallback}`;
}

function shortDate(value: string): string {
  const date = new Date(value.includes('T') ? value : value.replace(' ', 'T'));
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return date.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
}

function round4(value: number): number {
  return Number((Number(value) || 0).toFixed(4));
}
