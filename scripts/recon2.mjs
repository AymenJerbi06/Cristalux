import { chromium } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DESIGN_REF = join(ROOT, 'docs/design-references');
const RESEARCH = join(ROOT, 'docs/research');
const COMPONENTS = join(ROOT, 'docs/research/components');

mkdirSync(COMPONENTS, { recursive: true });

const TARGET = 'https://upfrontcosmetics.ca/';
const BRAVE_PATH = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

function extractCSS(selector) {
  return `(function() {
    const el = document.querySelector('${selector}');
    if (!el) return JSON.stringify({ error: 'not found: ${selector}' });
    const props = ['fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color','textTransform','textDecoration','backgroundColor','background','backgroundImage','backgroundSize','backgroundPosition','padding','paddingTop','paddingRight','paddingBottom','paddingLeft','margin','marginTop','marginRight','marginBottom','marginLeft','width','height','maxWidth','minWidth','maxHeight','minHeight','display','flexDirection','justifyContent','alignItems','gap','gridTemplateColumns','gridTemplateRows','borderRadius','border','borderTop','borderBottom','borderLeft','borderRight','boxShadow','overflow','position','top','right','bottom','left','zIndex','opacity','transform','transition','cursor','objectFit','mixBlendMode','filter','whiteSpace'];
    function extractStyles(element) {
      const cs = getComputedStyle(element);
      const styles = {};
      props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
      return styles;
    }
    function walk(element, depth) {
      if (depth > 5) return null;
      const children = [...element.children];
      return {
        tag: element.tagName.toLowerCase(),
        id: element.id || null,
        classes: element.className?.toString().slice(0,200),
        text: (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) ? element.textContent.trim().slice(0,300) : null,
        href: element.href || null,
        src: element.src || element.getAttribute('src') || null,
        alt: element.alt || null,
        styles: extractStyles(element),
        bgImage: getComputedStyle(element).backgroundImage !== 'none' ? getComputedStyle(element).backgroundImage : null,
        childCount: children.length,
        children: children.slice(0,25).map(c => walk(c, depth+1)).filter(Boolean)
      };
    }
    return JSON.stringify(walk(el, 0), null, 2);
  })()`;
}

