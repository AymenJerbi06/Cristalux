import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import StorefrontShell from '@/components/StorefrontShell';

const contactIntents = [
  {
    title: 'Individual buyer',
    body: 'Product questions, order support, delivery details, or routine guidance for personal purchases.',
    href: '/pages/contact?topic=buyer',
  },
  {
    title: 'Wholesale buyer',
    body: 'Retailers, salons, and stockists can share quantities, region, timing, and category interest.',
    href: '/pages/contact?topic=wholesale',
  },
  {
    title: 'Promotion or deal',
    body: 'Creators, partners, and businesses can propose a campaign, offer, launch idea, or collaboration.',
    href: '/pages/contact?topic=promotion',
  },
] as const;

const contactRoutes = [
  {
    title: 'Private label',
    body: 'Custom product or manufacturing conversations can begin with project goals and timing.',
    href: '/pages/contact?topic=private-label',
  },
] as const;

export default function ContactPage() {
  return (
    <StorefrontShell>
      <section className="contact-page">
        <div className="contact-intro">
          <p>Contact</p>
          <h1>Contact Cristalux as a buyer, wholesale partner, or collaborator.</h1>
          <span>
            Choose the path that fits the message, then send the details the team needs to respond clearly.
          </span>
        </div>

        <div className="contact-intent-grid">
          {contactIntents.map((route) => (
            <Link key={route.href} href={route.href}>
              <strong>{route.title}</strong>
              <span>{route.body}</span>
            </Link>
          ))}
        </div>

        <div className="contact-layout">
          <div className="contact-form-panel">
            <ContactForm />
          </div>

          <aside className="contact-side">
            <p>More paths</p>
            {contactRoutes.map((route) => (
              <Link key={route.href} href={route.href}>
                <strong>{route.title}</strong>
                <span>{route.body}</span>
              </Link>
            ))}
          </aside>
        </div>

        <style>{`
          .contact-page {
            max-width: 1280px;
            width: 100%;
            margin: 0 auto;
            padding: 56px 40px 78px;
          }
          .contact-intro {
            display: grid;
            gap: 16px;
            max-width: 880px;
            margin-bottom: 40px;
          }
          .contact-intent-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
            margin-bottom: 34px;
          }
          .contact-intent-grid a {
            min-height: 174px;
            border: 1px solid #e8e8e1;
            display: grid;
            align-content: start;
            gap: 12px;
            padding: 22px;
            transition: transform 180ms ease, border-color 180ms ease;
          }
          .contact-intent-grid a:hover {
            border-color: #111;
            transform: translateY(-3px);
          }
          .contact-intent-grid strong {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.11em;
            text-transform: uppercase;
          }
          .contact-intent-grid span {
            color: #34342f;
            font-size: 14px;
            line-height: 1.7;
            letter-spacing: 0;
          }
          .contact-intro p,
          .contact-side > p {
            margin: 0;
            color: #6a6a64;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }
          .contact-intro h1 {
            margin: 0;
            font-size: clamp(38px, 5vw, 66px);
            line-height: 1;
            font-weight: 500;
            letter-spacing: 0;
          }
          .contact-intro span,
          .contact-side a span {
            color: #34342f;
            font-size: 16px;
            line-height: 1.8;
            letter-spacing: 0;
          }
          .contact-layout {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 360px;
            gap: 36px;
            align-items: start;
          }
          .contact-form-panel {
            border: 1px solid #e8e8e1;
            padding: 28px;
          }
          .contact-side {
            border-top: 1px solid #e8e8e1;
          }
          .contact-side > p {
            padding-top: 18px;
            margin-bottom: 12px;
          }
          .contact-side a {
            display: grid;
            gap: 8px;
            padding: 18px 0;
            border-bottom: 1px solid #e8e8e1;
          }
          .contact-side strong {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.11em;
            text-transform: uppercase;
          }
          .contact-side a span {
            font-size: 14px;
          }
          @media (max-width: 980px) {
            .contact-intent-grid,
            .contact-layout {
              grid-template-columns: 1fr;
            }
          }
          @media (max-width: 767px) {
            .contact-page {
              padding: 36px 18px 58px;
            }
            .contact-intro h1 {
              font-size: 38px;
            }
            .contact-form-panel {
              padding: 20px;
            }
          }
        `}</style>
      </section>
    </StorefrontShell>
  );
}
