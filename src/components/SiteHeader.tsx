'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AtSign, ChevronDown, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useStore } from './StoreProvider';

type ChildLink = { label: string; href: string };
type NavItem = { label: string; href: string; children: ChildLink[] };

const navLinks: NavItem[] = [
  { label: 'Home', href: '/', children: [] },
  {
    label: 'Shop',
    href: '/collections',
    children: [
      { label: 'All Products', href: '/collections/all' },
      { label: 'Skincare', href: '/collections/all?collection=Skincare' },
      { label: 'Makeup', href: '/collections/all?collection=Makeup' },
      { label: 'Haircare', href: '/collections/all?collection=Haircare' },
      { label: 'Sun Care', href: '/collections/all?collection=Sun%20Care' },
      { label: 'Cleansers', href: '/collections/all?collection=Cleansers' },
      { label: 'Serums', href: '/collections/all?collection=Serums' },
      { label: 'Bundles', href: '/collections/all?collection=Bundles' },
      { label: 'Best Sellers', href: '/collections/all?tag=Best%20Sellers' },
    ],
  },
  {
    label: 'About',
    href: '/pages/about',
    children: [
      { label: 'About Us', href: '/pages/about' },
      { label: 'Meet The Maker', href: '/pages/meet-the-maker' },
      { label: 'FAQs', href: '/pages/faqs' },
    ],
  },
  {
    label: 'Contact',
    href: '/pages/contact',
    children: [
      { label: 'Contact Us', href: '/pages/contact' },
      { label: 'Wholesale', href: '/pages/wholesale' },
      { label: 'Private Label & Contract Manufacturing', href: '/pages/private-label' },
      { label: 'Media', href: '/pages/media' },
    ],
  },
  { label: 'Blog', href: '/blogs/news', children: [] },
];

