// Entry point for Header component
// This will be bundled with esbuild

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Header } from './components/ui/header-3';

// Make React available globally for JSX transformation
if (typeof window !== 'undefined') {
  window.React = React;
}

// Initialize Header to replace the existing navbar
(function initHeader() {
  function init() {
    // Check if Header is already initialized
    if (document.getElementById('pill-nav-container')) {
      return;
    }

    // Find the existing navbar (if it exists)
    const existingNav = document.querySelector('.navbar');

    // Create a container for Header
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

    try {
      console.log('Initializing Header...');
      // Create root and render Header
      const root = ReactDOM.createRoot(navContainer);
      root.render(React.createElement(Header));
      console.log('✅ Header initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing Header:', error);
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
