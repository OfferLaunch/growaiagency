// Entry point for ChromaGrid component
// This will be bundled with esbuild

import ReactDefault from 'react';
import ReactDOM from 'react-dom/client';

// Make React available in the module scope for JSX transformation
const React = ReactDefault;

// Make React available globally as well
if (typeof window !== 'undefined') {
  window.React = React;
}

// Import ChromaGrid component
import ChromaGrid from './components/ChromaGrid/ChromaGrid.jsx';

// Items data - Team members
const items = [
  {
    image: "assets/images/photos/jake headshot.jpg",
    title: "Jacob Arnold",
    subtitle: "CEO & Founder",
    handle: "@thejakearnold",
    borderColor: "#5CC49D",
    gradient: "linear-gradient(145deg, #5CC49D, #000)",
    url: ""
  },
  {
    image: "assets/images/photos/JCA08700.jpg",
    title: "Andrew Mudd",
    subtitle: "CTO",
    handle: "@itsandymudd",
    borderColor: "#5CC49D",
    gradient: "linear-gradient(180deg, #5CC49D, #000)",
    url: ""
  }
];

// ChromaGrid component wrapper - container already has height
function ChromaGridWrapper() {
  return React.createElement(ChromaGrid, {
    items: items,
    radius: 300,
    columns: 2,
    rows: 1,
    damping: 0.45,
    fadeOut: 0.6,
    ease: "power3.out"
  });
}

// Initialize when DOM is ready
(function initChromaGrid() {
  function init() {
    const container = document.getElementById('chroma-grid');
    if (!container) {
      console.log('Waiting for chroma-grid container...');
      setTimeout(init, 100);
      return;
    }
    
    try {
      console.log('Initializing ChromaGrid...');
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(ChromaGridWrapper));
      console.log('✅ ChromaGrid initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing ChromaGrid:', error);
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

