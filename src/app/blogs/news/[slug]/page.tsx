import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StorefrontShell from '@/components/StorefrontShell';
import { blogPosts } from '@/lib/blog';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <StorefrontShell>
      <article className="article-page">
        <div className="article-head">
          <p>{post.category}</p>
          <h1>{post.title}</h1>
          <span>{post.date} | {post.readTime}</span>
        </div>

        <div className="article-media">
          <Image src={post.image} alt={post.title} fill sizes="(max-width: 980px) 100vw, 920px" style={{ objectFit: 'cover' }} />
        </div>

        <div className="article-body">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <section className="article-related">
          <div className="article-related-head">
            <p>Keep reading</p>
            <Link href="/blogs/news">Back to blog</Link>
          </div>
          <div className="article-related-grid">
            {related.map((item) => (
              <Link key={item.slug} href={`/blogs/news/${item.slug}`}>
                <strong>{item.title}</strong>
                <span>{item.excerpt}</span>
              </Link>
            ))}
          </div>
        </section>

        <style>{`
          .article-page {
            max-width: 1080px;
            width: 100%;
            margin: 0 auto;
            padding: 56px 40px 78px;
          }
          .article-head {
            display: grid;
            gap: 14px;
            margin-bottom: 28px;
          }
          .article-head p,
          .article-related-head p {
            margin: 0;
            color: #6a6a64;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }
          .article-head h1 {
            margin: 0;
            max-width: 900px;
            font-size: clamp(38px, 5vw, 68px);
            font-weight: 500;
            line-height: 1;
            letter-spacing: 0;
          }
          .article-head span {
            color: #6a6a64;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }
          .article-media {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 8;
            overflow: hidden;
            background: #f5f5f1;
            margin-bottom: 34px;
          }
          .article-body {
            max-width: 820px;
            display: grid;
            gap: 18px;
          }
          .article-body p,
          .article-related-grid span {
            margin: 0;
            color: #34342f;
            font-size: 17px;
            line-height: 1.9;
            letter-spacing: 0;
          }
          .article-related {
            margin-top: 54px;
            padding-top: 24px;
            border-top: 1px solid #e8e8e1;
          }
          .article-related-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 20px;
          }
          .article-related-head a {
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            text-decoration: underline;
          }
          .article-related-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }
          .article-related-grid a {
            display: grid;
            gap: 10px;
            border: 1px solid #e8e8e1;
            padding: 20px;
          }
          .article-related-grid strong {
            font-size: 18px;
            line-height: 1.35;
            letter-spacing: 0;
          }
          .article-related-grid span {
            font-size: 14px;
            line-height: 1.7;
          }
          @media (max-width: 767px) {
            .article-page {
              padding: 36px 18px 58px;
            }
            .article-head h1 {
              font-size: 38px;
            }
            .article-media {
              aspect-ratio: 1 / 0.8;
            }
            .article-body p {
              font-size: 16px;
            }
            .article-related-grid {
              grid-template-columns: 1fr;
            }
            .article-related-head {
              display: grid;
            }
          }
        `}</style>
      </article>
    </StorefrontShell>
  );
}
