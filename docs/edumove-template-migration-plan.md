# EduMove HTML Template → Briticana (Next.js 14) — Migration Analysis

**Template path:** `assets/edumove-html-template/edumove/`  
**Inventory:** ~**352 files** total (36 HTML pages at repo root + `assets/` subtree: CSS, JS, fonts, images, maps, SCSS sources).  
**Product context:** Briticana = internship + startup showcase (not a full LMS). Align UI with purchased template visuals while **dropping LMS-only flows**.

### Policy: use the template’s libraries (updated)

The team **owns the EduMove template** and wants **maximum fidelity** with minimal rewrites. **GSAP (including code bundled in `plugin.js`), ScrollCue, Owl Carousel, MixItUp, Magnific Popup, jQuery + MeanMenu, CounterUp + Waypoints, and Bootstrap’s JS** are all **in scope** for migration—either by **vendoring the template’s `assets/js` files into `public/`** and loading them with `**next/script**`, and/or by installing **equivalent npm packages** where cleaner. Remaining constraints: **Next.js App Router** (client-only init for anything touching `window`/`document`), **Sanity** for dynamic content, and **keeping `/studio` free of marketing CSS**.

### Briticana `src` layout (marketing home)

| Location | Purpose |
| -------- | ------- |
| [`../src/components/marketing/`](../src/components/marketing/) | React for the template-based marketing home: `MarketingPageShell`, `MarketingNav`, `MarketingHomeSections` + `sections/*`, `MarketingVendorScripts`, `marketingAssetPaths.ts` |
| [`../src/styles/marketing-home.css`](../src/styles/marketing-home.css) | Imports vendor theme CSS from `/edumove/css/*` (Bootstrap core stays on npm via `globals.css`) |
| `public/edumove/` | Vendored template static files; URLs remain `/edumove/images/...`, `/edumove/js/...`, etc. |

---

## 1. Folder structure

### Top level (`edumove/`)


| Type                 | Items                                                                                                                                                                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTML pages**       | 36 × `.html` (listed in §2)                                                                                                                                                                                                                                                               |
| `**assets/css/`**    | `bootstrap.min.css`, `owl.carousel.min.css`, `owl.theme.default.min.css`, `meanmenu.css`, `magnific-popup.css`, `scrollcue.css`, `remixicon.css`, `style.css`, `responsive.css`, plus `*.scss` + `*.map` sources                                                                          |
| `**assets/js/**`     | `jquery.min.js`, `bootstrap.bundle.min.js`, `**plugin.js**` (bundled GSAP 3.11 + ScrollTrigger + ScrollSmoother + SplitText), `jquery.meanmenu.js`, `owl.carousel.min.js`, `magnific-popup.min.js`, `counterup.min.js`, `waypoints.min.js`, `scrollcue.js`, `mixitup.min.js`, `custom.js` |
| `**assets/fonts/**`  | Remix Icon: `remixicon.eot`, `.svg`, `.ttf`, `.woff`, `.woff2`                                                                                                                                                                                                                            |
| `**assets/images/**` | Large tree: root PNG/JPG/SVG, subfolders `course/`, `discover/`, `funfact/`, `hero-image/`, `icon/`, `learning/`, `testimonial/`, etc.                                                                                                                                                    |


### Vendor / plugin (conceptual)

- **Bootstrap** — `bootstrap.min.css` + `bootstrap.bundle.min.js`
- **Owl Carousel** — CSS + `owl.carousel.min.js`
- **jQuery MeanMenu** — mobile nav transformation
- **Magnific Popup** — lightbox / iframe video
- **jQuery Counter Up + Waypoints** — animated numbers
- **MixItUp** — filterable grids (`mixitup.min.js`; used on `index-4.html`, `courses-7.html`, `courses-8.html`)
- **ScrollCue** — scroll-triggered entrance animations (`scrollcue.js` + `scrollcue.css` + `data-cue(s)` attributes)
- **GSAP ecosystem** — inside `plugin.js` only (not loaded on `courses-7` / `courses-8` which skip `plugin.js`)

---

## 2. HTML pages (36)

### What each file represents


