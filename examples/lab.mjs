import { Blueprint } from '../node_modules/ueblueprint/dist/ueblueprint.js';
import { examples, graphText } from './graphs.mjs';

const byId = id => document.getElementById(id);
let currentGraph;
let currentText = '';
let generation = 0;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fitGraph(graph) {
  await document.fonts.ready;
  for (let attempt = 0; attempt < 8; attempt++) {
    const bounds = graph.getNodes().map(node => node.getBoundingClientRect());
    const width = Math.max(...bounds.map(rect => rect.right)) - Math.min(...bounds.map(rect => rect.left));
    if (width <= graph.clientWidth - 48) break;
    graph.setZoom(graph.getZoom() - 1);
    await graph.updateComplete;
  }
  graph.template.centerContentInViewport(false);
  await graph.updateComplete;
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

function status(id, text, error = false) {
  byId(id).textContent = text;
  byId(id).dataset.error = String(error);
}

function download(text, filename) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function render() {
  const run = ++generation;
  byId('export').disabled = true;
  byId('download').disabled = true;
  document.body.dataset.ready = 'false';
  status('ueb-status', 'Loading graph...');
  status('klee-status', 'Loading graph...');
  const key = byId('example').value;
  const example = examples[key];
  currentText = graphText(key, { message: byId('message').value, tag: byId('tag').value });
  for (const field of ['title', 'description', 'expected', 'dependencies']) byId(field).textContent = example[field];
  byId('source').href = example.source.replace(/\.md$/, '.html');
  byId('source-image').href = example.screenshot;
  byId('sequence').textContent = key === 'beginplay'
    ? 'Execution: BeginPlay -> Print String.'
    : 'Execution: ActorBeginOverlap -> Branch -> Print String on True. Data: Other Actor -> Actor Has Tag Target; query Return Value -> Branch Condition. False performs no action.';
  byId('serialized').textContent = currentText;
  byId('fallback').src = `screenshots/${key}-ueblueprint.png`;
  try {
    if (!Blueprint) throw new Error('ueblueprint module failed to load.');
    const graph = new Blueprint();
    byId('ueb-container').replaceChildren(graph);
    currentGraph = graph;
    await graph.updateComplete;
    graph.template.getPasteInputObject().pasted(currentText);
    graph.unselectAll();
    const deadline = Date.now() + 8000;
    while (graph.getNodes().length !== example.nodes && Date.now() < deadline) await delay(30);
    if (run !== generation) return;
    if (graph.getNodes().length !== example.nodes) throw new Error(`Expected ${example.nodes} nodes; parsed ${graph.getNodes().length}.`);
    await Promise.all(graph.getNodes().map(node => node.updateComplete));
    await graph.updateComplete;
    await delay(200);
    await fitGraph(graph);
    const links = graph.getLinks().length;
    if (links !== example.links) throw new Error(`Expected ${example.links} links; rendered ${links}.`);
    status('ueb-status', `Rendered ${example.nodes} nodes and ${links} links. Baseline fixture passed separate Unreal 5.8.3 native checks; edits require re-verification.`);
    byId('export').disabled = false;
    byId('download').disabled = false;
  } catch (error) {
    if (run !== generation) return;
    console.error(error);
    status('ueb-status', `Rendering failed: ${error.message}. Use the source text and original lesson.`, true);
  }
  try {
    if (run !== generation) return;
    if (!globalThis.Klee?.init) throw new Error('Pinned Klee bundle did not expose Klee.init.');
    const canvas = byId('klee');
    const viewer = globalThis.Klee.get(canvas) || globalThis.Klee.init(canvas);
    viewer.display(currentText);
    status('klee-status', 'Experimental: Klee accepted the input, but default framing may clip nodes. Pan to inspect; use ueblueprint for the teaching view.');
  } catch (error) {
    console.error(error);
    status('klee-status', `Klee failed: ${error.message}. The interactive renderer and source text remain available.`, true);
  }
  if (run === generation) document.body.dataset.ready = 'true';
}

byId('controls').addEventListener('submit', event => {
  event.preventDefault();
  render().catch(error => { console.error(error); status('ueb-status', error.message, true); });
});
byId('download').addEventListener('click', () => download(currentText, `${byId('example').value}-candidate.txt`));
byId('export').addEventListener('click', () => {
  try {
    currentGraph.selectAll();
    const text = currentGraph.getSerializedText();
    currentGraph.unselectAll();
    if (!text.includes('Begin Object')) throw new Error('No graph nodes serialized.');
    download(text, `${byId('example').value}-edited-candidate.txt`);
    status('ueb-status', 'Edited graph downloaded. Inspect, compile and test it in Unreal before use.');
  } catch (error) {
    console.error(error);
    status('ueb-status', `Export failed: ${error.message}`, true);
  }
});
render().catch(error => { console.error(error); status('ueb-status', error.message, true); });
