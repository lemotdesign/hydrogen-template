import {Link} from '@remix-run/react';

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <picture className="hero-bg-picture">
          <source 
            media="(max-width: 640px)" 
            srcSet="/images/hero/hero-640w.webp"
            type="image/webp"
          />
          <source 
            media="(max-width: 640px)" 
            srcSet="/images/hero/hero-640w.jpg"
            type="image/jpeg"
          />
          <source 
            media="(max-width: 1024px)" 
            srcSet="/images/hero/hero-1024w.webp"
            type="image/webp"
          />
          <source 
            media="(max-width: 1024px)" 
            srcSet="/images/hero/hero-1024w.jpg"
            type="image/jpeg"
          />
          <source 
            media="(max-width: 1920px)" 
            srcSet="/images/hero/hero-1920w.webp"
            type="image/webp"
          />
          <source 
            media="(max-width: 1920px)" 
            srcSet="/images/hero/hero-1920w.jpg"
            type="image/jpeg"
          />
          <source 
            srcSet="/images/hero/hero-full.webp"
            type="image/webp"
          />
          <img 
            src="/images/hero/hero-full.jpg" 
            alt="Samoan taro fields with volcanic mountains" 
            className="hero-bg-image"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <LeafIcon />
            <span>From the volcanic soils of Samoa</span>
          </div>
          
          <h1 className="hero-title">
            Ancient Roots.<br />
            <span className="highlight-yellow">Modern Strength.</span>
          </h1>
          
          <p className="hero-description">
            Discover the power of Samoan Taro — nature's original superfood, 
            refined into premium protein, flour, and milk tea for the 
            health-conscious consumer.
          </p>
          
          <div className="hero-actions">
            <Link to="/collections/all" className="btn btn-primary btn-lg">
              Shop Products
            </Link>
            <Link to="/pages/our-story" className="btn btn-outline btn-lg">
              Our Story
            </Link>
          </div>
          
          <div className="hero-features">
            <div className="hero-feature">
              <GlutenFreeIcon />
              <span>Gluten Free</span>
            </div>
            <div className="hero-feature">
              <NoSugarIcon />
              <span>No Added Sugar</span>
            </div>
            <div className="hero-feature">
              <DairyFreeIcon />
              <span>Dairy Free</span>
            </div>
            <div className="hero-feature">
              <NaturalIcon />
              <span>100% Natural</span>
            </div>
          </div>
        </div>
        
 
      </div>
      
      <style>{heroStyles}</style>
    </section>
  );
}

// Icons
function GlutenFreeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C13.5 4 14 6 14 8C14 10 13 12 12 14C11 12 10 10 10 8C10 6 10.5 4 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 14C12 16 11 18 10 20M12 14C12 16 13 18 14 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 4L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function NoSugarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 8V6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V8" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 4L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function DairyFreeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4H16L17 8H7L8 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 8V18C7 19.1046 7.89543 20 9 20H15C16.1046 20 17 19.1046 17 18V8" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 4L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function NaturalIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C7 2 3 7 3 12C3 17 7 22 12 22C17 22 21 17 21 12C21 7 17 2 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6C12 6 8 8 8 12C8 16 12 18 12 18C12 18 16 16 16 12C16 8 12 6 12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function TaroIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="150" rx="60" ry="40" fill="#8B6F5C"/>
      <ellipse cx="100" cy="145" rx="55" ry="35" fill="#A08060"/>
      <path d="M100 30C120 50 130 80 120 110C110 90 100 70 100 50C100 70 90 90 80 110C70 80 80 50 100 30Z" fill="#5A7A5A"/>
      <path d="M100 40C115 55 122 75 115 100C107 85 100 65 100 50C100 65 93 85 85 100C78 75 85 55 100 40Z" fill="#6B8B6B"/>
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

const heroStyles = `
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: var(--strong-black);
  }
  
  .hero-background {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  
  .hero-bg-picture {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  
  .hero-bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(35, 31, 32, 0.85) 0%,
      rgba(35, 31, 32, 0.7) 40%,
      rgba(35, 31, 32, 0.3) 70%,
      rgba(35, 31, 32, 0.1) 100%
    );
  }
  
  @media (max-width: 1024px) {
    .hero-overlay {
      background: linear-gradient(
        to bottom,
        rgba(35, 31, 32, 0.7) 0%,
        rgba(35, 31, 32, 0.5) 50%,
        rgba(35, 31, 32, 0.7) 100%
      );
    }
  }
  
  .hero-container {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    padding-top: var(--space-16);
    padding-bottom: var(--space-16);
  }
  
  @media (min-width: 1024px) {
    .hero-container {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      min-height: calc(100vh - var(--header-height));
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
    }
  }
  
  .hero-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }
  
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--strong-white);
    width: fit-content;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .hero-badge svg {
    color: var(--strong-yellow);
    flex-shrink: 0;
  }
  
  .hero-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-black);
    line-height: 1.1;
    color: var(--strong-white);
    margin: 0;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  }
  
  @media (min-width: 768px) {
    .hero-title {
      font-size: var(--text-6xl);
    }
  }
  
  @media (min-width: 1024px) {
    .hero-title {
      font-size: var(--text-7xl);
    }
  }
  
  .hero-description {
    font-size: var(--text-lg);
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.7;
    max-width: 500px;
    margin: 0;
  }
  
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
  }
  
  .hero-section .btn-outline {
    color: var(--strong-white);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  .hero-section .btn-outline:hover {
    background: var(--strong-white);
    color: var(--strong-black);
    border-color: var(--strong-white);
  }
  
  .hero-features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
    margin-top: var(--space-4);
  }
  
  @media (min-width: 640px) {
    .hero-features {
      grid-template-columns: repeat(4, auto);
      gap: var(--space-6);
    }
  }
  
  .hero-feature {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .hero-feature svg {
    color: var(--strong-yellow);
    flex-shrink: 0;
  }
  
  /* Hero Visual */
  .hero-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .hero-product-showcase {
    position: relative;
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1;
  }
  
  .product-float {
    position: absolute;
    width: 45%;
    animation: float 6s ease-in-out infinite;
  }
  
  .product-float img {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2));
  }
  
  .product-1 {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    animation-delay: 0s;
  }
  
  .product-2 {
    bottom: 10%;
    left: 5%;
    animation-delay: 2s;
  }
  
  .product-3 {
    bottom: 10%;
    right: 5%;
    animation-delay: 4s;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  .product-1 {
    animation-name: float1;
  }
  
  @keyframes float1 {
    0%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-20px);
    }
  }
  
  .hero-product-placeholder {
    width: 80%;
    margin: 0 auto;
    opacity: 0.3;
  }
  
  .hero-product-placeholder svg {
    width: 100%;
    height: auto;
    filter: brightness(1.5);
  }
  
  /* Hide product showcase on mobile since hero image is the focus */
  @media (max-width: 1023px) {
    .hero-visual {
      display: none;
    }
    
    .hero-content {
      text-align: center;
      align-items: center;
    }
    
    .hero-badge {
      margin: 0 auto;
    }
    
    .hero-description {
      margin: 0 auto;
    }
    
    .hero-features {
      justify-content: center;
    }
    
    .hero-actions {
      justify-content: center;
    }
  }
`;

