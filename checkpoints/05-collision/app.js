// Find the HTML elements that this checkpoint controls.
const stage = document.querySelector("#game-stage");
const dino = document.querySelector("#dino");
const obstacle = document.querySelector("#obstacle");
const startButton = document.querySelector("#start-button");
const statusText = document.querySelector("#status");

// These variables remember the current game state.
let running = false;
let jumping = false;
let jumpVelocity = 0;
let jumpHeight = 0;
let obstacleX = 0;
let lastTime = 0;

// Values that control jump physics and obstacle speed.
const gravity = 2100;
const jumpPower = 760;
const speed = 310;

// Reset the game and begin the animation loop.
function startGame() {
  running = true;
  jumping = false;
  jumpVelocity = 0;
  jumpHeight = 0;
  obstacleX = stage.clientWidth + 80;
  lastTime = performance.now();
  dino.style.bottom = "42px";
  obstacle.style.left = `${obstacleX}px`;
  statusText.textContent = "Jump over the rock.";
  stage.focus();
  requestAnimationFrame(gameLoop);
}

// Start a jump unless the game is stopped or a jump is already happening.
function jump() {
  if (!running || jumping) return;
  jumping = true;
  jumpVelocity = jumpPower;
}

// A collision happens when the two browser rectangles overlap.
// Padding makes the collision area smaller than the visible emoji boxes.
function rectanglesOverlap(first, second) {
  const padding = 12;
  return (
    first.right - padding > second.left + padding &&
    first.left + padding < second.right - padding &&
    first.bottom - padding > second.top + padding &&
    first.top + padding < second.bottom - padding
  );
}

// Update movement and collision detection before each browser frame.
function gameLoop(now) {
  if (!running) return;

  // Measure elapsed time so movement does not depend on frame rate.
  const deltaTime = Math.min((now - lastTime) / 1000, 0.04);
  lastTime = now;

  if (jumping) {
    // Move upward first, while gravity gradually pulls the dinosaur down.
    jumpHeight += jumpVelocity * deltaTime;
    jumpVelocity -= gravity * deltaTime;
    if (jumpHeight <= 0) {
      // Reset the jump after landing.
      jumpHeight = 0;
      jumping = false;
    }
    dino.style.bottom = `${42 + jumpHeight}px`;
  }

  // Move the obstacle left and recycle it after it leaves the screen.
  obstacleX -= speed * deltaTime;
  if (obstacleX < -70) obstacleX = stage.clientWidth + 60;
  obstacle.style.left = `${obstacleX}px`;

  // Read the current element positions and stop when they overlap.
  if (rectanglesOverlap(dino.getBoundingClientRect(), obstacle.getBoundingClientRect())) {
    running = false;
    statusText.textContent = "Collision. Select Start game to try again.";
    return;
  }

  // No collision occurred, so draw another frame.
  requestAnimationFrame(gameLoop);
}

// Connect the start button and keyboard controls.
startButton.addEventListener("click", startGame);
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    // Keep Space from scrolling the page during play.
    event.preventDefault();
    jump();
  }
});
