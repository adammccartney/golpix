import * as types from './mutation-types';

export default {
    [types.UPDATE_COLOR](state, color) {
        state.color = color;
    },
    [types.CLICKED_PIXEL](state, index) {
        state.pixels.splice(index, 1, state.color);
        if (state.color === "white") {
            state.cells[index].alive = false;
        } else {
            state.cells[index].alive = true;
        }
    },
    [types.SPAWN](state, index) { // spawns cell at index
        state.cells[index].alive = true;
    },
    [types.KILL](state, index) {
        state.cells[index].alive = false;  // kills cells at index 
    },
    [types.SET_NEXT_STATE](state, index, next_state) { // calc from surrounding state
        state.cells[index].next_state = next_state;
    },
    [types.DETERMINE_NEXT](state) {
        // 
        for (let i = 0; i < state.cells.length; i++) {
            let neighbors = state.cells[i].neighbors;
            let nalive = 0;
            for (let n of neighbors) {
                if (n.alive === true) nalive++
            }
            if (state.cells[i].alive === true) {
                if ((nalive < 2) || (nalive > 3)) { // any live cell with < 2 or > 3 neighbors dies
                    state.cells[i].next_state = false;
                }
            } else { // cell is dead
                if ((state.cells[i].alive === false) && (nalive === 3)) { // any dead cell with exactly 3 
                    state.cells[i].next_state = true;                     // live neighbors becomes a living cells
                } else {
                    state.cells[i].next_state = false; // empty grid, mark next state false
                }
            }
        }
    },
    [types.GENERATE_NEXT](state) {  // make the next generation
        const DEAD_WHITE = "white";
        const LIVE_BLUE = "blue";
        for (let i = 0; i < state.cells.length; i++) {
            state.cells[i].alive = state.cells[i].next_state;
            if (state.cells[i].alive === true) { 
                state.pixels.splice(i, 1, LIVE_BLUE);
            } else {
                state.pixels.splice(i, 1, DEAD_WHITE);
            }
        }
    },
    [types.RESET](state) {  // re-initialize state of cells (coords and neighbors stay the same)
        state.color = "white";
        for (let i = 0; i < state.cells.length; i++) {
            state.cells[i].alive = false;  
            state.cells[i].next_state = false;  
            state.pixels.splice(i, 1, state.color);
        }
    }
};
