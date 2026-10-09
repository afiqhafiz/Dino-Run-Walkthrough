// Find the HTML elements that JavaScript needs to read or change.
// The text inside querySelector matches an id from index.html.
const stage = document.querySelector("#game-stage");
const dino = document.querySelector("#dino");
const obstacle = document.querySelector("#obstacle");
const startButton = document.querySelector("#start-button");
const scoreText = document.querySelector("#score");
const statusText = document.querySelector("#status");

// These variables remember the current state of the game.
// `let` is used because their values change while the game runs.
let running = false;
let jumping = false;
let jumpVelocity = 0;
let jumpHeight = 0;
let obstacleX = 0;
let speed = 310;
let score = 0;
let lastTime = 0;

// These values control how the jump feels.
// Gravity pulls the dinosaur down while jumpPower pushes it up.
const gravity = 2100;
const jumpPower = 760;

// Reset every value and begin a new run.
function startGame() {
  running = true;
  jumping = false;
  jumpVelocity = 0;
  jumpHeight = 0;
  obstacleX = stage.clientWidth + 80;
  speed = 310;
  score = 0;
  lastTime = performance.now();

  // Put the characters back at their starting positions.
  dino.style.bottom = "42px";
  obstacle.style.left = `${obstacleX}px`;

  // Reset the text that the participant can see.
  scoreText.textContent = "0";
  statusText.textContent = "Run started. Press Space or ↑ to jump.";
  startButton.textContent = "Restart game";

  // Move keyboard focus to the game, then draw the first frame.
  stage.focus();
  requestAnimationFrame(gameLoop);
}

// Start a jump only while the game is running and the dinosaur is on the ground.
function jump() {
  if (!running || jumping) return;

  jumping = true;
  jumpVelocity = jumpPower;
}

// Check whether the dinosaur's rectangle overlaps the obstacle's rectangle.
// Padding makes the collision area slightly smaller than the emoji artwork.
function rectanglesOverlap(first, second) {
  const padding = 12;

  return (
    first.right - padding > second.left + padding &&
    first.left + padding < second.right - padding &&
    first.bottom - padding > second.top + padding &&
    first.top + padding < second.bottom - padding
  );
}

// Stop requesting new animation frames and show the final result.
function endGame() {
  running = false;
  statusText.textContent = `Collision. Final score: ${Math.floor(score)}. Select Restart game to try again.`;
}

// The browser calls this function before it draws each new frame.
// `now` is the current time supplied by requestAnimationFrame.
function gameLoop(now) {
  if (!running) return;

  // Work out how many seconds passed since the previous frame.
  // The 0.04 limit prevents a very large movement after an inactive tab resumes.
  const deltaTime = Math.min((now - lastTime) / 1000, 0.04);
  lastTime = now;

  // Move the dinosaur upward, then let gravity reduce its upward speed.
  if (jumping) {
    jumpHeight += jumpVelocity * deltaTime;
    jumpVelocity -= gravity * deltaTime;

    // When the height reaches the ground, finish the jump.
    if (jumpHeight <= 0) {
      jumpHeight = 0;
      jumpVelocity = 0;
      jumping = false;
    }

    // The ground is 42px tall. Add the current jump height to that base
    // position, then turn the number into a CSS value such as "122px".
    dino.style.bottom = `${42 + jumpHeight}px`;
  }

  // Move the obstacle left. After it leaves the stage, return it to the right
  // and make the next pass slightly faster.
  obstacleX -= speed * deltaTime;
  if (obstacleX < -70) {
    obstacleX = stage.clientWidth + 60;
    speed += 14;
  }
  obstacle.style.left = `${obstacleX}px`;

  // Add points based on time so the score rises smoothly on fast and slow devices.
  score += deltaTime * 10;
  scoreText.textContent = Math.floor(score);

  // Read both positions from the browser and end the run if they overlap.
  if (rectanglesOverlap(dino.getBoundingClientRect(), obstacle.getBoundingClientRect())) {
    endGame();
    return;
  }

  // Ask the browser to run gameLoop again for the next frame.
  requestAnimationFrame(gameLoop);
}

// Clicking the button starts or restarts the game.
startButton.addEventListener("click", startGame);

// Listen for keyboard input anywhere on the page.
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    // Stop Space from scrolling the page while it is being used for the game.
    event.preventDefault();
    jump();
  }
});

// A tap or mouse click inside the stage also makes the dinosaur jump.
stage.addEventListener("pointerdown", jump);
