import { createCell } from './Cell.js';

export class Matrix {
    // eslint-disable-next-line
    constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }
}

// basically a default constructor
export function createMatrix(data) {
    const width = data.width;
    const height = data.height;
    const content = [];  // these are going to be cells in the game of life

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            content[y * width + x] = createCell(x, y, alive=false, neighbors=null, next_state=null);
        }
    }

    return Object.freeze(new Matrix({ width, height, content }));
}

