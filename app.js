const stage = document.querySelector("#game-stage");
const dino = document.querySelector("#dino");
const obstacle = document.querySelector("#obstacle");
const startButton = document.querySelector("#start-button");
const scoreText = document.querySelector("#score");
const statusText = document.querySelector("#status");

let running = false;
let jumping = false;
let jumpVelocity = 0;
let jumpHeight = 0;
let obstacleX = 0;
let speed = 310;
let score = 0;
let lastTime = 0;

const gravity = 2100;
const jumpPower = 760;

function startGame() {
  running = true;
  jumping = false;
  jumpVelocity = 0;
  jumpHeight = 0;
  obstacleX = stage.clientWidth + 80;
  speed = 310;
  score = 0;
  lastTime = performance.now();

  dino.style.bottom = "42px";
  obstacle.style.left = `${obstacleX}px`;
  scoreText.textContent = "0";
  statusText.textContent = "Run started. Press Space or ↑ to jump.";
  startButton.textContent = "Restart game";
  stage.focus();
  requestAnimationFrame(gameLoop);
}

function jump() {
  if (!running || jumping) return;

  jumping = true;
  jumpVelocity = jumpPower;
}

function rectanglesOverlap(first, second) {
  const padding = 12;

  return (
    first.right - padding > second.left + padding &&
    first.left + padding < second.right - padding &&
    first.bottom - padding > second.top + padding &&
    first.top + padding < second.bottom - padding
  );
}

function endGame() {
  running = false;
  statusText.textContent = `Collision. Final score: ${Math.floor(score)}. Select Restart game to try again.`;
}

function gameLoop(now) {
  if (!running) return;

  const deltaTime = Math.min((now - lastTime) / 1000, 0.04);
  lastTime = now;

  if (jumping) {
    jumpHeight += jumpVelocity * deltaTime;
    jumpVelocity -= gravity * deltaTime;

    if (jumpHeight <= 0) {
      jumpHeight = 0;
      jumpVelocity = 0;
      jumping = false;
    }

    dino.style.bottom = `${42 + jumpHeight}px`;
  }

  obstacleX -= speed * deltaTime;
  if (obstacleX < -70) {
    obstacleX = stage.clientWidth + 60;
    speed += 14;
  }
  obstacle.style.left = `${obstacleX}px`;

  score += deltaTime * 10;
  scoreText.textContent = Math.floor(score);

  if (rectanglesOverlap(dino.getBoundingClientRect(), obstacle.getBoundingClientRect())) {
    endGame();
    return;
  }

  requestAnimationFrame(gameLoop);
}

startButton.addEventListener("click", startGame);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    event.preventDefault();
    jump();
  }
});

stage.addEventListener("pointerdown", jump);
