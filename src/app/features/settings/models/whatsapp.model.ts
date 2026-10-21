export type WhatsappConnectionState =
  | 'not_configured'
  | 'disconnected'
  | 'starting'
  | 'waiting_qr'
  | 'connected'
  | 'failed';

export interface WhatsappSession {
  configured: boolean;
  service_available: boolean;
  state: WhatsappConnectionState;
  status: string | null;
  phone_number: string | null;
  push_name: string | null;
  connected_at: string | null;
  last_status_at: string | null;
  last_error: string | null;
}

export interface WhatsappQrResponse extends WhatsappSession {
  qr_data_url: string | null;
}

export type WhatsappMessageStatus = 'queued' | 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface WhatsappMessage {
  id: string;
  to_phone: string;
  type: 'text' | 'file';
  body: string | null;
  file_name: string | null;
  status: WhatsappMessageStatus;
  error_message: string | null;
  reference_type: string | null;
  reference_id: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  read_at: string | null;
  created_at: string;
}

export interface WhatsappMessagesPage {
  data: WhatsappMessage[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SendWhatsappTextDto {
  phone: string;
  text: string;
  reference_type?: string;
  reference_id?: string;
}
