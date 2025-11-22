const CulturaXScrollReveal = (() => {
  const revealElements = [];

  function init() {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealElements.push(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  return {
    init,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  CulturaXScrollReveal.init();
});

