'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const gallery = useMemo(() => images.length > 0 ? images : [], [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const activeImage = gallery[activeIndex];

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + gallery.length) % gallery.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % gallery.length);
  };

  useEffect(() => {
    if (!zoomOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoomOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomOpen]);

  if (!activeImage) {
    return null;
  }

  return (
    <div className="product-gallery">
      <div className="product-gallery-stage">
        <Image
          key={activeImage}
          src={activeImage}
          alt={title}
          fill
          priority
          className="product-gallery-image"
          sizes="(max-width: 980px) 100vw, 52vw"
          style={{ objectFit: 'cover' }}
        />
        <button
          type="button"
          className="product-gallery-open"
          onClick={() => setZoomOpen(true)}
          aria-label={`Open enlarged view of ${title}`}
        />
        <div className="product-gallery-badge">
          <Expand size={15} />
          <span>Inspect image</span>
        </div>
        {gallery.length > 1 && (
          <>
            <button type="button" className="product-gallery-nav product-gallery-prev" onClick={goPrev} aria-label="Previous product image">
              <ChevronLeft size={20} />
            </button>
            <button type="button" className="product-gallery-nav product-gallery-next" onClick={goNext} aria-label="Next product image">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="product-gallery-thumbs" aria-label="Product image thumbnails">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={index === activeIndex ? 'product-gallery-thumb active' : 'product-gallery-thumb'}
              onClick={() => setActiveIndex(index)}
              aria-label={`View product image ${index + 1}`}
            >
              <Image src={image} alt="" fill sizes="104px" style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      {zoomOpen && (
        <div className="product-lightbox" role="dialog" aria-modal="true" aria-label={`${title} enlarged image`}>
          <button type="button" className="product-lightbox-backdrop" onClick={() => setZoomOpen(false)} aria-label="Close enlarged image" />
          <div className="product-lightbox-panel">
            <button type="button" className="product-lightbox-close" onClick={() => setZoomOpen(false)} aria-label="Close enlarged image">
              <X size={20} />
            </button>
            <div className="product-lightbox-media">
              <Image src={activeImage} alt={title} fill sizes="min(92vw, 960px)" style={{ objectFit: 'contain' }} />
            </div>
            {gallery.length > 1 && (
              <div className="product-lightbox-actions">
                <button type="button" onClick={goPrev}>
                  <ChevronLeft size={18} />
                  <span>Previous</span>
                </button>
                <strong>{activeIndex + 1} / {gallery.length}</strong>
                <button type="button" onClick={goNext}>
                  <span>Next</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .product-gallery {
          display: grid;
          gap: 16px;
        }
        .product-gallery-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #f5f5f1;
          cursor: zoom-in;
        }
        .product-gallery-open {
          position: absolute;
          inset: 0;
          z-index: 1;
          border: 0;
          background: transparent;
          cursor: zoom-in;
        }
        .product-gallery-image {
          animation: productImageReveal 320ms ease both;
          transition: transform 400ms ease;
        }
        .product-gallery-stage:hover .product-gallery-image {
          transform: scale(1.045);
        }
        .product-gallery-badge {
          position: absolute;
          left: 18px;
          bottom: 18px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(17, 17, 17, 0.86);
          color: #fff;
          min-height: 36px;
          padding: 0 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }
        .product-gallery-nav {
          position: absolute;
          top: 50%;
          z-index: 3;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(255,255,255,0.56);
          background: rgba(17, 17, 17, 0.78);
          color: #fff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-50%);
          transition: transform 180ms ease, background 180ms ease;
        }
        .product-gallery-nav:hover {
          background: #111;
          transform: translateY(-50%) scale(1.04);
        }
        .product-gallery-prev {
          left: 16px;
        }
        .product-gallery-next {
          right: 16px;
        }
        .product-gallery-thumbs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(84px, 1fr));
          gap: 12px;
        }
        .product-gallery-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border: 1px solid #ddd9d1;
          background: #f5f5f1;
          cursor: pointer;
          opacity: 0.72;
          transition: opacity 180ms ease, transform 180ms ease, border-color 180ms ease;
        }
        .product-gallery-thumb:hover,
        .product-gallery-thumb.active {
          opacity: 1;
          border-color: #111;
          transform: translateY(-2px);
        }
        .product-lightbox {
          position: fixed;
          inset: 0;
          z-index: 360;
          display: grid;
          place-items: center;
          padding: 24px;
        }
        .product-lightbox-backdrop {
          position: absolute;
          inset: 0;
          border: 0;
          background: rgba(9, 9, 9, 0.84);
          cursor: zoom-out;
        }
        .product-lightbox-panel {
          position: relative;
          z-index: 1;
          width: min(92vw, 1080px);
          background: #fff;
          padding: 18px;
          display: grid;
          gap: 16px;
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.28);
          animation: productLightboxReveal 220ms ease both;
        }
        .product-lightbox-close {
          position: absolute;
          top: 18px;
          right: 18px;
          z-index: 2;
          width: 42px;
          height: 42px;
          border: 1px solid #ddd9d1;
          background: #fff;
          color: #111;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .product-lightbox-media {
          position: relative;
          width: 100%;
          min-height: min(72vh, 760px);
          background: #f5f5f1;
        }
        .product-lightbox-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .product-lightbox-actions button {
          min-height: 44px;
          border: 1px solid #111;
          background: #111;
          color: #fff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 16px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .product-lightbox-actions strong {
          color: #34342f;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        @keyframes productImageReveal {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes productLightboxReveal {
          from { opacity: 0; transform: translateY(10px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 767px) {
          .product-gallery-nav {
            width: 40px;
            height: 40px;
          }
          .product-gallery-badge {
            left: 12px;
            bottom: 12px;
          }
          .product-lightbox {
            padding: 12px;
          }
          .product-lightbox-panel {
            width: 100%;
            padding: 12px;
          }
          .product-lightbox-close {
            top: 12px;
            right: 12px;
          }
          .product-lightbox-media {
            min-height: 58vh;
          }
          .product-lightbox-actions {
            display: grid;
            grid-template-columns: 1fr;
          }
          .product-lightbox-actions button,
          .product-lightbox-actions strong {
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
