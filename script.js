/* ==========================================================================
   CODEX SORCIER SITH — comportements interactifs
   ==========================================================================
   1. Fil d'Ariane actif au scroll (scrollspy)
   2. Apparition des cartes au scroll
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initScrollspy();
  initRevealOnScroll();
});


/* --------------------------------------------------------------------------
   1. SCROLLSPY — surligne le lien de nav correspondant à la section visible
   -------------------------------------------------------------------------- */
function initScrollspy() {
  const sections = Array.from(document.querySelectorAll("h1[id], h2[id]"));
  const navLinks = Array.from(
    document.querySelectorAll('.menuNav a[href^="#"], .toc-sidebar a[href^="#"]')
  );

  if (!sections.length || !navLinks.length) return;

  const linksByTarget = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    if (!linksByTarget.has(id)) linksByTarget.set(id, []);
    linksByTarget.get(id).push(link);
  });

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });
    const active = linksByTarget.get(id);
    if (active) {
      active.forEach((link) => {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      });
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // On prend la section la plus haute actuellement visible
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActive(visible[0].target.id);
      }
    },
    {
      // Bande de détection sous la navbar fixe, sur le premier tiers de l'écran
      rootMargin: "-90px 0px -70% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}


/* --------------------------------------------------------------------------
   2. APPARITION DES CARTES AU SCROLL
   -------------------------------------------------------------------------- */
function initRevealOnScroll() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Si l'utilisateur préfère moins d'animations, tout reste visible tel quel
  if (prefersReducedMotion) return;

  const targets = document.querySelectorAll(
    ".pair, .role, .sphere, .rituel, .sort, .jedi-noir, .figure, .creature, .carte-savoir"
  );
  if (!targets.length) return;

  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}
