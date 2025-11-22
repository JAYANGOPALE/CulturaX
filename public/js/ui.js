// Particles background
function initParticles() {
  const canvasContainer = document.getElementById("cx-particles");
  if (!canvasContainer) return;
  const canvas = document.createElement("canvas");
  canvasContainer.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = Array.from({ length: 70 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 0.8 + Math.random() * 1.8,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    a: 0.2 + Math.random() * 0.4,
  }));

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(step);
  }
  step();
}

// Scroll reveal
function initReveal() {
  const els = document.querySelectorAll(".cx-reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("cx-reveal-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("cx-reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => observer.observe(el));
}

// Parallax hero
function initParallax() {
  const root = document.querySelector(".cx-parallax-root");
  const layer = document.querySelector(".cx-parallax-layer");
  if (!root || !layer) return;

  root.addEventListener("mousemove", (e) => {
    const rect = root.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const depth = Number(layer.dataset.depth || 0.3);
    layer.style.transform = `translate(${x * depth * 30}px, ${
      y * depth * 30
    }px)`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initReveal();
  initParallax();
  initScrollMotion();
});

function initScrollMotion() {
  const elements = Array.from(document.querySelectorAll("[data-scroll-speed]"));
  if (!elements.length) return;

  const handle = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    elements.forEach((el) => {
      const speed = parseFloat(el.dataset.scrollSpeed) || 1;
      const translate = (scrollTop * speed) / 20;
      el.style.transform = `translateY(${translate}px)`;
    });
  };

  handle();
  window.addEventListener("scroll", () => requestAnimationFrame(handle));
}


