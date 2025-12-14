import {json, type LoaderFunctionArgs} from '@netlify/remix-runtime';
import {Link, useLoaderData, type MetaFunction} from '@remix-run/react';
import {Image, Pagination, getPaginationVariables} from '@shopify/hydrogen';
import type {ArticleItemFragment} from 'storefrontapi.generated';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `Strong | ${data?.blog.title ?? 'Journal'}`},
    {
      name: 'description',
      content: 'Stories, recipes, updates, and insights from the Strong community. Discover the world of Samoan Taro.',
    },
  ];
};

export const loader = async ({
  request,
  params,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 9,
  });

  if (!params.blogHandle) {
    throw new Response(`blog not found`, {status: 404});
  }

  const {blog} = await storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle: params.blogHandle,
      ...paginationVariables,
    },
  });

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  return json({blog});
};

export default function Blog() {
  const {blog} = useLoaderData<typeof loader>();
  const {articles} = blog;

  return (
    <>
      <div className="blog-page">
        {/* Hero Section */}
        <section className="blog-hero">
          <div className="container">
            <span className="blog-hero-label">Our Journal</span>
            <h1 className="blog-hero-title">{blog.title}</h1>
            <p className="blog-hero-description">
              Stories, recipes, and updates from the world of Strong. 
              Follow our journey bringing Samoan Taro to tables worldwide.
            </p>
            
            {/* Category filters */}
            <div className="blog-categories">
              <button className="category-btn active">All Posts</button>
              <button className="category-btn">Recipes</button>
              <button className="category-btn">Wellness</button>
              <button className="category-btn">Community</button>
              <button className="category-btn">Updates</button>
            </div>
          </div>
        </section>
        
        {/* Articles Grid */}
        <section className="blog-content">
          <div className="container">
            <Pagination connection={articles}>
              {({nodes, isLoading, PreviousLink, NextLink}) => {
                return (
                  <>
                    <PreviousLink className="pagination-link pagination-link-prev">
                      {isLoading ? (
                        <span className="pagination-loading">Loading...</span>
                      ) : (
                        <span className="pagination-btn">
                          <ArrowUpIcon /> Load previous posts
                        </span>
                      )}
                    </PreviousLink>
                    
                    <div className="blog-articles-grid">
                      {nodes.map((article, index) => {
                        return (
                          <ArticleItem
                            article={article}
                            key={article.id}
                            loading={index < 3 ? 'eager' : 'lazy'}
                            featured={index === 0}
                          />
                        );
                      })}
                    </div>
                    
                    <NextLink className="pagination-link pagination-link-next">
                      {isLoading ? (
                        <span className="pagination-loading">Loading...</span>
                      ) : (
                        <span className="btn btn-outline pagination-btn-load">
                          Load more posts <ArrowDownIcon />
                        </span>
                      )}
                    </NextLink>
                  </>
                );
              }}
            </Pagination>
          </div>
        </section>
        
        {/* Newsletter CTA */}
        <section className="blog-newsletter">
          <div className="container">
            <div className="blog-newsletter-content">
              <h2>Stay in the Loop</h2>
              <p>Get our latest recipes, updates, and 10% off your first order.</p>
              <form className="blog-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn btn-secondary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      
      <style>{blogStyles}</style>
    </>
  );
}

function ArticleItem({
  article,
  loading,
  featured = false,
}: {
  article: ArticleItemFragment;
  loading?: HTMLImageElement['loading'];
  featured?: boolean;
}) {
  const publishedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(article.publishedAt!));
  
  // Extract category from tags or default
  const category = 'Journal';
  
  return (
    <article className={`blog-article-card ${featured ? 'featured' : ''}`}>
      <Link to={`/blogs/${article.blog.handle}/${article.handle}`}>
        <div className="blog-article-image">
          {article.image ? (
            <Image
              alt={article.image.altText || article.title}
              aspectRatio={featured ? '16/9' : '4/3'}
              data={article.image}
              loading={loading}
              sizes={featured ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
            />
          ) : (
            <div className="blog-article-placeholder">
              <JournalIcon />
            </div>
          )}
        </div>
        <div className="blog-article-content">
          <div className="blog-article-meta">
            <span className="blog-article-category">{category}</span>
            <span className="blog-article-date">{publishedAt}</span>
          </div>
          <h3 className="blog-article-title">{article.title}</h3>
          {featured && article.contentHtml && (
            <p className="blog-article-excerpt">
              {stripHtml(article.contentHtml).substring(0, 150)}...
            </p>
          )}
          <span className="blog-article-link">
            Read Article
            <ArrowRightIcon />
          </span>
        </div>
      </Link>
    </article>
  );
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
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

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

function JournalIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      <path d="M8 7h8"/>
      <path d="M8 11h6"/>
    </svg>
  );
}

