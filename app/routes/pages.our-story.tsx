import {type MetaFunction} from '@remix-run/react';
import {Link} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    {title: 'Strong | Our Story'},
    {
      name: 'description',
      content: 'The story of Strong - bringing the volcanic strength of Samoan Taro to tables worldwide while uplifting farming communities.',
    },
  ];
};

export default function OurStoryPage() {
  return (
    <>
      <div className="story-page">
        {/* Hero Section */}
        <section className="story-hero">
          <div className="story-hero-background">
            <div className="story-hero-overlay"></div>
          </div>
          <div className="container">
            <div className="story-hero-content">
              <span className="story-hero-label">Our Story</span>
              <h1 className="story-hero-title">
                From Samoa's Volcanic Soil<br />
                <span className="highlight-yellow">To Your Table</span>
              </h1>
              <p className="story-hero-description">
                Strong is more than a brand. It's a movement to bring the ancient 
                superfood of our ancestors to the modern health market while 
                uplifting Samoan farming families.
              </p>
            </div>
          </div>
        </section>
        
        {/* Origin Section */}
        <section className="story-origin">
          <div className="container">
            <div className="story-origin-grid">
              <div className="story-origin-images">
                <div className="story-origin-image main">
                  <div className="story-image-placeholder">
                    <MountainIcon />
                    <p>Volcanic Landscape</p>
                  </div>
                </div>
                <div className="story-origin-image secondary">
                  <div className="story-image-placeholder">
                    <LeafSmallIcon />
                    <p>Taro Fields</p>
                  </div>
                </div>
              </div>
              <div className="story-origin-content">
                <span className="story-section-label">The Beginning</span>
                <h2>Rooted in Tradition</h2>
                <p>
                  For thousands of years, Taro has been the heart of Samoan culture — 
                  a sacred crop that sustained our ancestors and connected communities 
                  across the Pacific. Grown in the nutrient-rich volcanic soils of our 
                  islands, Taro was more than food; it was medicine, ceremony, and identity.
                </p>
                <p>
                  Strong was born from a simple question: How can we share this incredible 
                  gift with the world while honoring its origins and the people who cultivate it?
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="story-mission">
          <div className="container">
            <div className="story-mission-content">
              <span className="story-section-label">Our Mission</span>
              <h2>Uplifting Communities Through Taro</h2>
              <p className="mission-text">
                We believe in the power of sustainable agriculture to transform lives. 
                Every Strong product represents a direct partnership with Samoan farming 
                families, fair wages, and a commitment to preserving traditional farming 
                methods for future generations.
              </p>
              <div className="mission-pillars">
                <div className="mission-pillar">
                  <div className="pillar-icon"><SeedlingIcon /></div>
                  <h3>Sustainable Farming</h3>
                  <p>Working with nature, not against it. Our farmers use traditional methods passed down through generations.</p>
                </div>
                <div className="mission-pillar">
                  <div className="pillar-icon"><HandshakeIcon /></div>
                  <h3>Fair Trade</h3>
                  <p>Direct partnerships with farming families ensure fair compensation and community investment.</p>
                </div>
                <div className="mission-pillar">
                  <div className="pillar-icon"><HeartHandIcon /></div>
                  <h3>Health Innovation</h3>
                  <p>Transforming ancient wisdom into modern nutrition products for health-conscious consumers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Journey Section */}
        <section className="story-journey">
          <div className="container">
            <div className="journey-header">
              <span className="story-section-label">The Journey</span>
              <h2>From Farm to Product</h2>
            </div>
            <div className="journey-steps">
              <div className="journey-step">
                <div className="journey-step-number">01</div>
                <div className="journey-step-content">
                  <h3>Cultivation</h3>
                  <p>Taro is carefully grown in volcanic soil by our partner families using traditional Samoan methods passed down through generations.</p>
                </div>
              </div>
              <div className="journey-step">
                <div className="journey-step-number">02</div>
                <div className="journey-step-content">
                  <h3>Harvest</h3>
                  <p>Each taro root is hand-harvested at peak ripeness, ensuring maximum nutrition and flavor in every batch.</p>
                </div>
              </div>
              <div className="journey-step">
                <div className="journey-step-number">03</div>
                <div className="journey-step-content">
                  <h3>Processing</h3>
                  <p>In our HACCP-certified facilities, taro is cleaned, processed, and transformed while preserving its nutritional integrity.</p>
                </div>
              </div>
              <div className="journey-step">
                <div className="journey-step-number">04</div>
                <div className="journey-step-content">
                  <h3>Your Table</h3>
                  <p>The finished product reaches you — bringing the strength of Samoan taro to your daily wellness routine.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="story-team">
          <div className="container">
            <div className="team-header">
              <span className="story-section-label">The People</span>
              <h2>Meet The Farmers</h2>
              <p>Behind every Strong product are the dedicated farming families of Samoa who make this possible.</p>
            </div>
            <div className="team-grid">
              <div className="team-card">
                <div className="team-image">
                  <div className="team-image-placeholder"><UserIcon /></div>
                </div>
                <h3>The Aiga Family</h3>
                <p>Third-generation taro farmers from Savai'i, the Aiga family has been cultivating taro for over 60 years.</p>
              </div>
              <div className="team-card">
                <div className="team-image">
                  <div className="team-image-placeholder"><UserIcon /></div>
                </div>
                <h3>The Tui Family</h3>
                <p>Leaders in sustainable farming practices, the Tui family operates one of the largest organic taro farms in Samoa.</p>
              </div>
              <div className="team-card">
                <div className="team-image">
                  <div className="team-image-placeholder"><UsersIcon /></div>
                </div>
                <h3>The Manu Family</h3>
                <p>A young farming family bringing innovation while respecting tradition, pioneering new cultivation techniques.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="story-cta">
          <div className="container">
            <div className="story-cta-content">
              <h2>Join the Strong Family</h2>
              <p>
                Experience the power of Samoan Taro for yourself. Every purchase 
                supports our mission to uplift farming communities.
              </p>
              <div className="story-cta-actions">
                <Link to="/collections/all" className="btn btn-primary btn-lg">
                  Shop Products
                </Link>
                <Link to="/blogs/journal" className="btn btn-outline btn-lg">
                  Read Our Journal
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <style>{storyPageStyles}</style>
    </>
  );
}

