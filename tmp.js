
function neighbalive (neighbors) {
    let nalive = 0;
    for (let n of neighbors) {
        if (n.alive === true) nalive++
    }
    return nalive;
}

// read the current state an calculate 

// update neighbors based on new state
// should read the matrix as if it is reading the gui state
function generatenext (matrix) {
    for (let {x, y, value} of matrix) {
        value.alive = value.next_state;
    }
}



/*TODO: rename this function, it's changing the state of neighbors in a subtle
    *   way
    * */
function updatestate (matrix, vcell) {
    if (vcell.alive) {   // gui tells if a vcell is alive
        let tcell = matrix.get(vcell.x, vcell.y); // got locates neighbors
        tcell.alive = vcell.alive;
        matrix.set(tcell.x, tcell.y, tcell);
    }
}

function initliving (matrix, cells) {
    for (let i = 0; i < cells.length; i++) {
        updatestate (matrix, cells[i]);
    }
}

function updatenextstate (matrix) {
    console.log("made it to here");
    for (let {x, y, value} of matrix) {
        let neighbors = Array.from(value.neighbors);
        let nalive = neighbalive(neighbors);     // how many neighbors alive?
        if (value.alive) { // cell is alive 
            if ((nalive < 2) || (nalive > 3)) { // Any live cell with fewer than two or more than three neighbors dies
                console.log("Setting next state to false for", x, y);
                value.next_state = false;
                console.log("+++++++");
            } 
        } else { // cell is dead 
            if ((value.alive === false) && (nalive === 3)) {  // Any dead cell with exactly three live neighbors becomes a live cells
                console.log("Setting next state to true for", x, y);
                value.next_state = true;
                console.log("+++++++");
            } else {
                value.next_state = false;  // empty grid, mark next state as false
            }
        }
    }
}

