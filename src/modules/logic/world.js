// Gets renders a flat array as a dict of x, y coordinates 
function getCoordinatesDict (pixArray, width, height) {
    class Coord {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    let coords = [];
    function addCoord(index, coord) {
        coords[index] = coord;
    }
    for (let i = 0; i < pixArray.length; i++) {
        let x = i % width;
        let y = Math.floor(i / height);
        let coord = new Coord(x, y)
        addCoord(i, coord);
    }
    return coords;
}

class Cell {
    constructor (x, y, alive = false, neighbors = null, next_state = null) {
        this.x = x;
        this.y = y; 
        this.alive = alive;
        this.neighbors = neighbors;
        this.next_state = next_state;
    }
    to_char() {
        return (this.alive ? 'o' : ' ')
    }
}

class Matrix {
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

  get(x, y) {
    if ((x < 0) || (y < 0)) return undefined;
    if ((x >= this.width) || (y >= this.height)) return undefined;
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

// value here is returning a cell at point x, y
class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return {done: true};

    let value = {x: this.x,
                 y: this.y,
                 value: this.matrix.get(this.x, this.y)};
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return {value, done: false};
  }
}

Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
};


// iterates over the matrix and updates  
function updateCells (matrix, cells) {
    console.log(matrix);
    for (let i = 0; i < cells.length; i++) {
         let tcell = matrix.get(cells[i].x, cells[i].y); 
         tcell.alive = cells[i].alive;
         matrix.set(tcell.x, tcell.y, tcell);
    }
}



function isValidCell (cell, matrix) {
    return (matrix.get(cell.x, cell.y) !== undefined) ? true : false;
}
/*  
    *  while at cell x, y
    *  visit values in the matrix:
    *     ((x - 1), (y - 1)),
    *     ((x - 1), (y)),
    *     ((x - 1), (y + 1)),
    *     ((x), (y - 1)),
    *     ((x), (y + 1)),
    *     ((x + 1), (y - 1)),
    *     ((x + 1), (y)),
    *     ((x + 1), (y + 1)),
    * */
function getNCells (cell, matrix) { 
    let ncells = [];
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let npx = cell.x + i;
            let npy = cell.y + j;
            if (!((npx === cell.x) && (npy === cell.y))) {
                let tcell = new Cell(npx, npy);
                if (isValidCell(tcell, matrix)) {
                    let ncell = matrix.get(npx, npy);
                    ncells.push(ncell);
                }
            }
        }
    }
    return ncells;
}


function updateNeighbors (matrix) {
    for (let {x, y, value} of matrix) {
        let ncells = getNCells(value, matrix);
        value.neighbors = ncells;
        matrix.set(x, y, value);
    }
}

export { 
         getCoordinatesDict, 
         Cell, 
         Matrix,
         updateCells,
         updateNeighbors,
};
