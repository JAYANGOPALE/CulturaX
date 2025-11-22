document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const links = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 40;
    header?.classList.toggle("header-scrolled", scrolled);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});

