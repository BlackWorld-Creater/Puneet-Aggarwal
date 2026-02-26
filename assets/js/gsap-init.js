/* ========================================
   GSAP INITIALIZATION
   Enhanced GSAP setup with ScrollTrigger
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Register GSAP plugins
  if (typeof gsap !== "undefined") {
    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Global GSAP configuration
    gsap.config({
      force3D: true,
      nullTargetWarn: false
    });
    
    // Default scroll trigger settings
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.defaults({
        toggleActions: "play none none reverse",
        refreshPriority: -1
      });
    }
  }
  
  // Add smooth scroll indicator animation
  const scrollIndicator = document.querySelector('.scroll-indicator-line');
  if (scrollIndicator) {
    scrollIndicator.style.animation = 'scrollBounce 2s ease-in-out infinite';
  }
});
