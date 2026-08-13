export function resolveHttpErrorMessage(error: unknown, fallback: string): string {
  if (!error || typeof error !== 'object') {
    return fallback;
  }

  const httpError = error as { error?: { message?: string | string[] }; message?: string };
  const msg = httpError.error?.message ?? httpError.message;

  if (Array.isArray(msg)) {
    const joined = msg.filter((item) => typeof item === 'string' && item.trim()).join(', ');
    return joined || fallback;
  }

  if (typeof msg === 'string' && msg.trim()) {
    return msg;
  }

  return fallback;
}
