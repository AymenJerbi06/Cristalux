export type ProductCollection =
  | 'Skincare'
  | 'Makeup'
  | 'Haircare'
  | 'Sun Care'
  | 'Cleansers'
  | 'Serums'
  | 'Bundles';

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  gallery: string[];
  href: string;
  collection: ProductCollection;
  type: string;
  tags: string[];
  available: boolean;
  featured?: boolean;
  description: string;
  benefits: string[];
  details: string[];
};

export const products: Product[] = [
  {
    id: 'eau-micellaire-vitamine-c',
    title: 'Eau Micellaire a la Vitamine C',
    subtitle: 'Brightening daily cleanse',
    price: 22900,
    image: '/images/cristalux/micellar-vitamin-c.jpg',
    gallery: [
      '/images/cristalux/micellar-vitamin-c.jpg',
      '/images/cristalux/micellar-collection.jpg',
      '/images/cristalux/skincare-kit.jpg',
    ],
    href: '/products/eau-micellaire-vitamine-c',
    collection: 'Skincare',
    type: 'Micellar Water',
    tags: ['Best Sellers', 'Glow', 'Daily Care'],
    available: true,
    featured: true,
    description: 'A citrus-bright micellar water designed to remove daily buildup while keeping the routine feeling fresh and lightweight.',
    benefits: ['Quick no-rinse cleanse', 'Vitamin C-inspired glow story', 'A practical first step for morning or evening care'],
    details: ['Best positioned as a daily face-cleansing essential.', 'Pairs naturally with the Vitamin C serum for a coordinated brightening routine.', 'Visuals support an energetic, citrus-led presentation.'],
  },
  {
    id: 'eau-micellaire',
    title: 'Eau Micellaire',
    subtitle: 'Gentle cleansing water',
    price: 18900,
    image: '/images/cristalux/micellar-water.jpg',
    gallery: [
      '/images/cristalux/micellar-water.jpg',
      '/images/cristalux/micellar-collection.jpg',
      '/images/cristalux/skincare-kit.jpg',
    ],
    href: '/products/eau-micellaire',
    collection: 'Cleansers',
    type: 'Micellar Water',
    tags: ['Skincare', 'Gentle', 'Daily Care'],
    available: true,
    featured: true,
    description: 'A clear, gentle micellar water that fits naturally into makeup removal, morning refreshes, and low-fuss nightly routines.',
    benefits: ['Easy first cleanse', 'Works well in light everyday routines', 'A staple support product for the skincare lineup'],
    details: ['The supplied photography reads as a versatile vanity staple.', 'Works well as a companion product in starter kits.', 'Ideal for quick cleansing moments when shoppers want simplicity.'],
  },
  {
    id: 'ecran-solaire-teinte-spf-50',
    title: 'Ecran Solaire Teinte SPF 50+',
    subtitle: 'Tinted daily sun care',
    price: 39900,
    image: '/images/cristalux/tinted-sunscreen-spf50.jpg',
    gallery: [
      '/images/cristalux/tinted-sunscreen-spf50.jpg',
      '/images/cristalux/skincare-kit.jpg',
    ],
    href: '/products/ecran-solaire-teinte-spf-50',
    collection: 'Sun Care',
    type: 'Tinted Sunscreen',
    tags: ['Sun Care', 'SPF 50+', 'Best Sellers'],
    available: true,
    featured: true,
    description: 'A tinted SPF-focused complexion step presented as a morning essential for a more even-looking, protected routine.',
    benefits: ['Daily face-care positioning', 'Tinted finish concept', 'Strong visual fit for Tunisia-focused warm-weather shopping'],
    details: ['The source artwork highlights SPF 50+ and tinted use.', 'Great hero product for warm-season campaigns.', 'Pairs well with base makeup and skincare categories.'],
  },
  {
    id: 'fond-de-teint-match-parfait',
    title: 'Fond de Teint Match Parfait',
    subtitle: 'Complexion base with shade storytelling',
    price: 32900,
    image: '/images/cristalux/foundation-hero.jpg',
    gallery: [
      '/images/cristalux/foundation-hero.jpg',
      '/images/cristalux/foundation-shades.jpg',
      '/images/cristalux/foundation-alt.jpg',
    ],
    href: '/products/fond-de-teint-match-parfait',
    collection: 'Makeup',
    type: 'Foundation',
    tags: ['Makeup', 'Complexion', 'Long Wear'],
    available: true,
    featured: true,
    description: 'A complexion base presented around shade matching and a polished finish, with visuals that support comparison and confidence.',
    benefits: ['Shade-match messaging', 'Everyday complexion category anchor', 'Strong candidate for interactive gallery browsing'],
    details: ['Multiple supplied visuals support shade storytelling.', 'Useful for a product page that emphasizes comparison before purchase.', 'Fits naturally beside concealer and lip products.'],
  },
  {
    id: 'glowy-concealer-longue-tenue',
    title: 'Glowy Concealer Longue Tenue',
    subtitle: 'Bright-looking targeted coverage',
    price: 28900,
    image: '/images/cristalux/glowy-concealer.jpg',
    gallery: [
      '/images/cristalux/glowy-concealer.jpg',
      '/images/cristalux/foundation-shades.jpg',
    ],
    href: '/products/glowy-concealer-longue-tenue',
    collection: 'Makeup',
    type: 'Concealer',
    tags: ['Makeup', 'Glow', 'Long Wear'],
    available: true,
    description: 'A long-wear complexion detailer positioned for bright-looking under-eye and spot coverage with a refined finish.',
    benefits: ['Complements foundation', 'Works for precise coverage storytelling', 'Easy cross-sell with complexion products'],
    details: ['The supplied artwork emphasizes glow and long wear.', 'Strong fit for a makeup bundle section.', 'Best merchandised alongside foundation and gloss.'],
  },
  {
    id: 'gloss-liquide-longue-tenue',
    title: 'Gloss Liquide Longue Tenue',
    subtitle: 'High-shine lip color edit',
    price: 24900,
    compareAtPrice: 27900,
    image: '/images/cristalux/liquid-gloss-red.jpg',
    gallery: [
      '/images/cristalux/liquid-gloss-red.jpg',
      '/images/cristalux/liquid-gloss-pink.jpg',
      '/images/cristalux/liquid-gloss-fall.jpg',
      '/images/cristalux/liquid-gloss-duo.jpg',
      '/images/cristalux/gloss-lips.jpg',
      '/images/cristalux/gloss-campaign.jpg',
    ],
    href: '/products/gloss-liquide-longue-tenue',
    collection: 'Makeup',
    type: 'Liquid Gloss',
    tags: ['Makeup', 'Long Wear', 'Sale'],
    available: true,
    featured: true,
    description: 'A glossy lip statement with multiple seasonal shades represented across the supplied campaign imagery.',
    benefits: ['Multiple color moods', 'Strong visual merchandising potential', 'Ideal for shade-gallery interaction'],
    details: ['The asset set shows red, pink, duo, and seasonal color directions.', 'The compare-at price gives this product a retail-ready promo state.', 'A good hero makeup product for campaigns.'],
  },
  {
    id: 'mousse-nettoyante',
    title: 'Mousse Nettoyante',
    subtitle: 'Foaming facial cleanser',
    price: 21900,
    image: '/images/cristalux/cleansing-foam.jpg',
    gallery: [
      '/images/cristalux/cleansing-foam.jpg',
      '/images/cristalux/cleansing-foam-alt.jpg',
      '/images/cristalux/cleansing-foam-detail.jpg',
      '/images/cristalux/special-offer.jpg',
    ],
    href: '/products/mousse-nettoyante',
    collection: 'Cleansers',
    type: 'Foaming Cleanser',
    tags: ['Skincare', 'Cleansers', 'Daily Care'],
    available: true,
    description: 'A foam cleanser presented as a soft, approachable everyday step for refreshing the skin without overcomplication.',
    benefits: ['Clear cleanser positioning', 'Works well in skincare bundles', 'Visually supported by routine-led campaign imagery'],
    details: ['Multiple creative treatments make the product page feel more complete.', 'Strong fit for routine bundles with micellar water.', 'The special-offer artwork can support promotional storytelling.'],
  },
  {
    id: 'serum-eclat-vitamine-c',
    title: 'Serum Eclat a la Vitamine C',
    subtitle: 'Glow-focused face serum',
    price: 48900,
    image: '/images/cristalux/vitamin-c-serum.jpg',
    gallery: [
      '/images/cristalux/vitamin-c-serum.jpg',
      '/images/cristalux/skincare-kit.jpg',
    ],
    href: '/products/serum-eclat-vitamine-c',
    collection: 'Serums',
    type: 'Face Serum',
    tags: ['Glow', 'Serums', 'Best Sellers'],
    available: true,
    featured: true,
    description: 'A glow-forward serum visually positioned around brightness and a more radiant daily care story.',
    benefits: ['Premium skincare anchor', 'Strong brightening narrative', 'Pairs with Vitamin C micellar water'],
    details: ['The image set emphasizes radiance and daily use.', 'A natural candidate for feature placement on the homepage.', 'The copy can support a focused glow routine.'],
  },
  {
    id: 'serum-lissant-vitamine-e',
    title: 'Serum Lissant a la Vitamine E',
    subtitle: 'Smoothing hair serum',
    price: 45900,
    image: '/images/cristalux/vitamin-e-serum.jpg',
    gallery: [
      '/images/cristalux/vitamin-e-serum.jpg',
      '/images/cristalux/smoothing-serum-hair.jpg',
      '/images/cristalux/smoothing-serum-duo.jpg',
    ],
    href: '/products/serum-lissant-vitamine-e',
    collection: 'Haircare',
    type: 'Hair Serum',
    tags: ['Haircare', 'Smoothing', 'Best Sellers'],
    available: true,
    description: 'A smoothing hair serum presented for brittle, dry, or unruly-looking lengths that need a more polished finish.',
    benefits: ['Haircare hero product', 'Strong before-routine storytelling', 'Works across curly and straight visual campaigns'],
    details: ['The assets mention Vitamin E and smoothing support.', 'The product belongs naturally in the Haircare lane rather than the skincare serum lane.', 'Gallery variety helps shoppers inspect positioning.'],
  },
  {
    id: 'duo-biotin-cheveux',
    title: 'Duo Shampoing + Masque a la Biotine',
    subtitle: 'Haircare duo for fuller-looking routines',
    price: 64900,
    compareAtPrice: 69900,
    image: '/images/cristalux/biotin-hair-duo.jpg',
    gallery: [
      '/images/cristalux/biotin-hair-duo.jpg',
      '/images/cristalux/smoothing-serum-hair.jpg',
    ],
    href: '/products/duo-biotin-cheveux',
    collection: 'Bundles',
    type: 'Haircare Duo',
    tags: ['Haircare', 'Bundles', 'Sale'],
    available: true,
    description: 'A shampoo-and-mask duo presented for stronger-looking, fuller-feeling hair rituals and giftable routine building.',
    benefits: ['Bundle merchandising', 'Higher basket-value product', 'Useful anchor for haircare promotions'],
    details: ['The duo imagery supports premium bundle positioning.', 'Priced as a promotional set with a compare-at value.', 'Excellent candidate for the shop landing page.'],
  },
  {
    id: 'duo-caviar-cheveux',
    title: 'Duo Shampoing + Masque au Caviar',
    subtitle: 'Luxe-looking nourishment ritual',
    price: 79900,
    compareAtPrice: 85900,
    image: '/images/cristalux/caviar-hair-duo.jpg',
    gallery: [
      '/images/cristalux/caviar-hair-duo.jpg',
      '/images/cristalux/smoothing-serum-duo.jpg',
    ],
    href: '/products/duo-caviar-cheveux',
    collection: 'Bundles',
    type: 'Haircare Duo',
    tags: ['Haircare', 'Bundles', 'Sale'],
    available: true,
    featured: true,
    description: 'A premium shampoo-and-mask duo with a luxe visual language suited to gifting, indulgent self-care, and high-intent shopping moments.',
    benefits: ['Premium bundle story', 'Gift-ready presentation', 'Strong cross-sell into Haircare and Serums'],
    details: ['The supplied visual clearly supports a more elevated positioning.', 'Best suited to a featured or promotional collection.', 'The visual tone helps the site feel more distinctly Cristalux.'],
  },
];

export const shopCollections: ProductCollection[] = [
  'Skincare',
  'Makeup',
  'Haircare',
  'Sun Care',
  'Cleansers',
  'Serums',
  'Bundles',
];

export function formatMoney(millimes: number) {
  return new Intl.NumberFormat('fr-TN', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(millimes / 1000);
}

export function isOnSale(product: Product) {
  return Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
}
