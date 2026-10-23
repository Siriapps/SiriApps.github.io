// node scripts/render-piece.mjs <slug> [fps] : renders src/v3/pieces/<slug>.ts to public/videos/<slug>.mp4 through the Vite dev server.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
const slug = process.argv[2], FPS = Number(process.argv[3] || 30), SUB = 2;
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:5173/?reel=0', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready.then(() => true));
const dur = await page.evaluate(async (slug) => {
  const m = await import(`/src/v3/pieces/${slug}.ts`); window.__piece = m.piece;
  const c = document.createElement('canvas'); c.width = 1280; c.height = 720; c.id = 'pc'; c.style.cssText = 'position:fixed;left:0;top:0;z-index:99999'; document.body.appendChild(c); window.__ctx = c.getContext('2d');
  return m.piece.duration;
}, slug);
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-i', '-', '-vf', `tmix=frames=${SUB},select='eq(mod(n\,${SUB})\,${SUB - 1})',setpts=N/${FPS}/TB`, '-r', String(FPS), '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `public/videos/${slug}.mp4`], { stdio: ['pipe', 'inherit', 'inherit'] });
const total = Math.round(dur * FPS * SUB);
for (let i = 0; i < total; i++) {
  await page.evaluate(t => window.__piece.seek(t, window.__ctx, 1280, 720), i / (FPS * SUB));
  const png = await page.locator('#pc').screenshot({ type: 'png' });
  if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
}
ff.stdin.end(); await new Promise(r => ff.on('close', r)); await browser.close();
console.log('rendered', slug, dur + 's');
