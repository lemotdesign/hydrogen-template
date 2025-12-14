import {Link} from '@remix-run/react';

export function StorySection() {
  return (
    <section className="story-section">
      <div className="container">
        <div className="story-grid">
          <div className="story-images">
            <div className="story-image story-image-1">
              <div className="story-image-placeholder">
                <span>Samoan Taro Fields</span>
              </div>
            </div>
            <div className="story-image story-image-2">
              <div className="story-image-placeholder">
                <span>Local Farmers</span>
              </div>
            </div>
            <div className="story-image story-image-3">
              <div className="story-image-placeholder">
                <span>Community</span>
              </div>
            </div>
          </div>
          
          <div className="story-content">
            <span className="story-label">Our Story</span>
            <h2 className="story-title">
              From Samoa's Volcanic Soil to Your Table
            </h2>
            <p className="story-description">
              For generations, Taro has been the heart of Samoan culture — 
              a sacred crop that sustained our ancestors and connected 
              communities across the Pacific.
            </p>
            <p className="story-description">
              At Strong, we're bringing this ancient superfood to the modern 
              world. By partnering directly with Samoan farmers, we ensure 
              fair trade practices while preserving traditional farming methods.
            </p>
            <div className="story-stats">
              <div className="story-stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Farming Families</span>
              </div>
              <div className="story-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Samoan Sourced</span>
              </div>
              <div className="story-stat">
                <span className="stat-number">3</span>
                <span className="stat-label">Generations</span>
              </div>
            </div>
            <Link to="/pages/our-story" className="btn btn-secondary">
              Read Our Full Story
            </Link>
          </div>
        </div>
      </div>
      
      <style>{storyStyles}</style>
    </section>
  );
}

const storyStyles = `
  .story-section {
    padding: var(--space-24) 0;
    background: var(--strong-white);
  }
  
  .story-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    align-items: center;
  }
  
  @media (min-width: 1024px) {
    .story-grid {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-16);
    }
  }
  
  /* Story Images Grid */
  .story-images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: var(--space-4);
    height: 400px;
  }
  
  @media (min-width: 768px) {
    .story-images {
      height: 500px;
    }
  }
  
  .story-image {
    border-radius: var(--radius-xl);
    overflow: hidden;
    position: relative;
  }
  
  .story-image-1 {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
  
  .story-image-2 {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  
  .story-image-3 {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  
  .story-image-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--strong-leaf) 0%, var(--strong-charcoal) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--strong-white);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .story-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Story Content */
  .story-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }
  
  .story-label {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-secondary);
  }
  
  .story-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    line-height: 1.2;
    color: var(--strong-black);
    margin: 0;
  }
  
  @media (min-width: 768px) {
    .story-title {
      font-size: var(--text-4xl);
    }
  }
  
  .story-description {
    font-size: var(--text-base);
    color: var(--color-text-muted);
    line-height: 1.8;
    margin: 0;
  }
  
  .story-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
    padding: var(--space-6) 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin: var(--space-4) 0;
  }
  
  .story-stat {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }
  
  .stat-number {
    font-size: var(--text-3xl);
    font-weight: var(--font-extrabold);
    color: var(--strong-primary);
    line-height: 1;
  }
  
  @media (min-width: 768px) {
    .stat-number {
      font-size: var(--text-4xl);
    }
  }
  
  .stat-label {
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
  }
`;

