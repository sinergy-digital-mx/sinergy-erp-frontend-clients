/**
 * Genera `whatsapp-integration-guide.content.ts` a partir de la guía en Markdown del backend:
 *   sinergy-erp-backend-clients/src/api/whatsapp/docs/EXTERNAL_INTEGRATION_GUIDE.md
 *
 * Uso: node scripts/generate-whatsapp-guide.js [ruta-al-md]
 */
const fs = require('fs');
const path = require('path');

const source =
  process.argv[2] ||
  path.resolve(
    __dirname,
    '../../sinergy-erp-backend-clients/src/api/whatsapp/docs/EXTERNAL_INTEGRATION_GUIDE.md'
  );
const target = path.resolve(
  __dirname,
  '../src/app/features/settings/pages/whatsapp-integration-guide/whatsapp-integration-guide.content.ts'
);

const lines = fs.readFileSync(source, 'utf8').replace(/\r\n/g, '\n').split('\n');

const SKIP_SECTIONS = ['Historial'];
const SKIP_INTRO = /dentro del ERP/;

const intro = [];
const sections = [];
let current = null;

const push = (block) => (current ? current.blocks : intro).push(block);
const splitRow = (row) =>
  row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split(/(?<!\\)\|/)
    .map((cell) => cell.replace(/\\\|/g, '|').trim());

let i = 0;
while (i < lines.length) {
  const line = lines[i];

  if (/^```/.test(line)) {
    const lang = line.replace(/^```/, '').trim();
    const code = [];
    i++;
    while (i < lines.length && !/^```/.test(lines[i])) code.push(lines[i++]);
    i++;
    push({ t: 'code', lang, code: code.join('\n') });
    continue;
  }

  if (/^# /.test(line)) {
    i++;
    continue;
  }

  if (/^## /.test(line)) {
    const title = line.replace(/^## /, '').trim();
    current = SKIP_SECTIONS.includes(title) ? { skip: true, blocks: [] } : { title, blocks: [] };
    if (!current.skip) sections.push(current);
    i++;
    continue;
  }

  if (current?.skip) {
    i++;
    continue;
  }

  const heading = /^(###|####) (.*)$/.exec(line);
  if (heading) {
    push({ t: heading[1] === '###' ? 'h3' : 'h4', text: heading[2].trim() });
    i++;
    continue;
  }

  if (/^---\s*$/.test(line)) {
    i++;
    continue;
  }

  if (!line.trim()) {
    i++;
    continue;
  }

  if (/^\|/.test(line) && /^\|[\s|:-]+\|?\s*$/.test(lines[i + 1] || '')) {
    const head = splitRow(line);
    const rows = [];
    i += 2;
    while (i < lines.length && /^\|/.test(lines[i])) rows.push(splitRow(lines[i++]));
    push({ t: 'table', head, rows });
    continue;
  }

  if (/^>/.test(line)) {
    const text = [];
    while (i < lines.length && /^>/.test(lines[i])) text.push(lines[i++].replace(/^>\s?/, ''));
    push({ t: 'quote', text: text.join(' ').trim() });
    continue;
  }

  const listMatch = /^(-|\d+\.) (.*)$/.exec(line);
  if (listMatch) {
    const ordered = listMatch[1] !== '-';
    const items = [];
    while (i < lines.length) {
      const top = /^(-|\d+\.) (.*)$/.exec(lines[i]);
      const nested = /^\s+- (.*)$/.exec(lines[i]);
      if (top && (ordered ? top[1] !== '-' : top[1] === '-')) {
        items.push({ text: top[2].trim(), children: [] });
      } else if (nested && items.length) {
        items[items.length - 1].children.push(nested[1].trim());
      } else if (/^\s+\S/.test(lines[i]) && items.length) {
        items[items.length - 1].text += ' ' + lines[i].trim();
      } else {
        break;
      }
      i++;
    }
    push({ t: ordered ? 'ol' : 'ul', items });
    continue;
  }

  const para = [];
  while (
    i < lines.length &&
    lines[i].trim() &&
    !/^(```|#|\||>|- |\d+\. |---)/.test(lines[i])
  ) {
    para.push(lines[i++].trim());
  }
  const text = para.join(' ');
  if (!(current === null && SKIP_INTRO.test(text))) push({ t: 'p', text });
}

const output = `// ARCHIVO GENERADO. No editar a mano.
// Fuente: sinergy-erp-backend-clients/src/api/whatsapp/docs/EXTERNAL_INTEGRATION_GUIDE.md
// Regenerar: node scripts/generate-whatsapp-guide.js

export type GuideBlock =
  | { t: 'h3' | 'h4' | 'p' | 'quote'; text: string }
  | { t: 'ul' | 'ol'; items: { text: string; children: string[] }[] }
  | { t: 'code'; lang: string; code: string }
  | { t: 'table'; head: string[]; rows: string[][] };

export interface GuideSection {
  id: string;
  title: string;
  blocks: GuideBlock[];
}

export const WHATSAPP_GUIDE_INTRO: GuideBlock[] = ${JSON.stringify(intro, null, 2)};

export const WHATSAPP_GUIDE_SECTIONS: GuideSection[] = ${JSON.stringify(
  sections.map((s, index) => ({
    id: `s${index + 1}`,
    title: s.title.replace(/^\d+\.\s*/, ''),
    blocks: s.blocks,
  })),
  null,
  2
)};
`;

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, output, 'utf8');
console.log(`Generado ${path.relative(process.cwd(), target)} (${sections.length} secciones)`);
