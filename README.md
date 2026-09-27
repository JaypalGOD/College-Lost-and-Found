# Campus Lost & Found

A campus lost-and-found web app. Students can report lost and found items, browse and search them, see possible matches, and contact the person who reported an item without seeing their private contact details.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS 3 · shadcn/ui (Radix UI) · Lucide icons · React Router 7

## Deploy to GitHub Pages

This folder is ready to upload as-is. GitHub builds the site for you (see `.github/workflows/deploy.yml`), so you don't need to run `npm run build` yourself.

1. Upload **everything in this folder** (including the `.github` folder) to the root of your GitHub repo, on the `main` branch.
2. In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to turn green (about a minute). The site link appears there and in Settings → Pages.

Every later push to `main` redeploys automatically.

Why it used to show a white screen: GitHub Pages was serving the raw source, so the browser tried to load `/src/main.tsx` (TypeScript it can't run). The site now also uses relative asset paths (`base: "./"` in `vite.config.ts`) and a `HashRouter`, so it works at `https://<user>.github.io/<repo-name>/` and page refreshes on `#/browse` don't 404.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

## How the project was set up

The folder started empty, so it was set up as a **shadcn-compatible Vite + React + TypeScript + Tailwind** project. To build the same setup from scratch:

```bash
npm create vite@latest campus-lost-found -- --template react-ts
cd campus-lost-found
npm install -D tailwindcss@3 postcss autoprefixer tailwindcss-animate @types/node
npx tailwindcss init -p
# add the "@/*" -> "./src/*" path alias to tsconfig.json, tsconfig.app.json and vite.config.ts
npx shadcn@latest init            # writes components.json, lib/utils.ts, CSS variables
npx shadcn@latest add button sheet input label navigation-menu dialog textarea badge
npm install @radix-ui/react-slot class-variance-authority lucide-react @radix-ui/react-dialog \
  @radix-ui/react-label @radix-ui/react-icons @radix-ui/react-navigation-menu react-router-dom
```

| Setting | Value |
| --- | --- |
| `@/` alias | `./src` (`tsconfig*.json` + `vite.config.ts`) |
| UI components | `src/components/ui` (`components.json → aliases.ui`) |
| Global styles / theme tokens | `src/index.css` (+ `tailwind.config.js`) |
| `cn()` helper | `src/lib/utils.ts` |

### Why `components/ui` matters

The shadcn CLI and every shadcn/21st.dev component use imports like `@/components/ui/button`. If those primitives live somewhere else, those imports break, and `npx shadcn add …` puts new components in a different folder from the rest. Keeping all primitives in `src/components/ui` means:

- copied components work without changing their imports,
- the CLI can add and update components in the right place,
- low-level building blocks (button, sheet, dialog) stay separate from product features (`items/`, `report/`, `sections/`).

## 21st.dev Hero-01 integration

`src/components/ui/hero-01.tsx` keeps Hero-01's structure (Header + HeroSection + BrandSlider), with each part replaced for this app:

| Hero-01 original | Campus Lost & Found |
| --- | --- |
| `Header` (agency nav) | `components/layout/Navbar.tsx`: sticky glass navbar, Radix NavigationMenu, shadcn Sheet on mobile |
| `HeroSection` (avatars, agency copy) | `components/hero/CampusHero.tsx` + `CampusAnimation.tsx` (animated SVG campus) + `HeroSearch.tsx` |
| `BrandSlider` (logo marquee) | `components/hero/CampusTicker.tsx`: a scrolling feed of the latest reports |

## Project structure

```
src/
  components/
    ui/          shadcn primitives + hero-01 (button, sheet, input, label, navigation-menu,
                 dialog, textarea, badge, native-select, reveal)
    layout/      Navbar, Footer, Logo
    hero/        CampusHero, CampusAnimation, HeroSearch, CampusTicker
    items/       ItemCard, ItemGrid, ItemFilters, ItemDetails (dialog), ItemIllustration, StatusBadge
    report/      ReportItemForm, PossibleMatches
    sections/    QuickActions, RecentItems, HowItWorks, CampusMap, Statistics, TrustSection
  data/          items.ts (mock data), categories.ts, locations.ts
  types/         item.ts
  lib/           items-service.ts (data access), items-store.tsx (React context),
                 matching.ts, filters.ts, format.ts, utils.ts
  hooks/         use-in-view, use-count-up, use-reduced-motion
  pages/         Home, Browse, Report, MyReports, Legal, NotFound
```

## Connecting a backend later

- **Data:** components never import mock data directly. They go through `useItems()` → `itemsService` (`src/lib/items-service.ts`). Replace `list()` and `create()` with `fetch` calls. They are already `async`.
- **Matching:** `findPossibleMatches()` in `src/lib/matching.ts` is a scoring function you can explain step by step: category, words in common, colour, location and date. Swap it for a server-side matcher, such as one using text embeddings or image similarity, without changing the UI.
- **Messaging / claims:** the “Contact reporter” and “I think this is mine” forms in `ItemDetails.tsx` are the places to wire up a real messaging API.

## Features

- Search, status, category and location filters, plus sorting, on `/browse`. Filters are kept in the URL, so filtered results can be shared.
- An item details dialog (`?item=<id>`) that works on every page, with private contact and claim flows.
- A report flow with validation, drag-and-drop photo upload, live “Possible Matches” and an animated success screen.
- An interactive SVG campus map. Clicking a pin filters the items to that location.
- Animated counters, scroll reveals and card hover effects.
- The hero animation pauses when it's off-screen, and animations are turned off when the user prefers reduced motion.
- Accessibility: a skip link, visible focus states, labelled controls, and Lost/Found shown with an icon and text as well as colour.
- Reports you create are saved in `localStorage` and listed under **My Reports** (the profile icon).
