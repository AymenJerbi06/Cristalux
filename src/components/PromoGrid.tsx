'use client';

import Link from 'next/link';

const tiles = [
  { image: '/images/cristalux/micellar-collection.jpg', heading: 'SKINCARE', sub: 'Micellar + serum care', href: '/collections/all?collection=Skincare' },
  { image: '/images/cristalux/foundation-shades.jpg', heading: 'MAKEUP', sub: 'Complexion + gloss', href: '/collections/all?collection=Makeup' },
  { image: '/images/cristalux/caviar-hair-duo.jpg', heading: 'HAIRCARE', sub: 'Premium routines', href: '/collections/all?collection=Haircare' },
];

export default function PromoGrid() {
  return (
    <div style={{ display: 'flex', width: '100%', gap: '10px', padding: '0 10px' }}>
      {tiles.map((tile, i) => (
        <Link
          key={i}
          href={tile.href}
          style={{
            flex: 1,
            position: 'relative',
            height: '400px',
            overflow: 'hidden',
            display: 'block',
            textDecoration: 'none',
          }}
        >
          <div
            className="uc-promo-bg"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${tile.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.4s ease',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {tile.heading}
            </div>
            <div
              style={{
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '8px',
                textDecoration: 'underline',
                opacity: 0.85,
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {tile.sub}
            </div>
          </div>
        </Link>
      ))}
      <style>{`
        .uc-promo-bg:hover { transform: scale(1.04); }
      `}</style>
    </div>
  );
}
