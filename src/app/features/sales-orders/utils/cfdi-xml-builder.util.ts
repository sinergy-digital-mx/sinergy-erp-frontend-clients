import { SalesOrder, SalesOrderLineItem, Customer } from '../models/sales-order.model';

export interface CfdiWizardFormValues {
  series: string;
  folio: string;
  usoCfdi: string;
  formaPago: string;
  metodoPago: 'PUE' | 'PPD';
  regimenReceptor: string;
  domicilioFiscalReceptor: string;
}

export interface CfdiBuildContext {
  order: SalesOrder;
  lineItems: SalesOrderLineItem[];
  form: CfdiWizardFormValues;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toMoney(value: number | string | undefined | null): string {
  const n = Number(value);
  return Number.isFinite(n) ? n.toFixed(2) : '0.00';
}

function parseNum(value: number | string | undefined | null): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function isServiceLine(item: SalesOrderLineItem): boolean {
  return item.item_kind === 'service' || item.product?.item_kind === 'service';
}

function getProductSatClave(item: SalesOrderLineItem): string {
  const product = item.product;
  const raw = String(product?.sat_clave || product?.sat_code || product?.codigo_sat || '').trim();
  return /^\d{8}$/.test(raw) ? raw : '01010101';
}

function getClaveUnidad(item: SalesOrderLineItem): string {
  const uom = String(item.uom_name || item.product_uom?.uom?.name || '')
    .trim()
    .toUpperCase()
    .replace(/\./g, '');
  if (uom === 'E48' || uom === 'SERVICIO' || uom === 'SERVICIOS' || uom === 'SERVICE' || uom === 'SERV') {
    return 'E48';
  }
  if (uom === 'H87' || uom === 'PZA' || uom === 'PZ' || uom === 'PIEZA' || uom === 'PIEZAS' || uom === 'UNIDAD') {
    return 'H87';
  }
  return isServiceLine(item) ? 'E48' : 'H87';
}

function getUnidad(item: SalesOrderLineItem): string {
  const name = item.uom_name || item.product_uom?.uom?.name;
  if (name?.trim()) return name.trim();
  return isServiceLine(item) ? 'Servicio' : 'Pieza';
}

export const SAT_GENERIC_PUBLIC_RFC = 'XAXX010101000';
export const SAT_GENERIC_PUBLIC_NAME = 'PUBLICO EN GENERAL';

export function fiveDigitPostalCode(value?: string | null): string {
  const digits = String(value ?? '').replace(/\D/g, '');
  return digits.length >= 5 ? digits.slice(0, 5) : '';
}

export function isGenericPublicReceptor(order: SalesOrder): boolean {
  const rfc = String(order.customer?.fiscal_rfc ?? '')
    .replace(/[\s-]/g, '')
    .toUpperCase();
  if (rfc === SAT_GENERIC_PUBLIC_RFC) return true;
  return !!order.customer_summary?.is_walk_in && !rfc;
}

/** CP de la sucursal que expide. Sin fallback a almacén ni a 22000. */
export function getLugarExpedicion(order: SalesOrder): string {
  return fiveDigitPostalCode(order.billing_branch?.postal_code);
}

/** CP de la CSF del cliente. Público en general usa el de expedición. */
export function getReceptorDomicilioFiscal(order: SalesOrder): string {
  if (isGenericPublicReceptor(order)) {
    return getLugarExpedicion(order);
  }
  return (
    fiveDigitPostalCode(order.customer?.fiscal_postal_code) ||
    fiveDigitPostalCode(order.customer?.fiscal_zip_code)
  );
}

function getCustomerField(order: SalesOrder, field: keyof Customer): string {
  const value = order.customer?.[field];
  return value != null ? String(value) : '';
}

function satCatalogCode(value: string | undefined | null, fallback: string): string {
  const match = String(value ?? '').trim().match(/^(\d{3,4})/);
  return match?.[1] || fallback;
}

function cfdiFechaLocal(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

function tasaOCuota(percent: number): string {
  return (percent / 100).toFixed(6);
}

interface LineTax {
  base: number;
  impuesto: '002' | '003';
  tasa: number;
  importe: number;
}

interface BuiltConcepto {
  xml: string;
  importe: number;
  discount: number;
  taxes: LineTax[];
}

function buildConcepto(item: SalesOrderLineItem): BuiltConcepto {
  const qty = parseNum(item.quantity);
  const unitPrice = parseNum(item.unit_price);
  const discountPct = parseNum(item.discount_percentage);
  const gross = unitPrice * qty;
  const discount = gross * (discountPct / 100);
  const importe = Math.max(gross - discount, 0);
  const ivaPct = parseNum(item.iva_percentage);
  const iepsPct = parseNum(item.ieps_percentage);
  const taxes: LineTax[] = [];
  if (ivaPct > 0) {
    taxes.push({
      base: importe,
      impuesto: '002',
      tasa: ivaPct,
      importe: Math.round(importe * (ivaPct / 100) * 100) / 100,
    });
  }
  if (iepsPct > 0) {
    taxes.push({
      base: importe,
      impuesto: '003',
      tasa: iepsPct,
      importe: Math.round(importe * (iepsPct / 100) * 100) / 100,
    });
  }

  const objetoImp = taxes.length > 0 ? '02' : '01';
  const discountAttr = discount > 0 ? ` Descuento="${toMoney(discount)}"` : '';
  const taxXml =
    taxes.length === 0
      ? ''
      : `
      <cfdi:Impuestos>
        <cfdi:Traslados>
${taxes
  .map(
    (tax) =>
      `          <cfdi:Traslado Base="${toMoney(tax.base)}" Impuesto="${tax.impuesto}" TipoFactor="Tasa" TasaOCuota="${tasaOCuota(tax.tasa)}" Importe="${toMoney(tax.importe)}"/>`
  )
  .join('\n')}
        </cfdi:Traslados>
      </cfdi:Impuestos>`;

  const xml = `
    <cfdi:Concepto ClaveProdServ="${escapeXml(getProductSatClave(item))}" Cantidad="${qty.toFixed(6)}" ClaveUnidad="${escapeXml(getClaveUnidad(item))}" Unidad="${escapeXml(getUnidad(item))}" Descripcion="${escapeXml(item.product?.name || 'Producto')}" ValorUnitario="${toMoney(unitPrice)}" Importe="${toMoney(importe)}"${discountAttr} ObjetoImp="${objetoImp}">${taxXml}
    </cfdi:Concepto>`;

  return { xml, importe, discount, taxes };
}

function buildComprobanteImpuestos(conceptos: BuiltConcepto[]): string {
  const allTaxes = conceptos.flatMap((c) => c.taxes);
  if (allTaxes.length === 0) {
    return '';
  }

  const grouped = new Map<string, { base: number; importe: number; tasa: number; impuesto: string }>();
  for (const tax of allTaxes) {
    const key = `${tax.impuesto}|${tasaOCuota(tax.tasa)}`;
    const current = grouped.get(key) || { base: 0, importe: 0, tasa: tax.tasa, impuesto: tax.impuesto };
    current.base += tax.base;
    current.importe += tax.importe;
    grouped.set(key, current);
  }

  const totalTrasladados = [...grouped.values()].reduce((sum, row) => sum + row.importe, 0);
  const trasladosXml = [...grouped.values()]
    .map(
      (row) =>
        `      <cfdi:Traslado Base="${toMoney(row.base)}" Impuesto="${row.impuesto}" TipoFactor="Tasa" TasaOCuota="${tasaOCuota(row.tasa)}" Importe="${toMoney(row.importe)}"/>`
    )
    .join('\n');

  return `
  <cfdi:Impuestos TotalImpuestosTrasladados="${toMoney(totalTrasladados)}">
    <cfdi:Traslados>
${trasladosXml}
    </cfdi:Traslados>
  </cfdi:Impuestos>`;
}

export function buildCfdiXml(context: CfdiBuildContext): string {
  const { order, lineItems, form } = context;
  const fiscal = order.fiscal_configuration;
  const built = lineItems.map((item) => buildConcepto(item));
  const subtotalNum = built.reduce((sum, row) => sum + row.importe, 0);
  const discountNum = built.reduce((sum, row) => sum + row.discount, 0);
  const taxesNum = built.reduce((sum, row) => sum + row.taxes.reduce((s, tax) => s + tax.importe, 0), 0);
  const subtotal = toMoney(order.subtotal ?? order.requested_subtotal ?? subtotalNum);
  const discount = toMoney(order.discount_total ?? order.requested_discount_total ?? discountNum);
  const total = toMoney(order.total ?? order.requested_total ?? order.grand_total ?? subtotalNum - discountNum + taxesNum);
  const emisorRfc = fiscal?.rfc || '';
  const emisorNombre = fiscal?.razon_social || fiscal?.business_name || order.fiscal_razon_social || '';
  const genericPublic = isGenericPublicReceptor(order);
  const receptorRfc = genericPublic ? SAT_GENERIC_PUBLIC_RFC : getCustomerField(order, 'fiscal_rfc');
  const receptorNombre = genericPublic
    ? SAT_GENERIC_PUBLIC_NAME
    : getCustomerField(order, 'fiscal_razon_social');
  const regimenEmisor = satCatalogCode(fiscal?.fiscal_regime, '601');
  const regimenReceptor = satCatalogCode(form.regimenReceptor, '601');
  const series = form.series?.trim() || '';
  const serieAttr = series ? ` Serie="${escapeXml(series)}"` : '';
  const discountAttr = parseNum(discount) > 0 ? ` Descuento="${discount}"` : '';
  const lugarExpedicion = getLugarExpedicion(order);
  const domicilioReceptor =
    fiveDigitPostalCode(form.domicilioFiscalReceptor) || getReceptorDomicilioFiscal(order);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/4" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd" Version="4.0"${serieAttr} Folio="${escapeXml(form.folio)}" Fecha="${cfdiFechaLocal()}" SubTotal="${subtotal}"${discountAttr} Total="${total}" Moneda="MXN" TipoDeComprobante="I" Exportacion="01" MetodoPago="${form.metodoPago}" FormaPago="${escapeXml(form.formaPago)}" LugarExpedicion="${escapeXml(lugarExpedicion)}">
  <cfdi:Emisor Rfc="${escapeXml(emisorRfc)}" Nombre="${escapeXml(emisorNombre)}" RegimenFiscal="${escapeXml(regimenEmisor)}"/>
  <cfdi:Receptor Rfc="${escapeXml(receptorRfc)}" Nombre="${escapeXml(receptorNombre)}" DomicilioFiscalReceptor="${escapeXml(domicilioReceptor)}" RegimenFiscalReceptor="${escapeXml(regimenReceptor)}" UsoCFDI="${escapeXml(form.usoCfdi)}"/>
  <cfdi:Conceptos>${built.map((row) => row.xml).join('')}
  </cfdi:Conceptos>${buildComprobanteImpuestos(built)}
</cfdi:Comprobante>`;

  return ensureCfdi40RootNamespaces(xml);
}

/** Fuerza el raíz CFDI 4.0 que Finkok valida (namespaces + schemaLocation, sin tfd). */
export function ensureCfdi40RootNamespaces(xml: string): string {
  let out = String(xml || '').replace(/^\uFEFF/, '').trim();
  out = out.replace(/<tfd:TimbreFiscalDigital\b[^>]*\/>/g, '');
  out = out.replace(/<cfdi:Complemento>\s*<\/cfdi:Complemento>/g, '');
  out = out.replace(/<\/(?:[\w.]+:)?Comprobante>/, '</cfdi:Comprobante>');

  const open = out.match(/<(?:[\w.]+:)?Comprobante\b([^>]*)>/);
  if (!open) {
    return out;
  }

  const restAttrs = open[1]
    .replace(/\s+xmlns(?::[\w.-]+)?="[^"]*"/g, '')
    .replace(/\s+xsi:schemaLocation="[^"]*"/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const root =
    `<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/4" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd"` +
    (restAttrs ? ` ${restAttrs}` : '') +
    `>`;

  return out.replace(/<(?:[\w.]+:)?Comprobante\b[^>]*>/, root);
}

export function fiscalPrefixAsSeries(order: SalesOrder): string {
  return String(order.fiscal_configuration?.prefix ?? '').trim().toUpperCase();
}

export function defaultCfdiWizardForm(order: SalesOrder): CfdiWizardFormValues {
  const paymentStatus = String(order.payment_status ?? order.payments_summary?.payment_status ?? '').toLowerCase();

  return {
    series: fiscalPrefixAsSeries(order),
    folio: String(order.folio || ''),
    usoCfdi: 'G03',
    formaPago: paymentStatus === 'pagado' ? '03' : '99',
    metodoPago: paymentStatus === 'pagado' ? 'PUE' : 'PPD',
    regimenReceptor: '601',
    domicilioFiscalReceptor: getReceptorDomicilioFiscal(order),
  };
}

export function getInvoiceStatusLabel(invoice: { stamp_status?: string; sat_status?: string; status?: string | null }): string {
  const sat = invoice.sat_status?.trim();
  if (sat) return sat;
  const stamp = invoice.stamp_status?.trim();
  if (stamp === 'stamped') return 'Timbrada';
  if (stamp === 'stamp_error') return 'Error timbrado';
  if (stamp === 'cancel_pending') return 'Cancelación pendiente';
  if (stamp === 'cancelled') return 'Cancelada';
  if (stamp === 'pending') return 'Pendiente';
  return invoice.status || '—';
}

export function getInvoiceStatusClass(invoice: { stamp_status?: string; sat_status?: string }): string {
  const label = (invoice.sat_status || invoice.stamp_status || '').toLowerCase();
  if (label.includes('vigente') || label === 'stamped') return 'invoice-badge--success';
  if (label.includes('cancel') && !label.includes('pending')) return 'invoice-badge--danger';
  if (label.includes('pending') || label.includes('error')) return 'invoice-badge--warning';
  if (label.includes('error')) return 'invoice-badge--danger';
  return 'invoice-badge--neutral';
}

export function countVigenteInvoices(invoices: Array<{ sat_status?: string; stamp_status?: string }>): number {
  return invoices.filter((inv) => {
    const sat = (inv.sat_status || '').toLowerCase();
    const stamp = (inv.stamp_status || '').toLowerCase();
    return sat.includes('vigente') || stamp === 'stamped';
  }).length;
}

export function countPendingSyncInvoices(invoices: Array<{ stamp_status?: string; sat_status?: string }>): number {
  return invoices.filter((inv) => {
    const stamp = (inv.stamp_status || '').toLowerCase();
    return stamp === 'pending' || stamp === 'cancel_pending';
  }).length;
}
