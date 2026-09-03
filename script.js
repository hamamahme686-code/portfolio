// =========================================================
// BOOT SEQUENCE — plays once, then reveals the report + nav
// =========================================================
(function () {
  const bootScreen = document.getElementById('boot-screen');
  const skipBtn = document.getElementById('skip-boot');
  const nav = document.getElementById('site-nav');
  const report = document.getElementById('report');
  const AUTO_FINISH_MS = 6800;

  let finished = false;

  function finishBoot() {
    if (finished) return;
    finished = true;
    bootScreen.classList.add('boot-done');
    nav.classList.add('nav-visible');
    report.classList.add('report-visible');
    // Let anything below the fold that's already in view reveal immediately
    revealVisibleNow();
  }

  const timer = setTimeout(finishBoot, AUTO_FINISH_MS);

  skipBtn.addEventListener('click', () => {
    clearTimeout(timer);
    finishBoot();
  });

  // =========================================================
  // SCROLL REVEAL — fade/slide sections in as they enter view
  // =========================================================
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));

  function revealVisibleNow() {
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('in-view');
      }
    });
  }

  // =========================================================
  // MOBILE NAV TOGGLE
  // =========================================================
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('nav-open'));
  });
})();

