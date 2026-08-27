import { encode } from 'uqr';

const FACTURA_HEADER = 'FACTURA TU COMPRA';
const FOLIO_PREFIX = 'Folio:';
const PAPER_DOTS = 576;

export interface SelfInvoiceEscPosContext {
  url?: string;
  folio?: string;
}

export function rewriteSelfInvoiceEscPos(
  bytes: Uint8Array,
  context: SelfInvoiceEscPosContext = {}
): Uint8Array {
  const headerAt = findSelfInvoiceBlockStart(bytes);
  if (headerAt < 0) {
    return bytes;
  }

  const folioAt = indexOfAscii(bytes, FOLIO_PREFIX, headerAt);
  let blockEnd = folioAt >= 0 ? indexOfByte(bytes, 0x0a, folioAt) : -1;
  if (blockEnd >= 0) {
    blockEnd += 1;
  } else {
    const cutAt = indexOfBytes(bytes, new Uint8Array([0x1d, 0x56]), headerAt);
    blockEnd = cutAt >= 0 ? cutAt : bytes.length;
  }

  const url =
    (context.url ?? '').trim() ||
    extractHttpsUrl(bytes.subarray(headerAt, blockEnd)) ||
    extractHttpsUrl(bytes) ||
    '';
  const folio =
    (context.folio ?? '').trim() ||
    (folioAt >= 0 ? extractFolio(bytes, folioAt) : '');

  if (!url) {
    return bytes;
  }

  const rebuilt = buildSelfInvoiceBlock(url, folio);
  const out = new Uint8Array(headerAt + rebuilt.length + (bytes.length - blockEnd));
  out.set(bytes.subarray(0, headerAt), 0);
  out.set(rebuilt, headerAt);
  out.set(bytes.subarray(blockEnd), headerAt + rebuilt.length);
  return out;
}

function concatBytes(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function buildSelfInvoiceBlock(url: string, folio: string): Uint8Array {
  const textBefore: number[] = [
    0x1b, 0x61, 0x01,
    0x1b, 0x45, 0x01,
    ...ascii(FACTURA_HEADER),
    0x0a,
    0x1b, 0x45, 0x00,
    ...ascii('Escanea el QR o entra a:'),
    0x0a,
    0x1b, 0x21, 0x01,
  ];

  for (const line of wrapAscii(url, 42)) {
    textBefore.push(...ascii(line), 0x0a);
  }

  textBefore.push(0x1b, 0x21, 0x00, 0x0a);

  const textAfter: number[] = [0x0a];
  if (folio) {
    textAfter.push(...ascii(`${FOLIO_PREFIX} ${folio}`), 0x0a);
  }
  textAfter.push(0x1b, 0x61, 0x00);

  return concatBytes([
    Uint8Array.from(textBefore),
    buildEscPosRasterQr(url),
    Uint8Array.from(textAfter),
  ]);
}

export function buildEscPosRasterQr(payload: string): Uint8Array {
  const { data, size } = encode(payload, { ecc: 'M', border: 2 });
  const scale = Math.max(4, Math.min(6, Math.floor(300 / size)));
  const qrDots = size * scale;
  const leftPad = Math.max(0, Math.floor((PAPER_DOTS - qrDots) / 2));
  const widthDots = leftPad + qrDots;
  const widthBytes = Math.ceil(widthDots / 8);
  const height = qrDots;
  const image = new Uint8Array(widthBytes * height);

  for (let y = 0; y < height; y++) {
    const qrY = Math.min(size - 1, Math.floor(y / scale));
    const row = data[qrY] ?? [];
    for (let x = 0; x < qrDots; x++) {
      const qrX = Math.floor(x / scale);
      if (!row[qrX]) {
        continue;
      }
      const paperX = leftPad + x;
      const byteIndex = y * widthBytes + (paperX >> 3);
      image[byteIndex] |= 0x80 >> (paperX & 7);
    }
  }

  const header = Uint8Array.from([
    0x1d,
    0x76,
    0x30,
    0x00,
    widthBytes & 0xff,
    (widthBytes >> 8) & 0xff,
    height & 0xff,
    (height >> 8) & 0xff,
  ]);
  const out = new Uint8Array(header.length + image.length);
  out.set(header, 0);
  out.set(image, header.length);
  return out;
}

export function uint8ToBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function ascii(value: string): number[] {
  const out: number[] = [];
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    out.push(code < 128 ? code : 0x3f);
  }
  return out;
}

function wrapAscii(value: string, width: number): string[] {
  const lines: string[] = [];
  for (let i = 0; i < value.length; i += width) {
    lines.push(value.slice(i, i + width));
  }
  return lines.length ? lines : [value];
}

function findSelfInvoiceBlockStart(bytes: Uint8Array): number {
  const headerAt = indexOfAscii(bytes, FACTURA_HEADER);
  if (headerAt >= 0) {
    return headerAt;
  }
  const hintAt = indexOfAscii(bytes, 'Escanea el QR');
  if (hintAt >= 0) {
    return hintAt;
  }
  return indexOfAscii(bytes, 'https://facturacion');
}

function extractHttpsUrl(bytes: Uint8Array): string {
  const text = new TextDecoder('latin1').decode(bytes);
  const matches = text.match(/https?:\/\/[^\s\x00-\x1fk]+/gi) ?? [];
  const cleaned = matches
    .map((item) =>
      item
        .replace(/^kf1P0/i, '')
        .replace(/k1[ACEQ].*$/i, '')
        .replace(/[^\x21-\x7e]+$/g, '')
        .trim()
    )
    .filter((item) => item.startsWith('http'));
  cleaned.sort((a, b) => b.length - a.length);
  return cleaned[0] ?? '';
}

function extractFolio(bytes: Uint8Array, folioAt: number): string {
  const start = folioAt + FOLIO_PREFIX.length;
  let end = start;
  while (end < bytes.length && bytes[end] !== 0x0a && bytes[end] !== 0x0d) {
    end++;
  }
  return new TextDecoder('latin1').decode(bytes.subarray(start, end)).trim();
}

function indexOfAscii(haystack: Uint8Array, needle: string, from = 0): number {
  return indexOfBytes(haystack, Uint8Array.from(ascii(needle)), from);
}

function indexOfByte(haystack: Uint8Array, value: number, from = 0): number {
  for (let i = from; i < haystack.length; i++) {
    if (haystack[i] === value) {
      return i;
    }
  }
  return -1;
}

function indexOfBytes(haystack: Uint8Array, needle: Uint8Array, from = 0): number {
  if (!needle.length || needle.length > haystack.length) {
    return -1;
  }
  outer: for (let i = from; i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        continue outer;
      }
    }
    return i;
  }
  return -1;
}
