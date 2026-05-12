import StaticPage from '@/components/StaticPage';
import StorefrontShell from '@/components/StorefrontShell';

export default function AboutPage() {
  return (
    <StorefrontShell>
      <StaticPage
        eyebrow="About Cristalux"
        title="Beauty routines shaped for Tunisia, with room for polish, comfort, and repeat use."
        intro="Cristalux brings skincare, makeup, and haircare into one practical North Africa-focused beauty world, shaped around daily use, confident choices, and a polished product story."
        image="/images/cristalux/micellar-collection.jpg"
        imageAlt="Cristalux skincare assortment"
        highlights={['Tunisia-first', 'Routine-led', 'Product clarity']}
        sections={[
          {
            title: 'A clearer catalog',
            body: 'The store is organized around how customers browse in real life: skincare, makeup, haircare, sun care, serums, and bundles with stronger product detail at every step.',
          },
          {
            title: 'Built around use',
            body: 'Micellar water, Vitamin C serum, complexion products, gloss, sunscreen, and haircare sets each get their own place in the journey instead of being buried in a generic grid.',
          },
          {
            title: 'A brand that can grow',
            body: 'Cristalux is built with room for seasonal launches, richer rituals, professional partnerships, and a catalog that can expand without losing its point of view.',
          },
        ]}
        cta={{
          title: 'Ready to browse?',
          body: 'Start with the shop landing page or jump directly into the full product catalog.',
          href: '/collections',
          label: 'Visit shop',
        }}
      />
    </StorefrontShell>
  );
}
