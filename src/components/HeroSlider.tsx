'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

type HeroSlide = {
  kicker: string;
  title: string;
  body: string;
  buttonText: string;
  buttonHref: string;
  mediaHref: string;
  image: string;
  alt: string;
  background: string;
  positionDesktop: string;
  positionMobile: string;
};

const slides: HeroSlide[] = [
  {
    kicker: 'Gloss Edit',
    title: 'Pigmented shine, Cristalux finish.',
    body: 'Long-wear liquid gloss shades with a polished, camera-ready glow.',
    buttonText: 'Shop gloss',
    buttonHref: '/products/gloss-liquide-longue-tenue',
    mediaHref: '/collections/all',
    image: '/images/cristalux/homepage/homepage-gloss-red.jpg',
    alt: 'Cristalux red liquid gloss homepage campaign',
    background: 'linear-gradient(90deg, #080707 0%, #1d1514 54%, #f0ece8 100%)',
    positionDesktop: 'right center',
    positionMobile: 'center 64px',
  },
  {
    kicker: 'Color Focus',
    title: 'Soft color with a glossy payoff.',
    body: 'A brighter lip look for everyday makeup, gifting, and seasonal edits.',
    buttonText: 'Shop makeup',
    buttonHref: '/collections/all?collection=Makeup',
    mediaHref: '/collections/all',
    image: '/images/cristalux/homepage/homepage-gloss-pink.jpg',
    alt: 'Cristalux pink liquid gloss homepage campaign',
    background: 'linear-gradient(90deg, #0a0709 0%, #241118 54%, #f3eef0 100%)',
    positionDesktop: 'right center',
    positionMobile: 'center 64px',
  },
  {
    kicker: 'Keratin Smooth',
    title: 'Smoother shine for dry hair.',
    body: 'Keratin serum care for brittle, very dry, and damaged lengths.',
    buttonText: 'View serum',
    buttonHref: '/products/serum-lissant-vitamine-e',
    mediaHref: '/collections/all',
    image: '/images/cristalux/homepage/homepage-serum-lissant.jpg',
    alt: 'Cristalux keratin smoothing serum homepage campaign',
    background: 'linear-gradient(90deg, #060807 0%, #102522 54%, #e5e8e5 100%)',
    positionDesktop: 'right center',
    positionMobile: 'center 64px',
  },
  {
    kicker: 'Hair Ritual',
    title: 'A smoother finish for every texture.',
    body: 'Vitamin E serum support for polished lengths, curls, and daily styling.',
    buttonText: 'View serum',
    buttonHref: '/products/serum-lissant-vitamine-e',
    mediaHref: '/collections/all',
    image: '/images/cristalux/homepage/homepage-hair-serum.jpg',
    alt: 'Cristalux smoothing hair serum homepage campaign',
    background: 'linear-gradient(90deg, #080807 0%, #22301f 54%, #d8c8b2 100%)',
    positionDesktop: 'right center',
    positionMobile: 'center 64px',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCurrent((value) => (value + 1) % slides.length);
      setProgressKey((value) => value + 1);
    }, 7600);

    return () => window.clearTimeout(timeoutId);
  }, [current]);

  const goTo = (index: number) => {
    setCurrent(index);
    setProgressKey((value) => value + 1);
  };

  const goPrevious = () => {
    setCurrent((value) => (value - 1 + slides.length) % slides.length);
    setProgressKey((value) => value + 1);
  };

  const goNext = () => {
    setCurrent((value) => (value + 1) % slides.length);
    setProgressKey((value) => value + 1);
  };

  return (
    <section className="home-hero" data-hero aria-label="Cristalux homepage campaigns">
      {slides.map((slide, index) => (
        <article
          key={slide.title}
          className={current === index ? 'home-hero-slide active' : 'home-hero-slide'}
          aria-hidden={current !== index}
          style={
            {
              '--hero-background': slide.background,
              '--hero-position-desktop': slide.positionDesktop,
              '--hero-position-mobile': slide.positionMobile,
            } as CSSProperties
          }
        >
          <div className="home-hero-media">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="home-hero-image"
            />
          </div>

          <Link
            href={slide.mediaHref}
            className="home-hero-click-layer"
            tabIndex={current === index ? 0 : -1}
            aria-label="Open the full Cristalux shop"
          />
          <div className="home-hero-shade" />

          <div className="home-hero-copy">
            <p>{slide.kicker}</p>
            <h1>{slide.title}</h1>
            <span>{slide.body}</span>
            <Link href={slide.buttonHref}>{slide.buttonText}</Link>
          </div>
        </article>
      ))}

      <div className="home-hero-controls">
        <button type="button" onClick={goPrevious} aria-label="Show previous homepage campaign">
          <ChevronLeft size={19} />
        </button>
        <button type="button" onClick={goNext} aria-label="Show next homepage campaign">
          <ChevronRight size={19} />
        </button>
      </div>

      <div className="home-hero-dots" aria-label="Homepage campaign navigation">
        {slides.map((slide, index) => (
          <button
            key={slide.kicker}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show homepage campaign ${index + 1}`}
            aria-current={current === index}
          >
            {current === index && <span key={progressKey} />}
          </button>
        ))}
      </div>

      <style>{`
        .home-hero {
          position: relative;
          width: 100%;
          min-height: 620px;
          height: min(72vh, 760px);
          overflow: hidden;
          background: #111;
        }
        .home-hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 520ms ease;
        }
        .home-hero-slide.active {
          opacity: 1;
          pointer-events: auto;
        }
        .home-hero-media,
        .home-hero-click-layer,
        .home-hero-shade {
          position: absolute;
          inset: 0;
        }
        .home-hero-media {
          overflow: hidden;
          background: var(--hero-background);
        }
        .home-hero-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: var(--hero-position-desktop);
          filter: drop-shadow(0 22px 42px rgba(0, 0, 0, 0.28));
        }
        .home-hero-click-layer {
          z-index: 1;
          display: block;
          cursor: pointer;
        }
        .home-hero-shade {
          z-index: 2;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.50) 34%, rgba(0, 0, 0, 0) 62%, rgba(0, 0, 0, 0) 100%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0) 36%, rgba(0, 0, 0, 0.06) 100%);
        }
        .home-hero-copy {
          position: relative;
          z-index: 3;
          width: min(100%, 1440px);
          height: 100%;
          margin: 0 auto;
          padding: 190px 82px 70px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          gap: 12px;
        }
        .home-hero-copy p {
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .home-hero-copy h1 {
          max-width: 660px;
          margin: 0;
          color: #fff;
          font-size: clamp(30px, 3.6vw, 50px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          text-wrap: balance;
          text-shadow: 0 4px 18px rgba(0, 0, 0, 0.34);
        }
        .home-hero-copy span {
          max-width: 520px;
          color: rgba(255, 255, 255, 0.94);
          font-size: 16px;
          line-height: 1.55;
          letter-spacing: 0;
          text-shadow: 0 3px 14px rgba(0, 0, 0, 0.3);
        }
        .home-hero-copy a {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #111;
          color: #fff;
          padding: 0 24px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition: transform 180ms ease, background 180ms ease, color 180ms ease;
        }
        .home-hero-copy a:hover {
          transform: translateY(-2px);
          background: #fff;
          color: #111;
        }
        .home-hero-controls {
          position: absolute;
          top: 52%;
          left: 0;
          right: 0;
          z-index: 4;
          display: flex;
          justify-content: space-between;
          padding: 0 24px;
          transform: translateY(-50%);
          pointer-events: none;
        }
        .home-hero-controls button {
          width: 46px;
          height: 46px;
          border: 1px solid rgba(255, 255, 255, 0.52);
          background: rgba(17, 17, 17, 0.58);
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          transition: transform 180ms ease, background 180ms ease;
        }
        .home-hero-controls button:hover {
          transform: translateY(-2px);
          background: rgba(17, 17, 17, 0.9);
        }
        .home-hero-dots {
          position: absolute;
          left: 50%;
          bottom: 24px;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 10px;
          transform: translateX(-50%);
        }
        .home-hero-dots button {
          position: relative;
          width: 48px;
          height: 4px;
          border: 0;
          background: rgba(255, 255, 255, 0.36);
          padding: 0;
          overflow: hidden;
          cursor: pointer;
        }
        .home-hero-dots button[aria-current="true"] {
          background: rgba(255, 255, 255, 0.56);
        }
        .home-hero-dots span {
          position: absolute;
          inset: 0 auto 0 0;
          width: 0;
          background: #fff;
          animation: slickDotProgress 7600ms linear forwards;
        }
        @media (max-width: 980px) {
          .home-hero {
            min-height: 580px;
            height: min(70vh, 700px);
          }
          .home-hero-copy {
            padding: 150px 72px 66px;
          }
        }
        @media (max-width: 767px) {
          .home-hero {
            min-height: 650px;
            height: min(700px, 82vh);
          }
          .home-hero-image {
            object-position: var(--hero-position-mobile);
          }
          .home-hero-shade {
            background:
              linear-gradient(180deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.18) 12%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.03) 56%, rgba(0, 0, 0, 0.82) 78%, rgba(0, 0, 0, 0.92) 100%);
          }
          .home-hero-copy {
            padding: 112px 18px 54px;
            gap: 11px;
          }
          .home-hero-copy h1 {
            max-width: 100%;
            font-size: 27px;
            line-height: 1.08;
          }
          .home-hero-copy span {
            font-size: 14px;
          }
          .home-hero-copy a {
            width: auto;
            min-width: 176px;
          }
          .home-hero-controls {
            top: 46%;
            padding: 0 14px;
          }
          .home-hero-controls button {
            width: 42px;
            height: 42px;
          }
          .home-hero-dots {
            bottom: 24px;
            width: calc(100vw - 36px);
            justify-content: center;
          }
          .home-hero-dots button {
            flex: 1;
            max-width: 50px;
          }
        }
      `}</style>
    </section>
  );
}
