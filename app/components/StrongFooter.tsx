import {Link} from '@remix-run/react';

export function StrongFooter() {
  return (
    <footer className="strong-footer">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Join the Strong Family</h3>
              <p>Get recipes, updates from Samoa, and 10% off your first order.</p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
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
      </div>
      
      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span className="footer-logo-text">STRONG</span>
              </Link>
              <p className="footer-tagline">
                Bringing the volcanic strength of Samoan Taro to tables worldwide.
              </p>
              <div className="footer-social">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <TikTokIcon />
                </a>
              </div>
            </div>
            
            {/* Shop Column */}
            <div className="footer-column">
              <h4>Shop</h4>
              <ul>
                <li><Link to="/products/taro-protein">Taro Protein</Link></li>
                <li><Link to="/products/taro-flour">Taro Flour</Link></li>
                <li><Link to="/products/taro-milk-tea">Taro Milk Tea</Link></li>
                <li><Link to="/collections/all">All Products</Link></li>
                <li><Link to="/pages/subscriptions">Subscriptions</Link></li>
              </ul>
            </div>
            
            {/* Company Column */}
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/pages/our-story">Our Story</Link></li>
                <li><Link to="/pages/samoa">From Samoa</Link></li>
                <li><Link to="/pages/community">Community Impact</Link></li>
                <li><Link to="/pages/services">Services</Link></li>
                <li><Link to="/blogs/journal">Journal</Link></li>
              </ul>
            </div>
            
            {/* Support Column */}
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><Link to="/pages/contact">Contact Us</Link></li>
                <li><Link to="/pages/faq">FAQs</Link></li>
                <li><Link to="/pages/shipping">Shipping Info</Link></li>
                <li><Link to="/policies/refund-policy">Returns</Link></li>
                <li><Link to="/account">My Account</Link></li>
              </ul>
            </div>
            
            {/* Services Column */}
            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li><Link to="/pages/food-processing">Food Processing</Link></li>
                <li><Link to="/pages/manufacturing">Manufacturing</Link></li>
                <li><Link to="/pages/packaging">Packaging</Link></li>
                <li><Link to="/pages/wholesale">Wholesale</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Strong. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link to="/policies/privacy-policy">Privacy Policy</Link>
              <Link to="/policies/terms-of-service">Terms of Service</Link>
              <Link to="/policies/refund-policy">Refund Policy</Link>
            </div>
            <div className="footer-origin">
              <span className="footer-flag">🇼🇸</span>
              <span>Made with love in Samoa</span>
            </div>
          </div>
        </div>
      </div>
      
      <style>{footerStyles}</style>
    </footer>
  );
}

// Icons
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
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

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
    </svg>
  );
}

const footerStyles = `
  .strong-footer {
    background: var(--strong-black);
    color: var(--strong-white);
  }
  
  /* Newsletter Section */
  .footer-newsletter {
    background: var(--strong-primary);
    padding: var(--space-12) 0;
  }
  
  .newsletter-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  @media (min-width: 768px) {
    .newsletter-content {
      flex-direction: row;
      align-items: center;
      text-align: left;
    }
  }
  
  .newsletter-text {
    flex: 1;
  }
  
  .newsletter-text h3 {
    color: var(--strong-black);
    font-size: var(--text-2xl);
    margin-bottom: var(--space-2);
  }
  
  .newsletter-text p {
    color: var(--strong-charcoal);
    margin: 0;
  }
  
  .newsletter-form {
    display: flex;
    gap: var(--space-3);
    flex-direction: column;
    width: 100%;
  }
  
  @media (min-width: 640px) {
    .newsletter-form {
      flex-direction: row;
      width: auto;
    }
  }
  
  .newsletter-input {
    padding: var(--space-3) var(--space-4);
    border: 2px solid var(--strong-black);
    border-radius: var(--radius-full);
    font-size: var(--text-base);
    background: var(--strong-white);
    min-width: 280px;
  }
  
  .newsletter-input:focus {
    outline: none;
    border-color: var(--strong-charcoal);
  }
  
  /* Main Footer */
  .footer-main {
    padding: var(--space-16) 0;
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }
  
  @media (min-width: 640px) {
    .footer-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 768px) {
    .footer-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1.5fr repeat(4, 1fr);
    }
  }
  
  /* Brand Column */
  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .footer-logo {
    text-decoration: none;
  }
  
  .footer-logo-text {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: var(--font-black);
    letter-spacing: 0.1em;
    color: var(--strong-primary);
  }
  
  .footer-tagline {
    color: var(--strong-gray-light);
    font-size: var(--text-sm);
    line-height: 1.6;
    margin: 0;
    max-width: 280px;
  }
  
  .footer-social {
    display: flex;
    gap: var(--space-4);
    margin-top: var(--space-2);
  }
  
  .footer-social a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.1);
    color: var(--strong-white);
    transition: all var(--transition-base);
  }
  
  .footer-social a:hover {
    background: var(--strong-primary);
    color: var(--strong-black);
  }
  
  /* Footer Columns */
  .footer-column h4 {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-primary);
    margin-bottom: var(--space-4);
  }
  
  .footer-column ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-column li {
    margin-bottom: var(--space-3);
  }
  
  .footer-column a {
    color: var(--strong-gray-light);
    text-decoration: none;
    font-size: var(--text-sm);
    transition: color var(--transition-base);
  }
  
  .footer-column a:hover {
    color: var(--strong-white);
  }
  
  /* Footer Bottom */
  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: var(--space-6) 0;
  }
  
  .footer-bottom-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    align-items: center;
    text-align: center;
  }
  
  @media (min-width: 768px) {
    .footer-bottom-content {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  }
  
  .footer-copyright {
    color: var(--strong-gray);
    font-size: var(--text-sm);
    margin: 0;
  }
  
  .footer-legal {
    display: flex;
    gap: var(--space-6);
  }
  
  .footer-legal a {
    color: var(--strong-gray);
    text-decoration: none;
    font-size: var(--text-sm);
    transition: color var(--transition-base);
  }
  
  .footer-legal a:hover {
    color: var(--strong-white);
  }
  
  .footer-origin {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--strong-gray);
    font-size: var(--text-sm);
  }
  
  .footer-flag {
    font-size: var(--text-lg);
  }
`;

