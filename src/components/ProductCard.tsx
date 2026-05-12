'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { formatMoney, isOnSale, type Product } from '@/lib/products';
import { useStore } from './StoreProvider';

export type ProductCardProps = Product;

export default function ProductCard(product: ProductCardProps) {
  const { addToCart } = useStore();
  const sale = isOnSale(product);

  return (
    <article className="product-card">
      <Link href={product.href} className="product-card-media" aria-label={product.title}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="uc-product-img"
          style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
          sizes="(max-width: 768px) 50vw, 22vw"
        />
        <div className="product-card-badges">
          {!product.available && <span>Sold out</span>}
          {product.available && sale && <span>Sale</span>}
        </div>
      </Link>

      <div className="product-card-copy">
        <Link href={product.href} className="product-card-title">
          {product.title}
        </Link>
        <span className="product-card-subtitle">{product.subtitle}</span>
        <div className="product-card-price">
          {sale && product.compareAtPrice && (
            <span className="product-card-compare">{formatMoney(product.compareAtPrice)}</span>
          )}
          <span className={sale ? 'product-card-sale' : undefined}>{formatMoney(product.price)}</span>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product)}
          disabled={!product.available}
          className="product-card-add"
        >
          <ShoppingBag size={15} />
          <span>{product.available ? 'Add to cart' : 'Sold out'}</span>
        </button>
      </div>

      <style>{`
        .product-card {
          min-width: 0;
          transition: transform 220ms ease;
        }
        .product-card:hover {
          transform: translateY(-4px);
        }
        .product-card-media {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #f7f7f4;
        }
        .product-card-media:hover .uc-product-img {
          transform: scale(1.04);
        }
        .product-card-badges {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          z-index: 2;
        }
        .product-card-badges span {
          background: #111;
          color: #fff;
          padding: 5px 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .product-card-copy {
          margin-top: 11px;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .product-card-title {
          color: #000;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          min-height: 34px;
        }
        .product-card-subtitle {
          color: #6a6a64;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.5;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .product-card-price {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          color: #1c1d1d;
          font-size: 14px;
        }
        .product-card-compare {
          color: #777;
          text-decoration: line-through;
        }
        .product-card-sale {
          color: #c33b2f;
        }
        .product-card-add {
          width: 100%;
          min-height: 40px;
          margin-top: 3px;
          border: 1px solid #111;
          background: #111;
          color: #fff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          transition: background 160ms ease, color 160ms ease, opacity 160ms ease;
        }
        .product-card-add:hover:not(:disabled) {
          background: #fff;
          color: #111;
        }
        .product-card-add:active:not(:disabled) {
          transform: translateY(1px) scale(0.99);
        }
        .product-card-add:disabled {
          cursor: not-allowed;
          opacity: 0.52;
        }
        @media (max-width: 767px) {
          .product-card-add {
            min-height: 38px;
            font-size: 10px;
          }
          .product-card-title {
            min-height: 48px;
          }
        }
      `}</style>
    </article>
  );
}
