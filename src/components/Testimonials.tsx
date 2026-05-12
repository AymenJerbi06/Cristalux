export default function Testimonials() {
  const reviews = [
    {
      stars: 5,
      text: 'The Vitamin C serum and sunscreen pairing makes the morning routine feel much more complete. Everything is easy to inspect before buying.',
      author: 'Meriem T.',
    },
    {
      stars: 5,
      text: 'I loved being able to compare the complexion products, open the gallery, and add the gloss straight to my bag without losing my place.',
      author: 'Ines B.',
    },
    {
      stars: 5,
      text: 'The haircare bundles are presented beautifully, and checkout finally feels like a real local storefront for Tunisia.',
      author: 'Sara A.',
    },
  ];

  return (
    <section className="testimonial-section">
      <h2>What Our Guests Are Saying</h2>
      <div className="testimonial-grid">
        {reviews.map((review) => (
          <article key={review.author} className="testimonial-card">
            <div className="testimonial-stars" aria-label={`${review.stars} out of 5 stars`}>
              {Array.from({ length: review.stars }).map((_, index) => (
                <span key={index} aria-hidden="true">&#9733;</span>
              ))}
            </div>
            <p>&ldquo;{review.text}&rdquo;</p>
            <strong>&mdash; {review.author}</strong>
          </article>
        ))}
      </div>

      <style>{`
        .testimonial-section {
          padding: 60px 40px;
          background: #fff;
          text-align: center;
        }
        .testimonial-section h2 {
          margin: 0 0 40px;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .testimonial-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 40px;
        }
        .testimonial-card {
          min-width: 0;
          border: 1px solid #e8e8e1;
          padding: 24px;
          text-align: left;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 36px rgba(17, 17, 17, 0.08);
        }
        .testimonial-stars {
          display: flex;
          gap: 2px;
          margin-bottom: 12px;
          color: #111;
          font-size: 18px;
        }
        .testimonial-card p {
          margin: 0 0 16px;
          color: #333;
          font-size: 14px;
          font-style: italic;
          line-height: 1.7;
          letter-spacing: 0;
        }
        .testimonial-card strong {
          display: inline-block;
          color: #000;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        @media (max-width: 980px) {
          .testimonial-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }
        @media (max-width: 767px) {
          .testimonial-section {
            padding: 48px 18px;
          }
        }
      `}</style>
    </section>
  );
}
