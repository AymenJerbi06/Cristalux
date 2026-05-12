import { chromium } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DESIGN_REF = join(ROOT, 'docs/design-references');
const RESEARCH = join(ROOT, 'docs/research');

mkdirSync(DESIGN_REF, { recursive: true });
mkdirSync(RESEARCH, { recursive: true });

const TARGET = 'https://upfrontcosmetics.ca/';
const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

const extractionScript = (selector) => `
(function(selector) {
  const el = selector ? document.querySelector(selector) : document.body;
  if (!el) return JSON.stringify({ error: 'Element not found: ' + selector });
  const props = [
    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'textTransform','textDecoration','backgroundColor','background',
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    'width','height','maxWidth','minWidth','maxHeight','minHeight',
    'display','flexDirection','justifyContent','alignItems','gap',
    'gridTemplateColumns','gridTemplateRows',
    'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
    'boxShadow','overflow','overflowX','overflowY',
    'position','top','right','bottom','left','zIndex',
    'opacity','transform','transition','cursor',
    'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
    'whiteSpace','textOverflow','WebkitLineClamp'
  ];
  function extractStyles(element) {
    const cs = getComputedStyle(element);
    const styles = {};
    props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
    return styles;
  }
  function walk(element, depth) {
    if (depth > 4) return null;
    const children = [...element.children];
    return {
      tag: element.tagName.toLowerCase(),
      id: element.id || null,
      classes: element.className?.toString().split(' ').filter(Boolean).slice(0, 8).join(' '),
      text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3 ? element.textContent.trim().slice(0, 300) : null,
      styles: extractStyles(element),
      images: element.tagName === 'IMG' ? { src: element.src, alt: element.alt, naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight } : null,
      bgImage: getComputedStyle(element).backgroundImage !== 'none' ? getComputedStyle(element).backgroundImage : null,
      childCount: children.length,
      children: children.slice(0, 20).map(c => walk(c, depth + 1)).filter(Boolean)
    };
  }
  return JSON.stringify(walk(el, 0), null, 2);
})('${selector}')
`;

