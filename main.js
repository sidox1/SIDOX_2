/* =========================================================
   SIDOX — Main JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Scroll-based nav shadow ---- */
  const navWrap = document.querySelector('.nav-wrap');
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 40;
    if (navWrap) navWrap.classList.toggle('scrolled', scrolled);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* ---- Hamburger menu ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ---- Reveal on scroll (IntersectionObserver) ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ---- Active nav link ---- */
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  /* ---- Animated counter for stats ---- */
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (statNums.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          const duration = 1400;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target % 1 === 0
              ? Math.round(eased * target)
              : (eased * target).toFixed(1);
            el.innerHTML = prefix + value + '<span>' + suffix + '</span>';
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => counterObserver.observe(el));
  }

  /* ---- FAQ accordion ---- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const body = item.querySelector('.faq-body');
    if (!trigger || !body) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(fi => {
        fi.classList.remove('open');
        const fb = fi.querySelector('.faq-body');
        if (fb) fb.style.maxHeight = '0';
      });
      // Open clicked if was closed
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 88; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Subtle parallax on hero ---- */
  const heroVisual = document.querySelector('.hero-visual-wrap');
  if (heroVisual) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.12;
      heroVisual.style.transform = `translateY(${y}px)`;
    }, { passive: true });
  }

  /* ---- Tooltip for nav CTA ---- */
  const ctaBtns = document.querySelectorAll('.nav-cta');
  ctaBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transition = 'transform .3s, box-shadow .3s';
    });
  });

});
