import HeroSlider from '@/components/HeroSlider';
import StatsBar from '@/components/StatsBar';
import ProductGrid from '@/components/ProductGrid';
import PromoGrid from '@/components/PromoGrid';
import Testimonials from '@/components/Testimonials';
import BlogSection from '@/components/BlogSection';
import StorefrontShell from '@/components/StorefrontShell';
import { products } from '@/lib/products';

const featuredCristalux = products.filter((product) => product.featured).slice(0, 5);
const makeupEssentials = products.filter((product) => product.collection === 'Makeup').slice(0, 5);
const haircareRituals = products.filter((product) => product.collection === 'Haircare' || product.collection === 'Bundles').slice(0, 5);

export default function Home() {
  return (
    <StorefrontShell>
      <>
        <HeroSlider />
        <StatsBar />
        <ProductGrid
          title="Featured Cristalux Picks"
          viewAllHref="/collections/all"
          products={featuredCristalux}
        />
        <ProductGrid
          title="Makeup Essentials"
          viewAllHref="/collections/all?collection=Makeup"
          products={makeupEssentials}
        />
        <ProductGrid
          title="Haircare Rituals"
          viewAllHref="/collections/all?collection=Haircare"
          products={haircareRituals}
        />
        <PromoGrid />
        <Testimonials />
        <BlogSection />
      </>
    </StorefrontShell>
  );
}
