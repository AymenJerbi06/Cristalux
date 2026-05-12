'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatMoney, products } from '@/lib/products';
import { useStore } from './StoreProvider';

const savedItems = [
  products.find((product) => product.id === 'ecran-solaire-teinte-spf-50'),
  products.find((product) => product.id === 'gloss-liquide-longue-tenue'),
  products.find((product) => product.id === 'serum-eclat-vitamine-c'),
].filter(Boolean) as typeof products;

const recentOrders = [
  {
    id: 'CRX-2605',
    date: 'May 2026',
    status: 'Delivered',
    total: 128700,
    items: 'Vitamin C serum, gloss, micellar water',
  },
  {
    id: 'CRX-2548',
    date: 'April 2026',
    status: 'Ready for pickup',
    total: 79900,
    items: 'Caviar haircare duo',
  },
];

export default function AccountDashboard() {
  const { cartLines, subtotal, openCart } = useStore();

  return (
    <section className="account-page">
      <div className="account-hero">
        <p>Account</p>
        <h1>Welcome back, Amina.</h1>
        <span>
          This is a preview account area for Cristalux shoppers, with the panels customers expect once authentication is connected.
        </span>
        <div className="account-access">
          <button type="button">Sign in</button>
          <button type="button">Create account</button>
        </div>
      </div>

      <div className="account-summary">
        <article>
          <strong>420</strong>
          <span>Rewards points</span>
        </article>
        <article>
          <strong>{savedItems.length}</strong>
          <span>Saved items</span>
        </article>
        <article>
          <strong>{recentOrders.length}</strong>
          <span>Recent orders</span>
        </article>
        <article>
          <strong>{formatMoney(subtotal)}</strong>
          <span>Current bag</span>
        </article>
      </div>

      <div className="account-grid">
        <section className="account-panel account-cart">
          <div className="account-panel-head">
            <div>
              <p>Cart</p>
              <h2>Your current bag</h2>
            </div>
            <button type="button" onClick={openCart}>Open cart</button>
          </div>

          {cartLines.length === 0 ? (
            <div className="account-empty">
              <p>Your cart is empty right now.</p>
              <Link href="/collections/all">Start shopping</Link>
            </div>
          ) : (
            <div className="account-cart-lines">
              {cartLines.map(({ product, quantity }) => (
                <Link key={product.id} href={product.href}>
                  <span className="account-line-image">
                    <Image src={product.image} alt={product.title} fill sizes="68px" style={{ objectFit: 'cover' }} />
                  </span>
                  <span>
                    <strong>{product.title}</strong>
                    <em>{quantity} x {formatMoney(product.price)}</em>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="account-panel">
          <div className="account-panel-head">
            <div>
              <p>Orders</p>
              <h2>Already bought</h2>
            </div>
          </div>
          <div className="account-order-list">
            {recentOrders.map((order) => (
              <article key={order.id}>
                <div>
                  <strong>{order.id}</strong>
                  <span>{order.date} | {order.status}</span>
                </div>
                <p>{order.items}</p>
                <em>{formatMoney(order.total)}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="account-panel">
          <div className="account-panel-head">
            <div>
              <p>Saved</p>
              <h2>Saved items</h2>
            </div>
            <Link href="/collections/all">Browse</Link>
          </div>
          <div className="account-saved-grid">
            {savedItems.map((product) => (
              <Link key={product.id} href={product.href}>
                <span>
                  <Image src={product.image} alt={product.title} fill sizes="120px" style={{ objectFit: 'cover' }} />
                </span>
                <strong>{product.title}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="account-panel">
          <div className="account-panel-head">
            <div>
              <p>Rewards</p>
              <h2>Rewards preview</h2>
            </div>
          </div>
          <div className="account-rewards">
            <strong>420 points</strong>
            <span>Rewards logic can be connected later. For now, this panel reserves the customer-facing space.</span>
            <div>
              <span style={{ width: '42%' }} />
            </div>
          </div>
        </section>

        <section className="account-panel">
          <div className="account-panel-head">
            <div>
              <p>Address</p>
              <h2>Saved address</h2>
            </div>
          </div>
          <address>
            Amina Ben Salem<br />
            Rue de la Beaute<br />
            Tunis 1002, Tunisia
          </address>
        </section>

        <section className="account-panel">
          <div className="account-panel-head">
            <div>
              <p>Support</p>
              <h2>Contact Cristalux</h2>
            </div>
          </div>
          <div className="account-support">
            <Link href="/pages/contact?topic=buyer">Buyer support</Link>
            <Link href="/pages/contact?topic=wholesale">Wholesale inquiry</Link>
            <Link href="/pages/contact?topic=promotion">Promotion or deal</Link>
          </div>
        </section>
      </div>

      <style>{`
        .account-page {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 52px 40px 78px;
        }
        .account-hero {
          display: grid;
          gap: 14px;
          max-width: 860px;
          margin-bottom: 30px;
        }
        .account-hero p,
        .account-panel-head p {
          margin: 0;
          color: #6a6a64;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .account-hero h1 {
          margin: 0;
          font-size: clamp(34px, 4vw, 54px);
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0;
        }
        .account-hero > span,
        .account-empty p,
        .account-rewards span,
        address {
          color: #34342f;
          font-size: 15px;
          line-height: 1.8;
          letter-spacing: 0;
        }
        .account-access,
        .account-panel-head {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
        }
        .account-access button,
        .account-panel-head button,
        .account-panel-head a,
        .account-empty a,
        .account-support a {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #111;
          background: #fff;
          color: #111;
          cursor: pointer;
          padding: 0 16px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .account-access button:first-child,
        .account-panel-head button,
        .account-support a:first-child {
          background: #111;
          color: #fff;
        }
        .account-summary {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border: 1px solid #e8e8e1;
          margin-bottom: 28px;
        }
        .account-summary article {
          min-height: 116px;
          display: grid;
          align-content: center;
          justify-items: center;
          gap: 8px;
          text-align: center;
          border-right: 1px solid #e8e8e1;
          padding: 18px;
        }
        .account-summary article:last-child {
          border-right: 0;
        }
        .account-summary strong {
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1;
          letter-spacing: 0;
        }
        .account-summary span,
        .account-order-list span,
        .account-order-list em,
        .account-cart-lines em {
          color: #6a6a64;
          font-size: 11px;
          font-style: normal;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .account-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }
        .account-panel {
          border: 1px solid #e8e8e1;
          padding: 22px;
          min-width: 0;
        }
        .account-panel-head {
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .account-panel-head h2 {
          margin: 6px 0 0;
          font-size: 22px;
          font-weight: 500;
          letter-spacing: 0;
        }
        .account-empty {
          min-height: 180px;
          display: grid;
          align-content: center;
          justify-items: start;
          gap: 12px;
        }
        .account-cart-lines,
        .account-order-list {
          display: grid;
          gap: 12px;
        }
        .account-cart-lines a {
          display: grid;
          grid-template-columns: 68px 1fr;
          gap: 12px;
          align-items: center;
        }
        .account-line-image,
        .account-saved-grid a span {
          position: relative;
          display: block;
          overflow: hidden;
          background: #f5f5f1;
        }
        .account-line-image {
          width: 68px;
          height: 68px;
        }
        .account-cart-lines a > span:last-child {
          display: grid;
          gap: 5px;
        }
        .account-cart-lines strong,
        .account-order-list strong,
        .account-saved-grid strong,
        .account-rewards strong {
          font-size: 13px;
          line-height: 1.4;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
        .account-order-list article {
          display: grid;
          gap: 8px;
          padding-bottom: 12px;
          border-bottom: 1px solid #eeeeea;
        }
        .account-order-list article:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }
        .account-order-list p {
          margin: 0;
          color: #34342f;
          font-size: 14px;
          line-height: 1.6;
        }
        .account-saved-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .account-saved-grid a {
          display: grid;
          gap: 8px;
        }
        .account-saved-grid a span {
          aspect-ratio: 1 / 1;
        }
        .account-saved-grid strong {
          font-size: 11px;
        }
        .account-rewards {
          display: grid;
          gap: 12px;
        }
        .account-rewards > div {
          height: 8px;
          overflow: hidden;
          background: #eeeeea;
        }
        .account-rewards > div span {
          display: block;
          height: 100%;
          background: #111;
        }
        address {
          font-style: normal;
        }
        .account-support {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        @media (max-width: 900px) {
          .account-summary,
          .account-grid {
            grid-template-columns: 1fr;
          }
          .account-summary article {
            border-right: 0;
            border-bottom: 1px solid #e8e8e1;
          }
          .account-summary article:last-child {
            border-bottom: 0;
          }
        }
        @media (max-width: 767px) {
          .account-page {
            padding: 36px 18px 58px;
          }
          .account-access,
          .account-access button,
          .account-panel-head button,
          .account-panel-head a,
          .account-support a {
            width: 100%;
          }
          .account-saved-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
