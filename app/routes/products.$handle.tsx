import {Suspense, useState} from 'react';
import {defer, redirect, type LoaderFunctionArgs} from '@netlify/remix-runtime';
import {
  Await,
  Link,
  useLoaderData,
  type MetaFunction,
  type FetcherWithComponents,
} from '@remix-run/react';
import type {
  ProductFragment,
  ProductVariantsQuery,
  ProductVariantFragment,
} from 'storefrontapi.generated';

import {
  Image,
  Money,
  VariantSelector,
  type VariantOption,
  getSelectedProductOptions,
  CartForm,
} from '@shopify/hydrogen';
import type {
  CartLineInput,
  SelectedOption,
} from '@shopify/hydrogen/storefront-api-types';
import {getVariantUrl} from '~/utils';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `Strong | ${data?.product.title ?? ''}`},
    {
      name: 'description',
      content: data?.product.description ?? 'Premium Samoan Taro products',
    },
  ];
};

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&
      !option.name.startsWith('fbclid'),
  );

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option: SelectedOption) =>
        option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  const variants = storefront.query(VARIANTS_QUERY, {
    variables: {handle},
  });

  return defer({product, variants});
}

function redirectToFirstVariant({
  product,
  request,
}: {
  product: ProductFragment;
  request: Request;
}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

export default function Product() {
  const {product, variants} = useLoaderData<typeof loader>();
  const {selectedVariant} = product;
  
  return (
    <>
      <div className="product-page">
        <div className="container">
          <nav className="product-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/collections/all">Products</Link>
            <span>/</span>
            <span>{product.title}</span>
          </nav>
          
          <div className="product-layout">
            <ProductGallery 
              image={selectedVariant?.image} 
              title={product.title}
            />
            <ProductDetails
              selectedVariant={selectedVariant}
              product={product}
              variants={variants}
            />
          </div>
          
          <ProductBenefits />
          <ProductDescription description={product.descriptionHtml} />
        </div>
      </div>
      
      <style>{productStyles}</style>
    </>
  );
}

function ProductGallery({
  image,
  title,
}: {
  image: ProductVariantFragment['image'];
  title: string;
}) {
  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        {image ? (
          <Image
            alt={image.altText || title}
            aspectRatio="1/1"
            data={image}
            key={image.id}
            sizes="(min-width: 45em) 50vw, 100vw"
          />
        ) : (
          <div className="product-gallery-placeholder">
            <TaroIllustration />
          </div>
        )}
      </div>
      <div className="product-badges">
        <span className="product-badge badge-green">
          <GlutenFreeIcon />
          Gluten Free
        </span>
        <span className="product-badge badge-green">
          <LeafIcon />
          100% Natural
        </span>
        <span className="product-badge badge-coral">
          <SamoaIcon />
          Samoan Sourced
        </span>
      </div>
    </div>
  );
}

function ProductDetails({
  selectedVariant,
  product,
  variants,
}: {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedVariant'];
  variants: Promise<ProductVariantsQuery>;
}) {
  const {title} = product;
  
  return (
    <div className="product-details">
      <div className="product-details-header">
        <span className="product-vendor">{product.vendor || 'Strong'}</span>
        <h1 className="product-title">{title}</h1>
        <ProductPrice selectedVariant={selectedVariant} />
      </div>
      
      <div className="product-short-desc">
        <p>Premium Samoan taro, grown in volcanic soil and crafted with care. Perfect for the health-conscious consumer.</p>
      </div>
      
      <Suspense
        fallback={
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={[]}
          />
        }
      >
        <Await
          errorElement="There was a problem loading product variants"
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data.product?.variants.nodes || []}
            />
          )}
        </Await>
      </Suspense>
      
      <ProductFeatures />
    </div>
  );
}

function ProductPrice({
  selectedVariant,
}: {
  selectedVariant: ProductFragment['selectedVariant'];
}) {
  return (
    <div className="product-price-container">
      {selectedVariant?.compareAtPrice ? (
        <div className="product-price-sale">
          <span className="product-price-current">
            <Money data={selectedVariant.price} />
          </span>
          <span className="product-price-compare">
            <Money data={selectedVariant.compareAtPrice} />
          </span>
          <span className="product-sale-badge">Sale</span>
        </div>
      ) : (
        selectedVariant?.price && (
          <span className="product-price-current">
            <Money data={selectedVariant?.price} />
          </span>
        )
      )}
    </div>
  );
}

