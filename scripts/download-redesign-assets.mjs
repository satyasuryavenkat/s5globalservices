import { mkdir, writeFile, access } from 'node:fs/promises';

const base = 'https://www.askpowertradingllc.com/wp-content/uploads/2022/01/';
const images = [
  ['juice-system', '1.jpg'], ['juice-plant', '2.jpg'], ['juice-line', '3.jpg'],
  ['juice-tanks', '4.jpg'], ['juice-filling', '5.jpg'], ['juice-equipment', '6.jpg'],
  ['juice-skid', '7.jpg'], ['juice-processing', '8.jpg'],
  ['csd-line', 'Blowing-Machine.jpg'], ['carbonator', 'Carbonated.jpg'],
  ['filler', 'Filling-Machine.jpg'], ['filling-station', 'Filling-Station.jpg'],
  ['beverage-processing', 'Processing.jpg'], ['complete-line', 'overall-line.jpg'],
];
const videos = [
  ['manpower', 'https://videos.pexels.com/video-files/5055608/5055608-uhd_3840_2160_25fps.mp4'],
  ['juice', 'https://videos.pexels.com/video-files/10416677/10416677-hd_1280_720_50fps.mp4'],
  ['brewing', 'https://videos.pexels.com/video-files/5532773/5532773-uhd_4096_2160_25fps.mp4'],
];
await mkdir('public/images/products', { recursive: true });
await mkdir('public/videos', { recursive: true });
async function download(url, destination, type) {
  if (await access(destination).then(() => true).catch(() => false)) return;
  const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
  if (!response.ok || !response.headers.get('content-type')?.startsWith(type)) throw new Error(`${destination}: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(destination, bytes);
  console.log(`${destination}: ${(bytes.length / 1024 / 1024).toFixed(2)} MB`);
}
for (const [name, file] of images) await download(base + file, `public/images/products/${name}.jpg`, 'image/');
for (const [name, url] of videos) await download(url, `public/videos/${name}-source.mp4`, 'video/');
await mkdir('public/images/editorial', { recursive: true });
for (const [name, id] of [['engineer', 'photo-1581092921461-eab62e97a780'], ['team', 'photo-1581092160562-40aa08e78837'], ['workshop', 'photo-1504917595217-d4dc5ebe6122']]) {
  await download(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`, `public/images/editorial/${name}.jpg`, 'image/');
}
