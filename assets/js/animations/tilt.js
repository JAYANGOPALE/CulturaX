const CulturaXTilt = (() => {
  function init() {
    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("mousemove", (event) => handleMove(event, card));
      card.addEventListener("mouseleave", () => reset(card));
    });
  }

  function handleMove(event, card) {
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  }

  function reset(card) {
    card.style.transform = "";
  }

  return {
    init,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  CulturaXTilt.init();
});

