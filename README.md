# MASKicon Architect

MASKicon Architect is a static, SVG-first, offline-capable PWA for building modular icons in a blueprint-style workshop.

The app outputs icons, badges, characters, symbols, wordmarks, full assemblies, and mascot sheets. The mascot is the guide, representative character, demo object, and optional assembly layer.

## Included

- Three-panel single-page UI
- Shape Generator
- Eye Builder
- Mouth Builder
- Mascot Designer
- Wordmark Lab
- Assembly Mode
- SVG and PNG export
- Local saved projects with `localStorage`
- Offline caching with a service worker
- PWA manifest
- App icons:
  - `assets/icons/app-icon-192.png`
  - `assets/icons/app-icon-512.png`
  - `assets/icons/maskable-icon.png`

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/root`.
6. Open the published GitHub Pages URL.

## Test PWA installability

- Open the app in Chrome or Edge.
- Confirm the manifest loads.
- Confirm the service worker is registered.
- Use DevTools → Application → Service Workers.
- Reload once after the first visit.
- Test offline mode from DevTools.

## Notes

This build intentionally uses vanilla HTML, CSS, and JavaScript. It requires no backend, no Node runtime, no API keys, no environment variables, and no production build step.
