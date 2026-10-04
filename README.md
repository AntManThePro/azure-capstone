# Azure Capstone

Interactive 3D showcase of a handmade four-sided teal-and-copper pyramid jewelry cabinet.

Open each face to the inner compartment — pegs, copper coils, wooden shelves, glass vials — then fold those in to reveal the frosted-glass shrine at the heart. Pick jewelry from the tray and place it on a glowing ring.

The outer skin and inner panels are textured from photographs of the real cabinet.

![Azure Capstone — pegs face open](docs/gallery/pegs.png)

## Features

- Four hinged triangular faces that bloom open like a flower
- Nested reveal: outer doors first, then the inner shrine
- Photo-mapped interiors (pegs, coils, shelves, vials)
- Jewelry tray with hold-then-tap placement on 17 slots
- Fill / empty the whole cabinet
- Orbit, zoom, and a tripod stand with the workshop cat
- Layout persists in the browser (`azure-capstone-v1`)
- No accounts. No database.

## How to use

1. **Enter** the workshop.
2. Tap a face (**Pegs**, **Coils**, **Shelves**, **Vials**) or **Open faces**.
3. Choose a piece from the tray, then tap a glowing ring on that display.
4. **Shrine** opens the middle compartment.
5. **Fill** loads every slot. **Empty** clears. **Close** folds the pyramid shut.

Drag to orbit. Scroll or pinch to zoom.

![Closed pyramid](docs/gallery/closed.png)
![Four faces open](docs/gallery/faces.png)
![Shrine revealed](docs/gallery/shrine.png)
![Jewelry placed](docs/gallery/place.png)

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 19 · TanStack Start · Tailwind CSS v4 |
| 3D | Three.js · React Three Fiber · Drei |
| State | Zustand + `localStorage` |
| Build | Vite · TypeScript |

Full write-up: [docs/AZURE-CAPSTONE.md](docs/AZURE-CAPSTONE.md)

## Run locally

Requires Node 22+.

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:8080`).

Production build:

```bash
npm run build
npm run preview
```

```bash
npm run typecheck
```

## Project layout

```
src/components/pyramid/   3D cabinet, faces, shrine, jewelry, HUD
src/lib/catalog.ts        face geometry, jewelry, slot positions
src/lib/store.ts          open / close, shrine, placements
public/cabinet/           photo textures of the real faces
docs/AZURE-CAPSTONE.md    full project notes
docs/gallery/             screenshots
```

Each face is two layers: a teal outer door that swings away, and an inner panel that stays in the pyramid so the **display faces you**. **Shrine** then folds the inner panels so the glass ziggurat is visible.

## Push this zip to GitHub

```bash
unzip azure-capstone-github.zip
cd azure-capstone
git init
git add .
git commit -m "Azure Capstone — interactive 3D jewelry cabinet"
gh repo create azure-capstone --public --source=. --remote=origin --push
```

Or create an empty repo on GitHub, then:

```bash
git remote add origin git@github.com:YOUR_USER/azure-capstone.git
git branch -M main
git push -u origin main
```

## License

The handmade cabinet, photographs, and 3D likeness are the maker’s own work. All rights reserved.

The interactive web source is MIT — see [LICENSE](LICENSE).
