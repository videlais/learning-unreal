import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export const root = path.resolve(import.meta.dir, '..');
export const slug = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export const htmlHref = href => href.replace(/\.md(?=[?#]|$)/, '.html');
const renderer = new marked.Renderer();
renderer.heading = function ({ tokens, depth, text }) {
  return `<h${depth} id="${slug(text)}">${this.parser.parseInline(tokens)}</h${depth}>`;
};
marked.use({ renderer });

export async function walk(directory, prefix = '') {
  const results = [];
  for (const entry of await readdir(path.join(directory, prefix), { withFileTypes: true })) {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symlink not allowed in public content: ${relative}`);
    if (entry.isDirectory()) results.push(...await walk(directory, relative));
    else if (entry.isFile()) results.push(relative);
  }
  return results.sort();
}

export function markdownTargets(text) {
  const targets = [];
  marked.walkTokens(marked.lexer(text), token => {
    if (['link', 'image'].includes(token.type)) targets.push(token.href);
    if (token.type === 'html') {
      for (const match of token.text.matchAll(/(?:href|src)=["']([^"']+)["']/g)) targets.push(match[1]);
    }
  });
  return targets;
}

export function renderMarkdown(text, filename) {
  const body = sanitizeHtml(marked.parse(text), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, '*': ['id'], img: ['src', 'alt', 'title', 'width', 'height'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    transformTags: {
      a: (tagName, attribs) => ({ tagName, attribs: { ...attribs, href: htmlHref(attribs.href ?? '') } }),
    },
  });
  const prefix = path.posix.relative(path.posix.dirname(filename), '.') || '.';
  const title = marked.lexer(text).find(token => token.type === 'heading')?.text ?? 'Learning Unreal';
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)} | Learning Unreal</title>
<style>body{max-width:960px;margin:2rem auto;padding:0 1rem;font:18px/1.6 system-ui;color:#222}img{max-width:100%;height:auto}pre{overflow:auto;background:#eee;padding:1rem}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:.4rem}a{color:#1457a6}blockquote{border-left:4px solid #999;padding-left:1rem}nav{display:flex;gap:1rem;flex-wrap:wrap}code{overflow-wrap:anywhere}</style>
</head><body><nav aria-label="Main"><a href="${prefix}/index.html">Home</a><a href="${prefix}/content/README.html">Learning path</a><a href="${prefix}/examples/index.html">Blueprint lab</a><a href="${prefix}/content/compatibility.html">Unreal 5.8 checks</a></nav><main>${body}</main></body></html>\n`;
}
