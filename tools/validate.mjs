import path from 'node:path';
import { marked } from 'marked';
import { root, walk, markdownTargets, slug, htmlHref } from './site.mjs';
import { examples } from '../examples/graphs.mjs';

export async function validate() {
  const errors = [];
  const content = await walk(path.join(root, 'content'));
  const pages = ['README.md', 'examples/README.md', 'examples/unreal/README.md', ...content.filter(file => file.endsWith('.md')).map(file => `content/${file}`)];
  let links = 0;
  async function check(href, filename) {
    if (/^(https?:|mailto:|tel:)/i.test(href)) return;
    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) { errors.push(`Unsupported scheme in ${filename}: ${href}`); return; }
    const [url, fragment] = href.split('#');
    let decoded;
    try { decoded = decodeURIComponent(url.split('?')[0]); }
    catch { errors.push(`Invalid URL in ${filename}: ${href}`); return; }
    const target = decoded ? path.resolve(root, path.dirname(filename), decoded) : path.join(root, filename);
    if (!target.startsWith(root + path.sep)) { errors.push(`Link leaves site in ${filename}: ${href}`); return; }
    const file = Bun.file(target);
    if (!await file.exists()) { errors.push(`Broken link in ${filename}: ${href}`); return; }
    links++;
    if (fragment && target.endsWith('.md')) {
      const text = await file.text();
      const headings = marked.lexer(text).filter(token => token.type === 'heading').map(token => slug(token.text));
      const ids = [...text.matchAll(/id=["']([^"']+)["']/g)].map(match => match[1]);
      if (![...headings, ...ids].includes(decodeURIComponent(fragment))) errors.push(`Missing fragment in ${filename}: ${href}`);
    }
  }
  for (const filename of pages) {
    const text = await Bun.file(path.join(root, filename)).text();
    if (/instructure\.com|illinoisstate\.edu|secure\.notion-static\.com|Source identifier:|\$IMS-CC|faithful\/|learning-path\/|assets\/web_resources/.test(text)) errors.push(`Legacy/private reference in ${filename}`);
    for (const href of markdownTargets(text)) await check(href, filename);
  }
  for (const example of Object.values(examples)) {
    await check(example.source, 'examples/graphs.mjs');
    await check(example.screenshot, 'examples/graphs.mjs');
  }
  const dist = path.join(root, 'dist');
  const builtFiles = await walk(dist);
  for (const filename of builtFiles.filter(file => file.endsWith('.html'))) {
    const html = await Bun.file(path.join(dist, filename)).text();
    for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
      const href = match[1];
      if (/^(https?:|mailto:|tel:|data:|#)/i.test(href)) continue;
      if (href.startsWith('/')) { errors.push(`Root-relative Pages link in ${filename}: ${href}`); continue; }
      const target = path.resolve(dist, path.dirname(filename), decodeURIComponent(htmlHref(href).split(/[?#]/)[0]));
      if (!target.startsWith(dist + path.sep) || !await Bun.file(target).exists()) errors.push(`Broken built link in ${filename}: ${href}`);
    }
  }
  const policy = await Bun.file(path.join(root, 'content/publication.json')).json();
  const lessons = content.filter(file => /^\d{2}-.*\.md$/.test(file)).length;
  if (lessons !== policy.lessons) errors.push(`Lesson coverage mismatch: ${lessons}/${policy.lessons}`);
  const verification = await Bun.file(path.join(root, 'content/unreal-verification.json')).json();
  if (!verification.passed) errors.push('Native Unreal example checks have not passed');
  for (const [filename, expected] of Object.entries(verification.sourceHashes ?? {})) {
    const actual = new Bun.CryptoHasher('sha256').update(await Bun.file(path.join(root, filename)).arrayBuffer()).digest('hex');
    if (actual !== expected) errors.push(`Unreal evidence is stale for ${filename}; rerun bun run test:unreal`);
  }
  if (builtFiles.some(file => /(^|\/)(node_modules|tools|tests|reports|faithful|assets|learning-path)(\/|$)|\.(zip|fbx|pdf|uproject)$/i.test(file))) errors.push('Nonpublic resource in build');
  const report = { pages: pages.length, lessons, localLinks: links, builtFiles: builtFiles.length, errors, passed: errors.length === 0 };
  console.log(JSON.stringify(report, null, 2));
  if (errors.length) throw new Error('Site validation failed');
  return report;
}

if (import.meta.main) await validate();
