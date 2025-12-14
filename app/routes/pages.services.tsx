import {type MetaFunction} from '@remix-run/react';
import {Link} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    {title: 'Strong | Our Services'},
    {
      name: 'description',
      content: 'Comprehensive agribusiness services - food processing, manufacturing, community partnerships, and sustainable packaging solutions from Samoa.',
    },
  ];
};

export default function ServicesPage() {
  return (
    <>
      <div className="services-page">
        {/* Hero Section */}
        <section className="services-hero">
          <div className="container">
            <span className="services-hero-label">Our Services</span>
            <h1 className="services-hero-title">
              More Than Just <span className="highlight-yellow">Products</span>
            </h1>
            <p className="services-hero-description">
              We offer comprehensive agribusiness services that bring Samoan produce 
              to the world market while supporting local communities and sustainable practices.
            </p>
          </div>
        </section>
        
        {/* Services Grid */}
        <section className="services-main">
          <div className="container">
            <div className="services-grid-full">
              <ServiceDetailCard 
                icon={<ProcessingIcon />}
                title="Food Processing"
                subtitle="State-of-the-Art Facilities"
                description="Our modern processing facilities in Samoa transform raw taro into premium food products while maintaining the highest quality standards. From washing and peeling to drying and milling, every step is carefully monitored."
                features={[
                  'HACCP certified facilities',
                  'Traditional methods preserved',
                  'Quality control at every stage',
                  'Minimal processing for maximum nutrition',
                ]}
                image="processing"
              />
              
              <ServiceDetailCard 
                icon={<ManufacturingIcon />}
                title="Manufacturing"
                subtitle="Custom Solutions for Brands"
                description="Looking to incorporate taro into your product line? We offer white-label and co-manufacturing solutions for brands seeking premium Samoan taro ingredients."
                features={[
                  'Private label production',
                  'Custom formulations',
                  'Bulk ingredient supply',
                  'Product development support',
                ]}
                image="manufacturing"
                reversed
              />
              
              <ServiceDetailCard 
                icon={<CommunityIcon />}
                title="Community"
                subtitle="Empowering Samoan Families"
                description="At the heart of everything we do is our commitment to Samoan farming families. We work directly with over 50 farming families, ensuring fair trade practices and sustainable livelihoods."
                features={[
                  'Fair trade partnerships',
                  'Agricultural training programs',
                  'Equipment and seed support',
                  'Community development initiatives',
                ]}
                image="community"
              />
              
              <ServiceDetailCard 
                icon={<PackagingIcon />}
                title="Packaging"
                subtitle="Sustainable Solutions"
                description="Our eco-friendly packaging solutions are designed for global distribution while minimizing environmental impact. We prioritize recyclable and biodegradable materials wherever possible."
                features={[
                  'Eco-friendly materials',
                  'Custom branding options',
                  'Export-ready packaging',
                  'Shelf-life optimization',
                ]}
                image="packaging"
                reversed
              />
            </div>
          </div>
        </section>
        
        {/* Impact Stats */}
        <section className="services-impact">
          <div className="container">
            <div className="impact-header">
              <h2>Our Impact</h2>
              <p>Together with our farming partners, we're building a sustainable future for Samoan agriculture.</p>
            </div>
            <div className="impact-stats">
              <div className="impact-stat">
                <span className="impact-number">50+</span>
                <span className="impact-label">Farming Families</span>
              </div>
              <div className="impact-stat">
                <span className="impact-number">100%</span>
                <span className="impact-label">Samoan Sourced</span>
              </div>
              <div className="impact-stat">
                <span className="impact-number">3</span>
                <span className="impact-label">Generations of Knowledge</span>
              </div>
              <div className="impact-stat">
                <span className="impact-number">1000+</span>
                <span className="impact-label">Tons Processed Yearly</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="services-cta">
          <div className="container">
            <div className="services-cta-content">
              <h2>Partner With Us</h2>
              <p>
                Interested in our services? Whether you're a brand looking for premium ingredients 
                or a retailer wanting to stock our products, we'd love to hear from you.
              </p>
              <div className="services-cta-actions">
                <Link to="/pages/contact" className="btn btn-primary btn-lg">
                  Contact Us
                </Link>
                <Link to="/pages/wholesale" className="btn btn-outline btn-lg">
                  Wholesale Inquiries
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <style>{servicesPageStyles}</style>
    </>
  );
}

interface ServiceDetailCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  reversed?: boolean;
}