| HTML file                                                      | Template role                                                                   |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `index.html` … `index-5.html`                                  | **5 home page demos** (different hero/banner/section arrangements)              |
| `about-us.html`                                                | Company / mission / team-style marketing page                                   |
| `faq.html`                                                     | Standalone FAQ with accordion behaviour                                         |
| `courses.html` … `courses-8.html`                              | **Nine** course catalog layouts (grids, sidebars, list styles, filters)         |
| `course-categories.html`                                       | Category / domain hub                                                           |
| `course-details.html`                                          | **Single “course”** long-form LMS detail (outline, meta, instructor, CTA, tabs) |
| `contact.html`                                                 | Contact + form layout                                                           |
| `blog.html`, `blog-grid.html`, `blog-standard.html`            | Blog index variants                                                             |
| `blog-details.html`, `blog-details-2.html`                     | Article layouts                                                                 |
| `instructors.html`, `instructors-2.html`, `instructors-3.html` | Instructor / team listing layouts                                               |
| `instructor-details.html`, `instructor-details-2.html`         | Instructor bio detail                                                           |
| `our-pricing.html`                                             | Pricing comparison tables                                                       |
| `testimonial.html`                                             | Dedicated testimonials page                                                     |
| `privacy-policy.html`, `terms-conditions.html`                 | Legal text pages                                                                |
| `404.html`                                                     | Error page                                                                      |
| `coming-soon.html`                                             | Countdown landing (wired in `custom.js` to `#days`…`#seconds`)                  |
| `login.html`, `register.html`                                  | Auth marketing UI (social buttons, forms)                                       |


### Map → Briticana routes


| Briticana route          | Best template source(s)                                                      | Notes                                                                        |
| ------------------------ | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Home**                 | `index.html` (primary); compare `index-2`…`index-5` for section alternatives | Pick **one** demo as baseline; merge sections from others if needed          |
| **Internships listing**  | `courses.html` or `courses-3` / `courses-7` (filter) style                   | Replace “course” cards with internship cards; filters → domain/region/status |
| **Internship detail**    | `course-details.html`                                                        | Strip curriculum/quiz semantics; keep hero, meta row, sidebar CTA pattern    |
| **Programs**             | `course-categories.html` + `about-us.html` (value props)                     | Programs overview = domains + durations narrative                            |
| **Courses**              | Lighter `courses-*` variant or simplified `course-details`                   | Briticana “courses” are add-ons — shorter than LMS course page               |
| **Verification**         | `contact.html` (form layout) + custom result panel                           | **No** direct equivalent                                                     |
| **Login**                | `login.html`                                                                 | Demo only; remove OAuth UI or keep as static placeholders                    |
| **Student dashboard**    | **None**; closest inspiration: `course-details.html` (tabs, lists)           | New composition                                                              |
| **Contact**              | `contact.html`                                                               | Direct map                                                                   |
| **Privacy / Terms**      | `privacy-policy.html`, `terms-conditions.html`                               | Direct map                                                                   |
| **Refund policy**        | **None**                                                                     | Clone legal **layout** from privacy/terms; replace body with Briticana copy  |
| **Certification policy** | **None**                                                                     | Same as refund                                                               |


### LMS-specific → **not** needed for Briticana

- **Multi-demo home links** (`index-2`…`5` as separate products) — keep one design reference only  
- `**course-details.html`** inner LMS patterns: lesson lists, quizzes, progress bars tied to course completion (if present in full file beyond header) — **resemantic** to internship milestones, not SCORM-style lessons  
- `**register.html`** unless you want sign-up UI later  
- `**instructors*.html**`, `**instructor-details*.html**` unless you repurpose “mentor” bios  
- **Blog suite** — optional for Briticana marketing blog later; **not** in current route list  
- `**coming-soon.html`** — optional  
- `**404.html**` — useful as **Next `not-found`** reference

### No direct Briticana equivalent (ignore or defer)

- `blog*.html`, `testimonial.html` (content can fold into **home** + Sanity-driven sections)  
- Redundant `**courses-2`…`courses-8`** after you pick one listing pattern

---

## 3. CSS analysis (per file / group)-


