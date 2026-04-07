import { useEffect, useRef, useState } from 'react';
import './SimpleNav.css';

const SimpleNav = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  ctaButton,
  loginHref = '#',
  activeHref,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const hoverTimeoutRef = useRef(null);

  // Scroll listener for glassmorphic effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine active href from current path if not provided
  const getActiveHref = () => {
    if (typeof window === 'undefined') return '';
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || '';

    if (fileName.startsWith('blog-') && fileName.endsWith('.html')) {
      return 'resources';
    }
    if (fileName.startsWith('case-study-') && fileName.endsWith('.html')) {
      return 'case-studies';
    }
    if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index' || fileName === 'index.html' || fileName === '') {
      return '/';
    }

    const pathSegments = currentPath.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[pathSegments.length - 1].replace('.html', '');
      if (firstSegment === 'index') {
        return '/';
      }
      return firstSegment;
    }
    return '/';
  };

  const resolvedActiveHref = activeHref || getActiveHref();

  const isLinkActive = (href) => {
    if (href === '/') {
      return resolvedActiveHref === '/' || resolvedActiveHref === 'index';
    }
    return resolvedActiveHref === href || resolvedActiveHref.includes(href.replace('/', ''));
  };

  const isExternalLink = (href) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:');

  // Hover intent detection - only show dropdown if user intentionally hovers
  const handleMenuItemEnter = (itemLabel) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return; // Disable hover on mobile
    }

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(itemLabel);
    }, 90); // 90ms delay like Voiceflow
  };

  const handleMenuItemLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 220); // 220ms delay for closing
  };

  // Keyboard navigation
  const handleKeyDown = (e, itemLabel) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpenDropdown(openDropdown === itemLabel ? null : itemLabel);
    } else if (e.key === 'Escape') {
      setOpenDropdown(null);
    }
  };

  return (
    <div className="simple-nav-container">
      <nav className={`simple-nav ${isScrolled ? 'simple-nav-scrolled' : ''} ${className}`}>
        <div className="nav-content">
          {/* Logo */}
          <a href="/" className="nav-logo">
            <img src={logo} alt={logoAlt} />
          </a>

          {/* Desktop Nav Menu */}
          <ul className="nav-menu desktop-only">
            {items.map((item) => {
              const isActive = isLinkActive(item.href);
              const hasDropdown = item.submenu && item.submenu.length > 0;

              return (
                <li
                  key={item.label}
                  className={`nav-item ${hasDropdown ? 'has-dropdown' : ''}`}
                  onMouseEnter={() => hasDropdown && handleMenuItemEnter(item.label)}
                  onMouseLeave={handleMenuItemLeave}
                >
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onKeyDown={(e) => hasDropdown && handleKeyDown(e, item.label)}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup={hasDropdown}
                  >
                    {item.label}
                    {hasDropdown && (
                      <svg
                        className={`chevron ${openDropdown === item.label ? 'open' : ''}`}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {hasDropdown && (
                    <div
                      className={`dropdown-menu ${openDropdown === item.label ? 'open' : ''}`}
                      role="menu"
                    >
                      <div className="dropdown-content">
                        {item.submenu.map((subitem) => (
                          <a
                            key={subitem.label}
                            href={subitem.href}
                            className="dropdown-link"
                            role="menuitem"
                          >
                            {subitem.icon && (
                              <span className="dropdown-icon">{subitem.icon}</span>
                            )}
                            <div className="dropdown-link-content">
                              <div className="dropdown-link-title">{subitem.label}</div>
                              {subitem.description && (
                                <div className="dropdown-link-desc">{subitem.description}</div>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right Side: Login + CTA */}
          <div className="nav-right desktop-only">
            <a href={loginHref} className="nav-link login-link">
              Login
            </a>
            {ctaButton && (
              <a href={ctaButton.href} className="nav-cta">
                {ctaButton.label}
              </a>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="mobile-menu-btn mobile-only"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu mobile-only">
            {items.map((item) => {
              const hasDropdown = item.submenu && item.submenu.length > 0;

              return (
                <div key={item.label} className="mobile-menu-item">
                  <a
                    href={item.href}
                    className="mobile-menu-link"
                    onClick={() => {
                      if (!hasDropdown) {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    {item.label}
                    {hasDropdown && (
                      <span className="mobile-dropdown-toggle">›</span>
                    )}
                  </a>

                  {hasDropdown && (
                    <div className="mobile-dropdown">
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem.label}
                          href={subitem.href}
                          className="mobile-dropdown-link"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subitem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile CTA */}
            <div className="mobile-menu-cta">
              <a href={loginHref} className="mobile-menu-link">
                Login
              </a>
              {ctaButton && (
                <a href={ctaButton.href} className="mobile-cta-button">
                  {ctaButton.label}
                </a>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default SimpleNav;
