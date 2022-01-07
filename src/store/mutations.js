import * as types from './mutation-types';
import * as init_data from './init-data';

export default {
    [types.SPAWN](state, index) { // spawns cell at index
        state.cells[index].alive = true;
    },
    [types.KILL](state, index) {
        state.cells[index].alive = false;  // kills cells at index 
    },
    // TODO: move this into the state section, it's a constant
    [types.SET_COORDINATES](state, index, coordinates) { // set cartesian coords of cell
        state.cells[index].x = coordinates.x;
        state.cells[index].y = coordinates.y;
    },
    // TODO: move this into the state section, it's a constant
    [types.SET_NEIGHBORS](state, index, neighbors) {  // calc neihbors based on cartesian coords
        state.cells[index].neighbors = neighbors;
    },
    [types.SET_NEXT_STATE](state, index, next_state) { // calc from surrounding state
        state.cells[index].next_state = next_state;
    },
    [types.GENERATE](state) {  // make the next generation
        for (let i = 0; i < state.cells.length; i++) {
            state.cells[i].alive = state.cells[i].next_state;
        }
    },
    [types.RESET](state) {  // re-initialize state of cells (coords and neighbors stay the same)
        for (let i = 0; i < state.cells.length; i++) {
            state.cells[i].alive = init_data.CELL.alive;  
            state.cells[i].next_state = init_data.CELL.next_state;  
        }
    }
};