| File                                                 | Role                                                           | Bootstrap vs custom            | Next.js notes                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------- | -------------------------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bootstrap.min.css`                                  | Core grid, utilities, components                               | Vendor                         | Prefer `**bootstrap` npm** (already in Briticana) instead of duplicating vendor file                                                                                                                                                                                                      |
| `owl.carousel.min.css` + `owl.theme.default.min.css` | Owl Carousel visuals                                           | Vendor                         | **Keep** with Owl JS (npm or `public` vendor copy)                                                                                                                                                                                                                                        |
| `meanmenu.css`                                       | MeanMenu mobile nav skin                                       | Vendor + overrides             | **Keep** with jQuery MeanMenu for 1:1 mobile nav, *or* later swap to `react-bootstrap` only if you drop MeanMenu                                                                                                                                                                          |
| `magnific-popup.css`                                 | Lightbox / modal gallery                                       | Vendor                         | **Keep** with Magnific Popup JS                                                                                                                                                                                                                                                           |
| `scrollcue.css`                                      | ScrollCue animation states                                     | Vendor                         | **Keep** with `scrollcue.js` + `scrollCue.init()` (client-only)                                                                                                                                                                                                                           |
| `remixicon.css`                                      | Icon font (`ri-*` classes)                                     | Vendor                         | Keep icons via `**remixicon` package** or `**react-icons`**; **fix** bad `url('../fonts/fonts/remixicon.eot')` path in distributed CSS (line 13 typo)                                                                                                                                     |
| `style.css`                                          | Main theme: layout, sections, headers, footers, cards, banners | **Custom** on top of Bootstrap | **Audit** before import: contains `@import` for **Google Fonts (Outfit)** and some `background-image: url(...)` paths — includes `**../../assets/images/...`** which is **incorrect relative to `assets/css/`** (likely SCSS build artifact). Fix paths or use `next/image` / public URLs |
| `responsive.css`                                     | Breakpoint tweaks                                              | Custom companion               | Import order: after `style.css`                                                                                                                                                                                                                                                           |


### jQuery / JS-toggled classes

- **MeanMenu** rewrites DOM and classes on `<nav>` — tied to jQuery  
- **ScrollCue** uses `data-cue` / `data-cues` — tied to `scrollcue.js`  
- **Owl** adds generated classes on carousel wrappers  
- `**.accordion-item.active`** — toggled by **vanilla** `document.body` listeners in `custom.js` (not jQuery), but **collides** with Bootstrap 5 accordion if you mix both patterns — standardise on `**react-bootstrap` Accordion** for FAQ

---

## 4. JavaScript analysis (per file)


| File                      | Purpose                                                                                                                                                                    | jQuery?                                    | UI role                                                         | React / Next replacement                                                                                                                                                                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `jquery.min.js`           | Foundation for plugins                                                                                                                                                     | —                                          | —                                                               | **Keep** (load before dependent scripts). Optional long-term refactor away from jQuery.                                                                                                                                                                                              |
| `bootstrap.bundle.min.js` | Dropdowns, collapse, etc.                                                                                                                                                  | No                                         | Some components                                                 | **Keep** for template markup that relies on Bootstrap JS *or* mirror behaviour with `react-bootstrap` where you convert markup—avoid double-handling the same node.                                                                                                                  |
| `plugin.js`               | GSAP core + ScrollTrigger + ScrollSmoother + SplitText (bundled)                                                                                                           | No                                         | Scroll pinning (`tp-panel-pin` in `custom.js`), advanced motion | **Keep** via same file in `public/vendor/` + `next/script` **after** jQuery, *or* replace with `**gsap` npm** + register **ScrollTrigger** (and licensed plugins if you use Smoother/SplitText). Confirm **GreenSock Club** licensing if you ship ScrollSmoother/SplitText features. |
| `jquery.meanmenu.js`      | Mobile nav for `.for-mobile-menu`                                                                                                                                          | **Yes**                                    | Navbar                                                          | **Keep** with jQuery; init in `useEffect` after nav mounts                                                                                                                                                                                                                           |
| `owl.carousel.min.js`     | All `.owlCarousel(...)` carousels                                                                                                                                          | **Yes**                                    | Partners, testimonials, courses, team, funfact sliders          | **Keep** — wrap carousels in client components; re-init on route change if needed                                                                                                                                                                                                    |
| `magnific-popup.min.js`   | `.popup-video` (iframe), `.img-popup` (image gallery)                                                                                                                      | **Yes**                                    | Media lightbox                                                  | **Keep** — call `.magnificPopup()` after mount / when DOM nodes exist                                                                                                                                                                                                                |
| `waypoints.min.js`        | Scroll position helper                                                                                                                                                     | jQuery plugin dep                          | Feeds CounterUp                                                 | **Keep** with CounterUp                                                                                                                                                                                                                                                              |
| `counterup.min.js`        | `$('.counter').counterUp()`                                                                                                                                                | **Yes**                                    | Stat numbers                                                    | **Keep**                                                                                                                                                                                                                                                                             |
| `scrollcue.js`            | Initialises scroll entrance effects (`scrollCue.init()`)                                                                                                                   | No                                         | Section reveals                                                 | **Keep** — run `scrollCue.init()` / refresh in client layout or per-page after content paint                                                                                                                                                                                         |
| `mixitup.min.js`          | Filter/sort grid (`#Container`)                                                                                                                                            | Used from `custom.js` via global `mixitup` | Filterable catalog                                              | **Keep** — ensure `#Container` exists before `mixitup()` runs; **or** use `**mixitup` npm** + same markup/classes                                                                                                                                                                    |
| `custom.js`               | Sticky header, MeanMenu, back-to-top, preloader hide, **countdown**, all Owl inits, CounterUp, MixItUp init, MagnificPopup, **GSAP pin block**, accordion click delegation | **Yes** (IIFE `$`)                         | Orchestration                                                   | **Port** as `public/vendor/custom.js` + single initialiser component, *or* split into hooks that call the same APIs after `requestAnimationFrame` / `useEffect`                                                                                                                      |


