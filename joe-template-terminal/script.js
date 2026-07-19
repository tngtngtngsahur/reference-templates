/* ============================================================
   JOE_TERMINAL — boot sequence, typed tagline, live candles,
   animated counters + bars, copy button, reveals.
   ============================================================ */

/* ---------- boot sequence ---------- */
const boot = document.getElementById("boot");
const bootText = document.getElementById("boot-text");
const BOOT_LINES = [
  "JOE_TERMINAL v1.0.0",
  "loading vibes.......... OK",
  "mounting /dev/chart.... OK",
  "verifying regularity... 100% REGULAR",
  "> system online_",
];

function runBoot() {
  let line = 0;
  const timer = setInterval(() => {
    bootText.textContent = BOOT_LINES.slice(0, line + 1).join("\n");
    line += 1;
    if (line >= BOOT_LINES.length) {
      clearInterval(timer);
      setTimeout(() => boot.classList.add("done"), 420);
    }
  }, 210);
  boot.addEventListener("click", () => {
    clearInterval(timer);
    boot.classList.add("done");
  });
}
runBoot();

/* ---------- ticker tape (duplicate content for seamless loop) ---------- */
const tapeTrack = document.getElementById("tape-track");
tapeTrack.innerHTML += tapeTrack.innerHTML;

/* ---------- typed tagline ---------- */
const typedEl = document.getElementById("typed");
const TYPED_PHRASES = [
  "The internet's favorite regular guy. Now living rent-free on-chain.",
  "No roadmap theater. No utility cosplay. Just Joe.",
  "Everybody already knows Joe. The token just showed up.",
];
let phraseIdx = 0;

function typePhrase(text, done) {
  let i = 0;
  typedEl.textContent = "";
  const t = setInterval(() => {
    typedEl.textContent = text.slice(0, ++i);
    if (i >= text.length) {
      clearInterval(t);
      setTimeout(done, 2600);
    }
  }, 26);
}
function erasePhrase(done) {
  const t = setInterval(() => {
    typedEl.textContent = typedEl.textContent.slice(0, -1);
    if (!typedEl.textContent.length) {
      clearInterval(t);
      done();
    }
  }, 9);
}
function typeLoop() {
  typePhrase(TYPED_PHRASES[phraseIdx % TYPED_PHRASES.length], () =>
    erasePhrase(() => {
      phraseIdx += 1;
      typeLoop();
    })
  );
}
setTimeout(typeLoop, 1400);

/* ---------- live price flicker ---------- */
const priceEl = document.getElementById("live-price");
const deltaEl = document.getElementById("live-delta");
let price = 0.000651;
let delta = 110.0;

setInterval(() => {
  const move = (Math.random() - 0.42) * 0.000012;
  price = Math.max(0.0001, price + move);
  delta = Math.max(-99, delta + move * 1e6 * 0.16);
  priceEl.textContent = `$${price.toFixed(6)}`;
  deltaEl.textContent = `${delta >= 0 ? "▲ +" : "▼ "}${delta.toFixed(2)}%`;
  deltaEl.className = `hero-price-delta ${delta >= 0 ? "up" : ""}`;
  priceEl.classList.add("tick");
  setTimeout(() => priceEl.classList.remove("tick"), 260);
}, 2200);

/* ---------- live log timestamp ---------- */
const logNow = document.getElementById("log-now");
function stampNow() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  logNow.textContent = `[${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}]`;
}
stampNow();
setInterval(stampNow, 30000);

/* ---------- candlestick chart ---------- */
const chart = document.getElementById("candle-chart");
const W = 800, H = 320, N = 34;
let candles = [];

function seedCandles() {
  let p = 100;
  candles = [];
  for (let i = 0; i < N; i++) {
    const c = nextCandle(p);
    candles.push(c);
    p = c.c;
  }
}
function nextCandle(open) {
  const drift = 0.42; // green-leaning random walk
  const move = (Math.random() - drift) * 7;
  const close = Math.max(20, open + move);
  const high = Math.max(open, close) + Math.random() * 3.4;
  const low = Math.min(open, close) - Math.random() * 3.4;
  return { o: open, c: close, h: high, l: low };
}
function renderCandles() {
  const min = Math.min(...candles.map((c) => c.l));
  const max = Math.max(...candles.map((c) => c.h));
  const y = (v) => H - 14 - ((v - min) / (max - min || 1)) * (H - 28);
  const step = W / N;
  const bw = step * 0.5;
  let svg = `<rect width="${W}" height="${H}" fill="#060a07"/>`;
  for (let i = 1; i < 5; i++) {
    svg += `<line x1="0" y1="${(H / 5) * i}" x2="${W}" y2="${(H / 5) * i}" stroke="#12241a" stroke-width="1"/>`;
  }
  candles.forEach((c, i) => {
    const x = i * step + step / 2;
    const up = c.c >= c.o;
    const col = up ? "#00e66b" : "#ff5d5d";
    const bodyTop = y(Math.max(c.o, c.c));
    const bodyH = Math.max(2, Math.abs(y(c.o) - y(c.c)));
    svg += `<line x1="${x}" y1="${y(c.h)}" x2="${x}" y2="${y(c.l)}" stroke="${col}" stroke-width="1.6"/>`;
    svg += `<rect x="${x - bw / 2}" y="${bodyTop}" width="${bw}" height="${bodyH}" fill="${col}" rx="1"/>`;
  });
  const last = candles[candles.length - 1];
  svg += `<line x1="0" y1="${y(last.c)}" x2="${W}" y2="${y(last.c)}" stroke="rgba(0,230,107,0.35)" stroke-width="1" stroke-dasharray="5 5"/>`;
  chart.innerHTML = svg;
}
seedCandles();
renderCandles();
setInterval(() => {
  candles.push(nextCandle(candles[candles.length - 1].c));
  if (candles.length > N) candles.shift();
  renderCandles();
}, 1600);

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

/* ---------- tokenomics bars ---------- */
function animateBars(section) {
  section.querySelectorAll(".bar-row").forEach((row) => {
    const fill = row.querySelector(".bar-fill");
    fill.style.width = `${Math.max(1.5, parseFloat(row.dataset.pct))}%`;
  });
}

/* ---------- reveal on scroll (also triggers counters/bars) ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);
      if (entry.target.querySelector(".bar-row")) animateBars(entry.target);
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
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
