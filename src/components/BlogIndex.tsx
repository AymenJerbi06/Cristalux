'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { blogCategories, blogPosts, type BlogPost } from '@/lib/blog';

type Category = typeof blogCategories[number];

function matches(post: BlogPost, query: string, category: Category) {
  const categoryMatches = category === 'All' || post.category === category;
  const normalized = query.trim().toLowerCase();
  const textMatches = !normalized || [post.title, post.excerpt, post.category].join(' ').toLowerCase().includes(normalized);
  return categoryMatches && textMatches;
}

export default function BlogIndex() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');

  const visiblePosts = useMemo(
    () => blogPosts.filter((post) => matches(post, query, category)),
    [category, query],
  );

  return (
    <section className="blog-index">
      <div className="blog-hero">
        <p>Blog</p>
        <h1>Notes on skincare, makeup, and haircare for Cristalux shoppers.</h1>
        <span>Explore brightening routines, complexion notes, and haircare stories shaped around the Cristalux catalog.</span>
      </div>

      <div className="blog-controls">
        <label>
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles"
          />
        </label>
        <div className="blog-segments">
          {blogCategories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'blog-segment-active' : ''}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {visiblePosts.length === 0 ? (
        <div className="blog-empty">
          <h2>No articles found</h2>
          <button type="button" onClick={() => { setQuery(''); setCategory('All'); }}>Reset archive</button>
        </div>
      ) : (
        <div className="blog-grid">
          {visiblePosts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blogs/news/${post.slug}`} className="blog-image">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 960px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
              </Link>
              <div className="blog-card-copy">
                <p>{post.category}</p>
                <Link href={`/blogs/news/${post.slug}`}>{post.title}</Link>
                <span>{post.excerpt}</span>
                <em>{post.date} | {post.readTime}</em>
              </div>
            </article>
          ))}
        </div>
      )}

      <style>{`
        .blog-index {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 56px 40px 78px;
        }
        .blog-hero {
          display: grid;
          gap: 16px;
          max-width: 920px;
          margin-bottom: 34px;
        }
        .blog-hero p,
        .blog-card-copy p {
          margin: 0;
          color: #6a6a64;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .blog-hero h1 {
          margin: 0;
          font-size: clamp(38px, 5vw, 66px);
          line-height: 1;
          font-weight: 500;
          letter-spacing: 0;
        }
        .blog-hero span,
        .blog-card-copy span {
          color: #34342f;
          font-size: 16px;
          line-height: 1.8;
          letter-spacing: 0;
        }
        .blog-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 32px;
          padding-bottom: 22px;
          border-bottom: 1px solid #e8e8e1;
        }
        .blog-controls label {
          min-width: min(100%, 380px);
          min-height: 48px;
          border: 1px solid #d9d9d2;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
        }
        .blog-controls input {
          width: 100%;
          border: 0;
          outline: none;
          font: inherit;
          font-size: 14px;
          letter-spacing: 0;
        }
        .blog-segments {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .blog-segments button,
        .blog-empty button {
          min-height: 42px;
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
        .blog-segment-active {
          background: #111 !important;
          color: #fff !important;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
        }
        .blog-grid article {
          min-width: 0;
        }
        .blog-image {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 1.2 / 1;
          overflow: hidden;
          background: #f5f5f1;
        }
        .blog-card-copy {
          display: grid;
          gap: 10px;
          margin-top: 16px;
        }
        .blog-card-copy > a {
          font-size: 20px;
          line-height: 1.3;
          font-weight: 600;
          letter-spacing: 0;
        }
        .blog-card-copy span {
          font-size: 14px;
        }
        .blog-card-copy em {
          color: #6a6a64;
          font-size: 12px;
          font-style: normal;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .blog-empty {
          min-height: 260px;
          border: 1px solid #e8e8e1;
          display: grid;
          align-content: center;
          justify-items: center;
          gap: 18px;
          text-align: center;
        }
        .blog-empty h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 500;
        }
        @media (max-width: 980px) {
          .blog-controls {
            display: grid;
          }
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 767px) {
          .blog-index {
            padding: 36px 18px 58px;
          }
          .blog-hero h1 {
            font-size: 38px;
          }
          .blog-controls label {
            min-width: 0;
          }
        }
      `}</style>
    </section>
  );
}