// Icons
function LeafSmallIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

function MountainIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
      <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"/>
    </svg>
  );
}

function SeedlingIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 10a4 4 0 0 0 4-4V2H8v4a4 4 0 0 0 4 4Z"/>
      <path d="M12 10v12"/>
      <path d="M8 22h8"/>
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
      <path d="m21 3 1 11h-2"/>
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
      <path d="M3 4h8"/>
    </svg>
  );
}

function HeartHandIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/>
      <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/>
      <path d="m2 15 6 6"/>
      <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12l3.5-3.5z"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5"/>
      <path d="M20 21a8 8 0 0 0-16 0"/>
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

const storyPageStyles = `
  .story-page {
    background: var(--strong-cream);
  }
  
  .story-section-label {
    display: inline-block;
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-secondary);
    margin-bottom: var(--space-3);
  }
  
  /* Hero Section */
  .story-hero {
    position: relative;
    min-height: 80vh;
    display: flex;
    align-items: center;
    background: var(--strong-charcoal);
    overflow: hidden;
  }
  
  .story-hero-background {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--strong-leaf) 0%, var(--strong-charcoal) 100%);
  }
  
  .story-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
  }
  
  .story-hero .container {
    position: relative;
    z-index: 1;
  }
  
  .story-hero-content {
    max-width: 800px;
    text-align: center;
    margin: 0 auto;
    padding: var(--space-16) 0;
  }
  
  .story-hero-label {
    display: inline-block;
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-primary);
    margin-bottom: var(--space-4);
  }
  
  .story-hero-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-extrabold);
    color: var(--strong-white);
    margin: 0 0 var(--space-6);
    line-height: 1.1;
  }
  
  @media (min-width: 768px) {
    .story-hero-title {
      font-size: var(--text-5xl);
    }
  }
  
  @media (min-width: 1024px) {
    .story-hero-title {
      font-size: var(--text-6xl);
    }
  }
  
  .story-hero-description {
    font-size: var(--text-lg);
    color: var(--strong-gray-light);
    line-height: 1.7;
    margin: 0;
  }
  
  @media (min-width: 768px) {
    .story-hero-description {
      font-size: var(--text-xl);
    }
  }
  
  /* Origin Section */
  .story-origin {
    padding: var(--space-20) 0;
    background: var(--strong-white);
  }
  
  .story-origin-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-10);
    align-items: center;
  }
  
  @media (min-width: 1024px) {
    .story-origin-grid {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-16);
    }
  }
  
  .story-origin-images {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
  }
  
  .story-origin-image {
    border-radius: var(--radius-xl);
    overflow: hidden;
  }
  
  .story-origin-image.main {
    grid-row: span 2;
    aspect-ratio: 3/4;
  }
  
  .story-origin-image.secondary {
    aspect-ratio: 1;
  }
  
  .story-image-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--strong-leaf) 0%, var(--strong-earth) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    color: var(--strong-white);
    padding: var(--space-4);
  }
  
  .story-image-placeholder span {
    font-size: var(--text-4xl);
  }
  
  .story-image-placeholder p {
    font-size: var(--text-sm);
    margin: 0;
    text-align: center;
  }
  
  .story-origin-content h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-6);
  }
  
  @media (min-width: 768px) {
    .story-origin-content h2 {
      font-size: var(--text-4xl);
    }
  }
  
  .story-origin-content p {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    line-height: 1.8;
    margin: 0 0 var(--space-4);
  }
  
  /* Mission Section */
  .story-mission {
    padding: var(--space-20) 0;
    background: var(--strong-cream);
  }
  
  .story-mission-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .story-mission-content h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-6);
  }
  
  @media (min-width: 768px) {
    .story-mission-content h2 {
      font-size: var(--text-4xl);
    }
  }
  
  .mission-text {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    line-height: 1.8;
    margin: 0 0 var(--space-12);
  }
  
  .mission-pillars {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
  
  @media (min-width: 768px) {
    .mission-pillars {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .mission-pillar {
    background: var(--strong-white);
    padding: var(--space-8);
    border-radius: var(--radius-xl);
    text-align: center;
  }
  
  .pillar-icon {
    font-size: var(--text-4xl);
    margin-bottom: var(--space-4);
  }
  
  .mission-pillar h3 {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--strong-black);
    margin: 0 0 var(--space-3);
  }
  
  .mission-pillar p {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    line-height: 1.6;
    margin: 0;
  }
  
  /* Journey Section */
  .story-journey {
    padding: var(--space-20) 0;
    background: var(--strong-charcoal);
    color: var(--strong-white);
  }
  
  .journey-header {
    text-align: center;
    margin-bottom: var(--space-12);
  }
  
  .journey-header h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--strong-white);
    margin: 0;
  }
  
  @media (min-width: 768px) {
    .journey-header h2 {
      font-size: var(--text-4xl);
    }
  }
  
  .journey-steps {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
    max-width: 800px;
    margin: 0 auto;
  }
  
  @media (min-width: 768px) {
    .journey-steps {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-8);
    }
  }
  
  .journey-step {
    display: flex;
    gap: var(--space-4);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
  }
  
  .journey-step-number {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--strong-primary);
    line-height: 1;
    flex-shrink: 0;
  }
  
  .journey-step-content h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: var(--strong-white);
    margin: 0 0 var(--space-2);
  }
  
  .journey-step-content p {
    font-size: var(--text-sm);
    color: var(--strong-gray-light);
    line-height: 1.6;
    margin: 0;
  }
  
  /* Team Section */
  .story-team {
    padding: var(--space-20) 0;
    background: var(--strong-white);
  }
  
  .team-header {
    text-align: center;
    margin-bottom: var(--space-12);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .team-header h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-4);
  }
  
  @media (min-width: 768px) {
    .team-header h2 {
      font-size: var(--text-4xl);
    }
  }
  
  .team-header p {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    margin: 0;
  }
  
  .team-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  @media (min-width: 768px) {
    .team-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .team-card {
    background: var(--strong-cream);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    text-align: center;
    transition: all var(--transition-base);
  }
  
  .team-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .team-image {
    width: 100px;
    height: 100px;
    margin: 0 auto var(--space-4);
    border-radius: var(--radius-full);
    overflow: hidden;
    background: var(--strong-primary);
  }
  
  .team-image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-4xl);
  }
  
  .team-card h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: var(--strong-black);
    margin: 0 0 var(--space-2);
  }
  
  .team-card p {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    line-height: 1.6;
    margin: 0;
  }
  
  /* CTA Section */
  .story-cta {
    padding: var(--space-16) 0;
    background: var(--strong-primary);
  }
  
  .story-cta-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .story-cta h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-4);
  }
  
  @media (min-width: 768px) {
    .story-cta h2 {
      font-size: var(--text-4xl);
    }
  }
  
  .story-cta p {
    font-size: var(--text-lg);
    color: var(--strong-charcoal);
    margin: 0 0 var(--space-8);
    line-height: 1.7;
  }
  
  .story-cta-actions {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    justify-content: center;
  }
  
  @media (min-width: 640px) {
    .story-cta-actions {
      flex-direction: row;
    }
  }
`;

