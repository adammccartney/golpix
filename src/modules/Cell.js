class CellCoords {  // object to maintain cartesian coords of cell
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}

function createCellCoords (cx, cy) {
    const x = cx;
    const y = cy;
    return Object.freeze(new CellCoords(x, y));  // returns immutable cell coords
}

class CellNeighbors {
    constructor (neighbors) {
        this.neighbors = neighbors;
    }
}

function createCellNeighbors (coords, arraysize) { 
    // create an array of immutable indexes based on the 
    // coordinates of the cell and the size of the array
    // this basically models a 2d matrix by flattening
    //
}

class Cell {
    constructor (coords, alive, neighbors, next_state) {
        this.coords = coords;
        this.alive = alive;
        this.neighbors = neighbors;
        this.next_state = next_state;
    }
}

function createCell(data) {
    const coords = createCellCoords(data.x, data.y);
    let alive = data.alive;
    const neighbors = data.neighbors;
    let next_state = data.next_state;
    return new Cell( coords, alive, neighbors, next_state );
}


let data = {x: 2, y: 3, alive: true, neighbors: [2,3,4,5], next_state: true};
let mycell = createCell(data);

