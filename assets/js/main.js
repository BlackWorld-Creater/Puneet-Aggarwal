// Preloader
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector(".preloader");

  // Hide preloader after page loads
  window.addEventListener("load", function () {
    setTimeout(function () {
      preloader.classList.add("hide");
    }, 1500);
  });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll effect
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
  }
});

// Add animation on scroll for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".vision-card, .value-item, .venture-card, .timeline-item, .competency-item",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

// Hero scroll down button functionality
const heroScroll = document.querySelector(".hero-scroll");

heroScroll.addEventListener("click", function () {
  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    aboutSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});

// Active navlink on scroll
const sections = document.querySelectorAll("section[id]");

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Remove active class from all navlinks
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });
        // Add active class to current section's navlink
        navLink.classList.add("active");
      }
    }
  });

  // Special case: If at the very top (before first section), highlight Home
  if (scrollY < 100) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
      homeLink.classList.add("active");
    }
  }
}

// Run on scroll
window.addEventListener("scroll", highlightNavOnScroll);

// Run on page load to set initial active state
document.addEventListener("DOMContentLoaded", highlightNavOnScroll);
