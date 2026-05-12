import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog';

export default function BlogSection() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section style={{ padding: '60px 40px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, margin: 0 }}>From the blog</h2>
        <Link href="/blogs/news" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'underline', color: '#000' }}>View all</Link>
      </div>
      <div className="home-blog-grid">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blogs/news/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '66%', overflow: 'hidden', background: '#f5f5f5' }}>
              <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} sizes="33vw" />
            </div>
            <div style={{ marginTop: '14px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#000', lineHeight: 1.4 }}>{post.title}</div>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>{post.date}</div>
            </div>
          </Link>
        ))}
      </div>
      <style>{`
        .home-blog-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        @media (max-width: 767px) {
          .home-blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
