import { renderSVG } from 'uqr';
import { PosSaleReceipt } from '../models/pos-receipt.model';

export interface EscPosPreviewLine {
  text: string;
  align: 'left' | 'center' | 'right';
  bold: boolean;
  kind?: 'text' | 'qr';
  qrSrc?: string;
}

export function hasReceiptPreview(receipt: PosSaleReceipt | null | undefined): boolean {
  return !!(receipt?.plain_text?.trim() || receipt?.escpos_base64?.trim());
}

export function buildEscPosPreview(receipt: PosSaleReceipt | null | undefined): EscPosPreviewLine[] {
  if (!receipt) {
    return [];
  }

  const urlHint = receipt.self_invoice_url?.trim() || undefined;
  let lines: EscPosPreviewLine[] = [];

  const base64 = receipt.escpos_base64?.trim();
  if (base64) {
    try {
      lines = parseEscPosBytesToLines(decodeEscPosBase64(base64), urlHint);
    } catch {
      lines = [];
    }
  }

  if (!lines.length && receipt.plain_text?.trim()) {
    lines = receipt.plain_text.split(/\r?\n/).map((text) => ({
      text,
      align: 'left' as const,
      bold: false,
    }));
  }

  const sanitized = sanitizeSelfInvoicePreviewLines(lines, urlHint);
  if (sanitized.length > 0) {
    return sanitized;
  }

  return [{ text: 'No se pudo decodificar el ticket ESC/POS.', align: 'left', bold: false }];
}

