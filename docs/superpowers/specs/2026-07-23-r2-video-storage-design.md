# Cloudflare R2 video storage

**Date:** 2026-07-23  
**Status:** Approved (pending user review of this spec)

## Problem

Large MP4 files live under `public/` (~79MB total), which bloats the repo and deploys. They should be served from Cloudflare R2 instead of the Next.js codebase.

## Scope

Upload all local MP4s to R2 and serve them via public URLs:

| Local path | R2 object key | Size (approx) |
|---|---|---|
| `public/videos/final-2.mp4` | `videos/final-2.mp4` | 58MB |
| `public/videos/video.mp4` | `videos/video.mp4` | 435KB |
| `public/images/228847_tiny.mp4` | `images/228847_tiny.mp4` | 21MB |

**In-app usage today:** only `final-2.mp4` is referenced (`src/app/page.js`). The other two are still uploaded and given env URLs for future use.

**Out of scope:** custom domain, video encoding/transcoding, signed/private URLs, automated CI upload pipeline.

## Approach

**Dashboard upload (one-time):** create a public R2 bucket in the Cloudflare dashboard, upload the three files, wire public URLs through `NEXT_PUBLIC_*` env vars, gitignore `*.mp4`, and stop tracking the local files.

## Design

### 1. Cloudflare R2

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com) → **R2 Object Storage**.
2. Accept R2 terms / add payment method if prompted (R2 free tier still requires a payment method on file).
3. Create bucket: `eco-muhafiz-media` (or similar).
4. Enable public access via **R2.dev subdomain** for the bucket.
5. Upload the three objects using the keys above (create `videos/` and `images/` prefixes as needed).
6. Copy the public URLs (shape: `https://pub-<hash>.r2.dev/videos/final-2.mp4`).

### 2. App configuration

Add to `.env.local` / Vercel env:

```bash
NEXT_PUBLIC_VIDEO_FINAL_2=https://pub-<hash>.r2.dev/videos/final-2.mp4
NEXT_PUBLIC_VIDEO_DEFAULT=https://pub-<hash>.r2.dev/videos/video.mp4
NEXT_PUBLIC_VIDEO_TINY=https://pub-<hash>.r2.dev/images/228847_tiny.mp4
```

Update `.env.local.example` with the same keys (placeholder values).

Update `src/app/page.js` so the `<video>` `src` uses `process.env.NEXT_PUBLIC_VIDEO_FINAL_2` (required in production; local path fallback optional for offline dev).

### 3. Repository hygiene

- Add `*.mp4` to `.gitignore` (alongside existing `*.mov`).
- Remove tracked MP4s from git after upload succeeds (keep local copies optional; they will be ignored).
- Do not commit R2 credentials (none needed for public read URLs).

## Success criteria

- Homepage video plays from an `r2.dev` (or custom) URL.
- No MP4s are committed or required for `npm run build` / deploy.
- Env example documents the three public URL variables.

## Risks / notes

- R2.dev URLs are public and cacheable; fine for marketing video, not for private assets.
- Changing a file requires re-upload + cache considerations; rename or cache-bust query if browsers stick to an old object.
- Confirm CORS is not required for plain `<video src>`; if issues appear, allow the site origin on the bucket.