function ProductForm({
  product,
  selectedVariant,
  variants,
}: {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedVariant'];
  variants: Array<ProductVariantFragment>;
}) {
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscribe'>('one-time');
  const [frequency, setFrequency] = useState<'weekly' | 'fortnightly' | 'monthly'>('monthly');
  const [quantity, setQuantity] = useState(1);
  
  const basePrice = selectedVariant?.price ? parseFloat(selectedVariant.price.amount) : 0;
  const subscriptionDiscount = 0.15; // 15% off
  const subscriptionPrice = basePrice * (1 - subscriptionDiscount);
  
  return (
    <div className="product-form">
      {/* Variant Options */}
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      
      {/* Purchase Type Toggle */}
      <div className="purchase-type-toggle">
        <button
          className={`purchase-type-btn ${purchaseType === 'one-time' ? 'active' : ''}`}
          onClick={() => setPurchaseType('one-time')}
        >
          <span className="purchase-type-label">One-Time Purchase</span>
          <span className="purchase-type-price">
            ${basePrice.toFixed(2)}
          </span>
        </button>
        <button
          className={`purchase-type-btn subscribe ${purchaseType === 'subscribe' ? 'active' : ''}`}
          onClick={() => setPurchaseType('subscribe')}
        >
          <span className="purchase-type-badge">Save 15%</span>
          <span className="purchase-type-label">Subscribe & Save</span>
          <span className="purchase-type-price">
            ${subscriptionPrice.toFixed(2)}
          </span>
        </button>
      </div>
      
      {/* Subscription Frequency */}
      {purchaseType === 'subscribe' && (
        <div className="subscription-frequency">
          <label className="frequency-label">Delivery Frequency</label>
          <div className="frequency-options">
            <button
              className={`frequency-btn ${frequency === 'weekly' ? 'active' : ''}`}
              onClick={() => setFrequency('weekly')}
            >
              Weekly
            </button>
            <button
              className={`frequency-btn ${frequency === 'fortnightly' ? 'active' : ''}`}
              onClick={() => setFrequency('fortnightly')}
            >
              Fortnightly
            </button>
            <button
              className={`frequency-btn ${frequency === 'monthly' ? 'active' : ''}`}
              onClick={() => setFrequency('monthly')}
            >
              Monthly
            </button>
          </div>
          <div className="subscription-benefits">
            <div className="subscription-benefit">
              <CheckIcon />
              <span>Save 15% on every order</span>
            </div>
            <div className="subscription-benefit">
              <CheckIcon />
              <span>Cancel or pause anytime</span>
            </div>
            <div className="subscription-benefit">
              <CheckIcon />
              <span>Free shipping on all subscription orders</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Quantity Selector */}
      <div className="quantity-selector">
        <label className="quantity-label">Quantity</label>
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="quantity-value">{quantity}</span>
          <button 
            className="quantity-btn"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      
      {/* Add to Cart */}
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          window.location.href = window.location.href + '#cart-aside';
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: quantity,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale 
          ? purchaseType === 'subscribe' 
            ? 'Subscribe Now' 
            : 'Add to Cart'
          : 'Sold Out'
        }
      </AddToCartButton>
      
      <p className="product-guarantee">
        <ShieldIcon /> 30-day satisfaction guarantee
      </p>
    </div>
  );
}