const blogStyles = `
  .blog-page {
    background: var(--strong-cream);
  }
  
  /* Blog Hero */
  .blog-hero {
    padding: var(--space-16) 0 var(--space-12);
    text-align: center;
  }
  
  .blog-hero-label {
    display: inline-block;
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-secondary);
    margin-bottom: var(--space-3);
  }
  
  .blog-hero-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-4);
    line-height: 1.2;
  }
  
  @media (min-width: 768px) {
    .blog-hero-title {
      font-size: var(--text-5xl);
    }
  }
  
  .blog-hero-description {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    max-width: 600px;
    margin: 0 auto var(--space-8);
    line-height: 1.7;
  }
  
  /* Category Filters */
  .blog-categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-2);
  }
  
  .category-btn {
    padding: var(--space-2) var(--space-4);
    border: 2px solid var(--strong-gray-light);
    border-radius: var(--radius-full);
    background: transparent;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--color-text-muted);
    cursor: pointer;
    transition: all var(--transition-base);
  }
  
  .category-btn:hover {
    border-color: var(--strong-black);
    color: var(--strong-black);
  }
  
  .category-btn.active {
    border-color: var(--strong-black);
    background: var(--strong-black);
    color: var(--strong-white);
  }
  
  /* Blog Content */
  .blog-content {
    padding: var(--space-8) 0 var(--space-16);
  }
  
  /* Articles Grid */
  .blog-articles-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
    margin-bottom: var(--space-8);
  }
  
  @media (min-width: 768px) {
    .blog-articles-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .blog-articles-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  /* Article Card */
  .blog-article-card {
    background: var(--strong-white);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: all var(--transition-base);
  }
  
  .blog-article-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
  
  .blog-article-card a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .blog-article-card.featured {
    grid-column: 1 / -1;
  }
  
  @media (min-width: 768px) {
    .blog-article-card.featured {
      grid-column: span 2;
    }
    
    .blog-article-card.featured a {
      flex-direction: row;
    }
    
    .blog-article-card.featured .blog-article-image {
      flex: 1;
      aspect-ratio: auto;
      min-height: 300px;
    }
    
    .blog-article-card.featured .blog-article-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  
  .blog-article-image {
    aspect-ratio: 4/3;
    overflow: hidden;
    background: linear-gradient(135deg, var(--strong-leaf) 0%, var(--strong-charcoal) 100%);
  }
  
  .blog-article-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }
  
  .blog-article-card:hover .blog-article-image img {
    transform: scale(1.05);
  }
  
  .blog-article-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--strong-white);
    opacity: 0.5;
  }
  
  .blog-article-content {
    padding: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    flex-grow: 1;
  }
  
  .blog-article-card.featured .blog-article-content {
    padding: var(--space-8);
  }
  
  .blog-article-meta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-xs);
  }
  
  .blog-article-category {
    background: var(--strong-primary);
    color: var(--strong-black);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .blog-article-date {
    color: var(--color-text-muted);
  }
  
  .blog-article-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    line-height: 1.3;
    color: var(--strong-black);
    margin: 0;
  }
  
  .blog-article-card.featured .blog-article-title {
    font-size: var(--text-2xl);
  }
  
  @media (min-width: 768px) {
    .blog-article-card.featured .blog-article-title {
      font-size: var(--text-3xl);
    }
  }
  
  .blog-article-excerpt {
    color: var(--color-text-muted);
    font-size: var(--text-base);
    line-height: 1.6;
    margin: 0;
    flex-grow: 1;
  }
  
  .blog-article-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--strong-black);
    transition: gap var(--transition-base);
  }
  
  .blog-article-card:hover .blog-article-link {
    gap: var(--space-3);
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
  
  /* Newsletter Section */
  .blog-newsletter {
    background: var(--strong-primary);
    padding: var(--space-12) 0;
  }
  
  .blog-newsletter-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .blog-newsletter h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-3);
  }
  
  .blog-newsletter p {
    color: var(--strong-charcoal);
    margin: 0 0 var(--space-6);
  }
  
  .blog-newsletter-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  
  @media (min-width: 640px) {
    .blog-newsletter-form {
      flex-direction: row;
      justify-content: center;
    }
  }
  
  .blog-newsletter-form .newsletter-input {
    padding: var(--space-3) var(--space-4);
    border: 2px solid var(--strong-black);
    border-radius: var(--radius-full);
    font-size: var(--text-base);
    background: var(--strong-white);
    min-width: 280px;
  }
  
  .blog-newsletter-form .newsletter-input:focus {
    outline: none;
    border-color: var(--strong-charcoal);
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
          startCursor
        }

      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
` as const;