### Next.js breakage / SSR risks

- `**$(window).on('load')`** for preloader — no single `window` “load” in App Router the same way; use React `useEffect` or CSS-only preloader  
- **Global `document` / `window` in `custom.js`** — must run **client-only**  
- `**plugin.js` GSAP** — large client bundle; **ScrollSmoother** and **SplitText** inside the bundle are **Club GreenSock** products — ensure your **GreenSock license** covers production use if you ship those features  
- **Countdown** in `custom.js` runs on **every** page load and touches `#days`… — will throw/no-op if IDs missing (low risk but noisy)

---

## 5. Components identification (repeating UI)

Patterns recur across **all** or **most** HTML files unless noted.


| Pattern                    | Description                                          | Typical files                       | Bootstrap / classes                           | JS behaviour                        | → React component (suggested)                           | Props (examples)                                                                                                          |
| -------------------------- | ---------------------------------------------------- | ----------------------------------- | --------------------------------------------- | ----------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Preloader**              | Full-screen GIF loader                               | All main pages                      | `.preloader`, `.preloader-deactivate`         | `$(window).on('load')`              | `Preloader` (optional)                                  | `show: boolean`                                                                                                           |
| **Navbar**                 | Logo + multi-level dropdown nav + `.for-mobile-menu` | All                                 | `navbar`, `navbar-expand-md`, `dropdown-menu` | MeanMenu, sticky `.is-sticky`       | `SiteNavbar`                                            | `items`, `ctaHref`, `brandName`                                                                                           |
| **Page banner**            | Inner page title / breadcrumb hero                   | Inner pages                         | `page-banner-area`, `page-banner-content`     | ScrollCue `data-cues` on some       | `PageBanner`                                            | `title`, `breadcrumb[]`                                                                                                   |
| **Footer**                 | Multi-column links + contact + social                | All                                 | `footer-area`, `import-links`                 | None                                | `SiteFooter`                                            | `columns`, `socialLinks`, `contact`                                                                                       |
| **Copyright bar**          | Thin bottom strip                                    | All                                 | `copyright-area`                              | None                                | `CopyrightBar`                                          | `year`, `brand`                                                                                                           |
| **Back to top**            | Fixed scroll button                                  | All                                 | `.back-to-top`, `.active`                     | jQuery scroll + click               | `BackToTop` (optional)                                  | —                                                                                                                         |
| **Section title**          | Kicker + H2 + optional shape                         | Many                                | `section-title`, `style-two` / `three`        | ScrollCue on some                   | `SectionTitle`                                          | `kicker`, `title`, `align`                                                                                                |
| **Course / product card**  | Image, meta, price, CTA                              | Home, all `courses*`                | `single-courses`, `card`, rows/cols           | Owl in carousels; hover CSS         | `**InternshipCard`** / home **Featured internships** band (`MarketingCoursesSection`) | `title`, `image`, `href`, `badges[]`, `meta`                                                                              |
| **Filter bar**             | Tab/pill filters                                     | `courses-7`, `courses-8`, `index-4` | `.filter`, `.mixitup-tab`                     | MixItUp                             | `**FilterBar`**                                         | `filters`, `activeId`, `onChange`                                                                                         |
| **Partner / logo row**     | Logo strip                                           | Home demos                          | Various                                       | `.partner-slide` Owl                | `LogoStrip`                                             | `logos[]`                                                                                                                 |
| **Testimonial block**      | Quotes + avatars                                     | Home, `testimonial.html`            | Slider wrappers                               | `.testimonial-slide` Owl            | `TestimonialCarousel` or static `TestimonialGrid`       | `items[]`                                                                                                                 |
| **FAQ accordion**          | Q&A lists                                            | `faq.html`, home sections           | `.accordion-item`                             | Custom body click JS in `custom.js` | `**FaqAccordion`**                                      | `items[]` — keep template JS **or** migrate to `react-bootstrap` Accordion (pick one; avoid both toggling the same nodes) |
| **Pricing tables**         | Tier cards                                           | `our-pricing.html`                  | Cards, grids                                  | ScrollCue                           | `PricingTable`                                          | `tiers[]` (bind to Sanity `siteSettings` prices)                                                                          |
| **Contact form**           | Fields + submit                                      | `contact.html`                      | `form-control`, grid                          | None / native                       | `**VerificationForm`** / `ContactForm`                  | `onSubmit`, `fields`                                                                                                      |
| **Counter / fun fact**     | Big numbers + icons                                  | Home, about                         | `.counter`, funfact sliders                   | CounterUp + Waypoints + Owl         | `StatGrid`                                              | `stats[]` — optional count-up                                                                                             |
| **Instructor / team card** | Photo + social                                       | Instructor pages                    | Cards                                         | Owl on some                         | Optional `TeamCard` for startups                        | `name`, `role`, `image`, `bioHref`                                                                                        |
| **Login split layout**     | Marketing left + form right                          | `login.html`                        | `login-area`, `row`                           | None heavy                          | `LoginLayout`                                           | `children`                                                                                                                |
| **Tabs**                   | Horizontal tabs                                      | `course-details`                    | Bootstrap nav tabs                            | Likely Bootstrap JS                 | `**Tabs`** via `react-bootstrap`                        | `tabs[]`                                                                                                                  |
| **Video CTA**              | Play button opens video                              | Various                             | `.popup-video`                                | Magnific Popup                      | Keep Magnific **or** `VideoModal` wrapping same classes | `videoUrl`                                                                                                                |


