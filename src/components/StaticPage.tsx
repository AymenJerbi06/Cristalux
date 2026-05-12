import Image from 'next/image';
import Link from 'next/link';

type PageSection = {
  title: string;
  body: string;
};

type StaticPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  highlights?: string[];
  sections: PageSection[];
  cta?: {
    title: string;
    body: string;
    href: string;
    label: string;
  };
};

export default function StaticPage({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = '',
  highlights = [],
  sections,
  cta,
}: StaticPageProps) {
  return (
    <section className="static-page">
      <div className="static-hero">
        <div className="static-hero-copy">
          <p>{eyebrow}</p>
          <h1>{title}</h1>
          <span>{intro}</span>
          {highlights.length > 0 && (
            <div className="static-highlight-row">
              {highlights.map((highlight) => (
                <strong key={highlight}>{highlight}</strong>
              ))}
            </div>
          )}
        </div>
        {image && (
          <div className="static-hero-media">
            <Image src={image} alt={imageAlt} fill sizes="(max-width: 900px) 100vw, 44vw" style={{ objectFit: 'cover' }} />
          </div>
        )}
      </div>

      <div className="static-section-grid">
        {sections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </div>

      {cta && (
        <div className="static-cta">
          <div>
            <p>{cta.title}</p>
            <span>{cta.body}</span>
          </div>
          <Link href={cta.href}>{cta.label}</Link>
        </div>
      )}

      <style>{`
        .static-page {
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
          padding: 56px 40px 78px;
        }
        .static-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(420px, 0.92fr);
          gap: 46px;
          align-items: stretch;
          margin-bottom: 56px;
        }
        .static-hero-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;
          padding: 24px 0;
        }
        .static-hero-copy p,
        .static-cta p {
          margin: 0;
          color: #6a6a64;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .static-hero-copy h1 {
          margin: 0;
          max-width: 760px;
          font-size: clamp(38px, 5vw, 68px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: 0;
        }
        .static-hero-copy > span,
        .static-cta span,
        .static-section-grid p {
          color: #34342f;
          font-size: 16px;
          line-height: 1.8;
          letter-spacing: 0;
        }
        .static-highlight-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .static-highlight-row strong {
          min-height: 34px;
          border: 1px solid #d8d8d1;
          display: inline-flex;
          align-items: center;
          padding: 0 14px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.11em;
          text-transform: uppercase;
        }
        .static-hero-media {
          position: relative;
          min-height: 520px;
          overflow: hidden;
          background: #f5f5f1;
        }
        .static-section-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
        }
        .static-section-grid article {
          border-top: 1px solid #e8e8e1;
          padding-top: 18px;
        }
        .static-section-grid h2 {
          margin: 0 0 12px;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.3;
        }
        .static-section-grid p {
          margin: 0;
          font-size: 14px;
        }
        .static-cta {
          margin-top: 52px;
          min-height: 128px;
          border: 1px solid #e8e8e1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 28px;
        }
        .static-cta div {
          display: grid;
          gap: 8px;
        }
        .static-cta a {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          background: #111;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        @media (max-width: 980px) {
          .static-hero {
            grid-template-columns: 1fr;
          }
          .static-hero-media {
            min-height: 420px;
          }
          .static-section-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 767px) {
          .static-page {
            padding: 36px 18px 58px;
          }
          .static-hero {
            gap: 24px;
            margin-bottom: 34px;
          }
          .static-hero-copy {
            gap: 14px;
          }
          .static-hero-copy h1 {
            font-size: 38px;
          }
          .static-hero-media {
            min-height: 320px;
          }
          .static-cta {
            display: grid;
            padding: 22px;
          }
          .static-cta a {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
