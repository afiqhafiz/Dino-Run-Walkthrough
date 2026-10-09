# Dino Run walkthrough

A slide-aligned repository for the **DevStart 2026** half-day introduction to web development. The workshop builds one offline dinosaur runner with plain HTML, CSS, and JavaScript.

## Start here

No packages or internet connection are required.

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Select **Start game**.
4. Press <kbd>Space</kbd> or <kbd>↑</kbd> to jump. On touch devices, tap the game.

To use a local server instead:

```bash
npm run serve
```

Then open `http://localhost:8000`.

## Repository map

- `index.html` contains the finished page structure.
- `styles.css` contains the finished scene and layout.
- `app.js` contains jump, movement, collision, score, and restart logic.
- `checkpoints/` contains six complete recovery versions for the live build.
- `facilitator/SLIDE_WALKTHROUGH.md` maps slides, timing, code edits, prompts, and recovery points.

## Checkpoints

| Folder | Visible result |
| --- | --- |
| `01-html` | Heading, score, game area, and start button |
| `02-css` | Styled and positioned game scene |
| `03-jump` | Start button and keyboard jump |
| `04-move` | Moving obstacle |
| `05-collision` | Collision ends the run |
| `06-finish` | Score, increasing speed, restart, and touch input |

Each checkpoint is self-contained. Open its `index.html` directly in the browser.

## Presenter workflow

Keep three windows ready:

1. The Keynote deck
2. The code editor opened at checkpoint `01-html`
3. The completed root game in a browser

When someone falls behind, ask them to open the next checkpoint folder. The checkpoints are recovery tools, not extra exercises.

## Verify the repository

```bash
npm run check
```

## License

MIT
