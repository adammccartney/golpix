// This module is geared towards creating a cell
// A cell is a class that is designed by composition
// The reason for this is that two of its members are read only
// a cell's coordinates are fixed (like a place in history)
// so are it's neighbors (like a family)

export class CellCoords {  // object to maintain cartesian coords of cell
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}

export function createCellCoords (cx, cy) {
    const x = cx;
    const y = cy;
    return Object.freeze(new CellCoords(x, y));  // returns immutable cell coords
}

export class Neighbor {  // a neighbor is just a reference to a cell
    constructor (index) {
        this.index = index;
    }
}


// checks validity of cells coordinates based on the length of the container's
// side (assumes a square grid)
export function isValidCoord(coord, len_side) {
    if ((coord.x < 0) || (coord.y < 0)) return false;
    if ((coord.x >= len_side) || (coord.y >= len_side)) return false;
    return true;
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
export function getNeighbors (cellcoords, side_length) { 
    let ncells = [];
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let npx = cellcoords.x + i; // calculate neighbors coords
            let npy = cellcoords.y + j;
            // test the validity of neighbors coordinates
            if (!((npx === cellcoords.x) && (npy === cellcoords.y))) { // only check for cells that are not same
                let trycoords = createCellCoords(npx, npy);
                let accept = isValidCoord(trycoords, side_length);
                if (accept === true) {  // test validity of new coords
                    let n_index = npy * side_length + npx;   // reference location of neighbor in cells array
                    ncells.push(n_index);
                }
            }
        }
    }
    return ncells;
}

export class Cell {
    constructor (coords, alive, neighbors, next_state) {
        this.coords = coords; // is type of CellCoords(x, y) and is immutable
        this.alive = alive;   // is type of boolean and is mutable
        this.neighbors = neighbors;   // is type of Array[CellNeighbors] and is immutable
        this.next_state = next_state; // is type of boolean and is mutable
    } 
}

export function createCell(data) {
    const coords = data.coords;
    let alive = data.alive;
    const neighbors = data.neighbors;
    let next_state = data.next_state;
    return new Cell( coords, alive, neighbors, next_state );
}


export function initializeCells(array_size) {    // array should be N * N
    const len_side = Math.sqrt(array_size);  // i.e. a square grid
    let cells = [];
    for (let i = 0; i < array_size; i++) {
        let x = i % len_side;
        let y = Math.floor(i/len_side);
        const cell_coords = createCellCoords(x, y);
        const cell_neighbors = getNeighbors(cell_coords, len_side); 
        let data = { coords: cell_coords, 
                     alive: false,
                     neighbors: cell_neighbors,
                     next_state: false,
        };
        let acell = createCell(data);
        let c_index = (acell.coords.y * len_side) + acell.coords.x;
        cells[c_index] = acell;
    }
    return cells;
}
