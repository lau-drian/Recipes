# Image & asset cheat sheet

Quick reference for exports, favicon, header SVG, and accessibility on the Recipes site.

**Location:** `docs/image-assets.md` (repo root: `Recipes/docs/image-assets.md`).

---

## 1. Verify files in Terminal (macOS)

```bash
cd /path/to/your/export
file "your-file.png"                 # Expect: PNG image data … (not JPEG)
sips -g hasAlpha "your-file.png"     # hasAlpha: yes → transparency present
```

**Magic bytes (first bytes of file):**

- PNG: `89 50 4E 47`
- JPEG: `FF D8 FF`

If **`file`** says **`JPEG image data`** but the extension is `.png`, the asset is mislabeled—re-export or rename to `.jpg` and treat it as opaque (no transparency).

---

## 2. Web-safe raster (illustrations, 404 art, etc.)

| Topic | Do | Avoid |
|--------|----|--------|
| **Transparency** | **PNG** or **WebP with alpha**, **8-bit/channel RGBA**, **sRGB** | JPEG (no alpha channel) |
| **HDR / wide gamut** | Normal **SDR** export for the website | **PQ**, **BT.2020**, PNG-HDR-style exports (often render black or wrong in browsers) |
| **Indexed PNG** | Prefer **full PNG** (truecolor + alpha) for soft edges / grain | **PNG-8 (dithered)** unless you accept banding |
| **Matte** | **None** / disabled for transparent PNG | **Matte: white** + PNG-8 → muddy edges, white-looking export preview |
| **Preview vs document** | Layers show **checkerboard** = transparency in the doc | Export preview **solid white** often means matte, flattening, or indexed export |

**WebP:** Fine for the web. Use **lossless** or **high quality** for textured illustrations so grain does not turn to mush.

**File size:** For in-page art (e.g. 404), consider **≤ ~1200px** on the longest side before committing multi-megabyte PNGs to git.

---

## 3. This repo

| Asset | Path | Notes |
|--------|------|--------|
| **404 illustration** | `public/images/not-found-team.png` | Used in [`src/app/not-found.tsx`](../src/app/not-found.tsx). Display width: `clamp(150px, 38vw, 220px)` via `className` / `sizes`. Replace file in place or change `Image` `src`. |
| **Legacy** | `public/images/not-found-robin.jpg` | JPEG, no transparency; optional cleanup if unused. |

---

## 4. Favicon & touch icons (Next.js App Router)

Put these under **`src/app/`** so Next.js picks them up as [file-based metadata](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons).

| File | Role | Suggested spec |
|------|------|----------------|
| **`favicon.ico`** | Classic tab icon | **Multi-size ICO** (e.g. 16×16 + 32×32), **sRGB**, simple mark readable at 16px |
| **`icon.png`** | App icon | **Square** PNG, **≥ 32×32** (many teams use **512×512** source); **sRGB** |
| **`apple-icon.png`** | iOS home screen | **180×180** PNG, **sRGB**; solid background is common |

**Design:** Test the mark at **16×16**; check light and dark browser UI if you use a single icon.

Optional later: `opengraph-image.png` / `twitter-image.png` (e.g. **1200×630**) for social sharing—separate from favicon.

---

## 5. Header logo (SVG, planned)

Not wired in [`SiteHeader`](../src/app/components/SiteHeader.tsx) yet; plan for:

| Spec | Recommendation |
|------|----------------|
| **Format** | Single **SVG**, prefer **no embedded** raster bitmaps |
| **Layout** | **`viewBox`**; avoid fixed pixel size in the file if possible |
| **Height** | **~28–36px** in the nav (matches current bar); **`max-height` + `w-auto`** so wordmarks do not overflow on small screens |
| **Theme** | **`currentColor`** or **`fill: var(--color-text-default)`** so light/dark work |
| **Optimization** | **SVGO**; remove editor metadata |
| **Path** | e.g. `public/images/header-logo.svg` |

See **Accessibility** below for `alt`, `aria-hidden`, and inline `<title>`.

---

## 6. Accessibility

### Decorative vs informative images

- **Decorative** (mood only; meaning is in nearby text—e.g. 404 bird next to a clear heading): often **`alt=""`** is correct so screen readers do not repeat what the heading already says.
- **Informative** (conveys unique information): short, accurate **`alt`** describing the content or function.
- Avoid **redundant** `alt` that duplicates the adjacent **heading** or **link text**.

### Header logo replacing text

If the logo **replaces** visible site name text:

- Give **`alt`** text that matches the brand (and align with [`lib/ui-strings.ts`](../lib/ui-strings.ts) per locale if you localize), **or**
- Keep visible text (sr-only or on screen) and treat the image as decorative with **`alt=""`**.

The **link** wrapping the logo may need **`aria-label`** if the visible label alone is unclear.

### SVG

- **Decorative:** `aria-hidden="true"` and `focusable="false"` (where applicable); pair with `alt=""` if using `<img src="…svg">`.
- **Informative:** consider **`<title>`** (and **`desc`** if helpful) inside the SVG, or a proper **`alt`** on `<img>`.
- Inline SVG in React: ensure decorative SVGs are not focused incorrectly; **`focusable="false"`** helps in older browsers.

### Contrast

Check important **glyphs / strokes** against **`--background`** / **`--surface-elevated`** in **light** and **`data-theme="dark"`** so the mark does not disappear.

### Motion

If you add **animated** assets later, consider **`prefers-reduced-motion`** and offer a non-animated or reduced variant.

### Touch targets

Header **language** / **theme** controls should stay **comfortably tappable**; logo link should not be a tiny hit area—use padding or min dimensions if needed.

### Emoji in copy

Strings like the footer heart may be announced oddly by some screen readers. If it becomes noisy, you can wrap the line in an element with a concise **`aria-label`** (and hide decorative emoji from AT with **`aria-hidden`** on the emoji span)—only if you decide to refine.

---

## 7. Pre-commit checklist

- [ ] `file` reports **PNG** (or intended type), not mislabeled JPEG.
- [ ] `sips -g hasAlpha` is **yes** when you need transparency.
- [ ] No **HDR/PQ/Rec.2020** export for normal web raster assets.
- [ ] Dimensions and file weight are **reasonable** for the use case.
- [ ] **Alt / decorative** decision made for each new image (see Accessibility).

---

## Related code

- 404 image: [`src/app/not-found.tsx`](../src/app/not-found.tsx)
- Header (logo TBD): [`src/app/components/SiteHeader.tsx`](../src/app/components/SiteHeader.tsx)
- UI copy / `logoAlt` (when added): [`lib/ui-strings.ts`](../lib/ui-strings.ts)