function DesktopNavItem({ item, light }: { item: NavItem; light: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasChildren = item.children.length > 0;

  const keepOpen = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };

  const closeSoon = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div className="site-nav-item" onMouseEnter={keepOpen} onMouseLeave={closeSoon}>
      <Link
        href={item.href}
        aria-haspopup={hasChildren ? 'menu' : undefined}
        aria-expanded={hasChildren ? open : undefined}
        onFocus={keepOpen}
        onBlur={closeSoon}
        className={light ? 'site-nav-link light' : 'site-nav-link'}
      >
        {item.label}
        {hasChildren && <ChevronDown size={13} strokeWidth={1.8} />}
      </Link>

      {hasChildren && open && (
        <div className="site-dropdown-bridge" onMouseEnter={keepOpen} onMouseLeave={closeSoon} role="menu">
          <div className="site-dropdown">
            {item.children.map((child) => (
              <Link key={child.href} href={child.href} role="menuitem">
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [socialOpen, setSocialOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, openCart, openSearch } = useStore();

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 70);
    };

    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });

    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  const openSearchDrawer = () => {
    setMobileOpen(false);
    setSocialOpen(false);
    openSearch();
  };

  const openCartDrawer = () => {
    setMobileOpen(false);
    setSocialOpen(false);
    openCart();
  };

  return (
    <>
      <header className={`${isHome ? 'site-header site-header-home' : 'site-header'} ${isHome && isScrolled ? 'site-header-scrolled' : ''}`}>
        <div className="site-header-inner">
          {isHome && (
            <div className="home-header-topline">
              <button type="button" onClick={openSearchDrawer} className="home-header-search" aria-label="Search products">
                <Search size={18} />
                <span>Search</span>
              </button>
              <div className="home-header-socials">
                <a
                  href="https://www.instagram.com/cristalux_cosmetics_tunis/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Cristalux Instagram"
                >
                  <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100063614320291"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Cristalux Facebook"
                >
                  <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          <div className="site-header-main">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setSocialOpen(false);
              }}
              className="uc-hamburger"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={23} strokeWidth={1.7} /> : <Menu size={23} strokeWidth={1.7} />}
            </button>

            <Link href="/" className="uc-logo-link" aria-label="Cristalux Cosmetics home">
              <Image
                src="/images/logo.png"
                alt="Cristalux Cosmetics"
                width={220}
                height={72}
                priority
                className="site-logo-image"
              />
            </Link>

            <nav className="uc-desktop-nav">
              {navLinks.map((item) => (
                <DesktopNavItem key={item.href} item={item} light={isHome} />
              ))}
            </nav>

            <div className="site-header-actions">
              <div className="mobile-social-wrap">
                <button
                  type="button"
                  onClick={() => setSocialOpen((value) => !value)}
                  className="mobile-social-toggle"
                  aria-label="Open social media links"
                  aria-haspopup="menu"
                  aria-expanded={socialOpen}
                >
                  <AtSign size={20} strokeWidth={1.7} />
                </button>
                {socialOpen && (
                  <div className="mobile-social-popover" role="menu">
                    <a
                      href="https://www.instagram.com/cristalux_cosmetics_tunis/"
                      target="_blank"
                      rel="noreferrer"
                      role="menuitem"
                      onClick={() => setSocialOpen(false)}
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=100063614320291"
                      target="_blank"
                      rel="noreferrer"
                      role="menuitem"
                      onClick={() => setSocialOpen(false)}
                    >
                      Facebook
                    </a>
                  </div>
                )}
              </div>
              <Link href="/account" aria-label="Account">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 20a6 6 0 0 0-12 0" />
                  <circle cx="12" cy="10" r="4" />
                </svg>
              </Link>
              <button type="button" onClick={openSearchDrawer} aria-label="Search">
                <Search size={20} strokeWidth={1.7} />
              </button>
              <button type="button" onClick={openCartDrawer} aria-label="Cart">
                <ShoppingBag size={20} strokeWidth={1.7} />
                {cartCount > 0 && <span>{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className={isHome ? 'mobile-menu home' : 'mobile-menu'}>
          <nav>
            {navLinks.map((item) => (
              <div key={item.href}>
                <div className="mobile-menu-row">
                  <Link href={item.href} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                  {item.children.length > 0 && (
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} links`}
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    >
                      <ChevronDown
                        size={15}
                        strokeWidth={1.8}
                        style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none' }}
                      />
                    </button>
                  )}
                </div>
                {item.children.length > 0 && mobileExpanded === item.label && (
                  <div className="mobile-menu-children">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          min-height: 87px;
          background: #ffffff;
          border-bottom: 1px solid #e8e8e1;
          display: flex;
          align-items: center;
        }
        .site-header-home {
          position: fixed;
          top: 35px;
          left: 0;
          right: 0;
          min-height: 146px;
          background: transparent;
          border-bottom: 0;
          z-index: 120;
          pointer-events: none;
          transition: top 180ms ease, background 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }
        .site-header-home.site-header-scrolled {
          top: 0;
          background: rgba(15, 15, 15, 0.86);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(12px);
        }
        .site-header-inner {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 24px;
          pointer-events: auto;
        }
        .home-header-topline {
          min-height: 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.35);
        }
        .home-header-search {
          min-width: min(420px, 44vw);
          min-height: 42px;
          border: 0;
          background: transparent;
          color: #fff;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0;
          cursor: pointer;
          font: inherit;
          font-size: 15px;
          letter-spacing: 0;
        }
        .home-header-socials {
          display: inline-flex;
          align-items: center;
          gap: 18px;
        }
        .home-header-socials a,
        .site-header-home .site-header-actions a,
        .site-header-home .site-header-actions button {
          color: #fff;
        }
        .site-header-main {
          width: 100%;
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }
        .uc-hamburger {
          display: none;
          border: 0;
          background: transparent;
          color: #111;
          cursor: pointer;
          padding: 4px;
          align-items: center;
        }
        .site-header-home .uc-hamburger {
          color: #fff;
        }
        .uc-logo-link {
          position: relative;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          width: 220px;
          height: 72px;
          overflow: hidden;
          transition: transform 220ms ease, filter 220ms ease;
        }
        .site-logo-image {
          width: 220px;
          height: 72px;
          object-fit: contain;
        }
        .site-header-home .site-logo-image {
          filter: brightness(0) invert(1);
        }
        .uc-logo-link::after {
          content: '';
          position: absolute;
          inset: -20% -35%;
          background: linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.68) 48%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 620ms ease;
          pointer-events: none;
        }
        .uc-logo-link:hover,
        .uc-logo-link:focus-visible {
          transform: translateY(-2px) scale(1.025);
          filter: saturate(1.08);
        }
        .uc-logo-link:hover::after,
        .uc-logo-link:focus-visible::after {
          transform: translateX(120%);
        }
        .uc-desktop-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          flex: 1;
        }
        .site-nav-item {
          position: relative;
        }
        .site-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 0;
          color: #0f0f0f;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .site-nav-link.light {
          color: #fff;
        }
        .site-dropdown-bridge {
          position: absolute;
          top: 100%;
          left: 50%;
          z-index: 200;
          transform: translateX(-50%);
          padding-top: 12px;
        }
        .site-dropdown {
          min-width: 250px;
          padding: 8px 0;
          background: #fff;
          border: 1px solid #e8e8e1;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        .site-dropdown a {
          display: block;
          padding: 10px 20px;
          color: #0f0f0f;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .site-dropdown a:hover {
          background: #f5f5f3;
        }
        .site-header-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          color: #0f0f0f;
          flex-shrink: 0;
        }
        .site-header-actions a,
        .site-header-actions button {
          position: relative;
          border: 0;
          background: transparent;
          color: #0f0f0f;
          display: inline-flex;
          align-items: center;
          padding: 4px;
          cursor: pointer;
        }
        .site-header-actions button span {
          position: absolute;
          top: -5px;
          right: -6px;
          min-width: 17px;
          height: 17px;
          padding: 0 4px;
          border-radius: 999px;
          background: #ff4f33;
          color: #fff;
          font-size: 10px;
          line-height: 17px;
          text-align: center;
          font-weight: 700;
          letter-spacing: 0;
        }
        .mobile-social-wrap {
          position: relative;
          display: none;
        }
        .mobile-social-toggle {
          font-weight: 700;
        }
        .mobile-social-popover {
          position: absolute;
          top: calc(100% + 12px);
          right: -46px;
          z-index: 220;
          width: 178px;
          padding: 8px;
          background: #fff;
          border: 1px solid #e8e8e1;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.18);
        }
        .mobile-social-popover::before {
          content: '';
          position: absolute;
          top: -7px;
          right: 52px;
          width: 12px;
          height: 12px;
          background: #fff;
          border-left: 1px solid #e8e8e1;
          border-top: 1px solid #e8e8e1;
          transform: rotate(45deg);
        }
        .site-header-actions .mobile-social-popover a {
          width: 100%;
          padding: 11px 12px;
          color: #111;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          justify-content: flex-start;
        }
        .site-header-actions .mobile-social-popover a:hover {
          background: #f5f5f3;
        }
        .mobile-menu {
          position: fixed;
          top: 87px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 140;
          overflow-y: auto;
          background: #fff;
          border-top: 1px solid #e8e8e1;
        }
        .mobile-menu.home {
          top: 122px;
        }
        .mobile-menu nav {
          padding: 8px 0;
        }
        .mobile-menu-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          border-bottom: 1px solid #f0f0ee;
        }
        .mobile-menu-row a {
          color: #0f0f0f;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .mobile-menu-row button {
          border: 0;
          background: transparent;
          color: #0f0f0f;
          cursor: pointer;
          padding: 4px;
          display: inline-flex;
        }
        .mobile-menu-row svg {
          transition: transform 0.2s ease;
        }
        .mobile-menu-children {
          background: #fafaf8;
        }
        .mobile-menu-children a {
          display: block;
          padding: 12px 40px;
          color: #555;
          border-bottom: 1px solid #f0f0ee;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
        @media (max-width: 1020px) {
          .uc-desktop-nav {
            gap: 18px;
          }
        }
        @media (max-width: 767px) {
          .site-header {
            min-height: 78px;
          }
          .site-header-home {
            top: 54px;
            min-height: 88px;
          }
          .site-header-home.site-header-scrolled {
            top: 0;
          }
          .site-header-inner {
            padding: 0 18px;
            gap: 0;
          }
          .home-header-topline {
            display: none;
          }
          .site-header-main {
            min-height: 78px;
            gap: 12px;
          }
          .site-header-actions {
            gap: 11px;
          }
          .mobile-social-wrap {
            display: inline-flex;
          }
          .mobile-social-popover {
            right: -38px;
          }
          .uc-hamburger {
            display: inline-flex;
          }
          .uc-desktop-nav {
            display: none;
          }
          .uc-logo-link {
            width: 156px;
            height: 52px;
          }
          .site-logo-image {
            width: 156px;
            height: 52px;
          }
          .mobile-menu {
            top: 112px;
          }
          .mobile-menu.home {
            top: 112px;
          }
        }
      `}</style>
    </>
  );
}
