import {Link} from '@remix-run/react';

export function BlogSection() {
  // Placeholder blog posts - will be replaced with Shopify blog data
  const posts = [
    {
      id: '1',
      title: '5 Easy Taro Protein Smoothie Recipes',
      excerpt: 'Discover delicious ways to incorporate taro protein into your daily routine with these simple, nutritious smoothie recipes.',
      category: 'Recipes',
      date: 'Dec 10, 2024',
      image: null,
      handle: 'taro-protein-smoothie-recipes',
    },
    {
      id: '2',
      title: 'The Health Benefits of Samoan Taro',
      excerpt: 'Learn why taro has been a staple in Pacific Island diets for thousands of years and how it can benefit your health.',
      category: 'Wellness',
      date: 'Dec 5, 2024',
      image: null,
      handle: 'health-benefits-samoan-taro',
    },
    {
      id: '3',
      title: 'Meet the Farmers: Aiga Family Story',
      excerpt: 'Go behind the scenes and meet one of the farming families who grow our organic taro in the volcanic soils of Samoa.',
      category: 'Community',
      date: 'Nov 28, 2024',
      image: null,
      handle: 'meet-the-farmers-aiga-family',
    },
  ];

  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-header">
          <div className="blog-header-content">
            <span className="blog-label">Journal</span>
            <h2 className="blog-title">
              Stories, Recipes & Updates
            </h2>
          </div>
          <Link to="/blogs/journal" className="btn btn-outline blog-view-all">
            View All Posts
          </Link>
        </div>
        
        <div className="blog-grid">
          {posts.map((post, index) => (
            <Link 
              key={post.id}
              to={`/blogs/journal/${post.handle}`}
              className={`blog-card ${index === 0 ? 'blog-card-featured' : ''}`}
            >
              <div className="blog-card-image">
                <div className="blog-card-image-placeholder">
                  {index === 0 && <RecipeIcon />}
                  {index === 1 && <WellnessIcon />}
                  {index === 2 && <CommunityIcon />}
                </div>
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-card-category">{post.category}</span>
                  <span className="blog-card-date">{post.date}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <span className="blog-card-link">
                  Read More
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <style>{blogStyles}</style>
    </section>
  );
}

// Icons
function RecipeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
      <line x1="6" x2="18" y1="17" y2="17"/>
    </svg>
  );
}

function WellnessIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

const blogStyles = `
  .blog-section {
    padding: var(--space-24) 0;
    background: var(--strong-white);
  }
  
  .blog-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-bottom: var(--space-10);
  }
  
  @media (min-width: 768px) {
    .blog-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
  
  .blog-label {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-secondary);
    display: block;
    margin-bottom: var(--space-2);
  }
  
  .blog-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    line-height: 1.2;
    margin: 0;
    color: var(--strong-black);
  }
  
  @media (min-width: 768px) {
    .blog-title {
      font-size: var(--text-4xl);
    }
  }
  
  .blog-view-all {
    flex-shrink: 0;
  }
  
  /* Blog Grid */
  .blog-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  @media (min-width: 768px) {
    .blog-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  @media (min-width: 1024px) {
    .blog-grid {
      grid-template-columns: 1.5fr 1fr 1fr;
    }
  }
  
  /* Blog Card */
  .blog-card {
    display: flex;
    flex-direction: column;
    background: var(--strong-cream);
    border-radius: var(--radius-xl);
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: all var(--transition-base);
  }
  
  .blog-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
  
  .blog-card-featured {
    grid-row: span 1;
  }
  
  @media (min-width: 768px) {
    .blog-card-featured {
      grid-row: span 2;
    }
  }
  
  .blog-card-image {
    aspect-ratio: 16/9;
    overflow: hidden;
  }
  
  .blog-card-featured .blog-card-image {
    aspect-ratio: 4/3;
  }
  
  @media (min-width: 768px) {
    .blog-card-featured .blog-card-image {
      aspect-ratio: auto;
      flex: 1;
    }
  }
  
  .blog-card-image-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--strong-leaf) 0%, var(--strong-charcoal) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--strong-white);
    opacity: 0.8;
  }
  
  .blog-card-content {
    padding: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    flex-grow: 1;
  }
  
  .blog-card-featured .blog-card-content {
    padding: var(--space-6);
  }
  
  .blog-card-meta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-xs);
  }
  
  .blog-card-category {
    background: var(--strong-primary);
    color: var(--strong-black);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .blog-card-date {
    color: var(--color-text-muted);
  }
  
  .blog-card-title {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    margin: 0;
    line-height: 1.3;
    color: var(--strong-black);
  }
  
  .blog-card-featured .blog-card-title {
    font-size: var(--text-xl);
  }
  
  @media (min-width: 768px) {
    .blog-card-featured .blog-card-title {
      font-size: var(--text-2xl);
    }
  }
  
  .blog-card-excerpt {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    line-height: 1.6;
    margin: 0;
    flex-grow: 1;
  }
  
  .blog-card-link {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--strong-black);
    transition: gap var(--transition-base);
  }
  
  .blog-card:hover .blog-card-link {
    gap: var(--space-3);
  }
`;