---

## 6. Assets inventory

### Folders (high level)

- `assets/images/` — bulk raster + SVG (heroes, courses, blogs, shapes, flags, users, logos)  
- `assets/images/course/` — course thumbnails  
- `assets/images/hero-image/` — hero variants per demo  
- `assets/images/icon/`, `funfact/`, `discover/`, `learning/`, `testimonial/` — themed groups

### Moving to `/public`

- **Yes**, static files can live under e.g. `public/edumove/...` **as-is**, then reference `/edumove/images/...`  
- Prefer **long-term**: marketing images from **Sanity** (`next/image` + `cdn.sanity.io` already in `next.config`)

### CSS relative paths

- `remixicon.css` contains a **wrong** path: `../fonts/fonts/remixicon.eot` — fix when vendoring fonts  
- `style.css` mixes `../images/...` and erroneous `../../assets/images/...` — **verify every `url()`** after move to `public` or after colocating CSS under `src/styles`

### Fonts

- **Outfit** — loaded via **Google Fonts `@import`** in `style.css` → prefer `**next/font/google**` (`Outfit`) in Briticana `layout.tsx`  
- **Remix Icon** — local `@font-face` → keep `**public/fonts/remixicon.*`** or switch to `**remixicon` / `react-icons**`

### Sanity / dynamic images

- All **course**, **blog**, **instructor**, **hero**, and **testimonial** imagery in HTML should eventually map to **Sanity `image` fields** (`internship.featuredImage`, `testimonial.photo`, `startupPartner.logo`, etc.)

---

## 7. Keep vs strip vs adapt

### KEEP (for Briticana)


| Item                                                            | Source template                                    |
| --------------------------------------------------------------- | -------------------------------------------------- |
| Overall visual language (spacing, section rhythm, card shadows) | `style.css` + `responsive.css`                     |
| One home composition                                            | `index.html` (or chosen demo)                      |
| Navbar + footer + copyright structure                           | Shared across pages                                |
| Course grid / filter / card UI for internships                  | `courses*.html` + `courses-7`/`8` + `index-4`      |
| Internship detail structure                                     | `course-details.html`                              |
| Programs / domains presentation                                 | `course-categories.html`, parts of `about-us.html` |
| Contact layout                                                  | `contact.html`                                     |
| Legal page shell                                                | `privacy-policy.html`, `terms-conditions.html`     |
| Login shell (demo)                                              | `login.html`                                       |
| FAQ accordion pattern                                           | `faq.html`                                         |
| Pricing section                                                 | `our-pricing.html`                                 |
| 404                                                             | `404.html`                                         |


