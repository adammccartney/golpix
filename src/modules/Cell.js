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

export function createNeighbors (data) {
    const neighbors = data.neighbors;
    return Object.freeze(new CellNeighbors(neighbors));
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
                    const ncell = createCellCoords(npx, npy);
                    ncells.push(ncell);
                }
            }
        }
    }
    return Object.freeze(new CellNeighbors(ncells));
}

export class Cell {
    constructor (coords, alive, neighbors, next_state) {
        this.coords = coords;
        this.alive = alive;
        this.neighbors = neighbors;
        this.next_state = next_state;
    }
}

export function createCell(data) {
    const coords = data.coords;
    let alive = data.alive;
    const neighbors = data.neighbors;
    let next_state = data.next_state;
    return new Cell( coords, alive, neighbors, next_state );
}
