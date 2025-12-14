import {Link} from '@remix-run/react';

export function ServicesSection() {
  return (
    <section className="services-section">
      <div className="container">
        <div className="services-header">
          <span className="services-label">Our Services</span>
          <h2 className="services-title">
            More Than Just Products
          </h2>
          <p className="services-description">
            We offer comprehensive agribusiness services to bring Samoan 
            produce to the world market while supporting local communities.
          </p>
        </div>
        
        <div className="services-grid">
          <ServiceCard 
            icon={<ProcessingIcon />}
            title="Food Processing"
            description="State-of-the-art processing facilities transforming raw taro into premium food products."
            link="/pages/food-processing"
          />
          <ServiceCard 
            icon={<ManufacturingIcon />}
            title="Manufacturing"
            description="Custom manufacturing solutions for brands looking to incorporate taro into their product lines."
            link="/pages/manufacturing"
          />
          <ServiceCard 
            icon={<CommunityIcon />}
            title="Community"
            description="Direct partnerships with Samoan farming families, ensuring fair trade and sustainable practices."
            link="/pages/community"
          />
          <ServiceCard 
            icon={<PackagingIcon />}
            title="Packaging"
            description="Eco-friendly packaging solutions designed for global distribution while minimizing environmental impact."
            link="/pages/packaging"
          />
        </div>
        
        <div className="services-cta">
          <Link to="/pages/services" className="btn btn-outline">
            Explore Our Services
          </Link>
        </div>
      </div>
      
      <style>{servicesStyles}</style>
    </section>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

function ServiceCard({icon, title, description, link}: ServiceCardProps) {
  return (
    <Link to={link} className="service-card">
      <div className="service-card-icon">
        {icon}
      </div>
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-description">{description}</p>
      <span className="service-card-link">
        Learn More 
        <ArrowIcon />
      </span>
    </Link>
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

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

const servicesStyles = `
  .services-section {
    padding: var(--space-24) 0;
    background: var(--strong-charcoal);
    color: var(--strong-white);
  }
  
  .services-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto var(--space-12);
  }
  
  .services-label {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-primary);
    display: block;
    margin-bottom: var(--space-2);
  }
  
  .services-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-extrabold);
    line-height: 1.2;
    margin: 0 0 var(--space-4);
    color: var(--strong-white);
  }
  
  @media (min-width: 768px) {
    .services-title {
      font-size: var(--text-4xl);
    }
  }
  
  .services-description {
    font-size: var(--text-base);
    color: var(--strong-gray-light);
    line-height: 1.7;
    margin: 0;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  @media (min-width: 640px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  /* Service Card */
  .service-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    transition: all var(--transition-base);
  }
  
  .service-card:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--strong-primary);
    transform: translateY(-4px);
  }
  
  .service-card-icon {
    width: 56px;
    height: 56px;
    background: var(--strong-primary);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--strong-black);
  }
  
  .service-card-title {
    font-size: var(--text-lg);
    font-weight: var(--font-extrabold);
    margin: 0;
    color: var(--strong-white);
  }
  
  .service-card-description {
    font-size: var(--text-sm);
    color: var(--strong-gray-light);
    line-height: 1.6;
    margin: 0;
    flex-grow: 1;
  }
  
  .service-card-link {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--strong-primary);
    transition: gap var(--transition-base);
  }
  
  .service-card:hover .service-card-link {
    gap: var(--space-3);
  }
  
  .services-cta {
    text-align: center;
    margin-top: var(--space-10);
  }
  
  .services-section .btn-outline {
    color: var(--strong-white);
    border-color: var(--strong-white);
  }
  
  .services-section .btn-outline:hover {
    background: var(--strong-white);
    color: var(--strong-black);
  }
`;

