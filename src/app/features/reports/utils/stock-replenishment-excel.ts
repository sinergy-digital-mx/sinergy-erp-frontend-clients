export interface ReplenishmentExcelBranch {
  id: string;
  name: string;
}

export interface ReplenishmentExcelCell {
  onHand: number;
  sold: number;
  difference: number;
}

export interface ReplenishmentExcelRow {
  sku: string;
  externalSku: string | null;
  name: string;
  uom: string | null;
  status: string;
  cells: ReplenishmentExcelCell[];
  averagePrice: number | null;
  unitCost: number | null;
  unitMargin: number | null;
  marginPercent: number | null;
  minStock: number;
  maxStock: number;
  daysOfCover: number | null;
  recommendedQty: number;
  orderQty: number;
}

export interface StockReplenishmentExcelInput {
  vendorName: string;
  rfc: string | null;
  periodLabel: string;
  periodDays: number;
  coverDays: number;
  exchangeRate: number | null;
  filterNote: string | null;
  branches: ReplenishmentExcelBranch[];
  rows: ReplenishmentExcelRow[];
  totals: {
    cells: ReplenishmentExcelCell[];
    potentialSales: number;
    potentialProfit: number;
    marginPercent: number | null;
    investment: number;
    recommendedQty: number;
    orderQty: number;
    toBuyCount: number;
    productCount: number;
  };
}

const TITLE = 'FF14624A';
const INK = 'FF0F172A';
const MUTED = 'FF64748B';
const WHITE = 'FFFFFFFF';
const LINE = 'FFE2E8F0';
const ZEBRAS = ['FFFFFFFF', 'FFF8FAFC'];
const TOTAL = 'FFF1F5F9';
const BUY = 'FFFFFBEB';
const BUY_HEAD = 'FFFDE68A';
const BUY_INK = 'FF92400E';
const NEG = 'FFB91C1C';
const TONES = ['FFE8EEF5', 'FFE3F5EC', 'FFEEEFFE', 'FFFFF1DF'];
const TONE_INK = ['FF334155', 'FF14624A', 'FF3730A3', 'FF9A3412'];

const QTY_FMT = '#,##0.###';
const MONEY_FMT = '"$"#,##0.00';
const PCT_FMT = '0.0"%"';

type Worksheet = import('exceljs').Worksheet;
type Cell = import('exceljs').Cell;

export async function downloadStockReplenishmentExcel(input: StockReplenishmentExcelInput): Promise<void> {
  const buffer = await buildStockReplenishmentExcel(input);
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = replenishmentExcelFilename(input.vendorName);
  anchor.click();
  URL.revokeObjectURL(url);
}

export function replenishmentExcelFilename(vendorName: string): string {
  const day = new Date().toISOString().slice(0, 10);
  return `requerimiento-${slug(vendorName)}-${day}.xlsx`;
}

export async function buildStockReplenishmentExcel(
  input: StockReplenishmentExcelInput,
): Promise<ArrayBuffer> {
  const excel = await loadExcel();
  const workbook = new excel.Workbook();
  workbook.creator = 'Polux ERP';
  workbook.created = new Date();
  const sheet = workbook.addWorksheet('Requerimiento', {
    properties: { defaultRowHeight: 18, tabColor: { argb: TITLE } },
    pageSetup: {
      orientation: 'landscape',
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      paperSize: 9,
      horizontalCentered: true,
      margins: { left: 0.4, right: 0.4, top: 0.55, bottom: 0.45, header: 0.2, footer: 0.25 },
    },
    headerFooter: {
      oddFooter: '&LReporte de requerimiento&RPágina &P de &N',
    },
    views: [{ state: 'frozen', xSplit: 3, ySplit: 5, showGridLines: false }],
  });

  const colCount = 4 + input.branches.length * 3 + 10;
  sheet.columns = columnWidths(input.branches.length).map((width) => ({ width }));

  paintTitle(sheet, colCount);
  paintContext(sheet, colCount, input);
  paintMetrics(sheet, input);
  paintHeaders(sheet, input.branches);

  input.rows.forEach((row, index) => {
    paintDataRow(sheet, 6 + index, row, index);
  });

  const totalRow = 6 + input.rows.length;
  paintTotals(sheet, totalRow, input);
  paintNote(sheet, totalRow + 1, colCount);

  sheet.autoFilter = {
    from: { row: 5, column: 1 },
    to: { row: Math.max(5, totalRow - 1), column: colCount },
  };
  sheet.pageSetup.printTitlesRow = '1:5';

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer as ArrayBuffer;
}

