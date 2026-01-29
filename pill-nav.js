// Entry point for PillNav component
// This will be bundled with esbuild

import React from 'react';
import ReactDOM from 'react-dom/client';
import PillNav from './components/PillNav/PillNav';

// Make React available globally for JSX transformation
if (typeof window !== 'undefined') {
  window.React = React;
}

// Initialize PillNav to replace the existing navbar
(function initPillNav() {
  function init() {
    // Check if PillNav is already initialized
    if (document.getElementById('pill-nav-container')) {
      return;
    }
    
    // Find the existing navbar (if it exists)
    const existingNav = document.querySelector('.navbar');
    
    // Create a container for PillNav
    const navContainer = document.createElement('div');
    navContainer.id = 'pill-nav-container';
    
    // Insert at the beginning of body, or before existing nav if it exists
    if (existingNav) {
      existingNav.parentNode.insertBefore(navContainer, existingNav);
      // Hide the existing nav
      existingNav.style.display = 'none';
    } else {
      // If no existing nav, insert at the beginning of body
      const body = document.body;
      if (body.firstChild) {
        body.insertBefore(navContainer, body.firstChild);
      } else {
        body.appendChild(navContainer);
      }
    }
    
    // Get current path for active state
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const fileName = pathSegments[pathSegments.length - 1] || '';
    
    // Determine active href based on page type
    let activeHref;
    
    // Blog posts should show "Resources" as active
    if (fileName.startsWith('blog-') && (fileName.endsWith('.html') || pathSegments[0] === 'blog')) {
      activeHref = '/resources';
    }
    // Case studies listing or detail should show "Case Studies" as active
    else if (currentPath === '/case-studies' || currentPath === '/case-studies/' ||
             pathSegments[0] === 'case-studies' || fileName.startsWith('case-study-')) {
      activeHref = '/case-studies';
    }
    // Home page
    else if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index' || fileName === 'index.html' || fileName === '') {
      activeHref = '/';
    }
    // Other pages - get the first path segment or filename without extension
    else {
      if (pathSegments.length > 0) {
        const firstSegment = pathSegments[pathSegments.length - 1].replace('.html', '');
        // Map common page names
        if (firstSegment === 'index') {
          activeHref = '/';
        } else {
          activeHref = '/' + firstSegment;
        }
      } else {
        activeHref = '/';
      }
    }
    
    // Get CTA URL based on current page
    const pageName = currentPath.split('/').pop().replace('.html', '') || 'index';
    const ctaUrl = `https://go.growaiagency.io/w-app?utm_source=Website&utm_medium=web&utm_content=${pageName}&el=Website-${pageName}`;
    
    try {
      console.log('Initializing PillNav...');
      // Create root and render PillNav
      const root = ReactDOM.createRoot(navContainer);
      root.render(React.createElement(PillNav, {
        logo: 'https://growaiagency.io/assets/images/logos/white%20and%20green.png',
        logoAlt: 'Grow AI',
        items: [
          { label: 'Home', href: '/' },
          { label: 'Process', href: '/process' },
          { label: 'AI Software', href: '/software' },
          { label: 'Resources', href: '/resources' },
          { label: 'Case Studies', href: '/case-studies/' },
          { label: 'About Us', href: '/about' },
          { label: 'Team', href: '/team' },
          { label: 'Get in Touch', href: ctaUrl }
        ],
        activeHref: activeHref,
        initialLoadAnimation: true,
        baseColor: '#FAFBFF',
        pillColor: '#5CC49D',
        hoveredPillTextColor: '#FAFBFF',
        pillTextColor: '#FAFBFF',
        ease: 'power3.easeOut',
        className: 'custom-nav'
      }));
      console.log('✅ PillNav initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing PillNav:', error);
      setTimeout(init, 200);
    }
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 200);
  }
})();
