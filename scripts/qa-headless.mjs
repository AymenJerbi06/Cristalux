import { chromium } from '@playwright/test';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const QA = join(ROOT, 'docs/design-references/qa');
mkdirSync(QA, { recursive: true });

const BRAVE = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const LOCAL = 'http://localhost:3001';

async function run() {
  const browser = await chromium.launch({
    executablePath: BRAVE,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  // Desktop 1440
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(LOCAL, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: join(QA, 'clone-desktop-viewport.png') });
    await page.screenshot({ path: join(QA, 'clone-desktop-full.png'), fullPage: true });
    await ctx.close();
    console.log('✓ Clone desktop screenshots done');
  }

  // Mobile 390
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(LOCAL, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: join(QA, 'clone-mobile-full.png'), fullPage: true });
    await ctx.close();
    console.log('✓ Clone mobile screenshot done');
  }

  await browser.close();
  console.log('\n✅ QA screenshots saved to docs/design-references/qa/');
}

run().catch(e => { console.error(e); process.exit(1); });
