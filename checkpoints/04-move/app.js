// Find the game elements in index.html.
const stage = document.querySelector("#game-stage");
const dino = document.querySelector("#dino");
const obstacle = document.querySelector("#obstacle");
const startButton = document.querySelector("#start-button");
const statusText = document.querySelector("#status");

// Store the changing game state.
let running = false;
let jumping = false;
let jumpVelocity = 0;
let jumpHeight = 0;
let obstacleX = 0;
let lastTime = 0;

// These constants control the jump and the obstacle's movement speed.
const gravity = 2100;
const jumpPower = 760;
const speed = 310;

// Reset the dinosaur and obstacle, then start the animation loop.
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

// Begin a jump only while the game is running and the dinosaur is grounded.
function jump() {
  if (!running || jumping) return;
  jumping = true;
  jumpVelocity = jumpPower;
}

// Update the dinosaur and obstacle once per animation frame.
function gameLoop(now) {
  if (!running) return;

  // Using elapsed time keeps movement similar on fast and slow screens.
  const deltaTime = Math.min((now - lastTime) / 1000, 0.04);
  lastTime = now;

  if (jumping) {
    // Apply upward velocity and downward gravity.
    jumpHeight += jumpVelocity * deltaTime;
    jumpVelocity -= gravity * deltaTime;
    if (jumpHeight <= 0) {
      // The dinosaur has landed.
      jumpHeight = 0;
      jumping = false;
    }
    // The ground is 42px tall. Add the current jump height to that base
    // position, then turn the number into a CSS value such as "122px".
    dino.style.bottom = `${42 + jumpHeight}px`;
  }

  // Subtracting from the x position moves the obstacle to the left.
  obstacleX -= speed * deltaTime;
  // Send it back to the right after it moves beyond the stage.
  if (obstacleX < -70) obstacleX = stage.clientWidth + 60;
  obstacle.style.left = `${obstacleX}px`;

  // Ask the browser for the next frame.
  requestAnimationFrame(gameLoop);
}

// Connect mouse and keyboard input to the game functions.
startButton.addEventListener("click", startGame);
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    // Prevent Space from scrolling the web page.
    event.preventDefault();
    jump();
  }
});
