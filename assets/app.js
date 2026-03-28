document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const navAnchors = navLinks ? [...navLinks.querySelectorAll('a[href^="#"]')] : [];

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.textContent = open ? "Close" : "Menu";
    });

    navAnchors.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "Menu";
      });
    });
  }

  const reveals = [...document.querySelectorAll(".reveal")];
  if (prefersReducedMotion) {
    reveals.forEach((node) => node.classList.add("visible"));
  } else if (reveals.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -48px 0px",
      },
    );

    reveals.forEach((node) => revealObserver.observe(node));
  }

  const sections = navAnchors
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && navAnchors.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const id = `#${entry.target.id}`;
          navAnchors.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === id);
          });
        });
      },
      {
        threshold: 0.45,
        rootMargin: "-20% 0px -45% 0px",
      },
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }
});
