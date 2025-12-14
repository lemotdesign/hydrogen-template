import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {Suspense} from 'react';
import {Await} from '@remix-run/react';

interface ProductsShowcaseProps {
  products: Promise<RecommendedProductsQuery>;
}

export function ProductsShowcase({products}: ProductsShowcaseProps) {
  return (
    <section className="products-showcase">
      <div className="container">
        <div className="products-header">
          <div className="products-header-content">
            <span className="products-label">Our Products</span>
            <h2 className="products-title">
              Three Ways to Experience <br />
              <span className="highlight-yellow">Samoan Taro</span>
            </h2>
          </div>
          <p className="products-description">
            From post-workout protein to artisan baking flour and 
            indulgent milk tea — discover how we've transformed 
            nature's superfood for modern wellness.
          </p>
        </div>
        
        {/* Featured Products Grid */}
        <div className="products-featured-grid">
          <FeaturedProductCard 
            title="Taro Protein"
            subtitle="Naturally High-Fibre Samoan Muscle Fuel"
            description="Plant-based protein powder made from 100% Samoan Taro. Perfect for smoothies, shakes, and post-workout recovery."
            price="$59.00"
            image="/images/taro-protein.png"
            link="/products/taro-protein"
            badge="Best Seller"
            features={['25g Protein', 'High Fibre', 'Vegan']}
            variant="dark"
          />
          <FeaturedProductCard 
            title="Taro Flour"
            subtitle="Nutrient-Rich Ancient Root Flour"
            description="Gluten-free flour alternative perfect for baking, cooking, and creating healthy recipes your whole family will love."
            price="$34.00"
            image="/images/taro-flour.png"
            link="/products/taro-flour"
            features={['Gluten-Free', 'Low GI', 'Versatile']}
            variant="light"
          />
          <FeaturedProductCard 
            title="Taro Milk Tea"
            subtitle="Premium Bubble Tea at Home"
            description="Authentic taro milk tea powder for creating café-quality drinks at home. Just add milk and enjoy."
            price="$28.00"
            image="/images/taro-tea.png"
            link="/products/taro-milk-tea"
            features={['Café Quality', 'Easy Mix', 'Delicious']}
            variant="coral"
          />
        </div>
        
        {/* Subscription CTA */}
        <div className="subscription-cta">
          <div className="subscription-cta-content">
            <div className="subscription-badge">
              <GiftSmallIcon />
              <span>Subscribe & Save 15%</span>
            </div>
            <h3>Never Run Out of Your Favorites</h3>
            <p>
              Set up a weekly, fortnightly, or monthly delivery and save 15% 
              on every order. Cancel or pause anytime.
            </p>
            <Link to="/pages/subscriptions" className="btn btn-primary">
              Learn About Subscriptions
            </Link>
          </div>
        </div>
        
        {/* More Products */}
        <Suspense fallback={<ProductsGridSkeleton />}>
          <Await resolve={products}>
            {({products}) => (
              <div className="products-more">
                <h3 className="products-more-title">More Products</h3>
                <div className="products-grid">
                  {products.nodes.slice(0, 4).map((product) => (
                    <Link 
                      key={product.id}
                      to={`/products/${product.handle}`}
                      className="product-card"
                    >
                      <div className="product-card-image">
                        {product.images.nodes[0] && (
                          <Image
                            data={product.images.nodes[0]}
                            aspectRatio="1/1"
                            sizes="(min-width: 45em) 20vw, 50vw"
                          />
                        )}
                      </div>
                      <div className="product-card-content">
                        <h4 className="product-card-title">{product.title}</h4>
                        <div className="product-card-price">
                          <Money data={product.priceRange.minVariantPrice} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="products-more-cta">
                  <Link to="/collections/all" className="btn btn-outline">
                    View All Products
                  </Link>
                </div>
              </div>
            )}
          </Await>
        </Suspense>
      </div>
      
      <style>{productsStyles}</style>
    </section>
  );
}

interface FeaturedProductCardProps {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
  link: string;
  badge?: string;
  features: string[];
  variant: 'dark' | 'light' | 'coral';
}

function FeaturedProductCard({
  title,
  subtitle,
  description,
  price,
  image,
  link,
  badge,
  features,
  variant,
}: FeaturedProductCardProps) {
  return (
    <Link to={link} className={`featured-product-card variant-${variant}`}>
      {badge && <span className="featured-product-badge">{badge}</span>}
      <div className="featured-product-image">
        <div className="featured-product-placeholder">
          <TaroIcon />
        </div>
      </div>
      <div className="featured-product-content">
        <span className="featured-product-subtitle">{subtitle}</span>
        <h3 className="featured-product-title">{title}</h3>
        <p className="featured-product-description">{description}</p>
        <div className="featured-product-features">
          {features.map((feature, i) => (
            <span key={i} className="featured-product-feature">
              <CheckIcon />
              {feature}
            </span>
          ))}
        </div>
        <div className="featured-product-footer">
          <span className="featured-product-price">{price}</span>
          <span className="featured-product-cta">Shop Now →</span>
        </div>
      </div>
    </Link>
  );
}

function GiftSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="4" rx="1"/>
      <path d="M12 8v13"/>
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
    </svg>
  );
}

function TaroIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" opacity="0.2">
      <ellipse cx="50" cy="70" rx="30" ry="20"/>
      <path d="M50 15C60 25 65 40 60 55C55 45 50 35 50 25C50 35 45 45 40 55C35 40 40 25 50 15Z"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className="products-more">
      <h3 className="products-more-title">More Products</h3>
      <div className="products-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="product-card skeleton">
            <div className="product-card-image skeleton-image"></div>
            <div className="product-card-content">
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const productsStyles = `
  .products-showcase {
    padding: var(--space-24) 0;
    background: var(--strong-cream);
  }
  
  .products-header {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
    margin-bottom: var(--space-12);
  }
  
  @media (min-width: 768px) {
    .products-header {
      grid-template-columns: 1.5fr 1fr;
      align-items: end;
    }
  }
  
  .products-label {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-secondary);
    display: block;
    margin-bottom: var(--space-2);
  }
  
  .products-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    line-height: 1.2;
    color: var(--strong-black);
    margin: 0;
  }
  
  @media (min-width: 768px) {
    .products-title {
      font-size: var(--text-4xl);
    }
  }
  
  .products-description {
    font-size: var(--text-base);
    color: var(--color-text-muted);
    line-height: 1.7;
    margin: 0;
  }
  
  /* Featured Products Grid */
  .products-featured-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
    margin-bottom: var(--space-12);
  }
  
  @media (min-width: 768px) {
    .products-featured-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .products-featured-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  /* Featured Product Card */
  .featured-product-card {
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    text-decoration: none;
    transition: all var(--transition-base);
    position: relative;
  }
  
  .featured-product-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-2xl);
  }
  
  .variant-dark {
    background: var(--strong-charcoal);
    color: var(--strong-white);
  }
  
  .variant-light {
    background: var(--strong-white);
    color: var(--strong-black);
  }
  
  .variant-coral {
    background: linear-gradient(135deg, var(--strong-secondary) 0%, var(--strong-secondary-dark) 100%);
    color: var(--strong-black);
  }
  
  .featured-product-badge {
    position: absolute;
    top: var(--space-4);
    left: var(--space-4);
    background: var(--strong-primary);
    color: var(--strong-black);
    padding: var(--space-1) var(--space-3);
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-full);
    z-index: 1;
  }
  
  .featured-product-image {
    aspect-ratio: 4/3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-8);
  }
  
  .featured-product-placeholder {
    width: 60%;
    opacity: 0.3;
  }
  
  .featured-product-placeholder svg {
    width: 100%;
    height: auto;
  }
  
  .variant-dark .featured-product-placeholder {
    color: var(--strong-white);
  }
  
  .variant-light .featured-product-placeholder {
    color: var(--strong-black);
  }
  
  .variant-coral .featured-product-placeholder {
    color: var(--strong-black);
  }
  
  .featured-product-content {
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    flex-grow: 1;
  }
  
  .featured-product-subtitle {
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.7;
  }
  
  .featured-product-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-black);
    margin: 0;
    line-height: 1.2;
  }
  
  .featured-product-description {
    font-size: var(--text-sm);
    opacity: 0.8;
    line-height: 1.6;
    margin: 0;
    flex-grow: 1;
  }
  
  .featured-product-features {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }
  
  .featured-product-feature {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
  }
  
  .variant-dark .featured-product-feature svg {
    color: var(--strong-primary);
  }
  
  .variant-light .featured-product-feature svg {
    color: var(--strong-leaf);
  }
  
  .variant-coral .featured-product-feature svg {
    color: var(--strong-black);
  }
  
  .featured-product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-4);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: var(--space-2);
  }
  
  .variant-light .featured-product-footer {
    border-color: rgba(0, 0, 0, 0.1);
  }
  
  .featured-product-price {
    font-size: var(--text-xl);
    font-weight: var(--font-black);
  }
  
  .featured-product-cta {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    transition: transform var(--transition-base);
  }
  
  .featured-product-card:hover .featured-product-cta {
    transform: translateX(4px);
  }
  
  /* Subscription CTA */
  .subscription-cta {
    background: var(--strong-primary);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    margin-bottom: var(--space-12);
    text-align: center;
  }
  
  @media (min-width: 768px) {
    .subscription-cta {
      padding: var(--space-12);
    }
  }
  
  .subscription-cta-content {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }
  
  .subscription-cta h3 {
    font-size: var(--text-2xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0;
  }
  
  @media (min-width: 768px) {
    .subscription-cta h3 {
      font-size: var(--text-3xl);
    }
  }
  
  .subscription-cta p {
    color: var(--strong-charcoal);
    margin: 0;
    line-height: 1.6;
  }
  
  /* More Products */
  .products-more {
    margin-top: var(--space-12);
  }
  
  .products-more-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-6);
    color: var(--strong-black);
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
  
  @media (min-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .products-more-cta {
    text-align: center;
    margin-top: var(--space-8);
  }
  
  /* Skeleton loading */
  .skeleton-image {
    background: linear-gradient(90deg, var(--strong-cream) 25%, var(--strong-white) 50%, var(--strong-cream) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  .skeleton-text {
    height: 16px;
    background: var(--strong-cream);
    border-radius: var(--radius-sm);
    margin-bottom: var(--space-2);
  }
  
  .skeleton-text.short {
    width: 60%;
  }
  
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

