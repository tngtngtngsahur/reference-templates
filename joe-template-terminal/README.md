# JOE_TERMINAL — memecoin landing template (trading terminal edition)

A dark, monospace "trading desk" take on the JOE template: boot sequence,
scrolling ticker tape, CRT scanline overlay, typed tagline, live-flickering
price readout, self-animating candlestick chart, terminal-log lore section,
install-guide "how to buy", ASCII-style tokenomics bars, and man-page FAQ.

Plain HTML/CSS/JS — no build step, no framework.

## Run it

```sh
npx http-server . -p 4173
# or: python3 -m http.server 4173
```

## Rebrand checklist

1. **Design tokens** — CSS variables at the top of `styles.css`
   (`--bg`, `--green`, `--amber`, fonts…).
2. **Mascot art** — inline SVG in `index.html` (`.monitor-joe`, header avatar).
3. **Links** — every `href="#"` marked with a `TEMPLATE:` comment.
4. **Contract address** — `#contract-address` in the hero, plus footer.
5. **Market stats** — hardcoded placeholders in `#market`; the candle chart is
   generated in `script.js` and has a commented-out iframe slot for a real embed.
6. **Copy** — boot lines, typed phrases, and log entries live in `script.js`
   and `index.html`.

## Files

- `index.html` — markup + inline SVG placeholder art
- `styles.css` — design tokens, layout, responsive rules
- `script.js` — boot, typing, live price, candle chart, counters, copy button
