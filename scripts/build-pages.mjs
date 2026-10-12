import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pagePaths, getPageMeta } from '../src/route-meta.js';

const template = await readFile('dist/index.html', 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
for (const path of pagePaths) {
  const { title, description } = getPageMeta(path);
  const html = template.replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${escape(description)}"/>`);
  const directory = join('dist', path.slice(1));
  await mkdir(directory, { recursive:true });
  await writeFile(join(directory, 'index.html'), html);
}
await writeFile('dist/404.html', template);
console.log(`Prepared ${pagePaths.length} direct-entry pages with individual metadata.`);
