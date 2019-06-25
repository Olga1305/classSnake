var game;
document.onload = (function() {
  const canvas = document.getElementById("snake");
  const ctx = canvas.getContext("2d");
  const widthCell = 10;

  game = new Game({
    rows: canvas.width / widthCell,
    columns: canvas.height / widthCell,
    maxCells: widthCell,
    snake: new Snake(canvas.width / widthCell, canvas.height / widthCell),
    ctx: ctx
  });
  game.start();

  game.gameOver = function() {
    let gameOver = document.getElementById("gameover");
    canvas.style = "display: none";
    gameOver.style = "display: block";
  };
})();
