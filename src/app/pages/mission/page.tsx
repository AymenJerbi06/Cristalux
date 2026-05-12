import StaticPage from '@/components/StaticPage';
import StorefrontShell from '@/components/StorefrontShell';

export default function MissionPage() {
  return (
    <StorefrontShell>
      <StaticPage
        eyebrow="Mission"
        title="Make the shopping experience as thoughtful as the products themselves."
        intro="Cristalux is shaped around confident daily care in Tunisia: thoughtful beauty choices, clearer routines, and a brand presence that feels polished without becoming distant."
        image="/images/cristalux/skincare-kit.jpg"
        imageAlt="Cristalux skincare and care assortment"
        highlights={['Clarity', 'Function', 'Trust']}
        sections={[
          {
            title: 'Help shoppers decide',
            body: 'Filtering, search, product details, and editorial context should reduce guesswork and make purchase decisions easier.',
          },
          {
            title: 'Support the whole journey',
            body: 'From discovery through follow-up, the brand should feel coherent, responsive, and easy to trust.',
          },
          {
            title: 'Keep the brand coherent',
            body: 'Skincare, makeup, haircare, and partnership conversations all belong to the same Cristalux point of view.',
          },
        ]}
        cta={{
          title: 'Explore the catalog',
          body: 'Move from skincare essentials to complexion favorites and premium haircare rituals.',
          href: '/collections/all',
          label: 'Shop products',
        }}
      />
    </StorefrontShell>
  );
}
