# Offset Guides sales page (Nzambi)

A static one-page site: `index.html` + `styles.css`. You don't need to build anything, and it has no external scripts, fonts, or trackers.

## Deploy to GitHub Pages (3 steps)

1. **Create a public repo for the site only**, e.g. `offset-guides-site`, and upload `index.html`, `styles.css`, and this README (plus `demo.mp4`/`demo.gif` if you add one).
2. In the repo, go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, pick `main` and `/ (root)`, and click **Save**.
3. Wait a minute, then open the URL GitHub shows (`https://<user>.github.io/<repo>/`). For your .net domain, enter it under **Settings → Pages → Custom domain**, add the DNS records GitHub lists at your registrar, and tick **Enforce HTTPS**.

> ⚠️ **Never put the paid product (the `.zxp`, installers, or the zip) in this repo.** Public repos can be downloaded by anyone. Host the paid file only on Gumroad / Lemon Squeezy and link to it with the Buy button.

## Placeholders to fill

Search `index.html` for `[` and `PLACEHOLDER`:

| Placeholder | Where | What to put |
|---|---|---|
| `#BUY_LINK_PLACEHOLDER` | 3 Buy buttons (header, hero, install band) | Your Gumroad / Lemon Squeezy product URL |
| `[PRICE]` | Header button, hero button, install band | Your price, with currency |
| `[DEMO]` block | Under the hero | Replace the `.demo-placeholder` div with a `<video>` or `<img>` (example in the HTML comment) |
| `[UPDATES_POLICY]` | FAQ "Do I get updates?" | How long updates are included and how buyers get them |
| `[REFUND_POLICY]` | FAQ "refund policy" | Your refund terms |
| `[CONFIRM] … [/CONFIRM]` | FAQ "When Adobe retires panels" | Check the UXP-port promise. Edit it, then remove the markers |
| `[SUPPORT_EMAIL]` | FAQ "help" + footer Contact link | Support address |
| `[DOMAIN]` | Footer link (`https://[DOMAIN].net`) | Your .net domain |
| `[YEAR]` | Footer copyright | e.g. `2026` |

## Claims on the page (keep them accurate)
- Works with Illustrator 2020 and later. Tested on Illustrator 2026 (30.x) on Mac.
- "Mac and Windows installers included". Windows hasn't been tested, so don't claim tested Windows support.
- Guide placement: all four guides are measured from the user's 0,0 point (Top/Left at −offset, Bottom/Right at +offset from 0,0), not from the edges of the box. Keep the copy and the hero illustration saying this.
- The page has no testimonials, user counts, or stats. Only add real ones.
