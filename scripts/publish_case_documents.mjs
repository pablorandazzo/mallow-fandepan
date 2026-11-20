// The user explicitly authorized including original documents in the site.
// The frontend password is a presentation gate, not file authentication.
import { readFile, writeFile, copyFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { documentFiles } from '../server/caseDocuments.mjs';

const root = process.cwd();
const sourceDir = path.resolve(root, '..', '..', 'Contexto', 'Templates Resueltos');
const pdfDir = path.resolve(root, '.local-documents', 'Nuevos PDF actualizados');
const outputDir = path.resolve(root, 'public', 'case-documents');
const entries = [];
const files = [];
const pdfNames = await readdir(pdfDir);
const pdfById = new Map();
for (const filename of pdfNames) {
  const match = /^(\d{2})[-_].+\.pdf$/i.exec(filename);
  if (!match) continue;
  const id = `T-${match[1]}`;
  if (pdfById.has(id)) throw new Error(`Duplicate PDF for ${id}`);
  pdfById.set(id, path.join(pdfDir, filename));
}
const expectedIds = [...Object.keys(documentFiles), 'T-10', 'T-11'];
if (pdfById.size !== expectedIds.length || expectedIds.some(id => !pdfById.has(id))) {
  throw new Error(`Expected updated PDFs for ${expectedIds.join(', ')}`);
}

// Validate every source before copying so missing inputs fail explicitly.
for (const [id, filename] of Object.entries(documentFiles)) {
  const source = path.join(sourceDir, filename);
  const originalBytes = await readFile(source);
  if (originalBytes.subarray(0, 2).toString() !== 'PK') throw new Error(`Invalid Office source: ${id}`);
  const extension = path.extname(filename).toLowerCase();
  const entry = { id, original: true, pdf: true, format: extension.slice(1).toUpperCase(), sourceFile: filename };
  files.push({ source, target: `${id.toLowerCase()}${extension}`, bytes: originalBytes });
  entries.push(entry);
}
entries.push({ id: 'T-10', original: false, pdf: true, format: null, sourceFile: null });
entries.push({ id: 'T-11', original: false, pdf: true, format: null, sourceFile: null });
for (const id of expectedIds) {
  const pdf = pdfById.get(id);
  const bytes = await readFile(pdf);
  if (bytes.subarray(0, 5).toString() !== '%PDF-') throw new Error(`Invalid PDF: ${id}`);
  files.push({ source: pdf, target: `${id.toLowerCase()}.pdf`, bytes });
}
await mkdir(outputDir, { recursive: true });
for (const file of files) {
  const target = path.join(outputDir, file.target);
  await copyFile(file.source, target);
  const hash = buffer => createHash('sha256').update(buffer).digest('hex');
  if (hash(file.bytes) !== hash(await readFile(target))) throw new Error(`Copy verification failed: ${file.target}`);
}
await writeFile(path.join(outputDir, 'manifest.json'), JSON.stringify({ enabled: true, mode: 'static', documents: entries }, null, 2) + '\n');
console.log(JSON.stringify({ originals: entries.length, readingPdfs: entries.filter(entry => entry.pdf).length, files: files.length, bytes: files.reduce((total, file) => total + file.bytes.length, 0), copiesVerified: true }));
