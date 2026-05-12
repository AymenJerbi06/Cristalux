export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: 'Skincare' | 'Makeup' | 'Haircare';
  excerpt: string;
  image: string;
  readTime: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'build-a-tunisia-ready-morning-routine',
    title: 'Build a Tunisia-Ready Morning Routine',
    date: 'May 6, 2026',
    category: 'Skincare',
    excerpt: 'Pair cleansing, brightening care, and daily sun protection in a routine that feels polished without turning fussy.',
    image: '/images/cristalux/vitamin-c-serum.jpg',
    readTime: '4 min read',
    body: [
      'A useful morning routine begins with a clean base. A gentle foam cleanser helps reset the skin, while a Vitamin C serum can anchor the brightening step before makeup or sunscreen.',
      'For a Tunisia-focused storefront, sun care deserves a prominent place in the flow. The tinted SPF option fits naturally after serum, giving shoppers a clear path from skincare into complexion prep.',
      'That same sequence now appears across the Cristalux store, where product pages, bundles, and collection filters help visitors move from browsing into a more deliberate routine.',
    ],
  },
  {
    slug: 'how-to-choose-a-complexion-finish',
    title: 'How to Choose a Complexion Finish',
    date: 'April 22, 2026',
    category: 'Makeup',
    excerpt: 'Foundation, concealer, and gloss work better together when shoppers understand the finish each one is meant to create.',
    image: '/images/cristalux/foundation-shades.jpg',
    readTime: '3 min read',
    body: [
      'Complexion products tend to become easier to shop when the store separates coverage from finish. A foundation can handle the overall tone, while concealer speaks to targeted brightness and refinement.',
      'Cristalux glosses add a softer final note, which is why the makeup collection now groups them close to base products instead of scattering them through unrelated categories.',
      'The product gallery and quick-filter controls make this easier to inspect in practice, especially when customers want to compare before adding a shade or finish to the bag.',
    ],
  },
  {
    slug: 'why-haircare-bundles-feel-more-complete',
    title: 'Why Haircare Bundles Feel More Complete',
    date: 'April 9, 2026',
    category: 'Haircare',
    excerpt: 'Biotin and caviar sets give shoppers a more confident starting point than picking hair products one at a time.',
    image: '/images/cristalux/caviar-hair-duo.jpg',
    readTime: '5 min read',
    body: [
      'Haircare bundles simplify the first decision. Instead of asking shoppers to assemble every step on their own, a duo presents a clearer routine with one visual story and one practical add-to-cart move.',
      'The Cristalux catalog now gives those bundles stronger placement through featured sections, related-product suggestions, and product-page storytelling that connects serum support back to haircare needs.',
      'That structure matters because a functioning store should do more than display stock. It should help shoppers understand which products naturally belong together.',
    ],
  },
];

export const blogCategories = ['All', 'Skincare', 'Makeup', 'Haircare'] as const;
