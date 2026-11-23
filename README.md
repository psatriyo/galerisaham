# GaleriSaham website

Static website for [GaleriSaham](https://galerisaham.com): independent stock-market education and analysis for the Indonesian capital market, since 2009.

Plain HTML, CSS and a small vanilla JS file. No build step, no dependencies.

## Pages

Pages live at the same paths the previous WordPress site used, so existing links and search rankings keep working.

| Path | Page |
| --- | --- |
| `/` | Home (landing page) |
| `/about-us/` | About GaleriSaham: story, founders, milestones |
| `/pro/` | GS PRO / Profit Trader Club: plans (LITE, MODULE, CLUB, VIP) |
| `/modul/` | Profit Trader Module (TradingView tools) |
| `/institute/` | GS Institute: workshops and classes |
| `/stm/` | Systematic Trading Management |
| `/kalender/` | Event calendar (empty state until events are announced) |
| `/kontak/` | Contact: WhatsApp topics, email, office |
| `/404.html` | Not-found page (GitHub Pages serves it automatically) |

Redirect stubs keep older URLs alive: `/pages/*.html` (the previous version of this repo) and `/pro/who-are-we/` (old WordPress page) forward to their new paths.

## Editing content

- **Indonesian is the source language.** The Indonesian copy in the HTML is what search engines index.
- **English** sits next to each piece of text in a `data-en` attribute, for example
  `<h2 data-en="Our story">Cerita kami</h2>`. The ID/EN toggle (`js/main.js`) swaps the text and remembers the visitor's choice. `data-en-label` does the same for `aria-label`, and `<title data-en>` for the page title.
- When you change Indonesian copy, update its `data-en` too. Keep translated elements text-only (no nested tags).
- The header, footer, disclaimer and WhatsApp CTAs are repeated on every page. Change them in all pages.
- Contact details used across the site:
  - WhatsApp: `wa.me/6285890006618` (links carry a prefilled message per topic)
  - Email: `administrator@galerisaham.com`
  - Office: Citra Towers Kemayoran, North Tower Lt. 3 Unit H5–I2, Jakarta Pusat 10630
- **Calendar:** `kalender/index.html` contains a commented template for adding event cards.
- **"17 tahun"** (17 years) on the home and about pages is written as static text. Update it every November (founded 8 Nov 2009). The copyright year updates itself.

### Content rules

Only publish facts that can be verified. No invented statistics, profit figures, testimonials or prices. Pricing is handled via WhatsApp on purpose. Keep the investment-risk disclaimer in the footer.

## Structure

```
index.html            Home
about-us/ pro/ modul/ institute/ stm/ kalender/ kontak/   Sub pages (index.html each)
pages/ pro/who-are-we/                                    Redirect stubs
css/styles.css        All styles (design tokens at the top)
js/main.js            Language toggle, mobile menu, reveal-on-scroll
assets/               og-image.jpg (social share), icon-512.png
favicon.svg, favicon-32.png, apple-touch-icon.png
sitemap.xml, robots.txt, CNAME
```

## SEO and accessibility

- A unique title, description and canonical URL on every page, plus Open Graph and Twitter cards
- JSON-LD: `EducationalOrganization` on every page, `FAQPage` and `WebSite` on home, `BreadcrumbList` on sub pages, `Person` for the founder
- Semantic landmarks, a skip link, a keyboard-accessible menu (`aria-expanded`), language buttons with `aria-pressed`, visible focus styles
- Brand blue (`#219fda`) and orange are used for decoration only. Text and buttons use darker "ink" shades that meet WCAG AA contrast.
- Content stays visible without JavaScript. Animations respect `prefers-reduced-motion`.
- There's a sticky WhatsApp button on mobile

## Deployment

Served by GitHub Pages. `CNAME` currently points at the staging domain `gs.prayudisatriyo.com`, while canonical URLs, Open Graph tags and the sitemap already use `https://galerisaham.com`. To launch on the main domain:

1. Point galerisaham.com DNS to GitHub Pages.
2. Change `CNAME` to `galerisaham.com`.

`.htaccess` only applies on Apache hosting. GitHub Pages ignores it.

No analytics are installed. Add the tracking snippet to the `<head>` of every page if needed.

## License

© 2009–2026 PT Galeri Saham Indonesia. All rights reserved.
