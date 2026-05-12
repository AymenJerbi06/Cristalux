import Link from 'next/link';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/products';

interface ProductGridProps {
  title: string;
  viewAllHref?: string;
  products: Product[];
}

export default function ProductGrid({ title, viewAllHref, products }: ProductGridProps) {
  return (
    <section style={{ padding: '60px 40px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '30px',
        }}
      >
        <h2
          style={{
            fontSize: '18px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 700,
            margin: 0,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          {title}
        </h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              textDecoration: 'underline',
              color: '#000',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            View all
          </Link>
        )}
      </div>
      <div className="uc-product-grid">
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
      <style>{`
        .uc-product-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 22px;
        }
        @media (max-width: 768px) {
          .uc-product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
