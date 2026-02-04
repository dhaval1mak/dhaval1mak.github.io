# dhaval1mak.github.io

GitHub Pages site — **AppStream**: for all apps listing.

---

## AppStream

### Apps

- **Breath** — Meditation & Wellness (`com.dhaval29.breath`)
- **Empathy AI** (`com.brilworksdigital.VoxAi`)
- **Game Zone** — 2 Player Games (`com.dhaval.twoplayergames`)

### SEO & routes

- **Canonical URLs**: Home `/`, app pages `/apps/breath/`, `/apps/empathy-ai/`, `/apps/game-zone/`.
- **Meta**: Each page has unique `title`, `description`, `keywords`, Open Graph, and Twitter Card tags.
- **Structured data**: JSON-LD `WebSite` + `ItemList` on home; `SoftwareApplication` on each app page.
- **Sitemap**: `sitemap.xml` and `robots.txt`. Set `SITE_URL` in `js/config.js` (and canonicals in HTML) to your production domain.

### Tracking (IP & location)

- **Client**: `js/analytics.js` sends a beacon per page view (path, referrer, timestamp, viewId, UA, lang, tz, and client IP/location via ipapi.co).
- **Server** (optional): Deploy to Vercel so `api/track.js` is live at `/api/track`; it adds server-seen IP to each event.
- **Config**: In `js/config.js` set `SITE_URL` and `TRACKING_ENDPOINT`.

### Pushing updates

To **keep existing content** on the remote and add your new changes, pull from the pages remote before pushing:

```bash
git fetch pages
git merge pages/main --allow-unrelated-histories   # if histories diverged
# resolve any conflicts, then:
git push pages main
```

If you use a **custom domain**, add a file `CNAME` in the repo root with your domain on a single line (e.g. `www.yourdomain.com`). Otherwise the site is served at `https://dhaval1mak.github.io`.
