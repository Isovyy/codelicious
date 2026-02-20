# 🍳 CodeKitchen

A browser-based coding education game that teaches Python concepts through cooking minigames.
Playable on [itch.io](https://itch.io) — no install needed.

## Tech Stack
- React + Vite
- React Router v6
- localStorage for progress (no backend)
- Deploy: `npm run build` → zip `/dist` → upload to itch.io

## Getting Started

```bash
npm install
npm run dev
```

## Build for itch.io

```bash
npm run build
# zip the /dist folder and upload to itch.io as an HTML game
```

---

## 📁 Repo Structure

```
codekitchen/
├── public/
│   └── assets/
│       └── images/
│           └── modules/        # one image per module card
│               ├── ingredients.jpg
│               ├── mise-en-place.jpg
│               ├── instant-spices.jpg
│               ├── spice-combinations.jpg
│               ├── skewers.jpg
│               ├── layer-cake.jpg
│               └── cracking-eggs.jpg
│
├── src/
│   ├── main.jsx                # entry point (renders <App />)
│   ├── App.jsx                 # routing — maps paths to modules
│   │
│   ├── data/
│   │   └── modules.js         # all module metadata (title, subtitle, route, image)
│   │
│   ├── store/
│   │   └── progress.js        # load/save/complete module progress via localStorage
│   │
│   ├── components/
│   │   ├── ModuleCard.jsx     # single card (locked/unlocked states)
│   │   └── LockIcon.jsx       # SVG lock icon
│   │
│   ├── pages/
│   │   └── MainMenu.jsx       # grid of all ModuleCards — VIOLET owns this
│   │
│   └── modules/               # one folder per module — ARIELLE owns these
│       ├── 01-ingredients/
│       │   ├── index.jsx      # router: / → Tutorial, /minigame → Minigame
│       │   ├── Tutorial.jsx   # part 1: learn the concept (table/shelf view)
│       │   └── Minigame.jsx   # part 2: interactive exercise
│       ├── 02-mise-en-place/
│       ├── 03-instant-spices/
│       ├── 04-spice-combinations/
│       ├── 05-skewers/
│       ├── 06-layer-cake/
│       └── 07-cracking-eggs/
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 📚 Curriculum

| # | Module | CS Concept | Cooking Analogy |
|---|--------|-----------|-----------------|
| 1 | Preparing Ingredients | Data Types | Raw ingredients — int, string, bool |
| 2 | Mise en Place | Variables | Prepped containers ready to use |
| 3 | Instant Spices | Functions | Premixed spice packets |
| 4 | Spice Combinations | If/Else/And/Or/Not | Which spices go together? |
| 5 | Composing Skewers | Array, Stack, Queue | Order of ingredients on a skewer |
| 6 | Layer Cakes | Loops | Repeat frosting layers |
| 7 | Cracking Eggs | Recursion | Fewest sink trips to cook eggs |

---

## 👥 Division of Work

| Who | What |
|-----|------|
| **Violet** | `src/pages/MainMenu.jsx`, `src/store/progress.js`, `src/components/ModuleCard.jsx` |
| **Arielle** | `src/modules/` — Tutorial + Minigame per module, visual layouts |

**Handoff contract:** Each module's `index.jsx` receives `onComplete()` → calls `completeModule(id)` → redirects to `/`.

---

## Due: March 4