async function loadExcel(): Promise<typeof import('exceljs')> {
  const loaded = await import('exceljs');
  return (loaded.default ?? loaded) as typeof import('exceljs');
}

function paintTitle(sheet: Worksheet, colCount: number): void {
  const row = sheet.getRow(1);
  row.height = 26;
  sheet.mergeCells(1, 1, 1, colCount);
  const cell = row.getCell(1);
  cell.value = 'Reporte de requerimiento';
  cell.font = { name: 'Calibri', bold: true, size: 16, color: { argb: WHITE } };
  cell.fill = solid(TITLE);
  cell.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
}

function paintContext(sheet: Worksheet, colCount: number, input: StockReplenishmentExcelInput): void {
  const row = sheet.getRow(2);
  row.height = 20;
  sheet.mergeCells(2, 1, 2, colCount);
  const parts = [
    input.vendorName,
    input.rfc ? `RFC ${input.rfc}` : '',
    input.periodLabel,
    `Ventas ${input.periodDays} días`,
    `Cubrir ${input.coverDays} días`,
    input.exchangeRate ? `TC ${input.exchangeRate}` : '',
    input.filterNote ? `Filtro: ${input.filterNote}` : '',
  ].filter(Boolean);
  const cell = row.getCell(1);
  cell.value = parts.join('   ·   ');
  cell.font = { name: 'Calibri', size: 10, color: { argb: MUTED } };
  cell.fill = solid('FFF8FAFC');
  cell.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
}

function paintMetrics(sheet: Worksheet, input: StockReplenishmentExcelInput): void {
  const row = sheet.getRow(3);
  row.height = 24;
  const pairs: Array<[string, number | string, string?]> = [
    ['Productos', input.totals.productCount, '#,##0'],
    ['Por comprar', input.totals.toBuyCount, '#,##0'],
    ['Inversión', roundMoney(input.totals.investment), MONEY_FMT],
    ['Venta potencial', roundMoney(input.totals.potentialSales), MONEY_FMT],
    ['Utilidad', roundMoney(input.totals.potentialProfit), MONEY_FMT],
    ['Margen', input.totals.marginPercent == null ? '—' : roundMoney(input.totals.marginPercent), input.totals.marginPercent == null ? undefined : PCT_FMT],
  ];
  pairs.forEach(([label, value, fmt], index) => {
    const labelCell = row.getCell(index * 2 + 1);
    const valueCell = row.getCell(index * 2 + 2);
    labelCell.value = label;
    valueCell.value = value;
    labelCell.font = { name: 'Calibri', size: 8, bold: true, color: { argb: MUTED } };
    valueCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: index === 4 ? TITLE : INK },
    };
    labelCell.fill = solid('FFF3FBF7');
    valueCell.fill = solid('FFF3FBF7');
    labelCell.alignment = { horizontal: 'right', vertical: 'middle' };
    valueCell.alignment = { horizontal: 'left', vertical: 'middle' };
    if (fmt) {
      valueCell.numFmt = fmt;
    }
  });
  const used = pairs.length * 2;
  const colCount = 4 + input.branches.length * 3 + 10;
  for (let column = used + 1; column <= colCount; column += 1) {
    const cell = row.getCell(column);
    cell.fill = solid('FFF3FBF7');
  }
}

