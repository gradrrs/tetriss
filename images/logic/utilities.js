export const freeColumns = 10;
export const freeRows = 20;
export const tetrisFigures = ['I', 'J', 'L', 'O', 'S', 'Z', 'T'];
export const tetrisMatrix = {
  'I': [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  'J': [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  'L': [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  'O': [
    [1, 1],
    [1, 1],
  ],
  'S': [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  'Z': [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  'T': [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]
};

export function getRandomFigure(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function rotateMatrix(matrix) {
  const N = matrix.length;
  const rotatedMatrix = [];
  for (let i = 0; i < N; i += 1) {
    rotatedMatrix[i] = [];
    for (let j = 0; j < N; j += 1) {
      rotatedMatrix[i][j] = matrix[N - j - 1][i];
    }
  }
  return rotatedMatrix;
}

export function convert(row, column) {
  return row * freeColumns + column;
}