function ProductOptions({option}: {option: VariantOption}) {
  return (
    <div className="product-options" key={option.name}>
      <label className="product-options-label">{option.name}</label>
      <div className="product-options-grid">
        {option.values.map(({value, isAvailable, isActive, to}) => {
          return (
            <Link
              className={`product-option-btn ${isActive ? 'active' : ''} ${!isAvailable ? 'unavailable' : ''}`}
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
            >
              {value}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ProductFeatures() {
  return (
    <div className="product-features">
      <div className="product-feature">
        <TruckIcon />
        <div>
          <strong>Free Shipping</strong>
          <span>On orders over $75 AUD</span>
        </div>
      </div>
      <div className="product-feature">
        <RefreshIcon />
        <div>
          <strong>Easy Returns</strong>
          <span>30-day return policy</span>
        </div>
      </div>
      <div className="product-feature">
        <HeartIcon />
        <div>
          <strong>Farm Direct</strong>
          <span>Sourced from Samoan families</span>
        </div>
      </div>
    </div>
  );
}

function ProductBenefits() {
  return (
    <div className="product-benefits-section">
      <h2>Why Choose Strong Taro?</h2>
      <div className="benefits-grid">
        <div className="benefit-card">
          <div className="benefit-icon"><ZapIcon /></div>
          <h3>High Protein</h3>
          <p>Natural plant-based protein to support your active lifestyle.</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon"><LeafBenefitIcon /></div>
          <h3>100% Natural</h3>
          <p>No artificial additives, preservatives, or sweeteners.</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon"><MountainBenefitIcon /></div>
          <h3>Volcanic Soil</h3>
          <p>Grown in nutrient-rich volcanic soil of Samoa.</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon"><HandsBenefitIcon /></div>
          <h3>Community Impact</h3>
          <p>Supporting Samoan farming families with every purchase.</p>
        </div>
      </div>
    </div>
  );
}

function ProductDescription({description}: {description: string}) {
  return (
    <div className="product-description-section">
      <h2>Product Details</h2>
      <div 
        className="product-description-content"
        dangerouslySetInnerHTML={{__html: description}} 
      />
    </div>
  );
}

function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: CartLineInput[];
  onClick?: () => void;
}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
            className="btn btn-primary btn-lg add-to-cart-btn"
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}

// Icons
function TaroIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="150" rx="60" ry="40" fill="#8B7355"/>
      <ellipse cx="100" cy="145" rx="55" ry="35" fill="#A08060"/>
      <path d="M100 30C120 50 130 80 120 110C110 90 100 70 100 50C100 70 90 90 80 110C70 80 80 50 100 30Z" fill="#3D5A3D"/>
      <path d="M100 40C115 55 122 75 115 100C107 85 100 65 100 50C100 65 93 85 85 100C78 75 85 55 100 40Z" fill="#4A6B4A"/>
    </svg>
  );
}

function GlutenFreeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C13.5 4 14 6 14 8C14 10 13 12 12 14C11 12 10 10 10 8C10 6 10.5 4 12 2Z"/>
      <circle cx="12" cy="12" r="10"/>
      <path d="M4 4L20 20"/>
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

function SamoaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/>
      <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/>
      <circle cx="7" cy="18" r="2"/>
      <path d="M15 18H9"/>
      <circle cx="17" cy="18" r="2"/>
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
      <path d="M8 16H3v5"/>
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function LeafBenefitIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

function MountainBenefitIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
      <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"/>
    </svg>
  );
}

function HandsBenefitIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

