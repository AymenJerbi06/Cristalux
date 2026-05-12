import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');

mkdirSync(join(PUBLIC, 'images'), { recursive: true });
mkdirSync(join(PUBLIC, 'images/hero'), { recursive: true });
mkdirSync(join(PUBLIC, 'images/products'), { recursive: true });
mkdirSync(join(PUBLIC, 'images/promo'), { recursive: true });
mkdirSync(join(PUBLIC, 'images/misc'), { recursive: true });

const assets = [
  // Hero slides
  { url: 'https://upfrontcosmetics.ca/cdn/shop/files/upfront_home_header_slide1_a6a8560f-fcb5-4e74-a423-44f9d62085d7_1728x.jpg?v=1613531042', path: 'images/hero/slide1.jpg' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/files/SLIDER-2_1512x.jpg?v=1613520022', path: 'images/hero/slide2.jpg' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/files/upfront_home_header_slide2_1728x.jpg?v=1613531042', path: 'images/hero/slide3.jpg' },

  // Customer Favs products
  { url: 'https://upfrontcosmetics.ca/cdn/shop/files/shower_pic_360x.png?v=1765331782', path: 'images/products/shower-steamer.png' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/products/1_99524ac1-2b77-4fe3-9404-54db3a86a44c_360x.png?v=1676402140', path: 'images/products/hair-oil.png' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/products/EnlighteningShampoo_360x.png?v=1665864868', path: 'images/products/enlightening-shampoo.png' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/files/ultrashinemockup_360x.jpg?v=1699627896', path: 'images/products/ultra-shine.jpg' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/products/HempConditioner_360x.png?v=1665864924', path: 'images/products/hemp-conditioner.png' },

  // Shampoo bars
  { url: 'https://upfrontcosmetics.ca/cdn/shop/products/RefreshingShampoo_360x.png?v=1665865287', path: 'images/products/refreshing-shampoo.png' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/products/NourishingShampoo_360x.png?v=1665865205', path: 'images/products/nourishing-shampoo.png' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/products/NurturingShampoo_360x.png?v=1665865234', path: 'images/products/nurturing-shampoo.png' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/products/HempShampoo_360x.png?v=1665864947', path: 'images/products/hemp-shampoo.png' },

  // Conditioner bars
  { url: 'https://upfrontcosmetics.ca/cdn/shop/products/EnliveningConditioner_360x.png?v=1665864892', path: 'images/products/enlivening-conditioner.png' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/products/InvigoratingConditioner_360x.png?v=1665864970', path: 'images/products/invigorating-conditioner.png' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/products/EnlighteningConditionerBar_360x.png?v=1665864833', path: 'images/products/enlightening-conditioner.png' },

  // Promo/philosophy images
  { url: 'https://upfrontcosmetics.ca/cdn/shop/files/Philosophy-3_300x.jpg?v=1613519310', path: 'images/promo/philosophy-3.jpg' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/files/Screen_Shot_2020-08-21_at_9.43.22_AM_300x.png?v=1613530426', path: 'images/promo/promo-grid-1.png' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/files/Screen_Shot_2020-08-21_at_9.33.00_AM_300x.png?v=1613530426', path: 'images/promo/promo-grid-2.png' },

  // Misc
  { url: 'https://upfrontcosmetics.ca/cdn/shop/files/2018-B-Corp-wTag-S_x120@2x.png?v=1644337345', path: 'images/misc/b-corp.png' },
  { url: 'https://cdn.shopify.com/s/files/1/0065/6913/2135/files/ICONS-HOWTO_480x480.png?v=1576085622', path: 'images/misc/icons-howto.png' },
  { url: 'https://cdn.shopify.com/s/files/1/0065/6913/2135/files/UPFRONT-ICONS-FULL-V650.png?v=1575496195', path: 'images/misc/upfront-icons.png' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/files/shower_pic_360x.png?v=1765331782', path: 'images/misc/shower-pic.png' },
  { url: 'https://cdn.shopify.com/s/files/1/0065/6913/2135/files/HairMasqueDirectionsNEW_480x480.png?v=1699627534', path: 'images/misc/hair-masque-directions.png' },
  { url: 'https://upfrontcosmetics.ca/cdn/shop/files/1-PHILOSOPHY_400x.png?v=1613519520', path: 'images/misc/philosophy-1.png' },
];

async function downloadFile(url, localPath) {
  const fullPath = join(PUBLIC, localPath);
  if (existsSync(fullPath)) {
    console.log(`  SKIP ${localPath} (exists)`);
    return;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    writeFileSync(fullPath, Buffer.from(buf));
    console.log(`  OK   ${localPath}`);
  } catch (e) {
    console.error(`  ERR  ${localPath}: ${e.message}`);
  }
}

async function run() {
  console.log(`Downloading ${assets.length} assets...`);
  // 4 at a time
  for (let i = 0; i < assets.length; i += 4) {
    const batch = assets.slice(i, i + 4);
    await Promise.all(batch.map(a => downloadFile(a.url, a.path)));
  }
  console.log('\n✅ Asset download complete!');
}

run().catch(e => { console.error(e); process.exit(1); });
