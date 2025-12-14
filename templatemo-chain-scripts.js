/* JavaScript Document
TemplateMo 601 Chain Summit
https://templatemo.com/tm-601-chain-summit
*/

// ================= URL FIX =================
(function () {
  const path = window.location.pathname;
  if (path.endsWith(".html")) {
    let newPath = path.replace(".html", "");
    if (newPath === "/index") newPath = "/";
    window.history.replaceState({}, document.title, newPath);
  }
})();

// ================= COUNTERS =================
function animateCounters() {
  document.querySelectorAll(".stat-number").forEach(counter => {
    const target = parseInt(counter.dataset.target);
    let current = 0;
    const inc = target / 200;
    const timer = setInterval(() => {
      current += inc;
      counter.textContent = Math.floor(current);
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      }
    }, 10);
  });
}

// ================= BACKGROUND ANIMATION =================
function createNeuralNetwork() {
  const container = document.getElementById("neuralNetwork");
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const n = document.createElement("div");
    n.className = "node";
    n.style.left = Math.random() * 100 + "%";
    n.style.top = Math.random() * 100 + "%";
    container.appendChild(n);
  }
}

function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    container.appendChild(p);
  }
}

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute("href"));
    if (t) t.scrollIntoView({ behavior: "smooth" });
  });
});

// ================= HEADER SCROLL =================
window.addEventListener("scroll", () => {
  const h = document.querySelector("header");
  if (!h) return;
  h.style.background =
    window.scrollY > 80
      ? "rgba(10,10,15,.95)"
      : "rgba(10,10,15,.85)";
});

// ================= 🔥 HERO + SERVICES FINAL FIX =================
document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector("header");
  const hero =
    document.getElementById("hero") ||
    document.querySelector(".business-hero");

  const services = document.getElementById("services");
  const bg = document.querySelector(".bg-animation");

  const headerH = header ? header.offsetHeight : 80;

  /* HERO */
  if (hero) {
    hero.style.minHeight = `calc(100vh - ${headerH}px)`;
    hero.style.display = "flex";
    hero.style.alignItems = "center";
    hero.style.justifyContent = "center";
    hero.style.paddingTop = headerH + "px";
    hero.style.paddingBottom = "80px";
    hero.style.position = "relative";
    hero.style.zIndex = "5";
  }

  /* BACKGROUND */
  if (bg) {
    bg.style.position = "fixed";
    bg.style.inset = "0";
    bg.style.zIndex = "0";
    bg.style.pointerEvents = "none";
  }

  /* SERVICES */
  if (services) {
    services.style.marginTop = "0";
    services.style.paddingTop = "120px";
    services.style.position = "relative";
    services.style.zIndex = "6";
  }
});

// ================= INIT =================
window.addEventListener("load", () => {
  animateCounters();
  createNeuralNetwork();
  createParticles();
});
