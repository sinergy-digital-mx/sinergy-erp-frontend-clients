export interface SelfInvoiceCatalogOption {
  code: string;
  label: string;
}

export interface SelfInvoiceCatalogs {
  uso_cfdi: SelfInvoiceCatalogOption[];
  regimen_fiscal_receptor: SelfInvoiceCatalogOption[];
  forma_pago: SelfInvoiceCatalogOption[];
  metodo_pago: SelfInvoiceCatalogOption[];
}

export interface SelfInvoiceFiscalData {
  fiscal_rfc: string;
  fiscal_person_type: string;
  fiscal_razon_social: string;
  fiscal_postal_code: string;
  fiscal_country: string;
  fiscal_street: string;
  fiscal_exterior_number: string;
  fiscal_interior_number: string;
  fiscal_colonia: string;
  fiscal_localidad: string;
  fiscal_municipio: string;
  fiscal_state: string;
}

export interface SelfInvoiceSuggested {
  uso_cfdi: string;
  regimen_fiscal_receptor: string;
  forma_pago: string;
  metodo_pago: string;
}

export interface SelfInvoiceIssued {
  uuid: string;
  pdf_url: string;
  pdf_file_name: string;
  invoice_id: string;
  stamp_status: string;
}

export interface SelfInvoicePreview {
  code: string;
  issuer_name: string;
  branch_name: string;
  total: number;
  already_invoiced: boolean;
  catalogs: SelfInvoiceCatalogs;
  invoice: SelfInvoiceIssued | null;
}

export interface SelfInvoiceIdentifyResponse {
  matched: boolean;
  total: number;
  fiscal: SelfInvoiceFiscalData | null;
  suggested: SelfInvoiceSuggested | null;
}

export interface SelfInvoiceStampPayload {
  email: string;
  phone: string;
  fiscal_rfc: string;
  fiscal_person_type: string;
  fiscal_razon_social: string;
  fiscal_postal_code: string;
  fiscal_country: string;
  fiscal_street?: string;
  fiscal_exterior_number?: string;
  fiscal_interior_number?: string;
  fiscal_colonia?: string;
  fiscal_localidad?: string;
  fiscal_municipio?: string;
  fiscal_state?: string;
  uso_cfdi: string;
  regimen_fiscal_receptor: string;
  forma_pago: string;
  metodo_pago: string;
}

export interface SelfInvoiceStampResult {
  code: string;
  uuid: string;
  stamp_status: string;
  total: number;
  pdf_url: string;
  pdf_file_name: string;
  invoice_id: string;
}

