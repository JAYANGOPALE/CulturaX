/* -----------------------------
   SCROLL REVEAL ANIMATION
----------------------------- */

function revealOnScroll() {
    const elements = document.querySelectorAll(".reveal");

    elements.forEach((el) => {
        const position = el.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);



/* -----------------------------
   PARTICLE BACKGROUND
----------------------------- */

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.getElementById("particles").appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

function generateParticles() {
    particlesArray = [];
    const total = 90;

    for (let i = 0; i < total; i++) {
        particlesArray.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5
        });
    }
}

generateParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.fillStyle = "rgba(212,175,55,0.8)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateParticles();
});



/* -----------------------------
   TILT HOVER EFFECT
----------------------------- */

const tiltElements = document.querySelectorAll(".tilt");

tiltElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `perspective(600px) rotateX(${-(y / 25)}deg) rotateY(${x / 25}deg)`;
    });

    el.addEventListener("mouseleave", () => {
        el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
    });
});



/* -----------------------------
   TEAM CARD SLIDE EFFECT
----------------------------- */

const teamCards = document.querySelectorAll(".slide-card");

teamCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateX(15px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateX(0)";
    });
});


