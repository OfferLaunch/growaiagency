import { useEffect, useState } from 'react';
import './SimpleNav.css';

const SimpleNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    // Blog posts should show "Resources" as active
    if (fileName.startsWith('blog-') && fileName.endsWith('.html')) {
      return 'resources';
    }
    // Case studies should show "Case Studies" as active
    if (fileName.startsWith('case-study-') && fileName.endsWith('.html')) {
      return 'case-studies';
    }
    // Handle home page
    if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index' || fileName === 'index.html' || fileName === '') {
      return '/';
    }

    // Get the first path segment or filename without extension
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

  return (
    <div className="simple-nav-container">
      <nav className={`simple-nav ${isScrolled ? 'simple-nav-scrolled' : ''} ${className}`}>
        <div className="nav-content">
          {/* Logo */}
          <a href="/" className="nav-logo">
            <img src={logo} alt={logoAlt} />
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-menu desktop-only">
            {items.map((item) => {
              const isCTA = item.label?.toLowerCase().includes('get in touch') || isExternalLink(item.href);
              const isActive = !isCTA && isLinkActive(item.href);

              return (
                <li key={item.href || item.label}>
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? 'active' : ''} ${isCTA ? 'cta-button' : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="mobile-menu-btn mobile-only"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <ul className="mobile-menu mobile-only">
            {items.map((item) => {
              const isCTA = item.label?.toLowerCase().includes('get in touch') || isExternalLink(item.href);

              return (
                <li key={item.href || item.label}>
                  <a
                    href={item.href}
                    className={`mobile-menu-link ${isCTA ? 'cta-button' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default SimpleNav;