### STRIP (LMS / template bloat — not library policy)


| Item                                                                | Why                                                                                                            |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Extra **alternate home HTML files** (after you pick a primary demo) | Repo hygiene — keep one source of truth for markup                                                             |
| **Blog** pack                                                       | Not in v1 IA (unless you add a blog route later)                                                               |
| **Instructor** pack                                                 | Unless rebranded as “mentors” / startup faces                                                                  |
| **MeanMenu + jQuery**                                               | *Optional later refactor* to pure `react-bootstrap` — **not required** for v1 if you vendor scripts for parity |


### ADAPT (content + semantics)


| Item                              | Change                                                     |
| --------------------------------- | ---------------------------------------------------------- |
| All copy / brand                  | EduMove → **Briticana**; LMS → internship / startup        |
| Nav structure                     | Remove demo mega-menu; map to Briticana routes             |
| “Course” cards                    | **Internship** fields (domain, region, status, batch date) |
| `course-details` curriculum       | **Milestone / project structure** from Sanity              |
| `our-pricing`                     | Starter/Pro labels from `**siteSettings`**                 |
| Testimonials / partners           | Drive from **Sanity** arrays                               |
| `login.html` OAuth row            | Static or hidden until real auth                           |
| **Refund + certification policy** | New pages using legal **layout** from privacy/terms        |


---

## 8. Migration order (suggested)


| #   | Deliverable                                                                                         | Effort | Owner (suggested) |
| --- | --------------------------------------------------------------------------------------------------- | ------ | ----------------- |
| 1   | **Design token pass**: Outfit + primary colours + container `mw-1345` behaviour in global CSS       | Low    | Dev 1             |
| 2   | **Remix icons**: fix font paths; import icon set (`react-icons/ri` or `remixicon` CSS)              | Low    | Dev 1             |
| 3   | `**SiteNavbar`** + `**SiteFooter**` + copyright + optional back-to-top                              | Medium | Dev 1             |
| 4   | `**PageBanner**` for inner pages                                                                    | Low    | Dev 1             |
| 5   | **Home page** sections (hero, features, partners, testimonials, FAQ, CTA) from chosen `index*.html` | High   | Dev 1             |
| 6   | `**Internships` listing** + `FilterBar` + cards (from `courses-7`/`8` + chosen grid)                | High   | Dev 2             |
| 7   | `**Internship` detail** from `course-details.html`                                                  | High   | Dev 2             |
| 8   | **Programs** + **Courses** (simpler)                                                                | Medium | Dev 2             |
| 9   | **Contact** + **Verification** (new logic, template form layout)                                    | Medium | Dev 2             |
| 10  | **Login** (demo) + **Dashboard** (new; borrow lists/tabs from course-details)                       | Medium | Dev 2             |
| 11  | **Legal trio** (privacy, terms, + new refund + certification)                                       | Low    | Dev 1             |
| 12  | `**not-found`** from `404.html`                                                                     | Low    | Dev 1             |


*(Owners are suggestions — split by “shell + marketing” vs “data-heavy flows” as you prefer.)*

---

## 9. Risk flags (Next.js / React)

1. **jQuery plugin stack** — MeanMenu, Owl, Magnific, CounterUp expect **specific DOM** after mount; initialise only in `**useEffect*`* (client) **after** React renders markup, or use `**next/script` with `strategy="afterInteractive"`** so you do not double-bind.
2. `**plugin.js` GSAP / ScrollSmoother / SplitText** — large JS payload; **Club GreenSock** terms apply to bundled premium plugins — keep license on record.
3. `**scrollcue` + `data-cues`** — must run **after** content is in the DOM; call `**scrollCue.refresh()`** (if API available) or re-init when React swaps sections / client-navigates.
4. **Scroll-based sticky nav** in `custom.js` — reimplement with `**useEffect` + scroll listener** or CSS `position: sticky` where possible.
5. **Custom accordion JS** in `custom.js` — conflicts with Bootstrap 5 accordion behaviour if both used.
6. `**style.css` broken `url(../../assets/...)`** — backgrounds may **not work** until paths fixed.
7. `**remixicon.css` typo path** `../fonts/fonts/` — broken **.eot** preload in some browsers.
8. **Inline `style=""` in HTML** (e.g. login social buttons) — move to classes for Briticana code standards.
9. **External links** (`https://x.com/`, etc.) in footer — replace with Sanity-driven URLs.
10. **Two script bundles**: pages with `**plugin.js`** vs `**courses-7`/`8**` without it — migration must not assume one global script order.
11. **Sanity Studio** must stay isolated — do not import template CSS into `/studio` route (keep Studio chrome clean).