export function decodeEscPosBase64(base64: string): Uint8Array {
  const binary = atob(base64.trim());
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function parseEscPosBytesToLines(bytes: Uint8Array, qrFallback?: string): EscPosPreviewLine[] {
  const lines: EscPosPreviewLine[] = [];
  let align: EscPosPreviewLine['align'] = 'left';
  let bold = false;
  let buffer = '';
  let i = 0;
  const gsState = { storedQr: '', fallbackQr: qrFallback ?? '' };
  let emittedQr = false;

  const flushLine = (): void => {
    lines.push({ text: buffer, align, bold });
    buffer = '';
  };

  const emitQr = (payload: string): void => {
    const qrSrc = buildQrDataUrl(payload);
    if (!qrSrc) {
      return;
    }
    emittedQr = true;
    lines.push({
      text: '',
      align: 'center',
      bold: false,
      kind: 'qr',
      qrSrc,
    });
  };

  while (i < bytes.length) {
    const byte = bytes[i];

    if (byte === 0x0a) {
      flushLine();
      i++;
      continue;
    }

    if (byte === 0x0d) {
      i++;
      continue;
    }

    if (byte === 0x1b) {
      if (buffer) {
        flushLine();
      }
      i = parseEscSequence(bytes, i, {
        setAlign: (value) => {
          align = value;
        },
        setBold: (value) => {
          bold = value;
        },
      });
      continue;
    }

    if (byte === 0x1d) {
      if (buffer) {
        flushLine();
      }
      i = parseGsSequence(bytes, i, gsState, emitQr);
      continue;
    }

    if (byte === 0x09) {
      buffer += '        ';
      i++;
      continue;
    }

    if (byte < 0x20) {
      i++;
      continue;
    }

    const textChunk = readTextChunk(bytes, i);
    buffer += textChunk.text;
    i = textChunk.nextIndex;
  }

  if (buffer || lines.length === 0) {
    flushLine();
  }

  if (!emittedQr && gsState.storedQr) {
    emitQr(gsState.storedQr);
  }

  return trimPreviewLines(lines);
}

function trimPreviewLines(lines: EscPosPreviewLine[]): EscPosPreviewLine[] {
  const isVisible = (line: EscPosPreviewLine): boolean =>
    line.kind === 'qr' || !!line.text.trim();

  let start = 0;
  let end = lines.length;

  while (start < end && !isVisible(lines[start])) {
    start++;
  }
  while (end > start && !isVisible(lines[end - 1])) {
    end--;
  }

  return lines.slice(start, end);
}

function readTextChunk(bytes: Uint8Array, start: number): { text: string; nextIndex: number } {
  let i = start;
  while (i < bytes.length) {
    const byte = bytes[i];
    if (byte === 0x0a || byte === 0x0d || byte === 0x1b || byte === 0x1d) {
      break;
    }
    if (byte < 0x20 && byte !== 0x09) {
      break;
    }
    i++;
  }

  const slice = bytes.subarray(start, i);
  const text = new TextDecoder('utf-8', { fatal: false }).decode(slice);
  return { text, nextIndex: i };
}

function parseEscSequence(
  bytes: Uint8Array,
  start: number,
  handlers: { setAlign: (align: EscPosPreviewLine['align']) => void; setBold: (bold: boolean) => void }
): number {
  let i = start + 1;
  if (i >= bytes.length) {
    return bytes.length;
  }

  const cmd = bytes[i];
  i++;

  switch (cmd) {
    case 0x40:
      handlers.setAlign('left');
      handlers.setBold(false);
      return i;
    case 0x61:
      if (i < bytes.length) {
        const mode = bytes[i];
        handlers.setAlign(mode === 1 ? 'center' : mode === 2 ? 'right' : 'left');
        i++;
      }
      return i;
    case 0x45:
      if (i < bytes.length) {
        handlers.setBold(bytes[i] === 1);
        i++;
      }
      return i;
    case 0x21:
      if (i < bytes.length) {
        handlers.setBold((bytes[i] & 0x08) !== 0);
        i++;
      }
      return i;
    case 0x2d:
    case 0x4d:
    case 0x33:
    case 0x64:
      if (i < bytes.length) {
        i++;
      }
      return i;
    case 0x74:
      if (i < bytes.length) {
        i++;
      }
      return i;
    default:
      return i;
  }
}

function parseGsSequence(
  bytes: Uint8Array,
  start: number,
  state: { storedQr: string; fallbackQr: string },
  onQr: (payload: string) => void
): number {
  let i = start + 1;
  if (i >= bytes.length) {
    return bytes.length;
  }

  const cmd = bytes[i];
  i++;

  switch (cmd) {
    case 0x21:
    case 0x42:
    case 0x48:
    case 0x68:
    case 0x77:
      if (i < bytes.length) {
        i++;
      }
      return i;
    case 0x28:
      return parseGsParenthesis(bytes, i, state, onQr);
    case 0x56:
      if (i < bytes.length) {
        const mode = bytes[i];
        i++;
        if (mode === 66 && i < bytes.length) {
          i++;
        }
      }
      return i;
    case 0x76:
      return parseGsRaster(bytes, i);
    case 0x6b:
      if (i >= bytes.length) {
        return i;
      }
      {
        const variant = bytes[i];
        i++;
        if (variant >= 65 && variant <= 71) {
          while (i < bytes.length && bytes[i] !== 0x00) {
            i++;
          }
          if (i < bytes.length) {
            i++;
          }
          return i;
        }
        if (i < bytes.length) {
          const len = bytes[i];
          i += len + 1;
        }
      }
      return i;
    default:
      return i;
  }
}

/** GS v 0 m xL xH yL yH datos — imagen raster (QR). */
function parseGsRaster(bytes: Uint8Array, startAfterV: number): number {
  let i = startAfterV;
  if (i >= bytes.length) {
    return i;
  }
  if (bytes[i] !== 0x30) {
    return i + 1;
  }
  i += 1;
  if (i + 5 > bytes.length) {
    return bytes.length;
  }
  const widthBytes = bytes[i + 1] + (bytes[i + 2] << 8);
  const height = bytes[i + 3] + (bytes[i + 4] << 8);
  i += 5;
  return Math.min(bytes.length, i + widthBytes * height);
}

/** GS ( n pL pH [datos]. Bixolon/Epson QR: GS ( k */
function parseGsParenthesis(
  bytes: Uint8Array,
  startAfterParen: number,
  state: { storedQr: string; fallbackQr: string },
  onQr: (payload: string) => void
): number {
  let i = startAfterParen;
  if (i >= bytes.length) {
    return bytes.length;
  }

  const ident = bytes[i];
  i++;
  if (i + 1 >= bytes.length) {
    return bytes.length;
  }

  const pL = bytes[i];
  const pH = bytes[i + 1];
  i += 2;
  const dataLen = pL + pH * 256;
  const dataStart = i;
  const dataEnd = Math.min(i + dataLen, bytes.length);

  if (ident === 0x6b && dataLen >= 2 && dataStart + 1 < bytes.length) {
    const cn = bytes[dataStart];
    const fn = bytes[dataStart + 1];
    if (cn === 0x31 && fn === 0x50 && dataLen >= 3) {
      const payload = new TextDecoder('utf-8', { fatal: false })
        .decode(bytes.subarray(dataStart + 3, dataEnd))
        .replace(/\0+$/g, '')
        .trim();
      if (payload) {
        state.storedQr = payload;
      }
    }
    if (cn === 0x31 && fn === 0x51) {
      const payload = state.storedQr || state.fallbackQr;
      if (payload) {
        onQr(payload);
      }
    }
  }

  return dataEnd;
}

function buildQrDataUrl(value: string): string | null {
  const payload = value.trim();
  if (!payload) {
    return null;
  }
  try {
    const svg = renderSVG(payload, { border: 2, pixelSize: 4, ecc: 'M' });
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  } catch {
    return null;
  }
}

function isQrCommandJunk(text: string): boolean {
  const t = text.trim();
  if (!t) {
    return false;
  }
  if (/^k1[ACEQ]/i.test(t) && t.length <= 16) {
    return true;
  }
  if (/kf1P0/i.test(t) || /k1Q0/i.test(t) || /k1A2/i.test(t)) {
    return true;
  }
  if (/^k[0-9a-z]{0,4}1P0https?:\/\//i.test(t)) {
    return true;
  }
  return false;
}

function urlFromPreviewText(text: string): string {
  const match = text.match(/https?:\/\/[^\s]+/i);
  if (!match) {
    return '';
  }
  return match[0]
    .replace(/k1[ACEQ].*$/i, '')
    .replace(/[^\x21-\x7e]+$/g, '')
    .trim();
}

function sanitizeSelfInvoicePreviewLines(
  lines: EscPosPreviewLine[],
  canonicalUrl?: string
): EscPosPreviewLine[] {
  const recoveredUrls: string[] = [];
  const cleaned: EscPosPreviewLine[] = [];

  for (const line of lines) {
    if (line.kind === 'qr') {
      cleaned.push(line);
      continue;
    }
    const text = line.text.trim();
    const recovered = urlFromPreviewText(text);
    if (recovered) {
      recoveredUrls.push(recovered);
    }
    if (isQrCommandJunk(text) || /^https?:\/\//i.test(text) || recovered.startsWith('http')) {
      continue;
    }
    cleaned.push(line);
  }

  const url = [canonicalUrl ?? '', ...recoveredUrls]
    .map((item) => item.trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)[0];

  if (url) {
    const hintAt = cleaned.findIndex((line) => /escanea el qr/i.test(line.text));
    const insertAt = hintAt >= 0 ? hintAt + 1 : cleaned.length;
    cleaned.splice(insertAt, 0, {
      text: url,
      align: 'center',
      bold: false,
    });
    if (!cleaned.some((line) => line.kind === 'qr')) {
      const qrSrc = buildQrDataUrl(url);
      if (qrSrc) {
        cleaned.splice(insertAt + 1, 0, {
          text: '',
          align: 'center',
          bold: false,
          kind: 'qr',
          qrSrc,
        });
      }
    }
  }

  return cleaned;
}

