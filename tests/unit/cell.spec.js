import { CellCoords,
         createCellCoords,
         CellNeighbors,
         isValidCoord,
         createNeighbors,
         getNeighbors,
         Cell,
         createCell,
         initializeCells } from '../../src/modules/Cell.js';

describe("CellCoords", () => {
    const cellcoords = new CellCoords(1, 1);

    test("defines cellcoors.x as 1", () => {
        expect(typeof cellcoords.x).toBe("number");
    });
});


describe("createCellCoords", () => {
    const cellcoords = createCellCoords(1, 1);

    test("defines cellcoord as instance of Cell", () => {
        expect(typeof cellcoords).toBe("object");
    });
});


describe("CellNeighbors", () => {
    const neighbors = new CellNeighbors();

    test("defines cellneighbors", () => {
        expect(typeof neighbors).toBe("object");
    });
});

describe("isValidCoord works as expected with integer values", () => {
    
    test("coords outside container return false", () => {
        const coord = {x: -1, y: 42}
        expect(isValidCoord(coord, 4)).toBe(false); // container is 4x4
    });

    test("coords inside container return true", () => {
        const coord = {x: 1, y: 1};
        expect(isValidCoord(coord, 4)).toBe(true);
    });
});

describe("createNeighbors returns a cell neighbors object", () => {
    let c0 = createCellCoords(0, 0);
    let c1 = createCellCoords(0, 1);
    let c2 = createCellCoords(0, 2);
    let c3 = createCellCoords(1, 0);
    let c4 = createCellCoords(1, 2);
    let c5 = createCellCoords(2, 0);
    let c6 = createCellCoords(2, 1);
    let c7 = createCellCoords(2, 2);
    let test_neighbors = [c0, c1, c2, c3, c4, c5, c6, c7];

    test("make neighbors from array of coords", () => {
        expect(typeof createNeighbors(test_neighbors)).toBe("object");
    });
});

describe("getNeighbors works as expected with valid coord", () => {
    const mid_coord = {x: 1, y: 1};
    const side_coord = {x: 0, y: 1};
    const corner_coord = {x: 0, y: 0};
    let middle = getNeighbors(mid_coord, 3);
    let side = getNeighbors(side_coord, 3);
    let corner = getNeighbors(corner_coord, 3);

    test("returns array len 8 from coord(1,1) in 3x3 grid", () => {
        expect(middle.collection.length).toBe(8);
    });
    test("returns array len 5 from coord(0, 1) in 3x3 grid", () => {
        expect(side.collection.length).toBe(5);
    });
    test("returns array len 3 from corner coord in 3x3 grid", () => {
        expect(corner.collection.length).toBe(3);
    });
});




describe("Cell", () => {

    const cell = new Cell();

    test("cell creates and object", () => {
        expect(typeof cell).toBe("object");
    });
});


describe("create cell as partially immutable object", () => {
    const mock_coords = createCellCoords(2, 2);  // a cell with coordinates at the corner of 3x3 grid
    const mock_neighbors = getNeighbors(mock_coords, 3);
    let data = {coords: mock_coords, alive: false, neighbors: mock_neighbors, next_state: false};

    let testcell = createCell(data);

    test("defines instance of cell", () => {
        expect(typeof testcell).toBe("object");
    });

    test("cells coords are set correctly", () => {  // these are also immutable, jest is so jesty it won't 
        expect(testcell.coords.x).toBe(2);  // let us set a value on a read only object
    });

    test("neighbors are defined correctly", () => {
        expect(testcell.neighbors.collection.length).toBe(3);
    });
});


describe("create an N * N grid of cells", () => {
    const array_size = 30 * 30;

    test("grid should contain 900 cells", () => {
        expect(initializeCells(array_size).length).toBe(900);
    });
});

