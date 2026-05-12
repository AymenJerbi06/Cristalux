'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { formatMoney } from '@/lib/products';
import { useStore } from './StoreProvider';

type CheckoutForm = {
  email: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
};

const initialCheckoutForm: CheckoutForm = {
  email: '',
  fullName: '',
  address: '',
  city: '',
  postalCode: '',
};

export default function CheckoutPage() {
  const { cartLines, subtotal, updateQuantity, removeFromCart } = useStore();
  const [form, setForm] = useState(initialCheckoutForm);
  const [submitted, setSubmitted] = useState(false);

  const shipping = cartLines.length > 0 && subtotal < 120000 ? 8000 : 0;
  const total = subtotal + shipping;

  const ready = useMemo(
    () =>
      cartLines.length > 0 &&
      form.email.includes('@') &&
      form.fullName.trim().length > 2 &&
      form.address.trim().length > 4 &&
      form.city.trim().length > 1 &&
      form.postalCode.trim().length > 3,
    [cartLines.length, form],
  );

  const updateField = <Key extends keyof CheckoutForm>(key: Key, value: CheckoutForm[Key]) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ready) {
      return;
    }
    setSubmitted(true);
  };

  if (cartLines.length === 0) {
    return (
      <section className="checkout-empty">
        <p>Checkout</p>
        <h1>Your bag is empty.</h1>
        <span>Add a few products first, then return here to review the order.</span>
        <Link href="/collections/all">Shop products</Link>
        <style>{`
          .checkout-empty {
            max-width: 920px;
            width: 100%;
            margin: 0 auto;
            min-height: 62vh;
            padding: 56px 40px 78px;
            display: grid;
            align-content: center;
            gap: 16px;
          }
          .checkout-empty p {
            margin: 0;
            color: #6a6a64;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }
          .checkout-empty h1 {
            margin: 0;
            font-size: clamp(38px, 5vw, 64px);
            font-weight: 500;
            line-height: 1;
            letter-spacing: 0;
          }
          .checkout-empty span {
            color: #34342f;
            font-size: 16px;
            line-height: 1.8;
            letter-spacing: 0;
          }
          .checkout-empty a {
            width: fit-content;
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
          }
          @media (max-width: 767px) {
            .checkout-empty {
              padding: 36px 18px 58px;
            }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-head">
        <p>Checkout</p>
        <h1>Review your order.</h1>
        <span>Adjust quantities, confirm your Tunisia delivery details, and prepare the order summary.</span>
      </div>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={submitOrder}>
          <div className="checkout-form-grid">
            <label>
              <span>Email</span>
              <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} required />
            </label>
            <label>
              <span>Full name</span>
              <input value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} required />
            </label>
            <label className="checkout-wide">
              <span>Address</span>
              <input value={form.address} onChange={(event) => updateField('address', event.target.value)} required />
            </label>
            <label>
              <span>City</span>
              <input value={form.city} onChange={(event) => updateField('city', event.target.value)} required />
            </label>
            <label>
              <span>Postal code</span>
              <input value={form.postalCode} onChange={(event) => updateField('postalCode', event.target.value)} required />
            </label>
            <label className="checkout-wide">
              <span>Country / Region</span>
              <input value="Tunisia, North Africa" readOnly />
            </label>
          </div>
          <button type="submit" disabled={!ready}>Review order</button>
          {submitted && <p role="status">Order details are ready for the payment step.</p>}
        </form>

        <aside className="checkout-summary">
          <div className="checkout-lines">
            {cartLines.map(({ product, quantity }) => (
              <div key={product.id} className="checkout-line">
                <span className="checkout-line-image">
                  <Image src={product.image} alt={product.title} fill sizes="88px" style={{ objectFit: 'cover' }} />
                </span>
                <div>
                  <strong>{product.title}</strong>
                  <span>{formatMoney(product.price)}</span>
                  <div className="checkout-line-controls">
                    <button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} aria-label={`Decrease ${product.title}`}>
                      <Minus size={14} />
                    </button>
                    <em>{quantity}</em>
                    <button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label={`Increase ${product.title}`}>
                      <Plus size={14} />
                    </button>
                    <button type="button" onClick={() => removeFromCart(product.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatMoney(subtotal)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? 'Free' : formatMoney(shipping)}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <style>{`
        .checkout-page {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 56px 40px 78px;
        }
        .checkout-head {
          display: grid;
          gap: 16px;
          max-width: 860px;
          margin-bottom: 36px;
        }
        .checkout-head p {
          margin: 0;
          color: #6a6a64;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .checkout-head h1 {
          margin: 0;
          font-size: clamp(38px, 5vw, 66px);
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0;
        }
        .checkout-head span,
        .checkout-form p,
        .checkout-summary strong,
        .checkout-summary span,
        .checkout-summary em,
        .checkout-summary dt,
        .checkout-summary dd {
          letter-spacing: 0;
        }
        .checkout-head span {
          color: #34342f;
          font-size: 16px;
          line-height: 1.8;
        }
        .checkout-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 420px;
          gap: 36px;
          align-items: start;
        }
        .checkout-form {
          border: 1px solid #e8e8e1;
          padding: 28px;
          display: grid;
          gap: 22px;
        }
        .checkout-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .checkout-form label {
          display: grid;
          gap: 8px;
        }
        .checkout-form span {
          color: #6a6a64;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .checkout-form input {
          min-height: 48px;
          border: 1px solid #d9d9d2;
          background: #fff;
          padding: 0 14px;
          font: inherit;
          font-size: 14px;
          letter-spacing: 0;
          outline: none;
        }
        .checkout-wide {
          grid-column: 1 / -1;
        }
        .checkout-form button {
          min-height: 48px;
          border: 1px solid #111;
          background: #111;
          color: #fff;
          cursor: pointer;
          padding: 0 24px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .checkout-form button:disabled {
          cursor: not-allowed;
          opacity: 0.55;
        }
        .checkout-form p {
          margin: 0;
          color: #34342f;
          font-size: 14px;
          line-height: 1.7;
        }
        .checkout-summary {
          border: 1px solid #e8e8e1;
          padding: 24px;
        }
        .checkout-lines {
          display: grid;
          gap: 18px;
          margin-bottom: 24px;
        }
        .checkout-line {
          display: grid;
          grid-template-columns: 88px minmax(0, 1fr);
          gap: 14px;
        }
        .checkout-line-image {
          position: relative;
          display: block;
          width: 88px;
          height: 88px;
          overflow: hidden;
          background: #f5f5f1;
        }
        .checkout-line > div {
          display: grid;
          gap: 6px;
        }
        .checkout-line strong {
          font-size: 12px;
          font-weight: 700;
          line-height: 1.4;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .checkout-line span,
        .checkout-line em {
          color: #34342f;
          font-size: 13px;
          font-style: normal;
        }
        .checkout-line-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .checkout-line-controls button {
          min-height: 32px;
          border: 1px solid #d9d9d2;
          background: #fff;
          color: #111;
          cursor: pointer;
          padding: 0 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .checkout-summary dl {
          margin: 0;
          display: grid;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid #e8e8e1;
        }
        .checkout-summary dl > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }
        .checkout-summary dt,
        .checkout-summary dd {
          margin: 0;
          font-size: 14px;
        }
        .checkout-summary dl > div:last-child dt,
        .checkout-summary dl > div:last-child dd {
          font-size: 16px;
          font-weight: 700;
        }
        @media (max-width: 980px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 767px) {
          .checkout-page {
            padding: 36px 18px 58px;
          }
          .checkout-head h1 {
            font-size: 38px;
          }
          .checkout-form,
          .checkout-summary {
            padding: 20px;
          }
          .checkout-form-grid {
            grid-template-columns: 1fr;
          }
          .checkout-wide {
            grid-column: auto;
          }
        }
      `}</style>
    </section>
  );
}
