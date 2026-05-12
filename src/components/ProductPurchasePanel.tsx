'use client';

import Link from 'next/link';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { formatMoney, isOnSale, type Product } from '@/lib/products';
import { useStore } from './StoreProvider';

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useStore();
  const sale = isOnSale(product);

  return (
    <div className="purchase-panel">
      <p>{product.collection}</p>
      <h1>{product.title}</h1>
      <span className="purchase-subtitle">{product.subtitle}</span>
      <div className="purchase-price">
        {sale && product.compareAtPrice && <span>{formatMoney(product.compareAtPrice)}</span>}
        <strong>{formatMoney(product.price)}</strong>
      </div>
      <p className="purchase-description">{product.description}</p>
      <ul className="purchase-benefits">
        {product.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
      <div className="purchase-tags">
        {product.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="purchase-controls">
        <div className="purchase-quantity" aria-label="Quantity selector">
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
            <Minus size={16} />
          </button>
          <strong>{quantity}</strong>
          <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
            <Plus size={16} />
          </button>
        </div>
        <button
          type="button"
          className="purchase-add"
          onClick={() => addToCart(product, quantity)}
          disabled={!product.available}
        >
          <ShoppingBag size={16} />
          <span>{product.available ? 'Add to cart' : 'Sold out'}</span>
        </button>
      </div>

      <div className="purchase-links">
        <Link href="/collections/all">Back to products</Link>
        <Link href="/checkout">Go to checkout</Link>
      </div>

      <details className="purchase-details">
        <summary>Product notes</summary>
        <div>
          {product.details.map((detail) => (
            <p key={detail}>{detail}</p>
          ))}
        </div>
      </details>

      <style>{`
        .purchase-panel {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .purchase-panel > p:first-child {
          margin: 0;
          color: #6a6a64;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .purchase-panel h1 {
          margin: 0;
          font-size: clamp(34px, 4vw, 58px);
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0;
        }
        .purchase-subtitle {
          color: #6a6a64;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .purchase-price {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          letter-spacing: 0;
        }
        .purchase-price span {
          color: #777;
          text-decoration: line-through;
          font-size: 18px;
        }
        .purchase-price strong {
          font-weight: 600;
        }
        .purchase-description {
          margin: 0;
          color: #34342f;
          font-size: 16px;
          line-height: 1.8;
          letter-spacing: 0;
        }
        .purchase-benefits {
          margin: 0;
          padding-left: 18px;
          display: grid;
          gap: 8px;
          color: #34342f;
          font-size: 14px;
          line-height: 1.7;
          letter-spacing: 0;
        }
        .purchase-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .purchase-tags span {
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
        .purchase-controls {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .purchase-quantity {
          min-height: 52px;
          border: 1px solid #111;
          display: inline-flex;
          align-items: center;
        }
        .purchase-quantity button {
          width: 48px;
          height: 52px;
          border: 0;
          background: #fff;
          color: #111;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .purchase-quantity strong {
          min-width: 34px;
          text-align: center;
          font-size: 14px;
          letter-spacing: 0;
        }
        .purchase-add {
          min-height: 52px;
          min-width: 230px;
          border: 1px solid #111;
          background: #111;
          color: #fff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 22px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: transform 180ms ease, background 180ms ease, color 180ms ease;
        }
        .purchase-add:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .purchase-add:disabled {
          cursor: not-allowed;
          opacity: 0.55;
        }
        .purchase-links {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
        }
        .purchase-links a {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: underline;
        }
        .purchase-details {
          border-top: 1px solid #e8e8e1;
          border-bottom: 1px solid #e8e8e1;
          padding: 16px 0;
        }
        .purchase-details summary {
          cursor: pointer;
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .purchase-details summary::-webkit-details-marker {
          display: none;
        }
        .purchase-details summary::after {
          content: '+';
          font-size: 20px;
          font-weight: 400;
        }
        .purchase-details[open] summary::after {
          content: '-';
        }
        .purchase-details div {
          display: grid;
          gap: 10px;
          margin-top: 14px;
        }
        .purchase-details p {
          margin: 0;
          color: #34342f;
          font-size: 14px;
          line-height: 1.7;
          letter-spacing: 0;
        }
        @media (max-width: 767px) {
          .purchase-panel h1 {
            font-size: 36px;
          }
          .purchase-controls,
          .purchase-add {
            width: 100%;
          }
          .purchase-quantity {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
