const btnStart = document.getElementById("startGameBtn");
const canvas = document.getElementById("theCanvas");
const ctx = canvas.getContext("2d");

const gameArea = {
  player: null,
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

  requestAnimationFrame(updateGame);
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
}

// Espera a página carregar tudo
window.addEventListener("load", () => {
  btnStart.addEventListener("click", startGame);

  document.addEventListener("keydown", (event) => {
    console.log(event.key);

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
    console.log(event.key);

    gameArea.player.speedX = 0;
    gameArea.player.speedY = 0;
  });
});
