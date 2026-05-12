import Link from 'next/link';

export default function SiteFooter() {
  const shopLinks = [
    { label: 'All Products', href: '/collections/all' },
    { label: 'Skincare', href: '/collections/all?collection=Skincare' },
    { label: 'Makeup', href: '/collections/all?collection=Makeup' },
    { label: 'Haircare', href: '/collections/all?collection=Haircare' },
    { label: 'Sun Care', href: '/collections/all?collection=Sun%20Care' },
    { label: 'Serums', href: '/collections/all?collection=Serums' },
    { label: 'Bundles', href: '/collections/all?collection=Bundles' },
    { label: 'Best Sellers', href: '/collections/all?tag=Best%20Sellers' },
  ];
  const infoLinks = [
    { label: 'About Us', href: '/pages/about' },
    { label: 'Meet The Maker', href: '/pages/meet-the-maker' },
    { label: 'FAQs', href: '/pages/faqs' },
    { label: 'Blog', href: '/blogs/news' },
    { label: 'Media', href: '/pages/media' },
  ];
  const contactLinks = [
    { label: 'Contact Us', href: '/pages/contact' },
    { label: 'Wholesale', href: '/pages/wholesale' },
    { label: 'Private Label & Contract Manufacturing', href: '/pages/private-label' },
  ];

  const linkStyle = { display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '10px', textDecoration: 'none' } as const;
  const colHeadStyle: React.CSSProperties = { fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: '#fff', marginBottom: '20px' };
  const footerTextStyle: React.CSSProperties = { fontSize: '12px', color: 'rgba(255,255,255,0.4)' };
  const footerCreditLinkStyle: React.CSSProperties = { color: 'rgba(255,255,255,0.78)', textDecoration: 'underline', textUnderlineOffset: '3px' };

  return (
    <footer className="site-footer" style={{ background: '#0f0f0f', color: '#fff', padding: '60px 40px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div className="site-footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '50px' }}>
          {/* Column 1: Brand */}
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Cristalux Cosmetics</div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '20px' }}>
              Thoughtful cosmetics, skincare, and haircare rooted in Tunisia, North Africa.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              {/* Instagram */}
              <a href="https://www.instagram.com/cristalux_cosmetics_tunis/" style={{ color: 'rgba(255,255,255,0.7)' }} aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=100063614320291" style={{ color: 'rgba(255,255,255,0.7)' }} aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <div style={colHeadStyle}>Shop</div>
            {shopLinks.map(l => <Link key={l.href} href={l.href} style={linkStyle}>{l.label}</Link>)}
          </div>

          {/* Column 3: Info */}
          <div>
            <div style={colHeadStyle}>Info</div>
            {infoLinks.map(l => <Link key={l.href} href={l.href} style={linkStyle}>{l.label}</Link>)}
          </div>

          {/* Column 4: Contact */}
          <div>
            <div style={colHeadStyle}>Contact</div>
            {contactLinks.map(l => <Link key={l.href} href={l.href} style={linkStyle}>{l.label}</Link>)}
          </div>
        </div>

        <div className="site-footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
          <span style={footerTextStyle}>&copy; 2026 Cristalux Cosmetics. All rights reserved.</span>
          <span style={footerTextStyle}>
            Created and designed by{' '}
            <a href="https://aymen.info" target="_blank" rel="noreferrer" style={footerCreditLinkStyle}>
              Aymen
            </a>
          </span>
          <span style={footerTextStyle}>Tunisia, North Africa | Beauty routines prepared with care</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .site-footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 34px 28px !important;
          }
          .site-footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 560px) {
          .site-footer {
            padding: 44px 28px 0 !important;
          }
          .site-footer-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .site-footer-bottom {
            display: grid !important;
            gap: 10px;
            text-align: left;
          }
        }
      `}</style>
    </footer>
  );
}
