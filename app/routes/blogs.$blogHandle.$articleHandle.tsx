import {json, type LoaderFunctionArgs} from '@netlify/remix-runtime';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `Strong | ${data?.article.title ?? ''}`},
    {
      name: 'description',
      content: data?.article.seo?.description || 'Read the latest from Strong - stories, recipes, and updates from our Samoan Taro journey.',
    },
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const {blog} = await context.storefront.query(ARTICLE_QUERY, {
    variables: {blogHandle, articleHandle},
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  const article = blog.articleByHandle;

  return json({article, blogHandle});
}

export default function Article() {
  const {article, blogHandle} = useLoaderData<typeof loader>();
  const {title, image, contentHtml, author} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <>
      <article className="article-page">
        {/* Article Header */}
        <header className="article-header">
          <div className="container container-narrow">
            <nav className="article-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to={`/blogs/${blogHandle}`}>Journal</Link>
              <span>/</span>
              <span>{title}</span>
            </nav>
            
            <div className="article-header-content">
              <span className="article-category">Journal</span>
              <h1 className="article-title">{title}</h1>
              <div className="article-meta">
                {author?.name && (
                  <>
                    <span className="article-author">By {author.name}</span>
                    <span className="article-meta-separator">•</span>
                  </>
                )}
                <time className="article-date">{publishedDate}</time>
              </div>
            </div>
          </div>
        </header>
        
        {/* Featured Image */}
        {image && (
          <div className="article-featured-image">
            <div className="container">
              <Image 
                data={image} 
                sizes="(min-width: 1024px) 1200px, 100vw" 
                loading="eager"
              />
            </div>
          </div>
        )}
        
        {/* Article Content */}
        <div className="article-content">
          <div className="container container-narrow">
            <div 
              className="article-body"
              dangerouslySetInnerHTML={{__html: contentHtml}}
            />
            
            {/* Share Links */}
            <div className="article-share">
              <span className="article-share-label">Share this article</span>
              <div className="article-share-links">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-share-link"
                  aria-label="Share on Twitter"
                >
                  <TwitterIcon />
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-share-link"
                  aria-label="Share on Facebook"
                >
                  <FacebookIcon />
                </a>
                <a 
                  href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  className="article-share-link"
                  aria-label="Share via Email"
                >
                  <EmailIcon />
                </a>
              </div>
            </div>
            
            {/* Author Box */}
            {author?.name && (
              <div className="article-author-box">
                <div className="article-author-avatar">
                  <span>{author.name.charAt(0)}</span>
                </div>
                <div className="article-author-info">
                  <span className="article-author-label">Written by</span>
                  <span className="article-author-name">{author.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Back to Blog */}
        <div className="article-footer">
          <div className="container container-narrow">
            <Link to={`/blogs/${blogHandle}`} className="btn btn-outline">
              <ArrowLeftIcon />
              Back to Journal
            </Link>
          </div>
        </div>
      </article>
      
      <style>{articleStyles}</style>
    </>
  );
}

// Icons
function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7"/>
      <path d="M19 12H5"/>
    </svg>
  );
}

const articleStyles = `
  .article-page {
    background: var(--strong-white);
  }
  
  /* Article Header */
  .article-header {
    padding: var(--space-8) 0 var(--space-12);
    background: var(--strong-cream);
  }
  
  .article-breadcrumb {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin-bottom: var(--space-8);
    flex-wrap: wrap;
  }
  
  .article-breadcrumb a {
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition-base);
  }
  
  .article-breadcrumb a:hover {
    color: var(--strong-black);
  }
  
  .article-header-content {
    text-align: center;
  }
  
  .article-category {
    display: inline-block;
    background: var(--strong-primary);
    color: var(--strong-black);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-4);
  }
  
  .article-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-4);
    line-height: 1.2;
  }
  
  @media (min-width: 768px) {
    .article-title {
      font-size: var(--text-4xl);
    }
  }
  
  @media (min-width: 1024px) {
    .article-title {
      font-size: var(--text-5xl);
    }
  }
  
  .article-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    flex-wrap: wrap;
  }
  
  .article-meta-separator {
    color: var(--strong-gray-light);
  }
  
  .article-author {
    font-weight: var(--font-medium);
    color: var(--strong-black);
  }
  
  /* Featured Image */
  .article-featured-image {
    margin-top: calc(-1 * var(--space-6));
  }
  
  .article-featured-image img {
    width: 100%;
    max-height: 600px;
    object-fit: cover;
    border-radius: var(--radius-2xl);
  }
  
  /* Article Content */
  .article-content {
    padding: var(--space-12) 0;
  }
  
  .article-body {
    font-size: var(--text-lg);
    line-height: 1.8;
    color: var(--color-text);
  }
  
  .article-body > *:first-child {
    margin-top: 0;
  }
  
  .article-body h1,
  .article-body h2,
  .article-body h3,
  .article-body h4,
  .article-body h5,
  .article-body h6 {
    margin-top: var(--space-8);
    margin-bottom: var(--space-4);
  }
  
  .article-body h2 {
    font-size: var(--text-2xl);
  }
  
  .article-body h3 {
    font-size: var(--text-xl);
  }
  
  .article-body p {
    margin-bottom: var(--space-6);
  }
  
  .article-body a {
    color: var(--strong-secondary);
    text-decoration: underline;
  }
  
  .article-body a:hover {
    color: var(--strong-secondary-dark);
  }
  
  .article-body img {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    margin: var(--space-8) 0;
  }
  
  .article-body ul,
  .article-body ol {
    padding-left: var(--space-6);
    margin-bottom: var(--space-6);
  }
  
  .article-body li {
    margin-bottom: var(--space-2);
  }
  
  .article-body blockquote {
    border-left: 4px solid var(--strong-primary);
    padding-left: var(--space-6);
    margin: var(--space-8) 0;
    font-style: italic;
    color: var(--color-text-muted);
  }
  
  /* Share Links */
  .article-share {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-6) 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: var(--space-8);
  }
  
  .article-share-label {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--strong-black);
  }
  
  .article-share-links {
    display: flex;
    gap: var(--space-2);
  }
  
  .article-share-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    background: var(--strong-cream);
    color: var(--color-text);
    transition: all var(--transition-base);
  }
  
  .article-share-link:hover {
    background: var(--strong-primary);
    color: var(--strong-black);
  }
  
  /* Author Box */
  .article-author-box {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-6);
    background: var(--strong-cream);
    border-radius: var(--radius-xl);
    margin-top: var(--space-8);
  }
  
  .article-author-avatar {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-full);
    background: var(--strong-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--strong-black);
    flex-shrink: 0;
  }
  
  .article-author-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }
  
  .article-author-label {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .article-author-name {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: var(--strong-black);
  }
  
  /* Article Footer */
  .article-footer {
    padding: var(--space-8) 0 var(--space-16);
    text-align: center;
  }
  
  .article-footer .btn {
    display: inline-flex;
    gap: var(--space-2);
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
` as const;
