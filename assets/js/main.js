/* ========================================
   MAIN.JS - DR. PUNEET AGGARWAL PORTFOLIO
   Enhanced with More Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // PRELOADER
  // ========================================
  const preloader = document.querySelector('.preloader');
  
  if (preloader) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        preloader.classList.add('hidden');
        
        // Trigger hero animations after preloader hides
        setTimeout(function() {
          const heroContent = document.querySelector('.hero-personal-content');
          if (heroContent) {
            heroContent.classList.add('animated');
          }
        }, 300);
      }, 2000);
    });
  }
  
  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Animate hamburger
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close menu on link click
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }
  
  // ========================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ========================================
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      fadeElements.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      fadeElements.forEach(function(el) {
        el.classList.add('visible');
      });
    }
  }
  
  // Fallback timeout - ensure visibility after 3 seconds even if observer doesn't trigger
  setTimeout(function() {
    const hiddenElements = document.querySelectorAll('.fade-in:not(.visible)');
    hiddenElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }, 3000);
  
  // ========================================
  // SECTION TRANSITION ANIMATIONS
  // ========================================
  const sections = document.querySelectorAll('.section');
  
  if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-transition-up');
          setTimeout(function() {
            entry.target.classList.add('visible');
          }, 100);
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(function(section) {
      sectionObserver.observe(section);
    });
  }
  
  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // ========================================
  // ACTIVE NAV LINK ON SCROLL
  // ========================================
  const sections2 = document.querySelectorAll('section[id]');
  
  if (sections2.length > 0) {
    window.addEventListener('scroll', function() {
      const scrollY = window.pageYOffset;
      
      sections2.forEach(function(section) {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 200;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          const navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
          if (navLink) {
            document.querySelectorAll('.nav-link').forEach(function(link) {
              link.classList.remove('active');
            });
            navLink.classList.add('active');
          }
        }
      });
    });
  }
  
  // ========================================
  // PARALLAX EFFECT FOR HERO
  // ========================================
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const heroContent = heroSection.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        heroContent.style.opacity = 1 - (scrolled / 600);
      }
    });
  }
  
  // ========================================
  // ENHANCED COUNTER ANIMATION
  // ========================================
  const statNumbers = document.querySelectorAll('.stat-item h3');
  
  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetText = target.textContent;
          const targetNum = parseInt(targetText.replace(/[^0-9]/g, ''));
          const suffix = targetText.replace(/[0-9]/g, '');
          let current = 0;
          const increment = targetNum / 60;
          const duration = 2500;
          const stepTime = duration / 60;
          
          // Add counting effect
          target.style.transform = 'scale(1.1)';
          
          const counter = setInterval(function() {
            current += increment;
            if (current >= targetNum) {
              current = targetNum;
              clearInterval(counter);
              target.style.transform = 'scale(1)';
            }
            target.textContent = Math.floor(current) + suffix;
          }, stepTime);
          
          counterObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(function(stat) {
      counterObserver.observe(stat);
    });
  }
  
  // ========================================
  // CARD TILT EFFECT
  // ========================================
  const tiltCards = document.querySelectorAll('.feature-card, .leadership-card, .value-card, .directorship-card, .enterprise-card, .project-card, .media-card, .vision-card, .csr-item');
  
  if (tiltCards.length > 0) {
    tiltCards.forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }
  
  // ========================================
  // IMAGE REVEAL ANIMATION
  // ========================================
  const revealImages = document.querySelectorAll('.about-image img, .enterprise-image img, .project-image img, .media-image img');
  
  if (revealImages.length > 0) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'scale(1)';
          imageObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    revealImages.forEach(function(img) {
      img.style.transform = 'scale(1.2)';
      img.style.transition = 'transform 1.5s ease-out';
      imageObserver.observe(img);
    });
  }
  
  // ========================================
  // LIST ITEM ANIMATIONS
  // ========================================
  const listItems = document.querySelectorAll('.focus-list li, .timeline-item');
  
  if (listItems.length > 0) {
    const listObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('list-item-animate');
          listObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    listItems.forEach(function(item) {
      listObserver.observe(item);
    });
  }
  
  // ========================================
  // FORM SUBMISSION
  // ========================================
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      // Simulate form submission
      setTimeout(function() {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#28a745';
        
        setTimeout(function() {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }
  
  // ========================================
  // SCROLL PROGRESS INDICATOR
  // ========================================
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-progress';
  scrollIndicator.style.cssText = 'position:fixed;top:0;left:0;width:0;height:3px;background:var(--gold-green-gradient);z-index:10000;transition:width 0.1s ease;';
  document.body.appendChild(scrollIndicator);
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollIndicator.style.width = scrollPercent + '%';
  });
  
  // ========================================
  // GSAP ANIMATIONS (Enhanced)
  // ========================================
  if (typeof gsap !== 'undefined') {
    
    // Register ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Hero animations - only run if elements exist on the page
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroBadge) {
      gsap.from('.hero-badge', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5
      });
    }
    
    if (heroTitle) {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.7
      });
    }
    
    if (heroSubtitle) {
      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.9
      });
    }
    
    if (heroButtons) {
      gsap.from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.1
      });
    }
    
    // Hero Personal Section Animations
    const heroPersonalImage = document.querySelector('.hero-personal-image');
    if (heroPersonalImage) {
      gsap.from(heroPersonalImage, {
        opacity: 0,
        x: 50,
        duration: 1.2,
        delay: 0.8,
        ease: 'power3.out'
      });
    }
    
    // Section Header Animations
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(function(header) {
      gsap.from(header, {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: header,
          start: 'top 80%'
        }
      });
    });
    
    // Feature cards stagger
    const featureCards = document.querySelectorAll('.feature-card');
    const featuresGrid = document.querySelector('.features-grid');
    
    if (featureCards.length > 0 && featuresGrid) {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.from(featureCards, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuresGrid,
            start: 'top 80%'
          }
        });
      } else {
        gsap.from(featureCards, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out'
        });
      }
    }
    
    // Leadership Cards
    const leadershipCards = document.querySelectorAll('.leadership-card');
    if (leadershipCards.length > 0 && typeof ScrollTrigger !== 'undefined') {
      gsap.from(leadershipCards, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.leadership-grid',
          start: 'top 80%'
        }
      });
    }
    
    // Value Cards
    const valueCards = document.querySelectorAll('.value-card');
    if (valueCards.length > 0 && typeof ScrollTrigger !== 'undefined') {
      gsap.from(valueCards, {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 85%'
        }
      });
    }
    
    // Project Cards
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0 && typeof ScrollTrigger !== 'undefined') {
      gsap.from(projectCards, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%'
        }
      });
    }
    
    // Media Cards
    const mediaCards = document.querySelectorAll('.media-card');
    if (mediaCards.length > 0 && typeof ScrollTrigger !== 'undefined') {
      gsap.from(mediaCards, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.media-grid',
          start: 'top 80%'
        }
      });
    }
    
    // Timeline Items
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0 && typeof ScrollTrigger !== 'undefined') {
      gsap.from(timelineItems, {
        opacity: 0,
        x: function(index) {
          return index % 2 === 0 ? -30 : 30;
        },
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 75%'
        }
      });
    }
    
    // Enterprise Cards
    const enterpriseCards = document.querySelectorAll('.enterprise-card');
    if (enterpriseCards.length > 0 && typeof ScrollTrigger !== 'undefined') {
      gsap.from(enterpriseCards, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%'
        }
      });
    }
    
    // Quote Section Animation
    const quoteSection = document.querySelector('.quote-section');
    if (quoteSection && typeof ScrollTrigger !== 'undefined') {
      gsap.from(quoteSection, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: quoteSection,
          start: 'top 70%'
        }
      });
    }
    
    // Contact Form Animation
    const contactForm2 = document.querySelector('.contact-form');
    if (contactForm2 && typeof ScrollTrigger !== 'undefined') {
      gsap.from(contactForm2, {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 75%'
        }
      });
    }
    
    // Stats Counter Animation with GSAP
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems.length > 0 && typeof ScrollTrigger !== 'undefined') {
      statItems.forEach(function(stat) {
        const statNumber = stat.querySelector('h3');
        if (statNumber) {
          const targetText = statNumber.textContent;
          const targetNum = parseInt(targetText.replace(/[^0-9]/g, ''));
          
          gsap.fromTo(statNumber, 
            { textContent: 0 },
            {
              textContent: targetNum,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: stat,
                start: 'top 85%'
              },
              onUpdate: function() {
                const suffix = targetText.replace(/[0-9]/g, '');
                statNumber.textContent = Math.ceil(this.targets()[0].textContent) + suffix;
              }
            }
          );
        }
      });
    }
    
    // Smooth parallax for hero background
    const heroBg = document.querySelector('.hero-bg-fallback');
    if (heroBg && typeof ScrollTrigger !== 'undefined') {
      gsap.to(heroBg, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
    
    // Horizontal scroll for features (optional - can be disabled)
    const featuresSection = document.querySelector('.features-grid');
    if (featuresSection && typeof ScrollTrigger !== 'undefined') {
      // Add subtle float animation to icons
      const featureIcons = document.querySelectorAll('.feature-icon');
      featureIcons.forEach(function(icon, index) {
        gsap.to(icon, {
          y: -5,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        });
      });
    }
  }
  
  // ========================================
  // CURSOR FOLLOWER (Optional Enhancement)
  // ========================================
  if (window.matchMedia('(min-width: 1024px)').matches) {
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', function(e) {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorDot.style.left = cursorX + 'px';
      cursorDot.style.top = cursorY + 'px';
    });
    
    function animateCursor() {
      followerX += (cursorX - followerX) * 0.1;
      followerY += (cursorY - followerY) * 0.1;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card-hover-effect, .feature-card, .project-card');
    interactiveElements.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.borderColor = 'var(--renewable-green)';
      });
      el.addEventListener('mouseleave', function() {
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.borderColor = 'var(--primary-gold)';
      });
    });
  }
  
});
