import { mkdir, writeFile, access } from 'node:fs/promises';

async function request(url) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (response.status !== 429) return response;
    await new Promise(resolve => setTimeout(resolve, 5000 * (attempt + 1)));
  }
  throw new Error('Image host rate limit: please retry later.');
}

const assets = [
  ['juice-processing', 'Cappy Juice Beverage Processing Line.jpg', 'Biso', 'by/4.0'],
  ['mixing-tank', 'Mixing tank.jpg', 'Xubuli1993', 'by-sa/4.0'],
  ['thermal-tanks', 'Stainless steel fermentation tanks for sparkling wine.jpg', 'Lynn B', 'by/2.0'],
  ['processing-tanks', 'Stainless steel fermentation tank.jpg', 'EJ&EZ', 'by/2.0'],
  ['filling-machine', '10 heads stainless steel piston filler.jpg', 'Vkpak', 'by-sa/4.0'],
  ['filling-station', 'HSKL Automatic Bottle Filling and Capping.jpg', 'Cfcoo', 'by-sa/3.0'],
  ['bottling-line', 'Beer bottle filling machine.JPG', 'AlfvanBeem', 'zero/1.0'],
];
await mkdir('public/images/machinery', { recursive: true });
const credits = [];
for (const [id, title, author, license] of assets) {
  const source = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title.replaceAll(' ', '_'))}`;
  credits.push({ id, title, author, source, license: `https://creativecommons.org/${license === 'zero/1.0' ? 'publicdomain' : 'licenses'}/${license}/`, licenseLabel: license === 'zero/1.0' ? 'CC0 1.0' : `CC ${license.toUpperCase().replace('/', ' ')}` });
  if (await access(`public/images/machinery/${id}.jpg`).then(() => true).catch(() => false)) continue;
  const response = await request(source);
  if (!response.ok) throw new Error(`Source ${id}: ${response.status}`);
  const html = await response.text();
  const match = html.match(/class="fullImageLink"[\s\S]*?<a[^>]+href="([^"]+)"/);
  if (!match) throw new Error(`Original image link missing for ${id}`);
  const imageUrl = id === 'bottling-line'
    ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Beer_bottle_filling_machine.JPG/1280px-Beer_bottle_filling_machine.JPG'
    : match[1].replaceAll('&amp;', '&');
  const imageResponse = await request(imageUrl);
  if (!imageResponse.ok || !imageResponse.headers.get('content-type')?.startsWith('image/')) throw new Error(`Download ${id}: ${imageResponse.status}`);
  const data = Buffer.from(await imageResponse.arrayBuffer());
  await writeFile(`public/images/machinery/${id}.jpg`, data);
  console.log(`${id}: ${data.length} bytes`);
  await new Promise(resolve => setTimeout(resolve, 2000));
}
await writeFile('src/machinery-photos.json', JSON.stringify(credits, null, 2) + '\n');