async function run() {
  console.log('Launching Brave for deep extraction...');
  const browser = await chromium.launch({
    executablePath: BRAVE_PATH,
    headless: false,
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(TARGET, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // ── NAVIGATION ─────────────────────────────────────────────────────────────
  console.log('Extracting navigation...');
  const navData = await page.evaluate(extractCSS('.site-header'));
  writeFileSync(join(COMPONENTS, 'nav-deep.json'), navData);
  await page.screenshot({ path: join(DESIGN_REF, 'nav-desktop.png'), clip: { x: 0, y: 0, width: 1440, height: 200 } });

  // ── ANNOUNCEMENT BAR ────────────────────────────────────────────────────────
  const announcementData = await page.evaluate(extractCSS('.announcement-bar, .site-nav, [class*="announcement"]'));
  writeFileSync(join(COMPONENTS, 'announcement-deep.json'), announcementData);

  // ── HERO SLIDESHOW ─────────────────────────────────────────────────────────
  console.log('Extracting hero slideshow...');
  const heroData = await page.evaluate(extractCSS('.index-section--hero, #shopify-section-1524769873765'));
  writeFileSync(join(COMPONENTS, 'hero-deep.json'), heroData);
  await page.screenshot({ path: join(DESIGN_REF, 'hero-desktop.png'), clip: { x: 0, y: 0, width: 1440, height: 600 } });

  // Get slide text content
  const slideContent = await page.evaluate(() => {
    const slides = [...document.querySelectorAll('.hero__slide, .slideshow__slide, [class*="slideshow__slide"]')];
    return slides.map((slide, i) => {
      const title = slide.querySelector('.hero__title, h1, h2')?.textContent.trim();
      const btn = slide.querySelector('a.btn, a.button, a[class*="btn"]');
      const bgImg = [...slide.querySelectorAll('img, [style*="background"]')].map(el => ({
        src: el.src || el.currentSrc || getComputedStyle(el).backgroundImage,
        classes: el.className?.toString().slice(0,100)
      }));
      const cs = getComputedStyle(slide);
      return {
        index: i,
        title,
        buttonText: btn?.textContent.trim(),
        buttonHref: btn?.href,
        bgImages: bgImg,
        color: cs.color,
        textAlign: cs.textAlign,
        classes: slide.className?.toString().slice(0,150)
      };
    });
  });
  writeFileSync(join(COMPONENTS, 'hero-slides.json'), JSON.stringify(slideContent, null, 2));

  // Get hero background images
  const heroBgImages = await page.evaluate(() => {
    const parallaxEls = [...document.querySelectorAll('.parallax-image, .hero__image, [class*="hero__image"]')];
    return parallaxEls.map(el => {
      const img = el.querySelector('img');
      const cs = getComputedStyle(el);
      return {
        classes: el.className?.toString().slice(0,100),
        bgImage: cs.backgroundImage,
        imgSrc: img?.src || img?.currentSrc,
        dataSrc: el.getAttribute('data-bgset') || el.getAttribute('data-src'),
        width: cs.width,
        height: cs.height,
        position: cs.position,
        zIndex: cs.zIndex
      };
    });
  });
  writeFileSync(join(COMPONENTS, 'hero-bg-images.json'), JSON.stringify(heroBgImages, null, 2));

  // ── SECTION AFTER HERO ─────────────────────────────────────────────────────
  console.log('Extracting sections after hero...');
  const allShopifySections = await page.evaluate(() => {
    const sections = [...document.querySelectorAll('.shopify-section')];
    return sections.slice(1).map((sec, i) => {
      const cs = getComputedStyle(sec);
      const heading = sec.querySelector('h1,h2,h3');
      const imgs = [...sec.querySelectorAll('img')].slice(0,5).map(img => ({
        src: img.src || img.currentSrc,
        dataSrc: img.getAttribute('data-src') || img.getAttribute('data-srcset'),
        alt: img.alt,
        classes: img.className?.toString().slice(0,80)
      }));
      return {
        index: i + 1,
        id: sec.id,
        classes: sec.className?.toString().slice(0,100),
        bgColor: cs.backgroundColor,
        padding: cs.padding,
        headingText: heading?.textContent.trim(),
        imageCount: sec.querySelectorAll('img').length,
        images: imgs,
        textPreview: sec.textContent.trim().slice(0,300)
      };
    });
  });
  writeFileSync(join(COMPONENTS, 'all-sections-overview.json'), JSON.stringify(allShopifySections, null, 2));

  // ── PRODUCT GRID SECTION ────────────────────────────────────────────────────
  console.log('Extracting customer favs / product section...');
  const productSection = await page.evaluate(() => {
    // Find the "SHOP CUSTOMER FAVS" section
    const allSections = [...document.querySelectorAll('.shopify-section')];
    const favSection = allSections.find(s => s.textContent.includes('SHOP CUSTOMER FAVS') || s.textContent.includes('customer fav'));
    if (!favSection) return { error: 'not found' };
    const cs = getComputedStyle(favSection);
    const heading = favSection.querySelector('h2, h1');
    const productCards = [...favSection.querySelectorAll('.product-item, .grid-product, [class*="product-item"], [class*="grid__item"]')].slice(0,6).map(card => {
      const cardCS = getComputedStyle(card);
      const img = card.querySelector('img');
      const title = card.querySelector('.product-item__title, .grid-product__title, h3, [class*="title"]');
      const price = card.querySelector('.product-item__price, .grid-product__price, [class*="price"]');
      return {
        classes: card.className?.toString().slice(0,100),
        display: cardCS.display,
        width: cardCS.width,
        padding: cardCS.padding,
        imgSrc: img?.src || img?.currentSrc || img?.getAttribute('data-src'),
        imgAlt: img?.alt,
        title: title?.textContent.trim(),
        price: price?.textContent.trim()
      };
    });
    return {
      classes: favSection.className?.toString().slice(0,100),
      bgColor: cs.backgroundColor,
      padding: cs.padding,
      headingText: heading?.textContent.trim(),
      productCardCount: productCards.length,
      productCards
    };
  });
  writeFileSync(join(COMPONENTS, 'product-section.json'), JSON.stringify(productSection, null, 2));

  // Screenshot the product section
  await page.evaluate(() => {
    const allSections = [...document.querySelectorAll('.shopify-section')];
    const favSection = allSections.find(s => s.textContent.includes('SHOP CUSTOMER FAVS'));
    if (favSection) favSection.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: join(DESIGN_REF, 'product-section.png') });

  // ── COLLECTION/ICON BAND ───────────────────────────────────────────────────
  console.log('Extracting collection icon band...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // ── CHOOSE YOUR EXPERIENCE SECTION ─────────────────────────────────────────
  console.log('Extracting "Choose Your Experience" section...');
  const chooseSection = await page.evaluate(() => {
    const allSections = [...document.querySelectorAll('.shopify-section')];
    const sec = allSections.find(s => s.textContent.includes('Choose Your Experience'));
    if (!sec) return { error: 'not found' };
    const cs = getComputedStyle(sec);
    return {
      classes: sec.className?.toString().slice(0,100),
      bgColor: cs.backgroundColor,
      padding: cs.padding,
      htmlPreview: sec.innerHTML.slice(0, 2000)
    };
  });
  writeFileSync(join(COMPONENTS, 'choose-section.json'), JSON.stringify(chooseSection, null, 2));

  // ── FULL PAGE CSS VARS ─────────────────────────────────────────────────────
  console.log('Extracting CSS custom properties...');
  const cssVars = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    const vars = {};
    // Common Shopify theme CSS vars
    const keys = ['--color-body-bg','--color-text','--color-btn-primary','--color-btn-primary-text','--color-link','--color-border','--color-accent','--font-stack-body','--font-stack-header','--font-size-base','--line-height-body'];
    keys.forEach(k => { const v = styles.getPropertyValue(k); if (v) vars[k] = v.trim(); });
    // Also grab all --color- vars from stylesheet rules
    const allVars = {};
    [...document.styleSheets].forEach(sheet => {
      try {
        [...sheet.cssRules || []].forEach(rule => {
          if (rule.selectorText === ':root') {
            const text = rule.cssText;
            const matches = text.match(/--[\w-]+:\s*[^;]+/g) || [];
            matches.forEach(m => {
              const [k, v] = m.split(':').map(s => s.trim());
              allVars[k] = v;
            });
          }
        });
      } catch (e) {}
    });
    return { computed: vars, fromStylesheet: allVars };
  });
  writeFileSync(join(COMPONENTS, 'css-vars.json'), JSON.stringify(cssVars, null, 2));

  // ── FOOTER ─────────────────────────────────────────────────────────────────
  console.log('Extracting footer...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(DESIGN_REF, 'footer-desktop.png') });
  const footerData = await page.evaluate(extractCSS('footer, .site-footer, [class*="footer"]'));
  writeFileSync(join(COMPONENTS, 'footer-deep.json'), footerData);

  // ── COLLECTION ICONS / BAND ────────────────────────────────────────────────
  console.log('Finding collection icon bands...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Scroll slowly and screenshot every 900px
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 600; y < pageHeight; y += 900) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(DESIGN_REF, `scroll-y${y}.png`) });
  }

  // ── COLLECTION CARDS ──────────────────────────────────────────────────────
  console.log('Extracting collection cards...');
  const collectionCards = await page.evaluate(() => {
    const collectionSections = [...document.querySelectorAll('.shopify-section')];
    return collectionSections.map((sec, i) => {
      const cards = [...sec.querySelectorAll('[class*="collection"], [class*="Collection"]')];
      if (cards.length === 0) return null;
      return {
        sectionIndex: i,
        cardCount: cards.length,
        cards: cards.slice(0, 8).map(card => {
          const img = card.querySelector('img');
          const link = card.querySelector('a');
          const title = card.querySelector('h2,h3,h4,[class*="title"]');
          return {
            classes: card.className?.toString().slice(0, 80),
            imgSrc: img?.src || img?.currentSrc,
            href: link?.href,
            titleText: title?.textContent.trim()
          };
        })
      };
    }).filter(Boolean);
  });
  writeFileSync(join(COMPONENTS, 'collection-cards.json'), JSON.stringify(collectionCards, null, 2));

  await browser.close();
  console.log('\n✅ Deep extraction complete!');
}

run().catch(e => { console.error(e); process.exit(1); });
