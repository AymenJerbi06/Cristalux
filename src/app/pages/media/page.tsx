import StaticPage from '@/components/StaticPage';
import StorefrontShell from '@/components/StorefrontShell';

export default function MediaPage() {
  return (
    <StorefrontShell>
      <StaticPage
        eyebrow="Media"
        title="Press, creator, and collaboration requests belong somewhere purposeful."
        intro="Cristalux now gives media-facing visitors a clear home, plus a guided path to contact the brand without hunting through the site."
        image="/images/cristalux/gloss-campaign.jpg"
        imageAlt="Cristalux cosmetics campaign visual"
        highlights={['Press', 'Creator inquiries', 'Brand assets']}
        sections={[
          {
            title: 'For press',
            body: 'Journalists can ask for product information, commentary, launch details, or high-resolution brand assets.',
          },
          {
            title: 'For creators',
            body: 'Partnership requests can be framed with audience, platform, scope, and preferred timing.',
          },
          {
            title: 'For collaborations',
            body: 'Collaboration details stay focused on audience fit, campaign scope, and the kind of story that makes sense for Cristalux.',
          },
        ]}
        cta={{
          title: 'Send a media inquiry',
          body: 'Share the editorial angle, partnership idea, or asset request with the team.',
          href: '/pages/contact?topic=media',
          label: 'Contact media',
        }}
      />
    </StorefrontShell>
  );
}
