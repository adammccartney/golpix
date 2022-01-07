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

export class CellNeighbors {
    constructor (collection) {
        this.collection = collection;
    }
}

export function createNeighbors (coords) {
    const neighbors = coords;
    return new CellNeighbors(neighbors);
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
                    const ncellcoords = createCellCoords(npx, npy);
                    let ndata = {coords: ncellcoords, alive: false};
                    let neighbor = createNeighbor(ndata);
                    ncells.push(neighbor);
                }
            }
        }
    }
    let neighbors = createNeighbors(ncells);
    return neighbors;
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

export class Neighbor {  // neighbor is like a cell, but just knows it's coords and current next_state
    constructor (coords, alive) {
        this.coords = coords; // is type of CellCoords(x, y) and is immutable
        this.alive = alive;   // is type of boolean and is mutable
    }
}

export function createNeighbor(data) {
    const coords = data.coords;
    let alive = data.alive;
    return new Neighbor(coords, alive);
}

export function initializeCells(array_size) {    // array should be N * N
    const len_side = Math.sqrt(array_size);  // i.e. a square grid
    let cells = [];
    for (let i = 0; i < array_size; i++) {
        let x = i % len_side;
        let y = Math.floor(i/4);
        const cell_coords = createCellCoords(x, y);
        const cell_neighbors = getNeighbors(cell_coords, len_side); 
        let data = { coords: cell_coords, 
                     alive: false,
                     neighbors: cell_neighbors.collection,
                     next_state: false,
        };
        let acell = createCell(data);
        cells.push(acell);
    }
    return cells;
}
