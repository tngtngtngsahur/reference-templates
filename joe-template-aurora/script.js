/* ============================================================
   JOE (aurora edition) — starfield, coin tilt, counters,
   donut + roadmap animation, carousel, FAQ accordion, copy.
   ============================================================ */

/* ---------- starfield canvas ---------- */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.floor((canvas.width * canvas.height) / 11000);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.3 + 0.3,
    tw: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.015 + 0.004,
  }));
}
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    s.tw += s.speed;
    const alpha = 0.25 + Math.abs(Math.sin(s.tw)) * 0.55;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(238, 241, 248, ${alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
initStars();
drawStars();
window.addEventListener("resize", initStars);

/* ---------- 3D coin tilt ---------- */
const tiltWrap = document.getElementById("coin-tilt");
const coin = tiltWrap.querySelector(".coin");

tiltWrap.addEventListener("mousemove", (e) => {
  const rect = tiltWrap.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width - 0.5;
  const py = (e.clientY - rect.top) / rect.height - 0.5;
  coin.style.transform = `rotateY(${px * 26}deg) rotateX(${-py * 26}deg)`;
});
tiltWrap.addEventListener("mouseleave", () => {
  coin.style.transform = "rotateY(0deg) rotateX(0deg)";
});

/* ---------- animated counters ---------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const dur = 1400;
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = target * eased;
    el.textContent = decimals
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString("en-US");
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- donut + roadmap bar animation ---------- */
const DONUT_CIRC = 2 * Math.PI * 78; // r=78

function animateSection(section) {
  section.querySelectorAll("[data-count]").forEach(animateCount);
  const donut = section.querySelector("#donut-seg");
  if (donut) donut.setAttribute("stroke-dasharray", `${DONUT_CIRC} 0`);
  section.querySelectorAll(".road-bar span").forEach((bar) => {
    bar.style.width = `${bar.dataset.progress}%`;
  });
}

/* ---------- section reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      animateSection(entry.target);
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".section-reveal").forEach((el) => revealObserver.observe(el));

/* ---------- receipts carousel ---------- */
const carousel = document.getElementById("carousel");
const CARD_STEP = 356; // card width + gap

document.getElementById("car-prev").addEventListener("click", () => {
  carousel.scrollBy({ left: -CARD_STEP, behavior: "smooth" });
});
document.getElementById("car-next").addEventListener("click", () => {
  carousel.scrollBy({ left: CARD_STEP, behavior: "smooth" });
});

/* ---------- FAQ accordion ---------- */
document.querySelectorAll(".faq-item").forEach((item) => {
  const q = item.querySelector(".faq-q");
  const a = item.querySelector(".faq-a");
  q.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((other) => {
      other.classList.remove("open");
      other.querySelector(".faq-a").style.maxHeight = "0px";
      other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      a.style.maxHeight = `${a.scrollHeight}px`;
      q.setAttribute("aria-expanded", "true");
    }
  });
});

/* ---------- contract copy ---------- */
const copyBtn = document.getElementById("copy-btn");
const toast = document.getElementById("toast");

copyBtn.addEventListener("click", async () => {
  const address = document.getElementById("contract-address").textContent.trim();
  try {
    await navigator.clipboard.writeText(address);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = address;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1600);
});
