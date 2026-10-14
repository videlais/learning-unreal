import { mkdir, rm, cp, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { root, walk, renderMarkdown, htmlHref } from './site.mjs';
import { examples, graphText } from '../examples/graphs.mjs';

export async function build() {
  const dist = path.join(root, 'dist');
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  const files = ['README.md', ...await walk(path.join(root, 'content')).then(rows => rows.map(row => `content/${row}`))];
  files.push('examples/README.md', 'examples/unreal/README.md');
  for (const filename of files) {
    if (filename.endsWith('.md')) {
      await Bun.write(path.join(dist, htmlHref(filename)), renderMarkdown(await Bun.file(path.join(root, filename)).text(), filename));
    } else {
      const target = path.join(dist, filename);
      await mkdir(path.dirname(target), { recursive: true });
      await copyFile(path.join(root, filename), target);
    }
  }
  await copyFile(path.join(dist, 'README.html'), path.join(dist, 'index.html'));
  for (const filename of ['index.html', 'lab.css']) {
    await copyFile(path.join(root, 'examples', filename), path.join(dist, 'examples', filename));
  }
  await cp(path.join(root, 'examples/screenshots'), path.join(dist, 'examples/screenshots'), { recursive: true });
  for (const key of Object.keys(examples)) {
    await Bun.write(path.join(dist, 'examples/text', `${key}-candidate.txt`), graphText(key));
  }
  const bundle = await Bun.build({
    entrypoints: [path.join(root, 'examples/lab.mjs')], target: 'browser',
    outdir: path.join(dist, 'examples'), naming: 'lab.mjs',
  });
  if (!bundle.success) throw new AggregateError(bundle.logs, 'Blueprint browser build failed');
  await cp(path.join(root, 'vendor/klee'), path.join(dist, 'vendor/klee'), { recursive: true });
  for (const directory of ['css', 'font']) {
    await cp(path.join(root, 'node_modules/ueblueprint/dist', directory), path.join(dist, 'vendor/ueblueprint', directory), { recursive: true });
  }
  await copyFile(path.join(root, 'node_modules/ueblueprint/LICENSE'), path.join(dist, 'vendor/ueblueprint/LICENSE'));
  await copyFile(path.join(root, 'vendor/ueblueprint/Roboto-LICENSE'), path.join(dist, 'vendor/ueblueprint/Roboto-LICENSE'));
  await Bun.write(path.join(dist, '.nojekyll'), '');
  console.log(`Built ${files.filter(file => file.endsWith('.md')).length} pages in dist/`);
  return dist;
}

if (import.meta.main) await build();
