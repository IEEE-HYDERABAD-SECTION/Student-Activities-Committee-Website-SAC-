// IEEE SAC modern site - small enhancers, no framework.

(function () {
  "use strict";

  // ---------- Sticky header shadow on scroll ----------
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---------- Mobile nav toggle ----------
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMobile = document.querySelector("[data-nav-mobile]");
  if (navToggle && navMobile) {
    navToggle.addEventListener("click", () => {
      const open = navMobile.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  // ---------- Theme toggle ----------
  // Reads actual visual state so first click always produces a visible change,
  // even when system preference is already dark/light.
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const STORAGE_KEY = "sac-theme";

  function currentlyDark() {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark") return true;
    if (attr === "light") return false;
    return false;
  }

  function applyTheme(t) {
    if (t === "light" || t === "dark") {
      document.documentElement.setAttribute("data-theme", t);
      localStorage.setItem(STORAGE_KEY, t);
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  // Restore saved preference on load
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      applyTheme(currentlyDark() ? "light" : "dark");
    });
  }

  // ---------- Reveal on scroll (IntersectionObserver) ----------
  // js-ready class enables opacity-0 in CSS - content is always visible without JS.
  document.documentElement.classList.add("js-ready");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.04 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  // ---------- Megamenu keyboard a11y ----------
  document.querySelectorAll(".nav-primary > li > button.nav-link").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".nav-primary > li > button.nav-link").forEach((o) => o.setAttribute("aria-expanded", "false"));
      trigger.setAttribute("aria-expanded", String(!expanded));
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-primary")) {
      document.querySelectorAll(".nav-primary > li > button.nav-link[aria-expanded='true']").forEach((o) => o.setAttribute("aria-expanded", "false"));
    }
  });

  // ---------- Lightweight carousels ----------
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const section = carousel.closest(".hero-carousel") || carousel.parentElement;
    const prev = section ? section.querySelector("[data-carousel-prev]") : null;
    const next = section ? section.querySelector("[data-carousel-next]") : null;
    const dots = section ? Array.from(section.querySelectorAll("[data-carousel-dot]")) : [];
    const slides = track ? Array.from(track.children) : [];
    if (!track) return;
    let index = 0;
    let timer = null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function setActive(nextIndex, smooth = true) {
      if (!slides.length) return;
      index = (nextIndex + slides.length) % slides.length;
      carousel.classList.toggle("is-instant", !smooth);
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      if (!smooth) requestAnimationFrame(() => carousel.classList.remove("is-instant"));
      dots.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("is-active", active);
        if (active) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    }

    function restartAutoplay() {
      window.clearInterval(timer);
      if (reduceMotion || slides.length < 2) return;
      timer = window.setInterval(() => setActive(index + 1), 5000);
    }

    if (prev) prev.addEventListener("click", () => { setActive(index - 1); restartAutoplay(); });
    if (next) next.addEventListener("click", () => { setActive(index + 1); restartAutoplay(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { setActive(i); restartAutoplay(); }));
    const pauseTarget = section || carousel;
    pauseTarget.addEventListener("mouseenter", () => window.clearInterval(timer));
    pauseTarget.addEventListener("mouseleave", restartAutoplay);
    pauseTarget.addEventListener("focusin", () => window.clearInterval(timer));
    pauseTarget.addEventListener("focusout", restartAutoplay);

    setActive(0, false);
    restartAutoplay();
  });
})();
