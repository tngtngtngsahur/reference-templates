# Reference templates — quick notes

Three deeper takes on the base `joe-template` (which stays in the project root).
All plain HTML/CSS/JS, no build step. Placeholders (`TEMPLATE:` comments, links,
contract address) work the same in every one.

## joe-template-terminal — "trading desk"
Dark monospace Bloomberg-terminal vibe. Boot sequence, ticker tape, CRT
scanlines, flickering live price, self-updating candlestick chart, log-file
lore, ASCII tokenomics bars. **Use when:** you want serious/degen trader energy.

## joe-template-editorial — "The Joe Journal"
Light print-newspaper look. Serif masthead with live date, drop-cap essay,
tilted newspaper-clipping receipts, market ledger, timeline, letters-to-the-
editor FAQ. **Use when:** you want a classy, ironic, editorial brand.

## joe-template-aurora — modern glassy crypto
Dark with aurora gradients + starfield. Glass cards, 3D mouse-tilt coin,
animated donut tokenomics, roadmap progress bars, receipts carousel, accordion
FAQ. **Use when:** you want a polished, contemporary DEX-landing look.

## Run any of them

```sh
npx http-server . -p 4173        # from inside a variant folder
```

Or use the `joe-variants` launch config (serves the repo root on :4174), then
open `/reference-templates/<variant>/`.
