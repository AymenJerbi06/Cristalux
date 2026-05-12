import Link from 'next/link';
import StorefrontShell from '@/components/StorefrontShell';

const faqs = [
  {
    question: 'How do I browse the catalog?',
    answer: 'Cristalux is organized around skincare, makeup, haircare, sun care, serums, and bundles so shoppers can begin with the category that fits their routine.',
  },
  {
    question: 'Is pricing shown for Tunisia?',
    answer: 'Yes. Product and checkout totals are shown in Tunisian dinar formatting, with local order guidance reflected across the storefront.',
  },
  {
    question: 'Can I see whether an item is in stock?',
    answer: 'Yes. Product cards show sold-out states, and the All Products collection can be filtered by availability.',
  },
  {
    question: 'Where do I ask about wholesale or private label?',
    answer: 'Wholesale and private-label conversations are handled separately so the team can review each request with the right business context.',
  },
  {
    question: 'How do I contact the team?',
    answer: 'Send product questions, order notes, media ideas, or partnership requests through Contact and the team can follow up with the right context.',
  },
  {
    question: 'Can I compare products before choosing?',
    answer: 'Each item is presented with its own imagery, pricing, positioning, and routine notes to make comparison easier.',
  },
] as const;

export default function FaqPage() {
  return (
    <StorefrontShell>
      <section className="faq-page">
        <div className="faq-hero">
          <p>FAQs</p>
          <h1>Quick answers for a smoother shopping flow.</h1>
          <span>
            Find the basics on pricing, product discovery, support, and partnership requests before choosing the next step.
          </span>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="faq-cta">
          <div>
            <p>Still need help?</p>
            <span>Send a note to the team and include the details that matter most.</span>
          </div>
          <Link href="/pages/contact">Contact us</Link>
        </div>

        <style>{`
          .faq-page {
            max-width: 1120px;
            width: 100%;
            margin: 0 auto;
            padding: 56px 40px 78px;
          }
          .faq-hero {
            display: grid;
            gap: 16px;
            margin-bottom: 38px;
          }
          .faq-hero p,
          .faq-cta p {
            margin: 0;
            color: #6a6a64;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }
          .faq-hero h1 {
            margin: 0;
            max-width: 860px;
            font-size: clamp(38px, 5vw, 64px);
            font-weight: 500;
            line-height: 1;
            letter-spacing: 0;
          }
          .faq-hero span,
          .faq-cta span,
          .faq-list p {
            color: #34342f;
            font-size: 16px;
            line-height: 1.8;
            letter-spacing: 0;
          }
          .faq-list {
            border-top: 1px solid #e8e8e1;
          }
          .faq-list details {
            border-bottom: 1px solid #e8e8e1;
            padding: 18px 0;
          }
          .faq-list summary {
            cursor: pointer;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }
          .faq-list summary::-webkit-details-marker {
            display: none;
          }
          .faq-list summary::after {
            content: '+';
            flex-shrink: 0;
            font-size: 20px;
            font-weight: 400;
          }
          .faq-list details[open] summary::after {
            content: '-';
          }
          .faq-list p {
            max-width: 900px;
            margin: 14px 0 0;
          }
          .faq-cta {
            margin-top: 42px;
            border: 1px solid #e8e8e1;
            padding: 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
          }
          .faq-cta div {
            display: grid;
            gap: 8px;
          }
          .faq-cta a {
            min-height: 48px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #111;
            color: #fff;
            padding: 0 24px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            white-space: nowrap;
          }
          @media (max-width: 767px) {
            .faq-page {
              padding: 36px 18px 58px;
            }
            .faq-hero h1 {
              font-size: 38px;
            }
            .faq-list summary {
              font-size: 13px;
              line-height: 1.5;
            }
            .faq-cta {
              display: grid;
              padding: 22px;
            }
            .faq-cta a {
              width: 100%;
            }
          }
        `}</style>
      </section>
    </StorefrontShell>
  );
}
