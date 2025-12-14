import {Await, NavLink, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import type {HeaderQuery} from 'storefrontapi.generated';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

interface StrongHeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: boolean;
}

export function StrongHeader({header, cart, isLoggedIn}: StrongHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-bar-content">
          <LeafSmallIcon />
          <span>Free shipping on orders over $75 AUD</span>
          <span className="announcement-bar-separator">•</span>
          <span>Subscribe & Save 15%</span>
        </div>
      </div>
      
      {/* Main Header */}
      <header className="strong-header">
        <div className="strong-header-container">
          {/* Logo */}
          <Link to="/" className="strong-logo">
            <span className="strong-logo-text">STRONG</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="strong-nav-desktop">
            <NavLink 
              to="/collections/all" 
              className={({isActive}) => 
                `strong-nav-link ${isActive ? 'active' : ''}`
              }
            >
              Shop
            </NavLink>
            <NavLink 
              to="/pages/our-story" 
              className={({isActive}) => 
                `strong-nav-link ${isActive ? 'active' : ''}`
              }
            >
              Our Story
            </NavLink>
            <NavLink 
              to="/blogs/journal" 
              className={({isActive}) => 
                `strong-nav-link ${isActive ? 'active' : ''}`
              }
            >
              Journal
            </NavLink>
            <NavLink 
              to="/pages/recipes" 
              className={({isActive}) => 
                `strong-nav-link ${isActive ? 'active' : ''}`
              }
            >
              Recipes
            </NavLink>
            <NavLink 
              to="/pages/services" 
              className={({isActive}) => 
                `strong-nav-link ${isActive ? 'active' : ''}`
              }
            >
              Services
            </NavLink>
          </nav>
          
          {/* Header Actions */}
          <div className="strong-header-actions">
            <a href="#search-aside" className="strong-header-action">
              <SearchIcon />
              <span className="sr-only">Search</span>
            </a>
            
            <NavLink 
              to="/account" 
              className="strong-header-action"
            >
              <UserIcon />
              <span className="sr-only">Account</span>
            </NavLink>
            
            <a href="#cart-aside" className="strong-header-action cart-action">
              <CartIcon />
              <Suspense fallback={<CartBadge count={0} />}>
                <Await resolve={cart}>
                  {(cart) => <CartBadge count={cart?.totalQuantity || 0} />}
                </Await>
              </Suspense>
            </a>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="strong-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="strong-mobile-nav">
            <nav className="strong-mobile-nav-links">
              <NavLink 
                to="/collections/all" 
                onClick={() => setMobileMenuOpen(false)}
                className="strong-mobile-nav-link"
              >
                Shop
              </NavLink>
              <NavLink 
                to="/pages/our-story" 
                onClick={() => setMobileMenuOpen(false)}
                className="strong-mobile-nav-link"
              >
                Our Story
              </NavLink>
              <NavLink 
                to="/blogs/journal" 
                onClick={() => setMobileMenuOpen(false)}
                className="strong-mobile-nav-link"
              >
                Journal
              </NavLink>
              <NavLink 
                to="/pages/recipes" 
                onClick={() => setMobileMenuOpen(false)}
                className="strong-mobile-nav-link"
              >
                Recipes
              </NavLink>
              <NavLink 
                to="/pages/services" 
                onClick={() => setMobileMenuOpen(false)}
                className="strong-mobile-nav-link"
              >
                Services
              </NavLink>
            </nav>
          </div>
        )}
      </header>
      
      <style>{headerStyles}</style>
    </>
  );
}

function CartBadge({count}: {count: number}) {
  if (count === 0) return null;
  return <span className="cart-badge">{count}</span>;
}

// Icons
function LeafSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
      <path d="M3 6h18"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12"/>
      <line x1="4" x2="20" y1="6" y2="6"/>
      <line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </svg>
  );
}

const headerStyles = `
  /* Announcement Bar */
  .announcement-bar {
    background: var(--strong-primary);
    padding: var(--space-2) var(--space-4);
    text-align: center;
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--strong-black);
  }
  
  .announcement-bar-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    flex-wrap: wrap;
  }
  
  .announcement-bar-icon {
    font-size: var(--text-sm);
  }
  
  .announcement-bar-separator {
    opacity: 0.5;
  }
  
  /* Main Header */
  .strong-header {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    background: var(--color-light);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .strong-header-container {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 var(--space-4);
    height: var(--header-height-mobile);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-6);
  }
  
  @media (min-width: 768px) {
    .strong-header-container {
      padding: 0 var(--space-8);
      height: var(--header-height);
    }
  }
  
  /* Logo */
  .strong-logo {
    text-decoration: none;
  }
  
  .strong-logo-text {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: var(--font-black);
    letter-spacing: 0.1em;
    color: var(--strong-black);
    text-transform: uppercase;
  }
  
  @media (min-width: 768px) {
    .strong-logo-text {
      font-size: var(--text-2xl);
    }
  }
  
  /* Desktop Navigation */
  .strong-nav-desktop {
    display: none;
    align-items: center;
    gap: var(--space-8);
  }
  
  @media (min-width: 1024px) {
    .strong-nav-desktop {
      display: flex;
    }
  }
  
  .strong-nav-link {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--color-text);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: var(--space-2) 0;
    position: relative;
    transition: color var(--transition-base);
  }
  
  .strong-nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--strong-primary);
    transition: width var(--transition-base);
  }
  
  .strong-nav-link:hover,
  .strong-nav-link.active {
    color: var(--strong-black);
  }
  
  .strong-nav-link:hover::after,
  .strong-nav-link.active::after {
    width: 100%;
  }
  
  /* Header Actions */
  .strong-header-actions {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }
  
  .strong-header-action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    color: var(--color-text);
    transition: all var(--transition-base);
    text-decoration: none;
  }
  
  .strong-header-action:hover {
    background: var(--strong-cream);
    color: var(--strong-black);
  }
  
  .cart-action {
    position: relative;
  }
  
  .cart-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    min-width: 18px;
    height: 18px;
    background: var(--strong-primary);
    color: var(--strong-black);
    font-size: 10px;
    font-weight: var(--font-bold);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
  }
  
  /* Mobile Toggle */
  .strong-mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text);
  }
  
  @media (min-width: 1024px) {
    .strong-mobile-toggle {
      display: none;
    }
  }
  
  /* Mobile Navigation */
  .strong-mobile-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-light);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    animation: fadeIn 200ms ease;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .strong-mobile-nav-links {
    display: flex;
    flex-direction: column;
    padding: var(--space-4);
  }
  
  .strong-mobile-nav-link {
    font-size: var(--text-lg);
    font-weight: var(--font-medium);
    color: var(--color-text);
    text-decoration: none;
    padding: var(--space-4);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: all var(--transition-base);
  }
  
  .strong-mobile-nav-link:hover {
    background: var(--strong-cream);
    color: var(--strong-black);
  }
  
  .strong-mobile-nav-link:last-child {
    border-bottom: none;
  }
  
  /* Screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

