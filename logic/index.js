import {
  freeRows,
  freeColumns,
  tetrisFigures,
  tetrisMatrix,
  getRandomFigure,
  rotateMatrix,
} from "./utilities.js";

export class Tetris {
  constructor() {
    this.playfield;
    this.figure;
    this.gameOver = false
    this.generation();
  }

  generation() {
    this.generatePlayfield();
    this.createFigure();
  }

  generatePlayfield() {
    this.playfield = [];
    for (let i = 0; i < freeRows; i += 1) {
      this.playfield[i] = [];
      for (let j = 0; j < freeColumns; j += 1) {
        this.playfield[i][j] = 0;
      }
    }
  }

  createFigure() {
    const name = getRandomFigure(tetrisFigures);
    const matrix = tetrisMatrix[name];

    const column = freeColumns / 2 - Math.floor(matrix.length / 2);
    const row = -2;

    this.figure = {
      name,
      matrix,
      row,
      column,
    };

  }

  moveFigureDown() {
    this.figure.row += 1;
    if (!this.isValid()) {
      this.figure.row -= 1;
      this.placeFigure();
    }
  }

  moveFigureLeft() {
    this.figure.column -= 1;
    if (!this.isValid()) {
      this.figure.column += 1;
    }
  }

  moveFigureRight() {
    this.figure.column += 1;
    if (!this.isValid()) {
      this.figure.column -= 1;
    }
  }

  rotateFigure() {
    const oldMatrix = this.figure.matrix;
    const rotatedMatrix = rotateMatrix(this.figure.matrix);
    this.figure.matrix = rotatedMatrix;
    if (!this.isValid()) {
      this.figure.matrix = oldMatrix;
    }
  }


  isValid() {
    const matrixSize = this.figure.matrix.length;
    for (let row = 0; row < matrixSize; row += 1) {
      for (let column = 0; column < matrixSize; column += 1) {
        if (!this.figure.matrix[row][column]) continue;
        if (this.isOutsideOfGameBoard(row, column)) return false;
        if (this.isCollides(row, column)) return false;
      }
    }
    return true;
}

  isOutsideOfGameBoard(row, column) {
    return this.figure.column + column < 0 || this.figure.column + column >= freeColumns ||this.figure.row + row >= this.playfield.length;
  }

  isCollides(row, column) {
    if (this.playfield[this.figure.row + row] !== undefined && this.playfield[this.figure.row + row][this.figure.column + column] !== undefined) {
      return this.playfield[this.figure.row + row][this.figure.column + column];
    } else {
      return undefined;
    }
  }

  isOutsideOfTopGameBoard(row){
    return this.figure.row + row < 0
  }

  placeFigure() {
    const matrixSize = this.figure.matrix.length;
    for (let row = 0; row < matrixSize; row += 1) {
      for (let column = 0; column < matrixSize; column += 1) {
        if (!this.figure.matrix[row][column]) continue;
        if (this.isOutsideOfTopGameBoard(row)){
          this.gameOver = true
          return
        }

        this.playfield[this.figure.row + row][this.figure.column + column] = this.figure.name;
      }
    }

    this.processFilledRows()
    this.createFigure()
  }

  isGameOver(row){
    return this.moveFigureDown.row + row < 0
  }

  processFilledRows(){
    const filledLines = this.findFilledRows()
    this.removeFilledRows(filledLines)
  }

  findFilledRows(){
    const filledRows = []
    for (let row = 0; row < freeRows; row += 1){
      if (this.playfield[row].every(el => Boolean(el))){
        filledRows.push(row)
      }
    }
    return filledRows
  }

  removeFilledRows(filledRows){
    filledRows.forEach(row => {
      this.dropRowsAbove(row)
    });
  }


  dropRowsAbove(rowToDelete){
    for (let row = rowToDelete; row > 0; row -= 1){
      this.playfield[row] = this.playfield[row - 1]
    }
    this.playfield[0] = new Array(freeColumns).fill(0)
  }

  
}
