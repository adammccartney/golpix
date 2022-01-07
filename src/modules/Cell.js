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

// checks validity of cells coordinates based on the length of the container's
// side (assumes a square grid)
function isValidCoord(coord, len_side) {
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
function getNeighbors (cellcoords, side_length) { 
    let ncells = [];
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let npx = cellcoords.x + i; // calculate neighbors coords
            let npy = cellcoords.y + j;
            // test the validity of neighbors coordinates
            if (!((npx === cellcoords.x) && (npy === cellcoords.y))) { // only check for cells that are not same
                if (isValidCoord(cellcoords, side_length)) {  // test a validity of new coords
                    const ncell = createCellCoords(npx, npy);
                    ncells.push(ncell);
                }
            }
        }
    }
    return Object.freeze(new CellNeighbors(ncells));
}

//function createNeighbors (arraysize) { 
//    // create an array of immutable indexes based o the size of the array
//    // first make an array containing all coordinates
//    const len_side = Math.sqrt(arraysize);  // assumes a square container
//    let cells = [];
//    for (let i = 0; i < arraysize; i++) {
//        let x = i % len_side;
//        let y = Math.floor(i / len_side);
//        const cell = createCellCoords(x, y);
//        cells.push(cell);
//    }
//    // now that cell coordinates are stores, calculate neighbors for each cell
//    let neighbors = [];
//    for (let i = 0; i < cells.length; i++) {
//        neighbors.push(getNeighbors(cells[i], len_side));
//    }
//    return Object.freeze(new CellNeighbors(neighbors));
//}

class Cell {
    constructor (coords, alive, neighbors, next_state) {
        this.coords = coords;
        this.alive = alive;
        this.neighbors = neighbors;
        this.next_state = next_state;
    }
}

function createCell(data) {
    const coords = data.cellcoords;
    let alive = data.alive;
    const neighbors = data.neighbors;
    let next_state = data.next_state;
    return new Cell( coords, alive, neighbors, next_state );
}


const acellcoords = createCellCoords(1, 1);
const aneighbors = createNeighbors(acellcoords, 9); 

