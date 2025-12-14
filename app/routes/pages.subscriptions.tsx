import {type MetaFunction} from '@remix-run/react';
import {Link} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    {title: 'Strong | Subscribe & Save'},
    {
      name: 'description',
      content: 'Subscribe to your favorite Strong Taro products and save 15% on every order. Weekly, fortnightly, or monthly delivery - cancel anytime.',
    },
  ];
};

export default function SubscriptionsPage() {
  return (
    <>
      <div className="subscriptions-page">
        {/* Hero Section */}
        <section className="subs-hero">
          <div className="container">
            <div className="subs-hero-content">
              <div className="subs-hero-badge">
                <GiftIcon />
                <span>Save 15% on Every Order</span>
              </div>
              <h1 className="subs-hero-title">
                Subscribe & <span className="highlight-yellow">Save</span>
              </h1>
              <p className="subs-hero-description">
                Never run out of your favorite Strong products. Set up automatic 
                delivery and save 15% on every order. Cancel or pause anytime.
              </p>
              <Link to="/collections/all" className="btn btn-primary btn-lg">
                Start Your Subscription
              </Link>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="subs-how-it-works">
          <div className="container">
            <h2 className="section-title">How It Works</h2>
            <div className="hiw-steps">
              <div className="hiw-step">
                <div className="hiw-step-icon">
                  <span>1</span>
                </div>
                <h3>Choose Your Products</h3>
                <p>Select any of our Taro products - Protein, Flour, or Milk Tea.</p>
              </div>
              <div className="hiw-connector">
                <ArrowRightIcon />
              </div>
              <div className="hiw-step">
                <div className="hiw-step-icon">
                  <span>2</span>
                </div>
                <h3>Pick Your Frequency</h3>
                <p>Choose weekly, fortnightly, or monthly delivery to suit your needs.</p>
              </div>
              <div className="hiw-connector">
                <ArrowRightIcon />
              </div>
              <div className="hiw-step">
                <div className="hiw-step-icon">
                  <span>3</span>
                </div>
                <h3>Save & Enjoy</h3>
                <p>Get 15% off every order, plus free shipping on all subscription orders.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Frequency Options */}
        <section className="subs-frequencies">
          <div className="container">
            <h2 className="section-title">Choose Your Delivery Frequency</h2>
            <p className="section-subtitle">
              Select the schedule that works best for your lifestyle
            </p>
            <div className="frequency-cards">
              <div className="frequency-card">
                <div className="frequency-icon"><CalendarIcon /></div>
                <h3>Weekly</h3>
                <p>Perfect for daily users and larger households</p>
                <ul>
                  <li><CheckIcon /> 15% savings</li>
                  <li><CheckIcon /> Free shipping</li>
                  <li><CheckIcon /> Delivery every 7 days</li>
                </ul>
              </div>
              <div className="frequency-card featured">
                <div className="frequency-badge">Most Popular</div>
                <div className="frequency-icon"><CalendarDaysIcon /></div>
                <h3>Fortnightly</h3>
                <p>Great balance for regular users</p>
                <ul>
                  <li><CheckIcon /> 15% savings</li>
                  <li><CheckIcon /> Free shipping</li>
                  <li><CheckIcon /> Delivery every 14 days</li>
                </ul>
              </div>
              <div className="frequency-card">
                <div className="frequency-icon"><CalendarRangeIcon /></div>
                <h3>Monthly</h3>
                <p>Ideal for occasional use or stocking up</p>
                <ul>
                  <li><CheckIcon /> 15% savings</li>
                  <li><CheckIcon /> Free shipping</li>
                  <li><CheckIcon /> Delivery every 30 days</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="subs-benefits">
          <div className="container">
            <div className="benefits-grid">
              <div className="benefits-content">
                <h2>Why Subscribe?</h2>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <div className="benefit-icon"><SaveIcon /></div>
                    <div className="benefit-text">
                      <h4>Save 15% Every Order</h4>
                      <p>Subscribers save 15% on every delivery compared to one-time purchases.</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon"><TruckIcon /></div>
                    <div className="benefit-text">
                      <h4>Free Shipping Always</h4>
                      <p>All subscription orders ship free, regardless of order size.</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon"><FlexibleIcon /></div>
                    <div className="benefit-text">
                      <h4>Total Flexibility</h4>
                      <p>Skip, pause, or cancel your subscription anytime with no penalties.</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon"><FirstIcon /></div>
                    <div className="benefit-text">
                      <h4>Early Access</h4>
                      <p>Subscribers get first access to new products and exclusive offers.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="benefits-visual">
                <div className="savings-calculator">
                  <h3>See Your Savings</h3>
                  <div className="savings-example">
                    <div className="savings-row">
                      <span>Monthly spend (one-time)</span>
                      <span>$120.00</span>
                    </div>
                    <div className="savings-row">
                      <span>Monthly spend (subscription)</span>
                      <span>$102.00</span>
                    </div>
                    <div className="savings-row highlight">
                      <span>Your annual savings</span>
                      <span className="savings-amount">$216.00</span>
                    </div>
                  </div>
                  <p className="savings-note">*Based on typical monthly order of $120</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="subs-faq">
          <div className="container">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h4>Can I cancel anytime?</h4>
                <p>Absolutely! You can cancel your subscription at any time with no penalties or fees. Just log into your account and manage your subscription.</p>
              </div>
              <div className="faq-item">
                <h4>Can I skip a delivery?</h4>
                <p>Yes! If you have enough product or are going away, you can skip your next delivery. Just update your subscription before the cutoff date.</p>
              </div>
              <div className="faq-item">
                <h4>Can I change products?</h4>
                <p>Of course! You can swap products, adjust quantities, or add items to your subscription anytime through your account.</p>
              </div>
              <div className="faq-item">
                <h4>When will I be charged?</h4>
                <p>You'll be charged 2 days before each delivery ships. We'll always send a reminder email before processing payment.</p>
              </div>
              <div className="faq-item">
                <h4>Is there a commitment?</h4>
                <p>No commitment required! Subscribe for as long as you want and cancel whenever you like.</p>
              </div>
              <div className="faq-item">
                <h4>How does shipping work?</h4>
                <p>All subscription orders ship free! Orders are processed and shipped according to your selected frequency.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="subs-cta">
          <div className="container">
            <div className="subs-cta-content">
              <h2>Ready to Subscribe & Save?</h2>
              <p>
                Start saving 15% on every order today. Choose any product and 
                select "Subscribe & Save" at checkout.
              </p>
              <Link to="/collections/all" className="btn btn-secondary btn-lg">
                Shop Products
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <style>{subscriptionsPageStyles}</style>
    </>
  );
}

