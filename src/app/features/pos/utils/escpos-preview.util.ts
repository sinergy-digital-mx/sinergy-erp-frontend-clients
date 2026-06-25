import { PosSaleReceipt } from '../models/pos-receipt.model';

export interface EscPosPreviewLine {
  text: string;
  align: 'left' | 'center' | 'right';
  bold: boolean;
}

export function hasReceiptPreview(receipt: PosSaleReceipt | null | undefined): boolean {
  return !!(receipt?.plain_text?.trim() || receipt?.escpos_base64?.trim());
}

export function buildEscPosPreview(receipt: PosSaleReceipt | null | undefined): EscPosPreviewLine[] {
  if (!receipt) {
    return [];
  }

  if (receipt.plain_text?.trim()) {
    return receipt.plain_text.split(/\r?\n/).map((text) => ({
      text,
      align: 'left',
      bold: false,
    }));
  }

  const base64 = receipt.escpos_base64?.trim();
  if (!base64) {
    return [];
  }

  try {
    return parseEscPosBytesToLines(decodeEscPosBase64(base64));
  } catch {
    return [{ text: 'No se pudo decodificar el ticket ESC/POS.', align: 'left', bold: false }];
  }
}

export function decodeEscPosBase64(base64: string): Uint8Array {
  const binary = atob(base64.trim());
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function parseEscPosBytesToLines(bytes: Uint8Array): EscPosPreviewLine[] {
  const lines: EscPosPreviewLine[] = [];
  let align: EscPosPreviewLine['align'] = 'left';
  let bold = false;
  let buffer = '';
  let i = 0;

  const flushLine = (): void => {
    lines.push({ text: buffer, align, bold });
    buffer = '';
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
      i = parseGsSequence(bytes, i);
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

  return trimPreviewLines(lines);
}

function trimPreviewLines(lines: EscPosPreviewLine[]): EscPosPreviewLine[] {
  let start = 0;
  let end = lines.length;

  while (start < end && !lines[start].text.trim()) {
    start++;
  }
  while (end > start && !lines[end - 1].text.trim()) {
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

function parseGsSequence(bytes: Uint8Array, start: number): number {
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
    case 0x56:
      if (i < bytes.length) {
        const mode = bytes[i];
        i++;
        if (mode === 66 && i < bytes.length) {
          i++;
        }
      }
      return i;
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