const productStyles = `
  .product-page {
    padding: var(--space-8) 0 var(--space-16);
    background: var(--strong-cream);
  }
  
  /* Breadcrumb */
  .product-breadcrumb {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin-bottom: var(--space-8);
  }
  
  .product-breadcrumb a {
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition-base);
  }
  
  .product-breadcrumb a:hover {
    color: var(--strong-black);
  }
  
  .product-breadcrumb span:last-child {
    color: var(--strong-black);
  }
  
  /* Product Layout */
  .product-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-8);
    margin-bottom: var(--space-16);
  }
  
  @media (min-width: 1024px) {
    .product-layout {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-12);
    }
  }
  
  /* Product Gallery */
  .product-gallery {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .product-gallery-main {
    background: var(--strong-white);
    border-radius: var(--radius-2xl);
    overflow: hidden;
    aspect-ratio: 1;
  }
  
  .product-gallery-main img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .product-gallery-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-12);
  }
  
  .product-gallery-placeholder svg {
    width: 60%;
    height: auto;
    opacity: 0.3;
  }
  
  .product-badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  
  .product-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
  }
  
  .badge-green {
    background: rgba(61, 90, 61, 0.1);
    color: var(--strong-leaf);
  }
  
  .badge-coral {
    background: rgba(255, 192, 108, 0.2);
    color: var(--strong-earth);
  }
  
  /* Product Details */
  .product-details {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }
  
  .product-details-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  
  .product-vendor {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-secondary);
  }
  
  .product-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0;
    line-height: 1.2;
  }
  
  @media (min-width: 768px) {
    .product-title {
      font-size: var(--text-4xl);
    }
  }
  
  .product-price-container {
    margin-top: var(--space-2);
  }
  
  .product-price-current {
    font-size: var(--text-2xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
  }
  
  .product-price-sale {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  
  .product-price-compare {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    text-decoration: line-through;
  }
  
  .product-sale-badge {
    background: var(--strong-secondary);
    color: var(--strong-black);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    text-transform: uppercase;
  }
  
  .product-short-desc {
    color: var(--color-text-muted);
    line-height: 1.7;
  }
  
  .product-short-desc p {
    margin: 0;
  }
  
  /* Product Form */
  .product-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }
  
  .product-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .product-options-label {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--strong-black);
  }
  
  .product-options-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  
  .product-option-btn {
    padding: var(--space-2) var(--space-4);
    border: 2px solid var(--strong-gray-light);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--strong-black);
    text-decoration: none;
    background: var(--strong-white);
    transition: all var(--transition-base);
  }
  
  .product-option-btn:hover {
    border-color: var(--strong-black);
  }
  
  .product-option-btn.active {
    border-color: var(--strong-black);
    background: var(--strong-black);
    color: var(--strong-white);
  }
  
  .product-option-btn.unavailable {
    opacity: 0.4;
    cursor: not-allowed;
  }
  
  /* Purchase Type Toggle */
  .purchase-type-toggle {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }
  
  .purchase-type-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-4);
    border: 2px solid var(--strong-gray-light);
    border-radius: var(--radius-xl);
    background: var(--strong-white);
    cursor: pointer;
    transition: all var(--transition-base);
    position: relative;
  }
  
  .purchase-type-btn:hover {
    border-color: var(--strong-black);
  }
  
  .purchase-type-btn.active {
    border-color: var(--strong-primary);
    background: rgba(194, 255, 82, 0.1);
  }
  
  .purchase-type-btn.subscribe.active {
    border-color: var(--strong-primary);
    background: var(--strong-primary);
  }
  
  .purchase-type-badge {
    position: absolute;
    top: -10px;
    right: var(--space-3);
    background: var(--strong-secondary);
    color: var(--strong-black);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-full);
    font-size: 10px;
    font-weight: var(--font-bold);
    text-transform: uppercase;
  }
  
  .purchase-type-label {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--strong-black);
  }
  
  .purchase-type-price {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: var(--strong-black);
  }
  
  /* Subscription Frequency */
  .subscription-frequency {
    background: var(--strong-white);
    border-radius: var(--radius-xl);
    padding: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .frequency-label {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--strong-black);
  }
  
  .frequency-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-2);
  }
  
  .frequency-btn {
    padding: var(--space-3);
    border: 2px solid var(--strong-gray-light);
    border-radius: var(--radius-lg);
    background: transparent;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    cursor: pointer;
    transition: all var(--transition-base);
  }
  
  .frequency-btn:hover {
    border-color: var(--strong-black);
  }
  
  .frequency-btn.active {
    border-color: var(--strong-black);
    background: var(--strong-black);
    color: var(--strong-white);
  }
  
  .subscription-benefits {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  
  .subscription-benefit {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--strong-leaf);
  }
  
  .subscription-benefit svg {
    flex-shrink: 0;
  }
  
  /* Quantity Selector */
  .quantity-selector {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }
  
  .quantity-label {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--strong-black);
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    background: var(--strong-white);
    border-radius: var(--radius-lg);
    padding: var(--space-1);
  }
  
  .quantity-btn {
    width: 36px;
    height: 36px;
    border: none;
    background: var(--strong-cream);
    border-radius: var(--radius-md);
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    cursor: pointer;
    transition: all var(--transition-base);
  }
  
  .quantity-btn:hover:not(:disabled) {
    background: var(--strong-primary);
  }
  
  .quantity-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  .quantity-value {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    min-width: 32px;
    text-align: center;
  }
  
  /* Add to Cart Button */
  .add-to-cart-btn {
    width: 100%;
    padding: var(--space-4) var(--space-8);
    font-size: var(--text-base);
  }
  
  .product-guarantee {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin: 0;
  }
  
  .product-guarantee svg {
    color: var(--strong-leaf);
  }
  
  /* Product Features */
  .product-features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    padding-top: var(--space-6);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .product-feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-2);
  }
  
  @media (min-width: 640px) {
    .product-feature {
      flex-direction: row;
      text-align: left;
    }
  }
  
  .product-feature svg {
    color: var(--strong-primary);
    flex-shrink: 0;
  }
  
  .product-feature strong {
    display: block;
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    color: var(--strong-black);
  }
  
  .product-feature span {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }
  
  /* Product Benefits Section */
  .product-benefits-section {
    margin-bottom: var(--space-16);
  }
  
  .product-benefits-section h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-black);
    text-align: center;
    margin-bottom: var(--space-8);
  }
  
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
  
  @media (min-width: 768px) {
    .benefits-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .benefit-card {
    background: var(--strong-white);
    padding: var(--space-6);
    border-radius: var(--radius-xl);
    text-align: center;
    transition: all var(--transition-base);
  }
  
  .benefit-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .benefit-icon {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-3);
  }
  
  .benefit-card h3 {
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-2);
  }
  
  .benefit-card p {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin: 0;
    line-height: 1.5;
  }
  
  /* Product Description Section */
  .product-description-section {
    background: var(--strong-white);
    padding: var(--space-8);
    border-radius: var(--radius-2xl);
  }
  
  .product-description-section h2 {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-6);
    padding-bottom: var(--space-4);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .product-description-content {
    color: var(--color-text);
    line-height: 1.8;
  }
  
  .product-description-content h1,
  .product-description-content h2,
  .product-description-content h3 {
    margin-top: var(--space-6);
  }
  
  .product-description-content ul,
  .product-description-content ol {
    padding-left: var(--space-6);
    margin: var(--space-4) 0;
  }
  
  .product-description-content li {
    margin-bottom: var(--space-2);
  }
`;

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
` as const;
