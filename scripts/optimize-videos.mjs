import ffmpeg from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';
import { mkdir, unlink } from 'node:fs/promises';

await mkdir('public/images/editorial', { recursive: true });
for (const name of ['manpower', 'juice', 'brewing']) {
  const input = `public/videos/${name}-source.mp4`;
  for (const [suffix, time] of [['poster', '2'], ['detail', '5']]) {
    const result = spawnSync(ffmpeg, ['-y', '-ss', time, '-i', input, '-frames:v', '1', '-vf', 'scale=1440:-2', '-q:v', '3', `public/images/editorial/${name}-${suffix}.jpg`], { encoding: 'utf8', windowsHide: true });
    if (result.status !== 0) throw new Error(result.stderr);
  }
  const result = spawnSync(ffmpeg, ['-y', '-i', input, '-t', '12', '-vf', 'scale=1280:-2', '-r', '25', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `public/videos/${name}.mp4`], { encoding: 'utf8', windowsHide: true });
  if (result.status !== 0) throw new Error(result.stderr);
  console.log(`${name}: optimized video and two photo frames`);
  await unlink(input);
}
