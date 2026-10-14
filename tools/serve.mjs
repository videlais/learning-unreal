import path from 'node:path';
import { root } from './site.mjs';

export function createServer(port = 4173, basePath = '/') {
  if (!basePath.startsWith('/') || !basePath.endsWith('/') || basePath.includes('..')) throw new Error('Base path must start and end with /');
  const directory = path.join(root, 'dist');
  return Bun.serve({
    hostname: '127.0.0.1', port,
    async fetch(request) {
      if (!['GET', 'HEAD'].includes(request.method)) return new Response('Read-only preview', { status: 405 });
      let pathname;
      try { pathname = decodeURIComponent(new URL(request.url).pathname); }
      catch { return new Response('Invalid URL', { status: 400 }); }
      if (!pathname.startsWith(basePath)) return new Response('Not found', { status: 404 });
      const relative = pathname.slice(basePath.length) || 'index.html';
      if (relative.split('/').some(part => part.startsWith('.')) || relative.includes('\0')) return new Response('Not available', { status: 403 });
      const filename = path.resolve(directory, relative);
      if (!filename.startsWith(directory + path.sep)) return new Response('Not available', { status: 403 });
      const file = Bun.file(filename);
      if (!await file.exists()) return new Response('Not found', { status: 404 });
      return new Response(request.method === 'HEAD' ? null : file, {
        headers: { 'Content-Type': file.type, 'X-Content-Type-Options': 'nosniff' },
      });
    },
    error(error) {
      console.error(error);
      return new Response('Preview failed; see server log', { status: 500 });
    },
  });
}

if (import.meta.main) {
  if (!await Bun.file(path.join(root, 'dist/index.html')).exists()) throw new Error('Run bun run build before starting preview');
  const server = createServer(Number(process.env.PORT ?? 4173), process.env.BASE_PATH ?? '/');
  console.log(`Preview: ${server.url}${process.env.BASE_PATH?.slice(1) ?? ''}`);
}
