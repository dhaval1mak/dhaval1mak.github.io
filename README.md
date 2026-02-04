# AppStream

For all apps listing.

## Apps

- **Breath** — Meditation & Wellness (`com.dhaval29.breath`)
- **Empathy AI** (`com.brilworksdigital.VoxAi`)
- **Game Zone** — 2 Player Games (`com.dhaval.twoplayergames`)

## SEO & routes

- **Canonical URLs**: Home `/`, app pages `/apps/breath/`, `/apps/empathy-ai/`, `/apps/game-zone/`.
- **Meta**: Each page has unique `title`, `description`, `keywords`, Open Graph, and Twitter Card tags.
- **Structured data**: JSON-LD `WebSite` + `ItemList` on home; `SoftwareApplication` on each app page.
- **Sitemap**: `sitemap.xml` and `robots.txt` reference it. Update `SITE_URL` in `js/config.js` (and canonicals in HTML) when you set your production domain.

## Tracking (IP & location)

1. **Client**: `js/analytics.js` sends a beacon per page view with:
   - `path`, `url`, `referrer`, `timestamp`, `viewId`, `ua`, `lang`, `tz`
   - Client-side **IP and location** from [ipapi.co](https://ipapi.co/) (e.g. city, region, country).

2. **Server** (optional): Deploy the repo to **Vercel** so `api/track.js` is live at `/api/track`. It adds **server-seen IP** (from `X-Forwarded-For` / `X-Real-IP`) to each event and logs JSON to the server. For persistence, add your own storage in `api/track.js` (e.g. DB or log stream).

3. **Config**: In `js/config.js` set:
   - `SITE_URL`: your site origin (e.g. `https://dhaval1mak.github.io/AppStream`).
   - `TRACKING_ENDPOINT`: `/api/track` if same origin (e.g. Vercel), or full URL (e.g. `https://your-app.vercel.app/api/track`) if the site is on GitHub Pages.

If you use only GitHub Pages (no server), set `TRACKING_ENDPOINT` to a URL of your own backend that accepts POST JSON; the payload shape is the same.
