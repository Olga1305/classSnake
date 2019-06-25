class Game {
  constructor(options) {
    this.rows = options.rows;
    this.columns = options.columns;
    this.maxCells = options.maxCells;
    this.food = undefined;
    this.ctx = options.ctx;
    this.snake = options.snake;
    this.gameOver = undefined;
  }

  _drawBoard() {
    this.ctx.fillStyle = "#E3D4AB";
    this.ctx.fillRect(
      0,
      0,
      this.rows * this.maxCells,
      this.columns * this.maxCells
    );
  }

  _drawSnake() {
    // arrow function ya que hace que no pierda la referencia del this
    this.snake.body.forEach(position => {
      this.ctx.fillStyle = "green";
      // pintamos cada uno de los elementos del cuerpo de la serpiente
      this.ctx.fillRect(position.column * 10, position.row * 10, 8, 8);
    });
  }

  _drawFood() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.food.column * 10, this.food.row * 10, 8, 8);
  }

  _generateFood() {
    do {
      this.food = {
        row: Math.floor(Math.random() * this.rows),
        column: Math.floor(Math.random() * this.columns)
      };
    } while (this.snake.collidesWith(this.food));
  }

  _assignControlsToKeys() {
    document.onkeydown = e => {
      switch (e.keyCode) {
        case 38: // arrow up
          this.snake.goUp();
          break;
        case 40: // arror down
          this.snake.goDown();
          break;
        case 37: // arror left
          this.snake.goLeft();
          break;
        case 39: // arrow right
          this.snake.goRight();
          break;
        case 80: // p pause
          this.snake.intervalId ? this.snake.stop() : this.snake.move();
          break;
      }
    };
  }

  _update() {
    this._drawBoard();
    this._drawSnake();
    if (this.food) {
      this._drawFood();
    }
    if (this.snake.collidesWith(this.food)) {
      this.snake.grow();
      this._generateFood();

      // this.points++;
      // this.updatePointsCB(this.points);
    }

    if (this.snake.hasEatenItSelf()) {
      this.snake.stop();
      this.pause();
      this.gameOver();
    }

    // la funcion de abajo sabe cuando tiene que volver a llamar la funcion que se pasa por parametro;
    if (this.intervalGame !== undefined) {
      window.requestAnimationFrame(this._update.bind(this));
    }
  }

  pause() {
    if (this.intervalGame) {
      window.cancelAnimationFrame(this.intervalGame);
      this.intervalGame = undefined;
    }
  }

  start() {
    // bucle infinito que se encarga de pintar el canvas
    this._assignControlsToKeys();
    this._generateFood();
    this.snake.move();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }
}
