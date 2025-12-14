import {defer, type LoaderFunctionArgs} from '@netlify/remix-runtime';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {
  HeroSection,
  StorySection,
  ProductsShowcase,
  ServicesSection,
  BlogSection,
} from '~/components/home';

export const meta: MetaFunction = () => {
  return [
    {title: 'Strong | Samoan Taro Products'},
    {
      name: 'description',
      content: 'Discover the power of Samoan Taro — nature\'s original superfood, refined into premium protein, flour, and milk tea for the health-conscious consumer.',
    },
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  
  // Fetch recommended products
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({recommendedProducts});
}

export default function Homepage() {
  const {recommendedProducts} = useLoaderData<typeof loader>();
  
  return (
    <div className="homepage">
      <HeroSection />
      <StorySection />
      <ProductsShowcase products={recommendedProducts} />
      <ServicesSection />
      <BlogSection />
    </div>
  );
}

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
