import { notFound } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import ProductGallery from '@/components/ProductGallery';
import ProductPurchasePanel from '@/components/ProductPurchasePanel';
import StorefrontShell from '@/components/StorefrontShell';
import { products } from '@/lib/products';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug);

  if (!product) {
    notFound();
  }

  const related = products
    .filter((item) => item.id !== product.id && (item.collection === product.collection || item.tags.some((tag) => product.tags.includes(tag))))
    .slice(0, 5);

  return (
    <StorefrontShell>
      <section className="product-page">
        <div className="product-layout">
          <ProductGallery images={product.gallery} title={product.title} />
          <ProductPurchasePanel product={product} />
        </div>
      </section>
      {related.length > 0 && (
        <ProductGrid title="You may also like" viewAllHref="/collections/all" products={related} />
      )}
      <style>{`
        .product-page {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 56px 40px 26px;
        }
        .product-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.9fr);
          gap: 46px;
          align-items: start;
        }
        @media (max-width: 980px) {
          .product-layout {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 767px) {
          .product-page {
            padding: 36px 18px 18px;
          }
        }
      `}</style>
    </StorefrontShell>
  );
}
