import StaticPage from '@/components/StaticPage';
import StorefrontShell from '@/components/StorefrontShell';

export default function PrivateLabelPage() {
  return (
    <StorefrontShell>
      <StaticPage
        eyebrow="Private label"
        title="Contract manufacturing and private-label requests now have a real destination."
        intro="Private-label and contract-manufacturing conversations need more context, from product category and positioning to timing, volumes, and the desired level of support."
        image="/images/cristalux/smoothing-serum-duo.jpg"
        imageAlt="Product development reference"
        highlights={['Custom programs', 'Manufacturing', 'Partnership intake']}
        sections={[
          {
            title: 'Project context',
            body: 'A good inquiry starts with product category, target launch window, order size, and the degree of formulation support needed.',
          },
          {
            title: 'Why this matters',
            body: 'Clear project framing helps the Cristalux team assess fit, preparation needs, and the right next conversation.',
          },
          {
            title: 'What happens next',
            body: 'Share the concept, the business context, and the launch ambition so the conversation can start with substance.',
          },
        ]}
        cta={{
          title: 'Discuss a project',
          body: 'Send the partnership details through the contact workflow.',
          href: '/pages/contact?topic=private-label',
          label: 'Request details',
        }}
      />
    </StorefrontShell>
  );
}
