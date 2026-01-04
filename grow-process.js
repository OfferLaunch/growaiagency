// Entry point for GrowProcess component
// This will be bundled with esbuild

import React from 'react';
import ReactDOM from 'react-dom/client';
import GrowProcess from './components/GrowProcess/GrowProcess';

// Make React available globally for JSX transformation
if (typeof window !== 'undefined') {
  window.React = React;
}

// Initialize GrowProcess to replace the existing GROW steps section
(function initGrowProcess() {
  function init() {
    // Find the existing grow-steps section
    const existingSection = document.querySelector('.grow-steps');
    
    if (!existingSection) {
      // If section doesn't exist yet, wait a bit and try again
      setTimeout(init, 200);
      return;
    }
    
    // Check if already initialized
    if (existingSection.dataset.growProcessInitialized === 'true') {
      return;
    }
    
    // Create a container for the React component
    const container = document.createElement('div');
    container.id = 'grow-process-container';
    
    // Replace the existing content
    existingSection.innerHTML = '';
    existingSection.appendChild(container);
    existingSection.classList.add('grow-process-wrapper');
    
    try {
      console.log('Initializing GrowProcess component...');
      console.log('Found section:', existingSection);
      // Create root and render GrowProcess
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(GrowProcess));
      existingSection.dataset.growProcessInitialized = 'true';
      console.log('✅ GrowProcess initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing GrowProcess:', error);
      console.error('Error stack:', error.stack);
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

