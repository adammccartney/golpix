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

describe("createNeighbors returns a list of valid cell index references", () => {
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
        expect(typeof getNeighbors(test_neighbors)).toBe("object");
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
        expect(middle.length).toBe(8);
    });
    test("returns array len 5 from coord(0, 1) in 3x3 grid", () => {
        expect(side.length).toBe(5);
    });
    test("returns array len 3 from corner coord in 3x3 grid", () => {
        expect(corner.length).toBe(3);
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
        expect(testcell.neighbors.length).toBe(3);
    });
});


describe("create an N * N grid of cells", () => {
    const array_size = 30 * 30;

    test("grid should contain 900 cells", () => {
        expect(initializeCells(array_size).length).toBe(900);
    });
});


describe("neighbors are correctly produced", () => {
    const array_size = 30 * 30;
    let cells = initializeCells(array_size);

    test("a corner cell will have 3 neighbors", () => {
        expect(cells[0].neighbors.length).toBe(3);
    });
});


describe("neighbors are well defined", () => {
    const array_size = 3 * 3;
    let cells = initializeCells(array_size);

    test("no neighbor tries to reference a cell outside of array", () => {
        for (let i = 0; i < cells; cells++) {
            for (let j = 0; j < cells[i].neighbors; j++) {
                expect(cells[i].neighbors[j]).toBeLessThan(cells.length);
            }
        }
    });
});


describe("neighbor returns index as expected", () => {
    const array_size = 5 * 5;
    let cells = initializeCells(array_size);
    let new_neighbors = [6, 7, 8, 11, 13, 16, 17, 18];
    let sum = new_neighbors.reduce(function (a, b) {
        return a+b;
    }, 0);

    test("cell at index twelve in a 25x25 grid has x coord 2", () => {
        expect(cells[12].coords.x).toBe(2);
    });

    test("cell at index twelve in a 25x25 grid has x coord 2", () => {
        expect(cells[12].coords.y).toBe(2);
    });

    test("cell at index twelve has 8 neighbors", () => {
        let narray = Array.from(cells[12].neighbors);
        expect(narray.length).toBe(8);
    });

    test("cell at index twelve has expected neighbors", () => {
        let computed_sum = cells[12].neighbors.reduce(function (a,b) {
            return a + b;
        }, 0);
        expect(computed_sum).toEqual(sum);
    });
});
