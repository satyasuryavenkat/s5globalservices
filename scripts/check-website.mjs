import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--disable-background-networking', '--no-first-run'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const base = process.env.S5_PREVIEW_URL || 'http://127.0.0.1:5174';
page.on('response', response => {if(response.url().startsWith(base) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);});
async function prepareFullScreenshot() {
  for (const image of await page.locator('img').all()) {await image.scrollIntoViewIfNeeded();await image.evaluate(img => img.decode());}
  for (const section of await page.locator('.reveal').all()) await section.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
}
try {
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelector('video')?.currentTime > 0.2);
  assert.equal(await page.locator('h1').count(), 1);
  console.log('Home video is playing');
  for (const [name, video] of [['Juice & processing', 'juice'], ['Whisky & beer', 'brewing']]) {
    await page.getByRole('button', { name: new RegExp(name.replace('&', '&')) }).click();
    await page.waitForFunction(expected => {const video = document.querySelector('video');return video?.getAttribute('src') === `/videos/${expected}.mp4` && video.currentTime > 0.1;}, video);
    console.log(`${video} service video is playing`);
  }
  await page.getByRole('button', { name: 'Pause background video' }).click();
  assert.equal(await page.locator('video').evaluate(video => video.paused), true);
  await page.getByRole('button', { name: 'Play background video' }).click();
  await page.waitForFunction(() => !document.querySelector('video').paused);
  await page.screenshot({ path: 'artifacts/home-desktop.png' });
  await page.locator('header').getByRole('link', { name: 'About us' }).click();
  await page.waitForURL('**/about');
  await expect(page.locator('h1')).toContainText('People. Precision');
  await page.goBack(); await page.waitForURL(base + '/');
  console.log('Separate page navigation and browser back work');
  const paths = ['/','/about','/services','/services/manpower','/services/juice-processing','/services/brewing-distilling','/machinery','/machinery/juice-processing-system','/how-we-work','/faq','/contact','/credits'];
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of paths) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('h1').count(), 1, `Heading ${path}`);
    for (const width of [320,390,768,1440,1920]) {
      await page.setViewportSize({ width, height: 900 });
      const sizes = await page.evaluate(() => ({ body: document.documentElement.scrollWidth, viewport: window.innerWidth }));
      assert.ok(sizes.body <= sizes.viewport + 1, `Horizontal overflow on ${path} at ${width}: ${JSON.stringify(sizes)}`);
    }
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(img => img.decode());
    }
    console.log(`Page and image checks: ${path}`);
  }
  await page.setViewportSize({ width:1440, height:960 });
  await page.goto(base+'/machinery');
  assert.equal(await page.locator('.equipment-card').count(),14);
  await page.getByRole('button',{name:'CSD & RTS filling',exact:true}).click();
  await expect(page.locator('.equipment-card')).toHaveCount(6);
  await page.getByRole('searchbox',{name:'Search machinery'}).fill('no-matching-equipment');
  await page.getByRole('button',{name:'Reset filters'}).click();
  await expect(page.locator('.equipment-card')).toHaveCount(14);
  await page.getByRole('searchbox',{name:'Search machinery'}).fill('Filling station');
  await expect(page.locator('.equipment-card')).toHaveCount(1);
  await page.locator('.equipment-card').click();
  await page.waitForURL('**/machinery/filling-station');
  await page.getByRole('link',{name:'Enquire about this equipment'}).click();
  assert.equal(await page.getByLabel('What can we help you with?').inputValue(),'CSD & RTS filling line');
  assert.match(await page.getByLabel('Tell us about your project').inputValue(),/Filling station/);
  await page.getByLabel('Your name').fill('Demo Test');
  await page.getByLabel('Email address').fill('demo@example.com');
  await page.getByRole('button',{name:'Prepare project enquiry'}).click();
  await page.getByRole('status').waitFor();
  const downloadPromise=page.waitForEvent('download');
  await page.getByRole('button',{name:'Download enquiry'}).click();
  const download=await downloadPromise;
  assert.equal(download.suggestedFilename(),'s5-project-enquiry.txt');
  console.log('Catalogue search, filters, equipment pages, enquiry prefills, and download work');
  await page.goto(base+'/faq');
  await page.getByRole('button',{name:'Manpower',exact:true}).click();
  await expect(page.locator('.faq-item')).toHaveCount(1);
  await page.locator('.faq-item>button').click();
  await expect(page.locator('.faq-item>button')).toHaveAttribute('aria-expanded','true');
  await page.setViewportSize({width:390,height:844});
  await page.goto(base);
  await page.getByRole('button',{name:'Open navigation'}).click();
  await page.locator('header').getByRole('link',{name:'About us'}).click();
  await page.waitForURL('**/about');
  assert.match(page.url(),/\/about$/);
  assert.equal(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'false');
  await prepareFullScreenshot();
  await page.screenshot({path:'artifacts/about-mobile.png',fullPage:true});
  await page.goto(base);
  await page.screenshot({path:'artifacts/home-mobile.png'});
  await page.setViewportSize({width:1440,height:960});
  await page.goto(base+'/machinery');
  await prepareFullScreenshot();
  await page.screenshot({path:'artifacts/machinery-desktop.png',fullPage:true});
  await page.goto(base);
  await prepareFullScreenshot();
  await page.screenshot({path:'artifacts/home-desktop-full.png',fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('Mobile navigation, FAQ filters, and reduced-motion checks passed. No browser errors or broken local assets.');
} finally { await browser.close(); }
