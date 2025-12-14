import {json, redirect, type LoaderFunctionArgs} from '@netlify/remix-runtime';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {
  Pagination,
  getPaginationVariables,
  Image,
  Money,
} from '@shopify/hydrogen';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/utils';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `Strong | ${data?.collection.title ?? 'Shop'}`},
    {
      name: 'description',
      content: data?.collection.description || 'Shop premium Samoan Taro products. Protein, flour, and milk tea for the health-conscious consumer.',
    },
  ];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  if (!handle) {
    return redirect('/collections');
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  return json({collection});
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <>
      <div className="collection-page">
        {/* Collection Hero */}
        <section className="collection-hero">
          <div className="container">
            <nav className="collection-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/collections">Collections</Link>
              <span>/</span>
              <span>{collection.title}</span>
            </nav>
            
            <div className="collection-hero-content">
              <h1 className="collection-title">{collection.title}</h1>
              {collection.description && (
                <p className="collection-description">{collection.description}</p>
              )}
            </div>
            
            {/* Filter/Sort Bar */}
            <div className="collection-filters">
              <div className="collection-results">
                <span>{collection.products.nodes.length}+ products</span>
              </div>
              <div className="collection-sort">
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" className="sort-select">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="best-selling">Best Selling</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        
        {/* Products Grid */}
        <section className="collection-products">
          <div className="container">
            <Pagination connection={collection.products}>
              {({nodes, isLoading, PreviousLink, NextLink}) => (
                <>
                  <PreviousLink className="pagination-link pagination-link-prev">
                    {isLoading ? (
                      <span className="pagination-loading">Loading...</span>
                    ) : (
                      <span className="pagination-btn">
                        <ArrowUpIcon /> Load previous
                      </span>
                    )}
                  </PreviousLink>
                  
                  <ProductsGrid products={nodes} />
                  
                  <NextLink className="pagination-link pagination-link-next">
                    {isLoading ? (
                      <span className="pagination-loading">Loading...</span>
                    ) : (
                      <span className="btn btn-outline pagination-btn-load">
                        Load more products <ArrowDownIcon />
                      </span>
                    )}
                  </NextLink>
                </>
              )}
            </Pagination>
          </div>
        </section>
        
        {/* Subscription Banner */}
        <section className="collection-subscription">
          <div className="container">
            <div className="subscription-banner">
              <div className="subscription-banner-content">
                <span className="subscription-banner-badge">
                  <GiftIcon />
                  Subscribe & Save 15%
                </span>
                <h2>Never Run Out of Your Favorites</h2>
                <p>
                  Set up weekly, fortnightly, or monthly delivery and save 15% on every order. 
                  Cancel or pause anytime.
                </p>
                <Link to="/pages/subscriptions" className="btn btn-secondary">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <style>{collectionStyles}</style>
    </>
  );
}

function ProductsGrid({products}: {products: ProductItemFragment[]}) {
  return (
    <div className="products-grid-strong">
      {products.map((product, index) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        );
      })}
    </div>
  );
}

function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  
  const hasComparePrice = product.priceRange.maxVariantPrice.amount !== product.priceRange.minVariantPrice.amount;
  
  return (
    <Link
      className="product-card-strong"
      prefetch="intent"
      to={variantUrl}
    >
      <div className="product-card-image">
        {product.featuredImage ? (
          <Image
            alt={product.featuredImage.altText || product.title}
            aspectRatio="1/1"
            data={product.featuredImage}
            loading={loading}
            sizes="(min-width: 768px) 25vw, 50vw"
          />
        ) : (
          <div className="product-card-placeholder">
            <TaroIcon />
          </div>
        )}
      </div>
      <div className="product-card-content">
        <span className="product-card-vendor">Strong</span>
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-price">
          <Money data={product.priceRange.minVariantPrice} />
          {hasComparePrice && (
            <span className="product-card-price-from">from</span>
          )}
        </div>
      </div>
      <div className="product-card-actions">
        <span className="product-card-quick-add">Quick Add</span>
      </div>
    </Link>
  );
}

// Icons
function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 15-6-6-6 6"/>
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}

