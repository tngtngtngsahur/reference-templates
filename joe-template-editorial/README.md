# The Joe Journal — memecoin landing template (editorial edition)

A light, print-magazine take on the JOE template: double-ruled masthead with a
live date, staggered serif headline reveal, drop-cap two-column essay,
newspaper-clipping "receipts," a market ledger with animated counters, a
chronology timeline, numbered how-to-acquire columns, letters-to-the-editor
FAQ, and a giant ghost-word footer. Scroll progress bar and a fixed scrollspy
section index on desktop.

Plain HTML/CSS/JS — no build step, no framework.

## Run it

```sh
npx http-server . -p 4173
# or: python3 -m http.server 4173
```

## Rebrand checklist

1. **Design tokens** — CSS variables at the top of `styles.css`
   (`--paper`, `--ink`, `--green`, `--red`, fonts…).
2. **Mascot art** — inline SVG portrait in `index.html` (`.portrait-frame`),
   plus the three clipping illustrations.
3. **Links** — every `href="#"` marked with a `TEMPLATE:` comment.
4. **Contract address** — `#contract-address` above the fold, plus footer.
5. **Market stats** — the ledger numbers are hardcoded placeholders; the chart
   figure has a slot comment for a real embed.
6. **Copy** — masthead lines, essay, timeline entries, and letters.

## Files

- `index.html` — markup + inline SVG placeholder art
- `styles.css` — design tokens, editorial layout, responsive rules
- `script.js` — date stamp, progress bar, scrollspy, counters, copy button
