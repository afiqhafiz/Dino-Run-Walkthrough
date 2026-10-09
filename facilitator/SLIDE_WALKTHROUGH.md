# Dino Run slide walkthrough

This guide follows the 29-slide **Dino Run: Web development through an offline browser game** deck for 10 October 2026, 8:00 AM–12:00 PM.

## Before participants arrive

- Open the finished root project in the browser.
- Open `checkpoints/01-html/index.html` in the editor and browser.
- Increase the editor font size until the back row can read one line at a time.
- Keep DevTools docked on the right with the Console tab visible.
- Test Space, Arrow Up, pointer input, restart, and the browser refresh shortcut.

## 8:00–8:10 — Arrival and setup

Use slide 1 while participants open the repository. Ask them to identify `index.html`, `styles.css`, and `app.js`. Confirm that `index.html` opens without a server.

## 8:10–8:30 — Final project

Use slide 2 and show the completed root game for about 60 seconds.

Demonstrate:

- Space or Arrow Up makes the dinosaur jump.
- The obstacle crosses the stage.
- A collision ends the game.
- The score rises during a run.
- Restart resets the state.

Say: “We will build the smallest useful version of each feature, then combine them.”

## 8:30–9:10 — Introduction to web development

Use slides 3–7.

Open the three root files side by side. Point to one concrete responsibility in each file:

- HTML: `id="dino"` gives JavaScript a reliable element to find.
- CSS: `.dino` controls the dinosaur's size and position.
- JavaScript: `jump()` changes the dinosaur's vertical movement.

For slide 7, introduce the same debugging loop used later: describe, observe, inspect, repair.

Prompt: “Which file should change the jump height?” Expected answer: `app.js`.

## 9:10–9:40 — HTML fundamentals

Use slides 8–11 and work in `checkpoints/01-html`.

Walk through these elements in order:

1. The heading and instruction paragraph
2. The score element
3. The game stage
4. The dinosaur and obstacle
5. The start button
6. The linked CSS and deferred JavaScript files

Ask participants to change the game title, add one instruction sentence, and confirm that both linked files use the correct names.

Recovery point: everyone should see the heading, score, game area, and start button before the break.

## 9:40–9:50 — Short break

Participants save all three files. Anyone who is blocked opens `checkpoints/01-html` and refreshes the browser.

## 9:50–10:25 — CSS fundamentals

Use slides 13–16 and work toward `checkpoints/02-css`.

Show one selector, one property, and one value using `.dino`. Then explain why the stage is `position: relative` while the dinosaur and obstacle are `position: absolute`.

Participant choice:

- Change `--coral` to a new accent colour.
- Change the dinosaur width and height.
- Move one cloud by changing `top` or `left`.

Recovery point: open `checkpoints/02-css` if the page does not match the visible game scene by 10:25 AM.

## 10:25–10:55 — JavaScript introduction

Use slides 17–20 and work toward `checkpoints/03-jump`.

Build in this order:

1. Select the stage, dinosaur, and button.
2. Add variables for running, jumping, velocity, and height.
3. Add the button event.
4. Add the keyboard event.
5. Add `jump()`.
6. Update height inside `requestAnimationFrame`.

Translate each block into plain language before typing it. Pause after the first successful jump.

Prompt: “Why does `jump()` return while `jumping` is true?” Expected answer: it prevents a second jump in the air.

## 10:55–11:35 — Guided build

Use slides 21–24.

Follow the deck sequence and use a checkpoint after each visible result:

| Time | Build | Recovery folder |
| --- | --- | --- |
| 10:55 | Start | `03-jump` |
| 11:03 | Jump | `03-jump` |
| 11:12 | Move | `04-move` |
| 11:21 | Collide | `05-collision` |
| 11:30 | Finish | `06-finish` |

For collision, explain the rectangle overlap test as four comparisons. Avoid deriving the geometry unless someone asks.

Introduce one deliberate mistake, such as changing `#dino` to `#dinosaur`. Use the four-step routine from slide 24: expected, actual, console, one fix.

## 11:35–11:45 — Participant sharing

Use slides 25–26. Give each person or pair two minutes.

Ask:

- What did you change?
- Which file did you edit?
- What happened after you refreshed?
- What would you add next?

Prioritise a clear explanation over polish.

## 11:45–11:55 — Questions

Use slides 27–28. Keep `index.html`, `styles.css`, and `app.js` visible while answering so every answer points back to the project.

Suggested next step: add one feature without adding a framework. Good options include a second obstacle, a high score, or a different character.

## 11:55–12:00 — Closing

Use slide 29. Share attendance and feedback links, then ask participants to keep the project and change one feature within 48 hours.

## Common recovery checks

- Browser shows old code: save the file and refresh.
- Nothing moves: confirm `app.js` is linked and open the Console.
- `Cannot read properties of null`: compare the JavaScript selector with the HTML `id`.
- JavaScript stops after one edit: check the first Console error and inspect nearby brackets.
- CSS does not apply: compare the selector spelling and confirm `styles.css` is linked.