function paintHeaders(sheet: Worksheet, branches: ReplenishmentExcelBranch[]): void {
  const group = sheet.getRow(4);
  const sub = sheet.getRow(5);
  group.height = 20;
  sub.height = 18;

  const fixed = ['Código', 'Código ext.', 'Producto', 'Unidad'];
  fixed.forEach((title, index) => {
    const column = index + 1;
    sheet.mergeCells(4, column, 5, column);
    styleHead(group.getCell(column), title, 'FFF8FAFC', MUTED);
  });

  branches.forEach((branch, index) => {
    const start = 5 + index * 3;
    const tone = TONES[index % TONES.length];
    const ink = TONE_INK[index % TONE_INK.length];
    sheet.mergeCells(4, start, 4, start + 2);
    styleHead(group.getCell(start), branch.name, tone, ink);
    group.getCell(start + 1).fill = solid(tone);
    group.getCell(start + 2).fill = solid(tone);
    ['Existencia', 'Venta', 'Diferencia'].forEach((title, offset) => {
      styleHead(sub.getCell(start + offset), title, tone, ink, 8);
    });
  });

  const tailStart = 5 + branches.length * 3;
  const tail = [
    'Precio promedio',
    'Costo',
    'Utilidad',
    'Margen %',
    'Mínimo',
    'Máximo',
    'Cobertura',
    'Recomendado',
    'A comprar',
    'Estado',
  ];
  tail.forEach((title, index) => {
    const column = tailStart + index;
    sheet.mergeCells(4, column, 5, column);
    const buy = title === 'A comprar';
    styleHead(group.getCell(column), title, buy ? BUY_HEAD : 'FFF8FAFC', buy ? BUY_INK : MUTED);
  });
}

function paintDataRow(sheet: Worksheet, rowNumber: number, data: ReplenishmentExcelRow, index: number): void {
  const row = sheet.getRow(rowNumber);
  row.height = 18;
  const base = ZEBRAS[index % 2];
  let column = 1;
  text(row.getCell(column), data.sku, base, true);
  column += 1;
  text(row.getCell(column), data.externalSku ?? '', base);
  column += 1;
  text(row.getCell(column), data.name, base);
  column += 1;
  text(row.getCell(column), data.uom ?? '', base);
  column += 1;

  data.cells.forEach((cell) => {
    qty(row.getCell(column), cell.onHand, base);
    qty(row.getCell(column + 1), cell.sold, base);
    qty(row.getCell(column + 2), cell.difference, base, cell.difference < 0);
    column += 3;
  });

  money(row.getCell(column), data.averagePrice, base);
  money(row.getCell(column + 1), data.unitCost, base);
  money(row.getCell(column + 2), data.unitMargin, base, (data.unitMargin ?? 0) < 0);
  percent(row.getCell(column + 3), data.marginPercent, base);
  qty(row.getCell(column + 4), data.minStock, base);
  qty(row.getCell(column + 5), data.maxStock, base);
  qty(row.getCell(column + 6), data.daysOfCover, base);
  qty(row.getCell(column + 7), data.recommendedQty, data.recommendedQty > 0 ? BUY : base, false, data.recommendedQty > 0);
  qty(row.getCell(column + 8), data.orderQty, data.orderQty > 0 ? BUY : base, false, data.orderQty > 0);
  text(row.getCell(column + 9), data.status, base);
}

function paintTotals(sheet: Worksheet, rowNumber: number, input: StockReplenishmentExcelInput): void {
  const row = sheet.getRow(rowNumber);
  row.height = 22;
  sheet.mergeCells(rowNumber, 1, rowNumber, 4);
  const label = row.getCell(1);
  const productLabel = input.totals.productCount === 1 ? 'producto' : 'productos';
  label.value = `Totales · ${input.totals.productCount} ${productLabel}`;
  label.font = { name: 'Calibri', bold: true, size: 10, color: { argb: INK } };
  label.fill = solid(TOTAL);
  label.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  for (let column = 2; column <= 4; column += 1) {
    row.getCell(column).fill = solid(TOTAL);
    row.getCell(column).border = border();
  }
  label.border = border();

  let column = 5;
  input.totals.cells.forEach((cell) => {
    qty(row.getCell(column), cell.onHand, TOTAL, false, true);
    qty(row.getCell(column + 1), cell.sold, TOTAL, false, true);
    qty(row.getCell(column + 2), cell.difference, TOTAL, cell.difference < 0, true);
    column += 3;
  });

  money(row.getCell(column), input.totals.potentialSales, TOTAL, false, true);
  money(row.getCell(column + 1), input.totals.investment, TOTAL, false, true);
  money(row.getCell(column + 2), input.totals.potentialProfit, TOTAL, input.totals.potentialProfit < 0, true);
  percent(row.getCell(column + 3), input.totals.marginPercent, TOTAL, true);
  for (let offset = 4; offset <= 6; offset += 1) {
    const cell = row.getCell(column + offset);
    cell.fill = solid(TOTAL);
    cell.border = border();
  }
  qty(row.getCell(column + 7), input.totals.recommendedQty, TOTAL, false, true);
  qty(row.getCell(column + 8), input.totals.orderQty, BUY, false, true);
  const status = row.getCell(column + 9);
  status.value = '';
  status.fill = solid(TOTAL);
  status.border = border();
}