function GiftIcon() {
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

const collectionStyles = `
  .collection-page {
    background: var(--strong-cream);
  }
  
  /* Collection Hero */
  .collection-hero {
    padding: var(--space-8) 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .collection-breadcrumb {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin-bottom: var(--space-6);
  }
  
  .collection-breadcrumb a {
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition-base);
  }
  
  .collection-breadcrumb a:hover {
    color: var(--strong-black);
  }
  
  .collection-breadcrumb span:last-child {
    color: var(--strong-black);
  }
  
  .collection-hero-content {
    margin-bottom: var(--space-8);
  }
  
  .collection-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-3);
    line-height: 1.2;
  }
  
  @media (min-width: 768px) {
    .collection-title {
      font-size: var(--text-5xl);
    }
  }
  
  .collection-description {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    max-width: 600px;
    margin: 0;
    line-height: 1.7;
  }
  
  /* Filters */
  .collection-filters {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  
  @media (min-width: 640px) {
    .collection-filters {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  .collection-results {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }
  
  .collection-sort {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
  }
  
  .collection-sort label {
    color: var(--color-text-muted);
  }
  
  .sort-select {
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--strong-gray-light);
    border-radius: var(--radius-md);
    background: var(--strong-white);
    font-size: var(--text-sm);
    cursor: pointer;
  }
  
  /* Products Section */
  .collection-products {
    padding: var(--space-10) 0 var(--space-16);
  }
  
  /* Products Grid */
  .products-grid-strong {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }
  
  @media (min-width: 640px) {
    .products-grid-strong {
      gap: var(--space-6);
    }
  }
  
  @media (min-width: 768px) {
    .products-grid-strong {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .products-grid-strong {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  /* Product Card */
  .product-card-strong {
    background: var(--strong-white);
    border-radius: var(--radius-xl);
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: all var(--transition-base);
    position: relative;
    display: flex;
    flex-direction: column;
  }
  
  .product-card-strong:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
  
  .product-card-image {
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--strong-cream);
  }
  
  .product-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }
  
  .product-card-strong:hover .product-card-image img {
    transform: scale(1.05);
  }
  
  .product-card-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-8);
  }
  
  .product-card-placeholder svg {
    width: 60%;
    height: auto;
    color: var(--strong-gray-light);
  }
  
  .product-card-content {
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    flex-grow: 1;
  }
  
  .product-card-vendor {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-secondary);
  }
  
  .product-card-title {
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    color: var(--strong-black);
    margin: 0;
    line-height: 1.3;
  }
  
  @media (min-width: 768px) {
    .product-card-title {
      font-size: var(--text-lg);
    }
  }
  
  .product-card-price {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    color: var(--strong-black);
    margin-top: var(--space-1);
  }
  
  .product-card-price-from {
    font-size: var(--text-xs);
    font-weight: var(--font-normal);
    color: var(--color-text-muted);
  }
  
  .product-card-actions {
    padding: var(--space-4);
    padding-top: 0;
    opacity: 0;
    transform: translateY(10px);
    transition: all var(--transition-base);
  }
  
  .product-card-strong:hover .product-card-actions {
    opacity: 1;
    transform: translateY(0);
  }
  
  .product-card-quick-add {
    display: block;
    width: 100%;
    text-align: center;
    padding: var(--space-2) var(--space-4);
    background: var(--strong-black);
    color: var(--strong-white);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  /* Pagination */
  .pagination-link {
    display: block;
    text-align: center;
    text-decoration: none;
    color: inherit;
    margin-bottom: var(--space-8);
  }
  
  .pagination-link-next {
    margin-bottom: 0;
  }
  
  .pagination-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }
  
  .pagination-btn-load {
    margin-top: var(--space-4);
  }
  
  .pagination-loading {
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }
  
  /* Subscription Banner */
  .collection-subscription {
    padding-bottom: var(--space-16);
  }
  
  .subscription-banner {
    background: var(--strong-primary);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    text-align: center;
  }
  
  @media (min-width: 768px) {
    .subscription-banner {
      padding: var(--space-12);
    }
  }
  
  .subscription-banner-content {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }
  
  .subscription-banner-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--strong-black);
    color: var(--strong-white);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .subscription-banner h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0;
  }
  
  @media (min-width: 768px) {
    .subscription-banner h2 {
      font-size: var(--text-3xl);
    }
  }
  
  .subscription-banner p {
    color: var(--strong-charcoal);
    line-height: 1.6;
    margin: 0;
  }
`;

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