export interface SelfInvoicePdfLink {
  signedUrl: string;
  fileName?: string;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

export function unwrapSelfInvoiceBody(response: unknown): Record<string, unknown> {
  const root = asRecord(response);
  if (!root) {
    return {};
  }
  const nested = asRecord(root['data']);
  return nested ?? root;
}

function str(value: unknown): string {
  if (value == null) {
    return '';
  }
  return String(value).trim();
}

function num(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function bool(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  return false;
}

function normalizeCatalogList(raw: unknown): SelfInvoiceCatalogOption[] {
  const rec = asRecord(raw);
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(rec?.['items'])
      ? (rec!['items'] as unknown[])
      : Array.isArray(rec?.['data'])
        ? (rec!['data'] as unknown[])
        : [];

  const options: SelfInvoiceCatalogOption[] = [];
  for (const item of list) {
    if (typeof item === 'string') {
      const code = item.trim();
      if (code) {
        options.push({ code, label: code });
      }
      continue;
    }
    const row = asRecord(item);
    if (!row) {
      continue;
    }
    const code = str(
      row['clave'] ?? row['code'] ?? row['id'] ?? row['value'] ?? row['clave_sat']
    );
    if (!code) {
      continue;
    }
    const name = str(
      row['descripcion'] ?? row['description'] ?? row['name'] ?? row['label'] ?? row['nombre']
    );
    const alreadyPrefixed =
      !name ||
      name === code ||
      name.startsWith(`${code} `) ||
      name.startsWith(`${code}-`) ||
      name.startsWith(`${code} -`);
    options.push({
      code,
      label: alreadyPrefixed ? name || code : `${code} - ${name}`,
    });
  }
  return options;
}

function emptyCatalogs(): SelfInvoiceCatalogs {
  return {
    uso_cfdi: [],
    regimen_fiscal_receptor: [],
    forma_pago: [],
    metodo_pago: [],
  };
}

export function normalizeSelfInvoiceCatalogs(raw: unknown): SelfInvoiceCatalogs {
  const body = asRecord(raw) ?? {};
  return {
    uso_cfdi: normalizeCatalogList(body['uso_cfdi']),
    regimen_fiscal_receptor: normalizeCatalogList(
      body['regimen_fiscal_receptor'] ?? body['regimen_fiscal']
    ),
    forma_pago: normalizeCatalogList(body['forma_pago']),
    metodo_pago: normalizeCatalogList(body['metodo_pago']),
  };
}

function normalizeFiscal(raw: unknown): SelfInvoiceFiscalData | null {
  const body = asRecord(raw);
  if (!body) {
    return null;
  }
  const rfc = str(body['fiscal_rfc']).toUpperCase();
  const razon = str(body['fiscal_razon_social']).toUpperCase();
  if (!rfc && !razon && !str(body['fiscal_postal_code'])) {
    return null;
  }
  return {
    fiscal_rfc: rfc,
    fiscal_person_type: str(body['fiscal_person_type']).toLowerCase(),
    fiscal_razon_social: razon,
    fiscal_postal_code: str(body['fiscal_postal_code']),
    fiscal_country: str(body['fiscal_country']).toUpperCase() || 'MEX',
    fiscal_street: str(body['fiscal_street']).toUpperCase(),
    fiscal_exterior_number: str(body['fiscal_exterior_number']).toUpperCase(),
    fiscal_interior_number: str(body['fiscal_interior_number']).toUpperCase(),
    fiscal_colonia: str(body['fiscal_colonia']).toUpperCase(),
    fiscal_localidad: str(body['fiscal_localidad']).toUpperCase(),
    fiscal_municipio: str(body['fiscal_municipio']),
    fiscal_state: str(body['fiscal_state']),
  };
}

function normalizeSuggested(raw: unknown): SelfInvoiceSuggested | null {
  const body = asRecord(raw);
  if (!body) {
    return null;
  }
  return {
    uso_cfdi: str(body['uso_cfdi']),
    regimen_fiscal_receptor: str(body['regimen_fiscal_receptor']),
    forma_pago: str(body['forma_pago']),
    metodo_pago: str(body['metodo_pago']) || 'PUE',
  };
}

function normalizeIssued(raw: unknown, fallback: Record<string, unknown> = {}): SelfInvoiceIssued | null {
  const body = asRecord(raw) ?? {};
  const uuid = str(body['uuid'] ?? fallback['uuid']);
  const pdfUrl = str(
    body['pdf_url'] ?? body['pdfUrl'] ?? fallback['pdf_url'] ?? fallback['pdfUrl']
  );
  const invoiceId = str(body['invoice_id'] ?? body['id'] ?? fallback['invoice_id']);
  const stampStatus = str(body['stamp_status'] ?? fallback['stamp_status']);
  if (!uuid && !pdfUrl && !invoiceId) {
    return null;
  }
  return {
    uuid,
    pdf_url: pdfUrl,
    pdf_file_name: str(body['pdf_file_name'] ?? body['file_name'] ?? fallback['pdf_file_name']),
    invoice_id: invoiceId,
    stamp_status: stampStatus,
  };
}

export function normalizeSelfInvoicePreview(response: unknown): SelfInvoicePreview {
  const body = unwrapSelfInvoiceBody(response);
  const catalogsRaw = asRecord(body['catalogs']) ?? body;
  const invoice =
    normalizeIssued(body['invoice'], body) ??
    normalizeIssued(body['electronic_invoice'], body);
  const already = bool(body['already_invoiced']) || bool(body['alreadyInvoiced']);
  return {
    code: str(body['code']).toUpperCase(),
    issuer_name: str(body['issuer_name'] ?? body['razon_social'] ?? body['company_name']),
    branch_name: str(body['branch_name'] ?? body['sucursal']),
    total: num(body['total']),
    already_invoiced: already,
    catalogs: {
      ...emptyCatalogs(),
      ...normalizeSelfInvoiceCatalogs(catalogsRaw),
    },
    invoice,
  };
}

export function normalizeSelfInvoiceIdentify(response: unknown): SelfInvoiceIdentifyResponse {
  const body = unwrapSelfInvoiceBody(response);
  const fiscalRaw = body['fiscal'] ?? body['customer'] ?? null;
  return {
    matched: bool(body['matched']),
    total: num(body['total']),
    fiscal: normalizeFiscal(fiscalRaw),
    suggested: normalizeSuggested(body['suggested']),
  };
}

export function normalizeSelfInvoiceStamp(response: unknown): SelfInvoiceStampResult {
  const body = unwrapSelfInvoiceBody(response);
  const issued = normalizeIssued(body, body);
  return {
    code: str(body['code']).toUpperCase(),
    uuid: issued?.uuid ?? str(body['uuid']),
    stamp_status: issued?.stamp_status || str(body['stamp_status']) || 'stamped',
    total: num(body['total']),
    pdf_url: issued?.pdf_url ?? str(body['pdf_url']),
    pdf_file_name: issued?.pdf_file_name ?? str(body['pdf_file_name']),
    invoice_id: issued?.invoice_id ?? str(body['invoice_id']),
  };
}

export function normalizeSelfInvoicePdfLink(response: unknown): SelfInvoicePdfLink {
  const body = unwrapSelfInvoiceBody(response);
  return {
    signedUrl: str(body['signedUrl'] ?? body['signed_url'] ?? body['pdf_url'] ?? body['url']),
    fileName: str(body['fileName'] ?? body['file_name'] ?? body['pdf_file_name']) || undefined,
  };
}

export function isAlreadyInvoicedMessage(message: string): boolean {
  const normalized = message.trim().toLowerCase();
  return (
    normalized.includes('ya tiene una factura vigente') ||
    normalized.includes('already_invoiced') ||
    normalized.includes('already invoiced')
  );
}

export function normalizePublicInvoiceCode(value: string): string {
  return value.replace(/\s+/g, '').trim().toUpperCase();
}
