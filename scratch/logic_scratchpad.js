
const WIDTH = 4;
const HEIGHT = 4;

let pixels = Array(WIDTH * HEIGHT);

// Gets renders a flat array as a dict of x, y coordinates 
function getCoordinateDict (pixArray, width, height) {
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
        console.log(x, y);
        let coord = new Coord(x, y)
        addCoord(i, coord);
    }
    return coords;
}

let codict = getCoordinateDict(pixels, WIDTH, HEIGHT);