function ServiceDetailCard({
  icon,
  title,
  subtitle,
  description,
  features,
  image,
  reversed = false,
}: ServiceDetailCardProps) {
  return (
    <div className={`service-detail-card ${reversed ? 'reversed' : ''}`}>
      <div className="service-detail-image">
        <div className="service-detail-placeholder">
          {icon}
        </div>
      </div>
      <div className="service-detail-content">
        <div className="service-detail-icon">{icon}</div>
        <span className="service-detail-subtitle">{subtitle}</span>
        <h3 className="service-detail-title">{title}</h3>
        <p className="service-detail-description">{description}</p>
        <ul className="service-detail-features">
          {features.map((feature, index) => (
            <li key={index}>
              <CheckIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Icons
function ProcessingIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4"/>
      <path d="m16.24 7.76-2.12 2.12"/>
      <path d="M20 12h-4"/>
      <path d="m16.24 16.24-2.12-2.12"/>
      <path d="M12 20v-4"/>
      <path d="m7.76 16.24 2.12-2.12"/>
      <path d="M4 12h4"/>
      <path d="m7.76 7.76 2.12 2.12"/>
    </svg>
  );
}

function ManufacturingIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
      <path d="M17 18h1"/>
      <path d="M12 18h1"/>
      <path d="M7 18h1"/>
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function PackagingIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7.5 4.27 9 5.15"/>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/>
      <path d="M12 22V12"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

const servicesPageStyles = `
  .services-page {
    background: var(--strong-cream);
  }
  
  /* Hero Section */
  .services-hero {
    padding: var(--space-16) 0 var(--space-12);
    text-align: center;
    background: var(--strong-white);
  }
  
  .services-hero-label {
    display: inline-block;
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-secondary);
    margin-bottom: var(--space-4);
  }
  
  .services-hero-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-4);
    line-height: 1.2;
  }
  
  @media (min-width: 768px) {
    .services-hero-title {
      font-size: var(--text-5xl);
    }
  }
  
  @media (min-width: 1024px) {
    .services-hero-title {
      font-size: var(--text-6xl);
    }
  }
  
  .services-hero-description {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
  }
  
  /* Services Main */
  .services-main {
    padding: var(--space-16) 0;
  }
  
  .services-grid-full {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
  }
  
  /* Service Detail Card */
  .service-detail-card {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-8);
    align-items: center;
  }
  
  @media (min-width: 1024px) {
    .service-detail-card {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-12);
    }
    
    .service-detail-card.reversed {
      direction: rtl;
    }
    
    .service-detail-card.reversed > * {
      direction: ltr;
    }
  }
  
  .service-detail-image {
    aspect-ratio: 4/3;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    background: linear-gradient(135deg, var(--strong-leaf) 0%, var(--strong-charcoal) 100%);
  }
  
  .service-detail-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--strong-white);
    opacity: 0.3;
  }
  
  .service-detail-placeholder svg {
    width: 80px;
    height: 80px;
  }
  
  .service-detail-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .service-detail-icon {
    width: 64px;
    height: 64px;
    background: var(--strong-primary);
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--strong-black);
  }
  
  .service-detail-subtitle {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-secondary);
  }
  
  .service-detail-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0;
    line-height: 1.2;
  }
  
  @media (min-width: 768px) {
    .service-detail-title {
      font-size: var(--text-4xl);
    }
  }
  
  .service-detail-description {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    line-height: 1.7;
    margin: 0;
  }
  
  .service-detail-features {
    list-style: none;
    padding: 0;
    margin: var(--space-4) 0 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .service-detail-features li {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-base);
    color: var(--color-text);
  }
  
  .service-detail-features svg {
    color: var(--strong-leaf);
    flex-shrink: 0;
  }
  
  /* Impact Section */
  .services-impact {
    padding: var(--space-16) 0;
    background: var(--strong-charcoal);
    color: var(--strong-white);
  }
  
  .impact-header {
    text-align: center;
    margin-bottom: var(--space-12);
  }
  
  .impact-header h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--strong-white);
    margin: 0 0 var(--space-3);
  }
  
  @media (min-width: 768px) {
    .impact-header h2 {
      font-size: var(--text-4xl);
    }
  }
  
  .impact-header p {
    color: var(--strong-gray-light);
    font-size: var(--text-lg);
    margin: 0;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .impact-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-8);
    text-align: center;
  }
  
  @media (min-width: 768px) {
    .impact-stats {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .impact-stat {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  
  .impact-number {
    font-size: var(--text-4xl);
    font-weight: var(--font-black);
    color: var(--strong-primary);
    line-height: 1;
  }
  
  @media (min-width: 768px) {
    .impact-number {
      font-size: var(--text-5xl);
    }
  }
  
  .impact-label {
    font-size: var(--text-sm);
    color: var(--strong-gray-light);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  /* CTA Section */
  .services-cta {
    padding: var(--space-16) 0;
    background: var(--strong-primary);
  }
  
  .services-cta-content {
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
  }
  
  .services-cta h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-4);
  }
  
  @media (min-width: 768px) {
    .services-cta h2 {
      font-size: var(--text-4xl);
    }
  }
  
  .services-cta p {
    font-size: var(--text-lg);
    color: var(--strong-charcoal);
    margin: 0 0 var(--space-8);
    line-height: 1.7;
  }
  
  .services-cta-actions {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    justify-content: center;
  }
  
  @media (min-width: 640px) {
    .services-cta-actions {
      flex-direction: row;
    }
  }
`;

