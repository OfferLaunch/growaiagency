// Entry point for GradientText component
// This will be bundled with esbuild

import React from 'react';
import ReactDOM from 'react-dom/client';
import GradientText from './components/GradientText/GradientText';

// Make React available globally for JSX transformation
if (typeof window !== 'undefined') {
  window.React = React;
}

// Initialize GradientText in the hero section
(function initGradientText() {
  function init() {
    // Create a container in the hero section if it doesn't exist
    let gradientContainer = document.getElementById('hero-gradient-text');
    if (!gradientContainer) {
      const heroSection = document.querySelector('.hero');
      if (!heroSection) {
        console.log('Waiting for hero section...');
        setTimeout(init, 100);
        return;
      }
      gradientContainer = document.createElement('div');
      gradientContainer.id = 'hero-gradient-text';
      heroSection.appendChild(gradientContainer);
    }
    
    try {
      console.log('Initializing GradientText...');
      // Create root and render GradientText
      const root = ReactDOM.createRoot(gradientContainer);
      root.render(React.createElement(GradientText, {
        colors: ['#5cc49d', '#fafbff', '#5cc49d'],
        animationSpeed: 8,
        showBorder: true,
        direction: 'horizontal',
        pauseOnHover: false,
        yoyo: true,
        className: 'hero-gradient-text'
      }, 'Start Your AI Agency Today'));
      console.log('✅ GradientText initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing GradientText:', error);
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

