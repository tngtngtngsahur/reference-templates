# JOE — memecoin landing template (aurora / glass edition)

A dark, modern-crypto take on the JOE template: animated aurora gradient blobs,
twinkling starfield canvas, glassmorphism cards, a 3D mouse-tilt coin with
orbiting fact chips, animated stat counters, a tokenomics donut chart, a
three-step how-to-buy row, roadmap cards with progress bars, a scroll-snap
receipts carousel, and an accordion FAQ.

Plain HTML/CSS/JS — no build step, no framework.

## Run it

```sh
npx http-server . -p 4173
# or: python3 -m http.server 4173
```

## Rebrand checklist

1. **Design tokens** — CSS variables at the top of `styles.css`
   (`--bg`, `--green`, `--teal`, `--purple`, glass tokens, fonts…).
2. **Mascot art** — the coin face is inline SVG in `index.html`
   (`.coin`, header `.brand-coin`). Swap for your own asset.
3. **Links** — every `href="#"` marked with a `TEMPLATE:` comment.
4. **Contract address** — `#contract-address` in the hero pill, plus footer.
5. **Market stats** — hardcoded placeholders in `#stats`; wire to your API.
6. **Tokenomics / roadmap** — edit the cards and `data-progress` values.
7. **Receipts** — replace the four carousel cards with real embedded posts.

## Files

- `index.html` — markup + inline SVG coin art
- `styles.css` — design tokens, glass system, responsive rules
- `script.js` — starfield, tilt, counters, donut, carousel, FAQ, copy button