// Icons
function GiftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="4" rx="1"/>
      <path d="M12 8v13"/>
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  );
}

function CalendarDaysIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
      <path d="M8 14h.01"/>
      <path d="M12 14h.01"/>
      <path d="M16 14h.01"/>
      <path d="M8 18h.01"/>
      <path d="M12 18h.01"/>
      <path d="M16 18h.01"/>
    </svg>
  );
}

function CalendarRangeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
      <path d="M17 14h-6"/>
      <path d="M13 18H7"/>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
      <path d="M12 18V6"/>
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/>
      <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/>
      <circle cx="7" cy="18" r="2"/>
      <path d="M15 18H9"/>
      <circle cx="17" cy="18" r="2"/>
    </svg>
  );
}

function FlexibleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
      <path d="M8 16H3v5"/>
    </svg>
  );
}

function FirstIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
    </svg>
  );
}

const subscriptionsPageStyles = `
  .subscriptions-page {
    background: var(--strong-cream);
  }
  
  .section-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    text-align: center;
    color: var(--strong-black);
    margin: 0 0 var(--space-4);
  }
  
  @media (min-width: 768px) {
    .section-title {
      font-size: var(--text-4xl);
    }
  }
  
  .section-subtitle {
    text-align: center;
    color: var(--color-text-muted);
    font-size: var(--text-lg);
    margin: 0 0 var(--space-12);
  }
  
  /* Hero Section */
  .subs-hero {
    padding: var(--space-16) 0;
    text-align: center;
    background: var(--strong-primary);
  }
  
  .subs-hero-content {
    max-width: 700px;
    margin: 0 auto;
  }
  
  .subs-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--strong-black);
    color: var(--strong-white);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-6);
  }
  
  .subs-hero-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-4);
    line-height: 1.1;
  }
  
  @media (min-width: 768px) {
    .subs-hero-title {
      font-size: var(--text-5xl);
    }
  }
  
  @media (min-width: 1024px) {
    .subs-hero-title {
      font-size: var(--text-6xl);
    }
  }
  
  .subs-hero-description {
    font-size: var(--text-lg);
    color: var(--strong-charcoal);
    line-height: 1.7;
    margin: 0 0 var(--space-8);
  }
  
  /* How It Works */
  .subs-how-it-works {
    padding: var(--space-16) 0;
    background: var(--strong-white);
  }
  
  .hiw-steps {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-6);
    margin-top: var(--space-8);
  }
  
  @media (min-width: 768px) {
    .hiw-steps {
      flex-direction: row;
      justify-content: center;
    }
  }
  
  .hiw-step {
    text-align: center;
    max-width: 250px;
  }
  
  .hiw-step-icon {
    width: 64px;
    height: 64px;
    background: var(--strong-primary);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--space-4);
    font-size: var(--text-2xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
  }
  
  .hiw-step h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    margin: 0 0 var(--space-2);
  }
  
  .hiw-step p {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin: 0;
    line-height: 1.5;
  }
  
  .hiw-connector {
    color: var(--strong-gray-light);
    transform: rotate(90deg);
  }
  
  @media (min-width: 768px) {
    .hiw-connector {
      transform: none;
    }
  }
  
  /* Frequencies */
  .subs-frequencies {
    padding: var(--space-16) 0;
  }
  
  .frequency-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
    max-width: 1000px;
    margin: 0 auto;
  }
  
  @media (min-width: 768px) {
    .frequency-cards {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .frequency-card {
    background: var(--strong-white);
    border: 2px solid var(--strong-cream);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    text-align: center;
    position: relative;
    transition: all var(--transition-base);
  }
  
  .frequency-card:hover {
    border-color: var(--strong-primary);
    transform: translateY(-4px);
  }
  
  .frequency-card.featured {
    border-color: var(--strong-primary);
    box-shadow: var(--shadow-lg);
  }
  
  .frequency-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--strong-primary);
    color: var(--strong-black);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    white-space: nowrap;
  }
  
  .frequency-icon {
    font-size: var(--text-4xl);
    margin-bottom: var(--space-4);
  }
  
  .frequency-card h3 {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    margin: 0 0 var(--space-2);
  }
  
  .frequency-card > p {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin: 0 0 var(--space-6);
  }
  
  .frequency-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
  }
  
  .frequency-card li {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    padding: var(--space-2) 0;
    border-top: 1px solid var(--strong-cream);
  }
  
  .frequency-card li svg {
    color: var(--strong-leaf);
    flex-shrink: 0;
  }
  
  /* Benefits */
  .subs-benefits {
    padding: var(--space-16) 0;
    background: var(--strong-white);
  }
  
  .benefits-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    align-items: center;
  }
  
  @media (min-width: 1024px) {
    .benefits-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .benefits-content h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    margin: 0 0 var(--space-8);
  }
  
  .benefits-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }
  
  .benefit-item {
    display: flex;
    gap: var(--space-4);
  }
  
  .benefit-icon {
    width: 48px;
    height: 48px;
    background: var(--strong-primary);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--strong-black);
    flex-shrink: 0;
  }
  
  .benefit-text h4 {
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    margin: 0 0 var(--space-1);
  }
  
  .benefit-text p {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin: 0;
    line-height: 1.5;
  }
  
  .savings-calculator {
    background: var(--strong-cream);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
  }
  
  .savings-calculator h3 {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    margin: 0 0 var(--space-6);
    text-align: center;
  }
  
  .savings-example {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .savings-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    padding: var(--space-3) 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  
  .savings-row.highlight {
    border-bottom: none;
    padding-top: var(--space-4);
    font-weight: var(--font-bold);
    color: var(--strong-black);
  }
  
  .savings-amount {
    font-size: var(--text-2xl);
    font-weight: var(--font-black);
    color: var(--strong-leaf);
  }
  
  .savings-note {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    text-align: center;
    margin: var(--space-4) 0 0;
  }
  
  /* FAQ */
  .subs-faq {
    padding: var(--space-16) 0;
  }
  
  .faq-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
    max-width: 1000px;
    margin: var(--space-8) auto 0;
  }
  
  @media (min-width: 768px) {
    .faq-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .faq-item {
    background: var(--strong-white);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
  }
  
  .faq-item h4 {
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    margin: 0 0 var(--space-2);
    color: var(--strong-black);
  }
  
  .faq-item p {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin: 0;
    line-height: 1.6;
  }
  
  /* CTA */
  .subs-cta {
    padding: var(--space-16) 0;
    background: var(--strong-charcoal);
  }
  
  .subs-cta-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .subs-cta h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--strong-white);
    margin: 0 0 var(--space-4);
  }
  
  .subs-cta p {
    font-size: var(--text-lg);
    color: var(--strong-gray-light);
    margin: 0 0 var(--space-8);
    line-height: 1.7;
  }
`;

