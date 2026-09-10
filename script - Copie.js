// Ajoute un écouteur d'événements sur le défilement
window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    // Si la page est défilée de plus de 50px
    navbar.classList.add("scrolled"); // Ajoute la classe scrolled
  } else {
    navbar.classList.remove("scrolled"); // Supprime la classe scrolled
  }
});

// Sélectionner tous les liens de la navbar
const navLinks = document.querySelectorAll(".navbar .liNav a");

// Ajouter un événement de clic pour chaque lien
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Si le lien est interne (commence par #), alors on empêche le comportement par défaut
    if (href.startsWith("#")) {
      e.preventDefault();

      const targetSection = document.querySelector(href);

      if (targetSection) {
        const targetPosition = targetSection.offsetTop;

        window.scrollTo({
          top: targetPosition - 100,
          behavior: "smooth",
        });
      }
    }
    // Sinon, c'est un lien vers une autre page — laisser le comportement normal
  });
});
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
    e.preventDefault();
    alert("L'accès à la console développeur est désactivé.");
  }
});
