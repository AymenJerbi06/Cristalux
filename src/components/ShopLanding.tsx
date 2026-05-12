import Image from 'next/image';
import Link from 'next/link';
import ProductGrid from './ProductGrid';
import { products } from '@/lib/products';

const categories = [
  {
    title: 'All Products',
    body: 'Browse the complete Cristalux catalog across skincare, makeup, haircare, and premium duos.',
    href: '/collections/all',
    image: '/images/cristalux/skincare-kit.jpg',
  },
  {
    title: 'Skincare',
    body: 'Micellar waters, cleanser, sunscreen, and serum-led daily care.',
    href: '/collections/all?collection=Skincare',
    image: '/images/cristalux/micellar-collection.jpg',
  },
  {
    title: 'Makeup',
    body: 'Foundation, concealer, and gloss that let shoppers inspect color and finish.',
    href: '/collections/all?collection=Makeup',
    image: '/images/cristalux/gloss-campaign.jpg',
  },
  {
    title: 'Haircare + Bundles',
    body: 'Vitamin E smoothing serum plus shampoo-and-mask duos for fuller routines.',
    href: '/collections/all?collection=Haircare',
    image: '/images/cristalux/caviar-hair-duo.jpg',
  },
] as const;

const featured = products.filter((product) => product.featured).slice(0, 5);

export default function ShopLanding() {
  return (
    <>
      <section className="shop-landing-hero">
        <div>
          <p>Shop</p>
          <h1>Build a Cristalux routine for Tunisia.</h1>
          <span>
            Start with the full collection, or jump straight into skincare, makeup, haircare, and bundle-led routines designed for shoppers in Tunisia and North Africa.
          </span>
          <div>
            <Link href="/collections/all">Shop all products</Link>
            <Link href="/collections/all?tag=Best%20Sellers">Browse best sellers</Link>
          </div>
        </div>
        <div className="shop-landing-media">
          <Image src="/images/cristalux/special-offer.jpg" alt="Cristalux cosmetics promotional campaign" fill sizes="(max-width: 980px) 100vw, 44vw" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <section className="shop-category-band">
        {categories.map((category) => (
          <Link key={category.title} href={category.href} className="shop-category-card">
            <span className="shop-category-image">
              <Image src={category.image} alt="" fill sizes="(max-width: 980px) 100vw, 25vw" style={{ objectFit: 'cover' }} />
            </span>
            <strong>{category.title}</strong>
            <p>{category.body}</p>
          </Link>
        ))}
      </section>

      <ProductGrid title="Featured products" viewAllHref="/collections/all" products={featured} />

      <style>{`
        .shop-landing-hero {
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
          padding: 56px 40px 24px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(420px, 0.92fr);
          gap: 46px;
          align-items: stretch;
        }
        .shop-landing-hero > div:first-child {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;
          padding: 18px 0;
        }
        .shop-landing-hero p {
          margin: 0;
          color: #6a6a64;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .shop-landing-hero h1 {
          margin: 0;
          font-size: clamp(40px, 5vw, 70px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: 0;
        }
        .shop-landing-hero span {
          max-width: 660px;
          color: #34342f;
          font-size: 16px;
          line-height: 1.8;
          letter-spacing: 0;
        }
        .shop-landing-hero > div:first-child > div {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .shop-landing-hero a {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 22px;
          border: 1px solid #111;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .shop-landing-hero a:first-child {
          background: #111;
          color: #fff;
        }
        .shop-landing-media {
          position: relative;
          min-height: 520px;
          overflow: hidden;
          background: #f5f5f1;
        }
        .shop-category-band {
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
          padding: 34px 40px 12px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
        }
        .shop-category-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
        }
        .shop-category-image {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #f5f5f1;
        }
        .shop-category-card strong {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.11em;
          text-transform: uppercase;
        }
        .shop-category-card p {
          margin: 0;
          color: #4a4a44;
          font-size: 14px;
          line-height: 1.7;
          letter-spacing: 0;
        }
        @media (max-width: 980px) {
          .shop-landing-hero {
            grid-template-columns: 1fr;
          }
          .shop-landing-media {
            min-height: 420px;
          }
          .shop-category-band {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 767px) {
          .shop-landing-hero {
            padding: 36px 18px 18px;
            gap: 24px;
          }
          .shop-landing-hero h1 {
            font-size: 40px;
          }
          .shop-landing-media {
            min-height: 320px;
          }
          .shop-landing-hero > div:first-child > div,
          .shop-landing-hero a {
            width: 100%;
          }
          .shop-category-band {
            padding: 26px 18px 8px;
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