async function run() {
  console.log('Launching Brave...');
  const browser = await chromium.launch({
    executablePath: BRAVE_PATH,
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to', TARGET);
  await page.goto(TARGET, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // ── GLOBAL EXTRACTION ──────────────────────────────────────────────────────

  console.log('Extracting global info...');
  const globalInfo = await page.evaluate(() => {
    const links = [...document.querySelectorAll('link')].map(l => ({
      rel: l.rel, href: l.href, type: l.type, sizes: l.sizes?.toString()
    }));
    const fonts = [...new Set(
      [...document.querySelectorAll('h1,h2,h3,h4,p,button,a,span,div')]
        .slice(0, 100)
        .map(el => getComputedStyle(el).fontFamily)
    )];
    const colors = [...new Set(
      [...document.querySelectorAll('*')]
        .slice(0, 200)
        .flatMap(el => {
          const cs = getComputedStyle(el);
          return [cs.color, cs.backgroundColor, cs.borderColor].filter(
            c => c && c !== 'rgba(0, 0, 0, 0)' && c !== 'rgb(0, 0, 0)'
          );
        })
    )].slice(0, 60);
    const images = [...document.querySelectorAll('img')].map(img => ({
      src: img.src || img.currentSrc,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      parentClasses: img.parentElement?.className?.toString().slice(0, 100),
      position: getComputedStyle(img).position,
      zIndex: getComputedStyle(img).zIndex
    }));
    const backgroundImages = [...document.querySelectorAll('*')].filter(el => {
      const bg = getComputedStyle(el).backgroundImage;
      return bg && bg !== 'none';
    }).map(el => ({
      url: getComputedStyle(el).backgroundImage,
      element: el.tagName + '#' + el.id + '.' + (el.className?.toString().split(' ')[0] || '')
    }));
    const videos = [...document.querySelectorAll('video')].map(v => ({
      src: v.src || v.querySelector?.('source')?.src,
      poster: v.poster,
      autoplay: v.autoplay,
      loop: v.loop,
      muted: v.muted
    }));
    const svgCount = document.querySelectorAll('svg').length;
    const meta = [...document.querySelectorAll('meta')].map(m => ({
      name: m.name, property: m.getAttribute('property'), content: m.content
    }));
    const title = document.title;
    const bodyBg = getComputedStyle(document.body).backgroundColor;
    const bodyFont = getComputedStyle(document.body).fontFamily;
    const bodyColor = getComputedStyle(document.body).color;
    const scrollBehavior = getComputedStyle(document.documentElement).scrollBehavior;
    const hasLenis = !!document.querySelector('.lenis, [data-lenis]') ||
                     !!window.lenis ||
                     !!document.querySelector('[data-scroll-container]');
    // Nav structure
    const navLinks = [...document.querySelectorAll('nav a, header a')].map(a => ({
      text: a.textContent.trim(),
      href: a.href
    }));
    return { links, fonts, colors, images, backgroundImages, videos, svgCount, meta, title, bodyBg, bodyFont, bodyColor, scrollBehavior, hasLenis, navLinks };
  });

  writeFileSync(join(RESEARCH, 'global-info.json'), JSON.stringify(globalInfo, null, 2));
  console.log(`Found ${globalInfo.images.length} images, ${globalInfo.videos.length} videos, ${globalInfo.svgCount} SVGs`);
  console.log('Fonts:', globalInfo.fonts.slice(0, 5));
  console.log('Nav links:', globalInfo.navLinks.slice(0, 10));

  // ── SCREENSHOTS ────────────────────────────────────────────────────────────

  console.log('Taking full-page desktop screenshot...');
  await page.screenshot({ path: join(DESIGN_REF, 'desktop-1440-full.png'), fullPage: true });

  console.log('Taking viewport screenshot...');
  await page.screenshot({ path: join(DESIGN_REF, 'desktop-1440-viewport.png'), fullPage: false });

  // ── PAGE STRUCTURE ─────────────────────────────────────────────────────────

  console.log('Extracting page sections...');
  const pageSections = await page.evaluate(() => {
    const candidates = [...document.querySelectorAll(
      'header, nav, footer, section, main, [class*="hero"], [class*="Hero"], [class*="section"], [class*="Section"], [class*="banner"], [class*="Banner"],[class*="product"],[class*="Product"],[class*="feature"],[class*="Feature"],[class*="promo"],[class*="Promo"]'
    )];
    return candidates.map((el, i) => {
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        index: i,
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        classes: el.className?.toString().slice(0, 150),
        position: cs.position,
        display: cs.display,
        zIndex: cs.zIndex,
        offsetTop: el.offsetTop,
        height: rect.height,
        width: rect.width,
        childCount: el.children.length,
        text: el.textContent.trim().slice(0, 200)
      };
    });
  });
  writeFileSync(join(RESEARCH, 'page-sections.json'), JSON.stringify(pageSections, null, 2));

  // ── SCROLL BEHAVIOR ────────────────────────────────────────────────────────

  console.log('Checking header scroll behavior...');
  const headerBefore = await page.evaluate(() => {
    const header = document.querySelector('header, nav, [class*="header"], [class*="Header"], [class*="nav"], [class*="Nav"]');
    if (!header) return null;
    const cs = getComputedStyle(header);
    return {
      selector: header.tagName + '.' + header.className?.toString().split(' ')[0],
      position: cs.position,
      backgroundColor: cs.backgroundColor,
      boxShadow: cs.boxShadow,
      height: cs.height,
      transform: cs.transform,
      transition: cs.transition,
      opacity: cs.opacity
    };
  });

  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(800);

  const headerAfter = await page.evaluate(() => {
    const header = document.querySelector('header, nav, [class*="header"], [class*="Header"], [class*="nav"], [class*="Nav"]');
    if (!header) return null;
    const cs = getComputedStyle(header);
    return {
      position: cs.position,
      backgroundColor: cs.backgroundColor,
      boxShadow: cs.boxShadow,
      height: cs.height,
      transform: cs.transform,
      transition: cs.transition,
      opacity: cs.opacity
    };
  });

  await page.screenshot({ path: join(DESIGN_REF, 'desktop-scrolled-300.png') });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // ── FULL HTML SNAPSHOT ────────────────────────────────────────────────────

  console.log('Capturing HTML snapshot...');
  const html = await page.content();
  writeFileSync(join(RESEARCH, 'page.html'), html);

  // ── SECTION SCREENSHOTS ────────────────────────────────────────────────────

  console.log('Taking section-by-section screenshots...');
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportH = 900;
  const numScreenshots = Math.ceil(pageHeight / viewportH);

  for (let i = 0; i < Math.min(numScreenshots, 12); i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * viewportH);
    await page.waitForTimeout(400);
    await page.screenshot({ path: join(DESIGN_REF, `section-scroll-${i * viewportH}.png`) });
  }
  await page.evaluate(() => window.scrollTo(0, 0));

  // ── MOBILE SCREENSHOTS ─────────────────────────────────────────────────────

  console.log('Taking mobile screenshots...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: join(DESIGN_REF, 'mobile-390-full.png'), fullPage: true });
  await page.screenshot({ path: join(DESIGN_REF, 'mobile-390-viewport.png'), fullPage: false });

  // ── TABLET SCREENSHOTS ─────────────────────────────────────────────────────

  console.log('Taking tablet screenshots...');
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: join(DESIGN_REF, 'tablet-768-full.png'), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);

  // ── HERO/ABOVE-FOLD EXTRACTION ─────────────────────────────────────────────

  console.log('Extracting hero section...');
  const heroStyles = await page.evaluate(extractionScript('main > *:first-child, [class*="hero"], [class*="Hero"], header + *, body > *:first-child'));
  writeFileSync(join(RESEARCH, 'hero-styles.json'), heroStyles || '{}');

  // ── NAVIGATION EXTRACTION ──────────────────────────────────────────────────

  console.log('Extracting navigation...');
  const navStyles = await page.evaluate(extractionScript('header, nav'));
  writeFileSync(join(RESEARCH, 'nav-styles.json'), navStyles || '{}');

  // ── ALL SECTION DETAILS ────────────────────────────────────────────────────

  console.log('Extracting all text content and structure...');
  const allText = await page.evaluate(() => {
    const sections = [...document.querySelectorAll('section, main > *, [class*="section"], [class*="Section"]')];
    return sections.map((s, i) => ({
      index: i,
      classes: s.className?.toString().slice(0, 100),
      headings: [...s.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({ tag: h.tagName, text: h.textContent.trim() })),
      paragraphs: [...s.querySelectorAll('p')].map(p => p.textContent.trim()).filter(Boolean),
      buttons: [...s.querySelectorAll('button, a[class*="btn"], a[class*="button"]')].map(b => ({ text: b.textContent.trim(), href: b.href || null })),
      images: [...s.querySelectorAll('img')].map(img => ({ src: img.src, alt: img.alt })),
      listItems: [...s.querySelectorAll('li')].map(li => li.textContent.trim()).filter(Boolean)
    }));
  });
  writeFileSync(join(RESEARCH, 'all-sections-text.json'), JSON.stringify(allText, null, 2));

  // ── BEHAVIOR SUMMARY ──────────────────────────────────────────────────────

  const behaviors = {
    headerScrollBehavior: {
      before: headerBefore,
      after: headerAfter,
      changes: headerBefore && headerAfter ? Object.keys(headerBefore).filter(k => headerBefore[k] !== headerAfter[k] && k !== 'selector') : []
    },
    hasLenis: globalInfo.hasLenis,
    scrollBehavior: globalInfo.scrollBehavior,
    pageHeight,
    viewportWidth: 1440
  };
  writeFileSync(join(RESEARCH, 'behaviors.json'), JSON.stringify(behaviors, null, 2));

  await browser.close();
  console.log('\n✅ Reconnaissance complete!');
  console.log(`Screenshots saved to: docs/design-references/`);
  console.log(`Research data saved to: docs/research/`);
}

run().catch(e => { console.error(e); process.exit(1); });
