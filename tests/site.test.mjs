import { test, expect } from 'bun:test';
import { slug, htmlHref, markdownTargets, renderMarkdown } from '../tools/site.mjs';
import { createServer } from '../tools/serve.mjs';

test('URLs preserve fragments and queries when Markdown becomes static HTML', () => {
  expect(htmlHref('../content/coursebook.md#stage-3')).toBe('../content/coursebook.html#stage-3');
  expect(htmlHref('page.md?view=1#part')).toBe('page.html?view=1#part');
  expect(htmlHref('image.png')).toBe('image.png');
  expect(slug('Stage 2: Actors & Components')).toBe('stage-2-actors-components');
});

test('reference extraction includes inline HTML but ignores fenced examples', () => {
  expect(markdownTargets('[Next](page.md)\n\n<img src="image.png">\n\n```\n[not a link](missing.md)\n```')).toEqual(['page.md', 'image.png']);
});

test('HTML sanitization and relative navigation survive nested project-site paths', () => {
  const html = renderMarkdown('# Lesson\n\n[Next](next.md#part)\n\n<script>alert(1)</script>\n\n<img src="graph.png" onerror="alert(1)">\n\n<a id="part"></a>', 'content/03-blueprints/lesson.md');
  expect(html).toContain('href="../../index.html"');
  expect(html).toContain('href="next.html#part"');
  expect(html).toContain('id="lesson"');
  expect(html).toContain('id="part"');
  expect(html).not.toContain('<script');
  expect(html).not.toContain('onerror');
});

test('preview serves only built files and rejects unsupported requests', async () => {
  const server = createServer(0, '/learning-unreal/');
  try {
    const base = `${server.url}learning-unreal/`;
    expect((await fetch(`${base}package.json`)).status).toBe(404);
    expect((await fetch(`${base}.git/config`)).status).toBe(403);
    expect((await fetch(`${base}`, { method: 'POST' })).status).toBe(405);
    expect((await fetch(`${server.url}content/README.html`)).status).toBe(404);
  } finally {
    await server.stop(true);
  }
});
