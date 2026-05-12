import StaticPage from '@/components/StaticPage';
import StorefrontShell from '@/components/StorefrontShell';

export default function MeetTheMakerPage() {
  return (
    <StorefrontShell>
      <StaticPage
        eyebrow="Meet the maker"
        title="A hands-on brand voice with room for care, detail, and consistency."
        intro="Cristalux is rooted in Tunisia and shaped by a close eye for product decisions, ingredient stories, and the small choices that make a beauty brand feel personal."
        image="/images/cristalux/special-offer.jpg"
        imageAlt="Cristalux beauty assortment"
        highlights={['Founder story', 'Studio process', 'Customer care']}
        sections={[
          {
            title: 'Why it started',
            body: 'Cristalux can use this space to explain the need it saw in the market and the type of customer experience it wanted to create.',
          },
          {
            title: 'How it is made',
            body: 'A maker page should connect the catalog to the work behind it, from testing to packaging decisions and product refinement.',
          },
          {
            title: 'What shoppers can expect',
            body: 'Visitors should leave with a stronger sense of reliability, point of view, and what makes the brand worth returning to.',
          },
        ]}
        cta={{
          title: 'Have a question for the team?',
          body: 'Share product questions, partnership ideas, or customer notes with the people behind the brand.',
          href: '/pages/contact',
          label: 'Contact us',
        }}
      />
    </StorefrontShell>
  );
}
