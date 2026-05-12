import StaticPage from '@/components/StaticPage';
import StorefrontShell from '@/components/StorefrontShell';

export default function WholesalePage() {
  return (
    <StorefrontShell>
      <StaticPage
        eyebrow="Wholesale"
        title="A dedicated entry point for stockists, salons, and retail partners."
        intro="Wholesale conversations are welcomed from stockists, salons, and regional partners who want to explore how Cristalux can fit their assortment."
        image="/images/cristalux/foundation-hero.jpg"
        imageAlt="Retail-ready Cristalux assortment"
        highlights={['Retail interest', 'Stockist support', 'Bulk inquiries']}
        sections={[
          {
            title: 'Who it is for',
            body: 'Boutiques, salons, concept stores, and aligned retailers can begin with the assortment that best matches their customers.',
          },
          {
            title: 'What to include',
            body: 'Store type, target quantities, region, and timeline are the details that help the team evaluate the request quickly.',
          },
          {
            title: 'Next step',
            body: 'A strong note includes region, expected quantities, timing, and the product categories that feel most relevant.',
          },
        ]}
        cta={{
          title: 'Start a wholesale inquiry',
          body: 'Share the retail context and the team can review the opportunity with the right detail.',
          href: '/pages/contact?topic=wholesale',
          label: 'Open contact form',
        }}
      />
    </StorefrontShell>
  );
}