---

## 10. Dependency list (template parity — npm and/or vendored scripts)

**Two valid strategies** (can mix):

1. **Vendor copy (fastest parity):** Copy `assets/js/*.min.js`, `plugin.js`, `custom.js` into e.g. `public/vendor/edumove/` and load order via `**next/script`** (`jquery` → `bootstrap.bundle` → `plugin` → `meanmenu` → `owl` → `magnific-popup` → `waypoints` → `counterup` → `scrollcue` → `mixitup` *only on pages that need it* → `custom`). No npm package required for those files.
2. **npm equivalents (cleaner tree-shaking where it matters):** Install packages below and **replicate load order** in a small client bootstrap module.


| Package (npm)                                                                      | Replaces (template file)                                 | Used for                                                                                                 |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `jquery`                                                                           | `jquery.min.js`                                          | MeanMenu, Owl, Magnific, CounterUp, `custom.js`                                                          |
| `bootstrap` (+ optional `bootstrap` JS or keep vendor bundle)                      | `bootstrap.min.css` + `bootstrap.bundle.min.js`          | Grid + dropdowns/collapse as in template                                                                 |
| `gsap`                                                                             | Core part of `plugin.js`                                 | Timelines, animations; register `**ScrollTrigger*`* from `gsap/ScrollTrigger` if you split from monolith |
| *(Club / separate)* `ScrollSmoother`, `SplitText`                                  | Portions of `plugin.js`                                  | Only if licensed — or **keep shipping `plugin.js` as-is** from `public` to match purchase                |
| `owl.carousel` *(or keep `owl.carousel.min.js` in public)*                         | Owl JS + CSS                                             | All `.owlCarousel` sliders                                                                               |
| `jquery-waypoints` / waypoints (or vendor `waypoints.min.js`)                      | `waypoints.min.js`                                       | CounterUp triggers                                                                                       |
| *(jquery plugin)* counterup2 or vendor `counterup.min.js`                          | `counterup.min.js`                                       | Stat animations                                                                                          |
| `magnific-popup` *(jquery plugin; often loaded from vendor file)*                  | `magnific-popup.min.js`                                  | `.popup-video`, `.img-popup`                                                                             |
| `mixitup`                                                                          | `mixitup.min.js`                                         | Filterable grids                                                                                         |
| `scrollcue` *(if published to npm — else use template `scrollcue.js` from public)* | `scrollcue.js`                                           | `data-cue` / `data-cues` reveals                                                                         |
| `react-bootstrap` *(optional)*                                                     | Overlap with Bootstrap JS for **new** React-only widgets | Use where you **do not** duplicate template Bootstrap JS on the same element                             |
| `react-icons` / `remixicon`                                                        | `remixicon.css` + fonts                                  | Icons (fix bad font path in CSS when copying)                                                            |
| `next/font/google` (`Outfit`)                                                      | `@import` in `style.css`                                 | Typography                                                                                               |
| `@sanity/image-url`, `next-sanity` *(already in project)*                          | Static marketing images                                  | CMS-driven assets                                                                                        |


**No longer “omit for policy”:** jQuery, GSAP, Owl, MixItUp, Magnific, ScrollCue are all **allowed** to match the purchased template.

---

## Overall migration complexity

**Rating: Medium** (revised from Medium–High)

**Why:** Keeping the template’s **jQuery + GSAP + ScrollCue + Owl + MixItUp + Magnific** stack avoids a large rewrite: work shifts to **correct script order**, `**next/script` + client-only initialisation**, `**scrollCue` / Owl refresh on navigation**, **fixing CSS `url()` paths**, and **not importing marketing CSS into `/studio*`*. The remaining lift is **LMS → Briticana semantics** and **Sanity wiring**, not replacing every animation library.

---

*Document generated for Briticana / Cursor AI context. Updated: template libraries (GSAP, ScrollCue, etc.) explicitly in scope.*