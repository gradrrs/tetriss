import { Tetris } from "./index.js";
import { freeRows, freeColumns, convert, getRandomFigure } from "./utilities.js";

let requestId;
let timeoutId;
const tetris = new Tetris();
const cells = document.querySelectorAll('.grid>div');

initKeydown();
moveDown();

function initKeydown() {
  document.addEventListener('keydown', onKeydown);
}

function onKeydown(event) {
  if (!tetris.gameOver) {
    switch (event.key) {
      case 'ArrowUp':
        rotate();
        break;
      case 'ArrowDown':
        moveDown();
        break;
      case 'ArrowLeft':
        moveLeft();
        break;
      case 'ArrowRight':
        moveRight();
        break;
      default:
        break;
    }
  }
}

function moveDown() {
  tetris.moveFigureDown();
  draw();
  stopAutoMove();
  startAutoMove();
  if (tetris.isGameOver) {
    endGame();
  }
}

function moveLeft() {
  tetris.moveFigureLeft();
  draw();
}

const endGame = () => {
  stopAutoMove();
  document.removeEventListener('keydown', onKeydown);
  clearField()
};

function moveRight() {
  tetris.moveFigureRight();
  draw();
}

function rotate() {
  tetris.rotateFigure();
  draw();
}

function startAutoMove() {
  timeoutId = setTimeout(() => { requestId = requestAnimationFrame(moveDown); }, 1000);
}

function stopAutoMove() {
  cancelAnimationFrame(requestId);
  clearTimeout(timeoutId);
}

function draw() {
  cells.forEach(cell => cell.removeAttribute('class'));
  drawPlayfield();
  drawFigure();
}

function drawPlayfield() {
  for (let row = 0; row < freeRows; row += 1) {
    for (let column = 0; column < freeColumns; column += 1) {
      if (!tetris.playfield[row][column]) continue;
      const name = tetris.playfield[row][column];
      const cellIndex = convert(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawFigure() {
  const name = tetris.figure.name;
  const tetrominoMatrixSize = tetris.figure.matrix.length;
  for (let row = 0; row < tetrominoMatrixSize; row += 1) {
    for (let column = 0; column < tetrominoMatrixSize; column += 1) {
      if (!tetris.figure.matrix[row][column]) continue;
      if (tetris.figure.row + row < 0) continue;
      const cellIndex = convert(tetris.figure.row + row, tetris.figure.column + column);
      cells[cellIndex].classList.add(name);
    }
  }
}

/*function drawAni() {
  for (let row = 0; row < freeRows; row += 1) {
    for (let column = 0; column < freeColumns; column += 1) {
      let element = document.getElementById(square-${row}-${column});
      
      if (tetris.playfield[row][column] === 0) {
        tetris.placeFigure[row][column] = 1;
        element.classList.add('ani');
      }
    }
  }
}
*/

function clearField(){
  const filledCells = [...cells].filter(cell => cell.classList.length < 0)
  filledCells.forEach((cell, i) => {
    setTimeout(() => cell.classList.add('hide'), i * 10)
    setTimeout(() => cell.removeAttribute('class'), i * 10 + 500)
  })
}