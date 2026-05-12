'use client';

import Image from 'next/image';
import Link from 'next/link';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Minus, Plus, Search, ShoppingBag, Trash2, X } from 'lucide-react';
import { formatMoney, products, type Product } from '@/lib/products';

type CartLine = {
  product: Product;
  quantity: number;
};

type StoreContextValue = {
  cartLines: CartLine[];
  cartCount: number;
  subtotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  openCart: () => void;
  openSearch: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const storageKey = 'cristalux-cart';

function loadCart(): CartLine[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as { id: string; quantity: number }[];
    return parsed
      .map((line) => {
        const product = products.find((item) => item.id === line.id);
        if (!product) {
          return null;
        }
        return { product, quantity: Math.max(1, line.quantity || 1) };
      })
      .filter(Boolean) as CartLine[];
  } catch {
    return [];
  }
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{
        width: '36px',
        height: '36px',
        border: '1px solid #e8e8e1',
        background: '#fff',
        color: '#111',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  );
}

function CartDrawer({
  open,
  onClose,
  lines,
  subtotal,
  updateQuantity,
  removeFromCart,
}: {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  subtotal: number;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}) {
  return (
    <>
      <div
        className={`store-overlay ${open ? 'store-overlay-open' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`store-drawer store-cart-drawer ${open ? 'store-drawer-open' : ''}`}
        aria-hidden={!open}
        aria-label="Shopping cart"
      >
        <div className="store-drawer-head">
          <div>
            <p className="store-kicker">Cart</p>
            <h2>Your bag</h2>
          </div>
          <button type="button" aria-label="Close cart" onClick={onClose} className="store-plain-icon">
            <X size={22} />
          </button>
        </div>

        <div className="store-drawer-body">
          {lines.length === 0 ? (
            <div className="store-empty">
              <ShoppingBag size={28} />
              <p>Your bag is empty.</p>
              <Link href="/collections/all" onClick={onClose}>Shop products</Link>
            </div>
          ) : (
            lines.map(({ product, quantity }) => (
              <div key={product.id} className="store-cart-line">
                <Link href={product.href} className="store-cart-image" onClick={onClose}>
                  <Image src={product.image} alt={product.title} fill sizes="84px" style={{ objectFit: 'cover' }} />
                </Link>
                <div className="store-cart-copy">
                  <Link href={product.href} onClick={onClose}>{product.title}</Link>
                  <span>{formatMoney(product.price)}</span>
                  <div className="store-qty-row">
                    <IconButton label={`Decrease quantity for ${product.title}`} onClick={() => updateQuantity(product.id, quantity - 1)}>
                      <Minus size={14} />
                    </IconButton>
                    <span>{quantity}</span>
                    <IconButton label={`Increase quantity for ${product.title}`} onClick={() => updateQuantity(product.id, quantity + 1)}>
                      <Plus size={14} />
                    </IconButton>
                    <button
                      type="button"
                      aria-label={`Remove ${product.title}`}
                      onClick={() => removeFromCart(product.id)}
                      className="store-remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="store-drawer-foot">
          <div className="store-subtotal">
            <span>Subtotal</span>
            <strong>{formatMoney(subtotal)}</strong>
          </div>
          <Link
            href="/checkout"
            onClick={onClose}
            className={`store-checkout ${lines.length === 0 ? 'store-checkout-disabled' : ''}`}
          >
            Checkout
          </Link>
          <p>Tunisia delivery and order totals are confirmed at checkout.</p>
        </div>
      </aside>
    </>
  );
}

function SearchDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [term, setTerm] = useState('');

  const results = useMemo(() => {
    const value = term.trim().toLowerCase();
    if (!value) {
      return products.slice(0, 6);
    }

    return products
      .filter((product) => {
        const haystack = [product.title, product.subtitle, product.collection, product.type, ...product.tags].join(' ').toLowerCase();
        return haystack.includes(value);
      })
      .slice(0, 8);
  }, [term]);

  return (
    <>
      <div
        className={`store-overlay ${open ? 'store-overlay-open' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`store-drawer store-search-drawer ${open ? 'store-drawer-open' : ''}`}
        aria-hidden={!open}
        aria-label="Search products"
      >
        <div className="store-drawer-head">
          <div>
            <p className="store-kicker">Search</p>
            <h2>Find products</h2>
          </div>
          <button type="button" aria-label="Close search" onClick={onClose} className="store-plain-icon">
            <X size={22} />
          </button>
        </div>
        <label className="store-search-box">
          <Search size={18} />
          <input
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search skincare, gloss, sunscreen, serums"
            autoComplete="off"
          />
        </label>
        <div className="store-search-results">
          {results.length === 0 ? (
            <p className="store-no-results">No products found.</p>
          ) : (
            results.map((product) => (
              <Link key={product.id} href={product.href} className="store-search-result" onClick={onClose}>
                <span className="store-search-image">
                  <Image src={product.image} alt={product.title} fill sizes="68px" style={{ objectFit: 'cover' }} />
                </span>
                <span>
                  <strong>{product.title}</strong>
                  <em>{formatMoney(product.price)}</em>
                </span>
              </Link>
            ))
          )}
        </div>
      </aside>
    </>
  );
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [cartHydrated, setCartHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      setCartLines(loadCart());
      setCartHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!cartHydrated) {
      return;
    }
    const serializable = cartLines.map((line) => ({ id: line.product.id, quantity: line.quantity }));
    window.localStorage.setItem(storageKey, JSON.stringify(serializable));
  }, [cartHydrated, cartLines]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const id = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  const cartCount = useMemo(
    () => cartLines.reduce((total, line) => total + line.quantity, 0),
    [cartLines],
  );

  const subtotal = useMemo(
    () => cartLines.reduce((total, line) => total + line.product.price * line.quantity, 0),
    [cartLines],
  );

  const value = useMemo<StoreContextValue>(() => ({
    cartLines,
    cartCount,
    subtotal,
    addToCart(product, quantity = 1) {
      if (!product.available) {
        return;
      }
      setCartLines((current) => {
        const existing = current.find((line) => line.product.id === product.id);
        if (existing) {
          return current.map((line) =>
            line.product.id === product.id
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          );
        }
        return [...current, { product, quantity }];
      });
      setToast(`${product.title} added to bag`);
      setCartOpen(true);
    },
    removeFromCart(productId) {
      setCartLines((current) => current.filter((line) => line.product.id !== productId));
    },
    updateQuantity(productId, quantity) {
      if (quantity < 1) {
        setCartLines((current) => current.filter((line) => line.product.id !== productId));
        return;
      }
      setCartLines((current) =>
        current.map((line) =>
          line.product.id === productId ? { ...line, quantity } : line,
        ),
      );
    },
    openCart() {
      setCartOpen(true);
    },
    openSearch() {
      setSearchOpen(true);
    },
  }), [cartCount, cartLines, subtotal]);

  return (
    <StoreContext.Provider value={value}>
      {children}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cartLines}
        subtotal={subtotal}
        updateQuantity={value.updateQuantity}
        removeFromCart={value.removeFromCart}
      />
      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
      {toast && <div className="store-toast" role="status">{toast}</div>}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return context;
}
