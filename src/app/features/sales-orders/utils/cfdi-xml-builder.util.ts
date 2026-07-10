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

function getProductSatClave(item: SalesOrderLineItem): string {
  const product = item.product as { sat_code?: string; codigo_sat?: string } | undefined;
  return product?.sat_code || product?.codigo_sat || '01010101';
}

function getLugarExpedicion(order: SalesOrder): string {
  const warehouse = order.warehouse as { zip_code?: string } | undefined;
  return warehouse?.zip_code || '00000';
}

function getCustomerField(order: SalesOrder, field: keyof Customer): string {
  const value = order.customer?.[field];
  return value != null ? String(value) : '';
}

function buildConceptos(order: SalesOrder, lineItems: SalesOrderLineItem[]): string {
  return lineItems
    .map((item) => {
      const qty = parseNum(item.quantity);
      const unitPrice = parseNum(item.unit_price);
      const discountPct = parseNum(item.discount_percentage);
      const gross = unitPrice * qty;
      const discount = gross * (discountPct / 100);
      const importe = Math.max(gross - discount, 0);
      const ivaPct = parseNum(item.iva_percentage);
      const iepsPct = parseNum(item.ieps_percentage);
      const hasTax = ivaPct > 0 || iepsPct > 0;
      const objetoImp = hasTax ? '02' : '01';

      return `
    <cfdi:Concepto ClaveProdServ="${escapeXml(getProductSatClave(item))}" Cantidad="${qty}" ClaveUnidad="H87" Unidad="${escapeXml(item.uom_name || 'Pieza')}" Descripcion="${escapeXml(item.product?.name || 'Producto')}" ValorUnitario="${toMoney(unitPrice)}" Importe="${toMoney(importe)}" Descuento="${toMoney(discount)}" ObjetoImp="${objetoImp}" />`;
    })
    .join('');
}

export function buildCfdiXml(context: CfdiBuildContext): string {
  const { order, lineItems, form } = context;
  const fiscal = order.fiscal_configuration;
  const subtotal = toMoney(order.subtotal ?? order.requested_subtotal);
  const discount = toMoney(order.discount_total ?? order.requested_discount_total);
  const total = toMoney(order.total ?? order.requested_total ?? order.grand_total);
  const emisorRfc = fiscal?.rfc || '';
  const emisorNombre = fiscal?.razon_social || fiscal?.business_name || order.fiscal_razon_social || '';
  const receptorRfc = getCustomerField(order, 'fiscal_rfc');
  const receptorNombre =
    getCustomerField(order, 'fiscal_razon_social') ||
    getCustomerField(order, 'company_name') ||
    getCustomerField(order, 'name');

  return `<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/4" Version="4.0" Serie="${escapeXml(form.series)}" Folio="${escapeXml(form.folio)}" Fecha="${new Date().toISOString().slice(0, 19)}" SubTotal="${subtotal}" Descuento="${discount}" Total="${total}" Moneda="MXN" TipoDeComprobante="I" Exportacion="01" MetodoPago="${form.metodoPago}" FormaPago="${escapeXml(form.formaPago)}" LugarExpedicion="${escapeXml(getLugarExpedicion(order))}">
  <cfdi:Emisor Rfc="${escapeXml(emisorRfc)}" Nombre="${escapeXml(emisorNombre)}" RegimenFiscal="${escapeXml(fiscal?.fiscal_regime || '601')}" />
  <cfdi:Receptor Rfc="${escapeXml(receptorRfc)}" Nombre="${escapeXml(receptorNombre)}" DomicilioFiscalReceptor="${escapeXml(form.domicilioFiscalReceptor)}" RegimenFiscalReceptor="${escapeXml(form.regimenReceptor)}" UsoCFDI="${escapeXml(form.usoCfdi)}" />
  <cfdi:Conceptos>${buildConceptos(order, lineItems)}
  </cfdi:Conceptos>
</cfdi:Comprobante>`;
}

export function defaultCfdiWizardForm(order: SalesOrder): CfdiWizardFormValues {
  const paymentStatus = String(order.payment_status ?? order.payments_summary?.payment_status ?? '').toLowerCase();
  const customer = order.customer;

  return {
    series: '',
    folio: String(order.folio || ''),
    usoCfdi: 'G03',
    formaPago: paymentStatus === 'pagado' ? '03' : '99',
    metodoPago: paymentStatus === 'pagado' ? 'PUE' : 'PPD',
    regimenReceptor: '601',
    domicilioFiscalReceptor: customer?.fiscal_zip_code || '',
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