function paintNote(sheet: Worksheet, rowNumber: number, colCount: number): void {
  const row = sheet.getRow(rowNumber);
  row.height = 18;
  sheet.mergeCells(rowNumber, 1, rowNumber, colCount);
  const cell = row.getCell(1);
  cell.value =
    'Diferencia = existencia − venta del periodo. A comprar es la cantidad de la pantalla, aunque se haya editado. Las sucursales ocultas con el engrane no salen aquí.';
  cell.font = { name: 'Calibri', italic: true, size: 9, color: { argb: MUTED } };
  cell.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
}

function styleHead(cell: Cell, value: string, fill: string, ink: string, size = 9): void {
  cell.value = value;
  cell.font = { name: 'Calibri', bold: true, size, color: { argb: ink } };
  cell.fill = solid(fill);
  cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  cell.border = border();
}

function text(cell: Cell, value: string, fill: string, bold = false): void {
  cell.value = value;
  cell.font = { name: 'Calibri', bold, size: 10, color: { argb: INK } };
  cell.fill = solid(fill);
  cell.alignment = { horizontal: 'left', vertical: 'middle' };
  cell.border = border();
}

function qty(cell: Cell, value: number | null, fill: string, negative = false, bold = false): void {
  if (value == null || !Number.isFinite(value)) {
    cell.value = '—';
    cell.alignment = { horizontal: 'right', vertical: 'middle' };
  } else {
    cell.value = roundQty(value);
    cell.numFmt = QTY_FMT;
    cell.alignment = { horizontal: 'right', vertical: 'middle' };
  }
  cell.font = { name: 'Calibri', bold: bold || negative, size: 10, color: { argb: negative ? NEG : INK } };
  cell.fill = solid(fill);
  cell.border = border();
}

function money(cell: Cell, value: number | null, fill: string, negative = false, bold = false): void {
  if (value == null || !Number.isFinite(value)) {
    cell.value = '—';
  } else {
    cell.value = roundMoney(value);
    cell.numFmt = MONEY_FMT;
  }
  cell.font = { name: 'Calibri', bold: bold || negative, size: 10, color: { argb: negative ? NEG : INK } };
  cell.fill = solid(fill);
  cell.alignment = { horizontal: 'right', vertical: 'middle' };
  cell.border = border();
}

function percent(cell: Cell, value: number | null, fill: string, bold = false): void {
  if (value == null || !Number.isFinite(value)) {
    cell.value = '—';
  } else {
    cell.value = roundMoney(value);
    cell.numFmt = PCT_FMT;
  }
  cell.font = { name: 'Calibri', bold, size: 10, color: { argb: value != null && value < 0 ? NEG : INK } };
  cell.fill = solid(fill);
  cell.alignment = { horizontal: 'right', vertical: 'middle' };
  cell.border = border();
}

function solid(argb: string): { type: 'pattern'; pattern: 'solid'; fgColor: { argb: string } } {
  return { type: 'pattern', pattern: 'solid', fgColor: { argb } };
}

function border(): Partial<import('exceljs').Borders> {
  const side = { style: 'thin' as const, color: { argb: LINE } };
  return { top: side, left: side, bottom: side, right: side };
}

function columnWidths(branchCount: number): number[] {
  const widths = [14, 14, 38, 12];
  for (let index = 0; index < branchCount; index += 1) {
    widths.push(13, 12, 13);
  }
  widths.push(16, 13, 13, 12, 12, 12, 12, 14, 14, 22);
  return widths;
}

function roundQty(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function slug(value: string): string {
  const clean = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return clean || 'proveedor';
}
