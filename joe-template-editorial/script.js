/* ============================================================
   The Joe Journal — date stamp, scroll progress, scrollspy,
   section reveals, animated counters, contract copy.
   ============================================================ */

/* ---------- masthead date ---------- */
const dateEl = document.getElementById("today-date");
dateEl.textContent = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

/* ---------- scroll progress bar ---------- */
const progressEl = document.getElementById("progress");
function updateProgress() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  progressEl.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* ---------- scrollspy for the side index ---------- */
const spyLinks = [...document.querySelectorAll(".side-index a")];
const spyTargets = spyLinks
  .map((a) => document.getElementById(a.dataset.spy))
  .filter(Boolean);

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      spyLinks.forEach((a) =>
        a.classList.toggle("active", a.dataset.spy === entry.target.id)
      );
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);
spyTargets.forEach((el) => spyObserver.observe(el));

/* ---------- animated counters ---------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const dur = 1300;
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

/* ---------- section reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".section-reveal").forEach((el) => revealObserver.observe(el));

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
