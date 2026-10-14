import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { createServer } from './serve.mjs';
import { root } from './site.mjs';
import { examples } from '../examples/graphs.mjs';

const server = createServer(0, '/learning-unreal/');
const origin = server.url.origin;
const base = `${origin}/learning-unreal`;
const results = { checkedAt: new Date().toISOString(), basePath: '/learning-unreal/', examples: [], passed: false };
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  const failedResponses = [];
  const remote = [];
  const warnings = new Set();
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) failedResponses.push(response.url()); });
  page.on('console', message => { if (['error', 'warning'].includes(message.type())) warnings.add(message.text()); });
  await context.route('**/*', route => {
    if (new URL(route.request().url()).origin !== origin) {
      remote.push(route.request().url());
      return route.abort();
    }
    return route.continue();
  });
  await page.goto(`${base}/`);
  assert.match(await page.locator('h1').textContent(), /Learning Unreal/);
  await page.getByRole('link', { name: 'Learning path', exact: true }).first().click();
  assert.equal(new URL(page.url()).pathname, '/learning-unreal/content/README.html');
  await page.goto(`${base}/content/coursebook.html#stage-3`);
  assert.equal(await page.locator('#stage-3').count(), 1);
  await page.goto(`${base}/examples/index.html`);
  for (const key of Object.keys(examples)) {
    await page.selectOption('#example', key);
    await page.click('#controls button');
    await page.waitForFunction(() => document.body.dataset.ready === 'true', { timeout: 15000 });
    const actual = await page.locator('ueb-blueprint').evaluate(graph => ({ nodes: graph.getNodes().length, links: graph.getLinks().length }));
    assert.deepEqual(actual, { nodes: examples[key].nodes, links: examples[key].links });
    assert.equal(await page.locator('#ueb-status').getAttribute('data-error'), 'false');
    assert.equal(await page.locator('#klee-status').getAttribute('data-error'), 'false');
    const canvasColors = await page.locator('#klee').evaluate(canvas => {
      const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
      const colors = new Set();
      for (let index = 0; index < data.length; index += 16) colors.add(`${data[index]},${data[index + 1]},${data[index + 2]},${data[index + 3]}`);
      return colors.size;
    });
    assert.ok(canvasColors > 20, `${key}: Klee canvas has insufficient rendered detail`);
    const framed = await page.locator('ueb-blueprint').evaluate(graph => {
      const viewport = graph.getBoundingClientRect();
      return graph.getNodes().every(node => {
        const rect = node.getBoundingClientRect();
        return rect.left >= viewport.left && rect.right <= viewport.right && rect.top >= viewport.top && rect.bottom <= viewport.bottom;
      });
    });
    assert.ok(framed, `${key}: graph is clipped`);
    const sourceURL = await page.locator('#source').getAttribute('href');
    assert.equal((await context.request.get(new URL(sourceURL, page.url()).href)).status(), 200);
    const sourceImage = await page.locator('#source-image').getAttribute('href');
    assert.equal((await context.request.get(new URL(sourceImage, page.url()).href)).status(), 200);
    const download = page.waitForEvent('download');
    await page.click('#export');
    const exported = await download;
    const text = await Bun.file(await exported.path()).text();
    assert.equal((text.match(/^Begin Object/gm) ?? []).length, examples[key].nodes);
    const reparsed = await page.evaluate(async source => {
      const Graph = customElements.get('ueb-blueprint');
      const graph = new Graph();
      document.getElementById('ueb-container').replaceChildren(graph);
      await graph.updateComplete;
      graph.template.getPasteInputObject().pasted(source);
      for (let count = 0; count < 100 && !graph.getNodes().length; count++) await new Promise(resolve => setTimeout(resolve, 20));
      await new Promise(resolve => setTimeout(resolve, 200));
      return { nodes: graph.getNodes().length, links: graph.getLinks().length };
    }, text);
    assert.deepEqual(reparsed, actual);
    results.examples.push({ key, ...actual, framed, canvasColors, serializationReparse: 'passed' });
  }
  await page.selectOption('#example', 'overlap');
  await page.fill('#message', 'Hello "visitor"');
  await page.fill('#tag', 'visitor');
  await page.click('#controls button');
  await page.waitForFunction(() => document.body.dataset.ready === 'true');
  assert.match(await page.locator('#serialized').textContent(), /DefaultValue="visitor"/);
  assert.match(await page.locator('#serialized').textContent(), /Hello \\"visitor\\"/);
  const generatedDownload = page.waitForEvent('download');
  await page.click('#download');
  assert.match(await Bun.file(await (await generatedDownload).path()).text(), /DefaultValue="visitor"/);
  const nodeInput = page.locator('ueb-node').filter({ hasText: 'Print String' }).getByRole('textbox').first();
  await nodeInput.fill('Edited in browser');
  await nodeInput.press('Tab');
  const download = page.waitForEvent('download');
  await page.click('#export');
  assert.match(await Bun.file(await (await download).path()).text(), /DefaultValue="Edited in browser"/);
  await page.setViewportSize({ width: 800, height: 1000 });
  await page.click('#controls button');
  await page.waitForFunction(() => document.body.dataset.ready === 'true');
  assert.ok(await page.locator('ueb-blueprint').evaluate(graph => {
    const viewport = graph.getBoundingClientRect();
    return graph.getNodes().every(node => {
      const rect = node.getBoundingClientRect();
      return rect.left >= viewport.left && rect.right <= viewport.right && rect.top >= viewport.top && rect.bottom <= viewport.bottom;
    });
  }));
  assert.deepEqual(errors, []);
  assert.deepEqual(remote, []);
  assert.deepEqual(failedResponses, []);
  results.nodeEditingExport = 'passed';
  results.responsiveFraming = 'passed at 800px';
  results.remoteRequests = remote;
  results.pageErrors = errors;
  results.consoleWarnings = [...warnings];
  results.passed = true;
} catch (error) {
  results.error = error.message;
  throw error;
} finally {
  if (browser) await browser.close();
  await server.stop(true);
  await Bun.write(path.join(root, 'content/browser-verification.json'), JSON.stringify(results, null, 2) + '\n');
}
console.log(JSON.stringify(results, null, 2));
