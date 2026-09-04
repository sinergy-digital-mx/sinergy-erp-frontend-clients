/**
 * Mensajes HTTP amigables para UI (sin URLs, sin "tenant", sin texto técnico de Angular).
 */

const TECHNICAL_HTTP_RE =
  /http failure response|unknown error|progressEventError|HttpErrorResponse/i;
const URL_OR_API_PATH_RE = /https?:\/\/|\/api\/|\blocalhost\b/i;
const TENANT_WORD_RE = /\btenant\b/i;

function mapStatusToMessage(status: number): string | null {
  if (status === 0) {
    return 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.';
  }
  if (status === 401) {
    return 'Tu sesión expiró. Vuelve a iniciar sesión.';
  }
  if (status === 403) {
    return 'No tienes permisos para ver esta información.';
  }
  if (status === 404) {
    return 'No encontramos lo que buscabas.';
  }
  if (status === 408 || status === 504) {
    return 'La solicitud tardó demasiado. Inténtalo de nuevo.';
  }
  if (status === 429) {
    return 'Hay demasiadas solicitudes. Espera un momento e inténtalo de nuevo.';
  }
  if (status >= 500) {
    return 'El servidor tuvo un problema. Inténtalo de nuevo en unos minutos.';
  }
  return null;
}

function extractStatus(error: unknown): number | null {
  if (!error || typeof error !== 'object') {
    return null;
  }
  const status = (error as { status?: unknown }).status;
  return typeof status === 'number' ? status : null;
}

function extractRawMessage(error: unknown): string | null {
  if (!error || typeof error !== 'object') {
    return null;
  }

  const httpError = error as {
    error?: { message?: string | string[]; error?: string; data?: { message?: string | string[] } };
    message?: string;
    response?: { data?: { message?: string | string[] } };
  };

  const msg =
    httpError.error?.message ??
    httpError.response?.data?.message ??
    httpError.error?.data?.message ??
    httpError.message;

  if (Array.isArray(msg)) {
    const joined = msg.filter((item) => typeof item === 'string' && item.trim()).join(', ');
    return joined || null;
  }

  if (typeof msg === 'string' && msg.trim()) {
    return msg.trim();
  }

  return null;
}

/** Limpia un mensaje ya resuelto para que sea presentable al cliente. */
export function sanitizeClientErrorMessage(message: string | null | undefined, fallback: string): string {
  const raw = (message ?? '').trim();
  if (!raw) {
    return fallback;
  }

  if (TECHNICAL_HTTP_RE.test(raw) || URL_OR_API_PATH_RE.test(raw)) {
    const statusMatch = raw.match(/:\s*(\d{3})\b/) ?? raw.match(/\b(\d{3})\s+Unknown Error\b/i);
    if (statusMatch) {
      const byStatus = mapStatusToMessage(Number(statusMatch[1]));
      if (byStatus) {
        return byStatus;
      }
    }
    if (/:\s*0\b/.test(raw) || /\b0\s+Unknown Error\b/i.test(raw)) {
      return mapStatusToMessage(0)!;
    }
    return fallback;
  }

  if (TENANT_WORD_RE.test(raw)) {
    return fallback;
  }

  return raw;
}

export function resolveHttpErrorMessage(error: unknown, fallback: string): string {
  const status = extractStatus(error);
  if (status !== null) {
    const byStatus = mapStatusToMessage(status);
    // Status 0 / 5xx: prefer mapped message over technical Angular text
    if (status === 0 || (status >= 500 && byStatus)) {
      return byStatus!;
    }
    if ((status === 401 || status === 403 || status === 404) && byStatus) {
      const raw = extractRawMessage(error);
      // Keep backend message only if it's already client-friendly
      if (raw && !TECHNICAL_HTTP_RE.test(raw) && !URL_OR_API_PATH_RE.test(raw) && !TENANT_WORD_RE.test(raw)) {
        return raw;
      }
      return byStatus;
    }
  }

  const raw = extractRawMessage(error);
  return sanitizeClientErrorMessage(raw, fallback);
}
