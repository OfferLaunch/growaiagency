(() => {
  // spotlight-card.js
  (function initSpotlightCards() {
    function init() {
      const toolCards = document.querySelectorAll(".tool-card");
      if (toolCards.length === 0) {
        setTimeout(init, 100);
        return;
      }
      toolCards.forEach((card) => {
        if (card.dataset.spotlightInitialized === "true") {
          return;
        }
        card.classList.add("card-spotlight");
        card.style.setProperty("--spotlight-color", "rgba(92, 196, 157, 0.25)");
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        };
        card.addEventListener("mousemove", handleMouseMove);
        card.dataset.spotlightInitialized = "true";
      });
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      setTimeout(init, 200);
    }
  })();
})();
