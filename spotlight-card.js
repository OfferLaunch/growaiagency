// Entry point for SpotlightCard - vanilla JS implementation
// This will be bundled with esbuild

// Initialize spotlight effect on tool cards using vanilla JS
(function initSpotlightCards() {
  function init() {
    const toolCards = document.querySelectorAll('.tool-card');
    if (toolCards.length === 0) {
      setTimeout(init, 100);
      return;
    }

    toolCards.forEach((card) => {
      // Skip if already initialized
      if (card.dataset.spotlightInitialized === 'true') {
        return;
      }

      // Add the card-spotlight class
      card.classList.add('card-spotlight');
      
      // Set the default spotlight color
      card.style.setProperty('--spotlight-color', 'rgba(92, 196, 157, 0.25)');
      
      // Add mouse move handler
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.dataset.spotlightInitialized = 'true';
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 200);
  }
})();
