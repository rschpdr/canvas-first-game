const btnStart = document.getElementById("startGameBtn");
const canvas = document.getElementById("theCanvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "./gameOver.jpg";

const gameArea = {
  player: null,
  obstacles: [],
  frames: 0,
  score: 0,
  animationId: 0,
};

// Start the game
function startGame() {
  btnStart.parentElement.style.display = "none";
  canvas.style.display = "block";

  gameArea.player = new Component(0, 110, 30, 30, "red");

  updateGame();
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Atualizar posição dos elementos
  gameArea.player.newPos();
  gameArea.player.update();

  updateObstacles();

  updateScore(gameArea.score);

  gameArea.animationId = requestAnimationFrame(updateGame);

  checkGameOver();
}

function updateScore(score) {
  ctx.fillStyle = "red";
  ctx.font = "20px Arial";

  ctx.fillText(`Score: ${score}`, canvas.width - 90, 40);
}

function checkGameOver() {
  const crashed = gameArea.obstacles.some((obstacle) => {
    return gameArea.player.isCrashedWith(obstacle);
  });

  if (crashed) {
    cancelAnimationFrame(gameArea.animationId);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
}

function updateObstacles() {
  gameArea.frames++;

  if (gameArea.frames % 30 === 0) {
    gameArea.score++;
  }

  gameArea.obstacles.map((obstacle) => {
    obstacle.x--;
    obstacle.update();
  });

  if (gameArea.frames % 120 === 0) {
    let x = canvas.width;
    let minHeight = 20;
    let maxHeight = 200;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );

    let minGap = 50;
    let maxGap = 200;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

    const upperObstacle = new Component(x, 0, 10, height, "green");
    const bottomObstacle = new Component(
      x,
      height + gap,
      10,
      x - height - gap,
      "green"
    );

    gameArea.obstacles.push(upperObstacle);
    gameArea.obstacles.push(bottomObstacle);
  }
}

class Component {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
  }

  update() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  isCrashedWith(obstacle) {
    const condition = !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );

    return condition;
  }
}

// Espera a página carregar tudo
window.addEventListener("load", () => {
  btnStart.addEventListener("click", startGame);

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        gameArea.player.speedX -= 1;
        break;
      case "ArrowRight":
        gameArea.player.speedX += 1;
        break;
      case "ArrowUp":
        gameArea.player.speedY -= 1;
        break;
      case "ArrowDown":
        gameArea.player.speedY += 1;
        break;
      default:
        return;
    }
  });

  document.addEventListener("keyup", (event) => {
    gameArea.player.speedX = 0;
    gameArea.player.speedY = 0;
  });
});
