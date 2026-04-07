const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll("#nav a");

if (menuToggle && nav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú principal");
    nav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute(
      "aria-label",
      expanded ? "Abrir menú principal" : "Cerrar menú principal"
    );
    nav.classList.toggle("is-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth <= 960 && nav.classList.contains("is-open")) {
      const target = event.target;
      if (
        target instanceof Node &&
        !nav.contains(target) &&
        !menuToggle.contains(target)
      ) {
        closeMenu();
      }
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function initRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("in-view"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

function initSkillsAnimation() {
  const skillsSection = document.getElementById("habilidades");
  const skillFills = document.querySelectorAll(".skill-fill");
  if (!skillsSection || !skillFills.length) return;

  const fillSkills = () => {
    skillFills.forEach((fill) => {
      const level = fill.getAttribute("data-level");
      if (level) fill.style.width = `${level}%`;
    });
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    fillSkills();
    return;
  }

  if (!("IntersectionObserver" in window)) {
    fillSkills();
    return;
  }

  const skillsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fillSkills();
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  skillsObserver.observe(skillsSection);
}

document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations();
  initSkillsAnimation();
});
