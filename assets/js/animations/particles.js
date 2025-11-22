const CulturaXParticles = (() => {
  const MAX_PARTICLES = 80;
  const particles = [];
  let canvas;
  let ctx;

  function init() {
    canvas = document.createElement("canvas");
    canvas.className = "particles";
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    resize();
    createParticles();
    animate();
    window.addEventListener("resize", resize);
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  return {
    init,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  CulturaXParticles.init();
});

