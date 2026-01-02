// Entry point for Silk background
// This will be bundled with esbuild

import ReactDefault from 'react';
import ReactDOM from 'react-dom/client';

// Make React available in the module scope for JSX transformation
// This ensures React.createElement calls work in the bundled code
const React = ReactDefault;

// Make React available globally as well
if (typeof window !== 'undefined') {
  window.React = React;
}

// Import Silk component (it already includes Canvas)
import Silk from './Silk';

// Silk background component - fill container for desktop
function SilkBackground() {
  return React.createElement('div', {
    style: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, minHeight: '100vh' }
  }, React.createElement(Silk, {
    speed: 3.1,
    scale: 0.9,
    color: "#333333",
    noiseIntensity: 2.8,
    rotation: 0.6
  }));
}

// Initialize when DOM is ready - this will execute when bundle loads
(function initSilkBackground() {
  function init() {
    const container = document.getElementById('silk-background');
    if (!container) {
      console.log('Waiting for silk-background container...');
      setTimeout(init, 100);
      return;
    }
    
    // React and ReactDOM are imported at the top, so they're available in the bundle
    try {
      console.log('Initializing Silk background...');
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(SilkBackground));
      console.log('✅ Silk background initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing Silk background:', error);
      // Fallback: try again after a short delay
      setTimeout(init, 200);
    }
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded, wait a bit for everything to be ready
    setTimeout(init, 200);
  }
})();

