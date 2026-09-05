export interface InvoiceEmailVariable {
  key: string;
  label: string;
}

export interface InvoiceEmailTemplate {
  id: string;
  subject: string;
  body_html: string;
  variables: InvoiceEmailVariable[];
  sample_values: Record<string, string>;
  sample_html: string;
  sample_subject: string;
  updated_at?: string | null;
  updated_by?: { id: string; display_name?: string | null } | null;
}

export interface InvoiceEmailCompose {
  to_email: string;
  additional_email?: string | null;
  customer_name: string;
  customer_company: string;
  subject: string;
  preview_html: string;
  body_html: string;
  values: Record<string, string>;
  variables?: InvoiceEmailVariable[];
  attachments: { kind: 'pdf' | 'xml'; fileName: string }[];
  can_send: boolean;
  block_reason?: string | null;
}

export interface SalesOrderInvoiceEmail {
  id: string;
  invoice_id: string;
  to_email: string;
  cc: string[];
  subject: string;
  message?: string | null;
  sent_at: string;
  sent_by?: {
    id: string;
    first_name?: string;
    last_name?: string;
    display_name?: string | null;
  } | null;
}

export interface SendSalesOrderInvoiceEmailPayload {
  to_email?: string;
  cc?: string[];
  subject?: string;
  message?: string;
}

export function renderInvoiceEmailTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key: string) => {
    return values[key] ?? '';
  });
}

export function wrapInvoiceEmailExtraMessage(message?: string | null): string {
  const text = message?.trim();
  if (!text) return '';
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br/>');
  return `<p class="email-note" style="margin:0 0 18px;padding:12px 14px;background:#fffbeb;border-left:3px solid #f59e0b;border-radius:8px;font-size:14px;line-height:1.6;color:#92400e;">${escaped}</p>`;
}
