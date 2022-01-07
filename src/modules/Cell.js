export class Cell {
    constructor (x, y, alive = false, neighbors = null, next_state = null) {
        this.x = x;
        this.y = y; 
        this.alive = alive;
        this.neighbors = neighbors;
        this.next_state = next_state;
    }
}

export function createCell(data) {
    const x = data.x;
    const y = data.y;
    const alive = data.alive;
    const neighbors = data.neighbors;
    const next_state = data.next_state;

    return Object.freeze(new Cell({ x, y, alive, neighbors, next_state }));
}

