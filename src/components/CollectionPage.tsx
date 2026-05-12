'use client';

import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from './ProductCard';
import { formatMoney, products, shopCollections, type Product, type ProductCollection } from '@/lib/products';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'title-asc';

const tagFilters = ['Best Sellers', 'Glow', 'Long Wear', 'Bundles', 'Sale'] as const;

function productMatchesCollection(product: Product, collection: ProductCollection) {
  if (collection === 'Haircare') {
    return product.collection === 'Haircare' || product.tags.includes('Haircare');
  }

  if (collection === 'Skincare') {
    return ['Skincare', 'Sun Care', 'Cleansers', 'Serums'].includes(product.collection) || product.tags.includes('Skincare');
  }

  return product.collection === collection;
}

function sortProducts(list: Product[], sort: SortOption) {
  const sorted = [...list];

  if (sort === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (sort === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  }

  if (sort === 'title-asc') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === 'featured') {
    sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }

  return sorted;
}

export default function CollectionPage() {
  const [selectedCollections, setSelectedCollections] = useState<ProductCollection[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availability, setAvailability] = useState<'all' | 'in-stock' | 'sold-out'>('all');
  const [maxPrice, setMaxPrice] = useState(90000);
  const [sort, setSort] = useState<SortOption>('featured');
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const collection = params.get('collection') as ProductCollection | null;
      const tag = params.get('tag');

      if (collection && shopCollections.includes(collection)) {
        setSelectedCollections([collection]);
      }

      if (tag) {
        setSelectedTags([tag]);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (selectedCollections.length > 0 && !selectedCollections.some((collection) => productMatchesCollection(product, collection))) {
        return false;
      }

      if (selectedTags.length > 0 && !selectedTags.every((tag) => product.tags.includes(tag))) {
        return false;
      }

      if (availability === 'in-stock' && !product.available) {
        return false;
      }

      if (availability === 'sold-out' && product.available) {
        return false;
      }

      if (product.price > maxPrice) {
        return false;
      }

      if (normalizedQuery) {
        const haystack = [product.title, product.subtitle, product.collection, product.type, product.description, ...product.tags].join(' ').toLowerCase();
        if (!haystack.includes(normalizedQuery)) {
          return false;
        }
      }

      return true;
    });

    return sortProducts(filtered, sort);
  }, [availability, maxPrice, query, selectedCollections, selectedTags, sort]);

  const toggleCollection = (collection: ProductCollection) => {
    setSelectedCollections((current) =>
      current.includes(collection)
        ? current.filter((item) => item !== collection)
        : [...current, collection],
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  };

  const resetFilters = () => {
    setSelectedCollections([]);
    setSelectedTags([]);
    setAvailability('all');
    setMaxPrice(90000);
    setQuery('');
  };

  const hasFilters = selectedCollections.length > 0 || selectedTags.length > 0 || availability !== 'all' || maxPrice !== 90000 || Boolean(query.trim());

  const filterPanel = (
    <aside className="collection-sidebar" aria-label="Collection filters">
      <div className="collection-sidebar-head">
        <h2>Filter</h2>
        <button type="button" onClick={() => setFiltersOpen(false)} className="collection-mobile-close" aria-label="Close filters">
          <X size={20} />
        </button>
      </div>

      <label className="collection-search">
        <span>Search</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
        />
      </label>

      <div className="collection-filter-group">
        <h3>Collection</h3>
        {shopCollections.map((collection) => (
          <label key={collection} className="collection-check">
            <input
              type="checkbox"
              checked={selectedCollections.includes(collection)}
              onChange={() => toggleCollection(collection)}
            />
            <span>{collection}</span>
          </label>
        ))}
      </div>

      <div className="collection-filter-group">
        <h3>Availability</h3>
        {[
          ['all', 'All items'],
          ['in-stock', 'In stock'],
          ['sold-out', 'Sold out'],
        ].map(([value, label]) => (
          <label key={value} className="collection-check">
            <input
              type="radio"
              name="availability"
              checked={availability === value}
              onChange={() => setAvailability(value as typeof availability)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <div className="collection-filter-group">
        <h3>Product tags</h3>
        {tagFilters.map((tag) => (
          <label key={tag} className="collection-check">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => toggleTag(tag)}
            />
            <span>{tag}</span>
          </label>
        ))}
      </div>

      <div className="collection-filter-group">
        <div className="collection-price-head">
          <h3>Price</h3>
          <span>Up to {formatMoney(maxPrice)}</span>
        </div>
        <input
          className="collection-range"
          type="range"
          min="15000"
          max="90000"
          step="1000"
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
        />
      </div>

      <button type="button" onClick={resetFilters} disabled={!hasFilters} className="collection-reset">
        Clear filters
      </button>
    </aside>
  );

  return (
    <section className="collection-page">
      <div className="collection-hero">
        <p>Shop</p>
        <h1>Products</h1>
        <span>{products.length} products</span>
      </div>

      <div className="collection-shell">
        <div className={`collection-filter-wrap ${filtersOpen ? 'collection-filter-wrap-open' : ''}`}>
          {filterPanel}
        </div>

        <div className="collection-main">
          <div className="collection-toolbar">
            <button type="button" className="collection-filter-toggle" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal size={17} />
              <span>Filter</span>
            </button>
            <p>{filteredProducts.length} products</p>
            <label>
              <span>Sort</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
                <option value="title-asc">Alphabetically, A-Z</option>
              </select>
            </label>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="collection-empty">
              <h2>No products found</h2>
              <button type="button" onClick={resetFilters}>Clear filters</button>
            </div>
          ) : (
            <div className="collection-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .collection-page {
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
          padding: 46px 40px 72px;
        }
        .collection-hero {
          display: grid;
          gap: 8px;
          justify-items: center;
          text-align: center;
          padding: 18px 0 44px;
        }
        .collection-hero p,
        .collection-hero span {
          margin: 0;
          color: #6f6f68;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .collection-hero h1 {
          margin: 0;
          font-size: clamp(34px, 4vw, 58px);
          font-weight: 500;
          letter-spacing: 0;
        }
        .collection-shell {
          display: grid;
          grid-template-columns: 248px minmax(0, 1fr);
          gap: 42px;
          align-items: start;
        }
        .collection-sidebar {
          position: sticky;
          top: 110px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .collection-sidebar-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e8e8e1;
          padding-bottom: 12px;
        }
        .collection-sidebar h2,
        .collection-filter-group h3 {
          margin: 0;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }
        .collection-mobile-close {
          display: none;
          border: 0;
          background: transparent;
          cursor: pointer;
          color: #111;
        }
        .collection-search {
          display: grid;
          gap: 8px;
        }
        .collection-search span,
        .collection-toolbar label span {
          color: #6f6f68;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .collection-search input,
        .collection-toolbar select {
          min-height: 42px;
          border: 1px solid #d9d9d2;
          background: #fff;
          padding: 0 12px;
          color: #111;
          font: inherit;
          font-size: 13px;
          letter-spacing: 0;
          outline: none;
        }
        .collection-filter-group {
          display: grid;
          gap: 12px;
        }
        .collection-check {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #30302c;
          cursor: pointer;
          font-size: 13px;
          letter-spacing: 0.02em;
        }
        .collection-check input {
          width: 16px;
          height: 16px;
          accent-color: #111;
        }
        .collection-price-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .collection-price-head span {
          color: #6f6f68;
          font-size: 12px;
          letter-spacing: 0;
          white-space: nowrap;
        }
        .collection-range {
          width: 100%;
          accent-color: #111;
        }
        .collection-reset,
        .collection-empty button {
          min-height: 42px;
          border: 1px solid #111;
          background: #fff;
          color: #111;
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .collection-reset:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }
        .collection-toolbar {
          min-height: 54px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 1px solid #e8e8e1;
          margin-bottom: 28px;
          padding-bottom: 16px;
        }
        .collection-toolbar p {
          margin: 0;
          color: #4f4f48;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .collection-toolbar label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .collection-filter-toggle {
          display: none;
          min-height: 40px;
          border: 1px solid #111;
          background: #fff;
          color: #111;
          cursor: pointer;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .collection-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 32px 22px;
        }
        .collection-empty {
          min-height: 360px;
          display: grid;
          align-content: center;
          justify-items: center;
          gap: 18px;
          text-align: center;
          border: 1px solid #e8e8e1;
        }
        .collection-empty h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 500;
        }
        .collection-empty button {
          padding: 0 22px;
        }
        @media (max-width: 1040px) {
          .collection-shell {
            grid-template-columns: 210px minmax(0, 1fr);
            gap: 28px;
          }
          .collection-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 767px) {
          .collection-page {
            padding: 30px 18px 56px;
          }
          .collection-hero {
            padding-bottom: 28px;
          }
          .collection-shell {
            display: block;
          }
          .collection-filter-wrap {
            position: fixed;
            inset: 0;
            z-index: 250;
            background: rgba(0, 0, 0, 0.32);
            opacity: 0;
            pointer-events: none;
            transition: opacity 180ms ease;
          }
          .collection-filter-wrap-open {
            opacity: 1;
            pointer-events: auto;
          }
          .collection-filter-wrap .collection-sidebar {
            position: absolute;
            top: 0;
            left: 0;
            width: min(88vw, 360px);
            height: 100%;
            overflow-y: auto;
            background: #fff;
            padding: 22px;
            transform: translateX(-100%);
            transition: transform 220ms ease;
          }
          .collection-filter-wrap-open .collection-sidebar {
            transform: translateX(0);
          }
          .collection-mobile-close,
          .collection-filter-toggle {
            display: inline-flex;
          }
          .collection-toolbar {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 12px;
            align-items: center;
          }
          .collection-toolbar p {
            text-align: right;
          }
          .collection-toolbar label {
            grid-column: 1 / -1;
            justify-content: space-between;
          }
          .collection-toolbar select {
            flex: 1;
          }
          .collection-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 26px 14px;
          }
        }
      `}</style>
    </section>
  );
}
