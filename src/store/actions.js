import * as types from './mutation-types';

export default {
    [types.SPAWN]({ commit }) {  // cell alive becomes true
        commit(types.SPAWN);
    },
    [types.KILL]({ commit }) {  // cell alive becomes false 
        commit(types.KILL);
    },
    // TODO: move this into the state section, it's a constant
    [types.SET_COORDINATES]({ commit }) {
        commit(types.SET_COORDINATES);
    },
    // TODO: move this into the state section, it's a constant
    [types.SET_NEIGHBORS]({ commit }) {  // save a set of neighboring cells
        commit(types.SET_NEIGHBORS);     // (ref by location in matrix)
    },
    [types.SET_NEXT_STATE]({ commit }) { // cell next state becomes true or false
        commit(types.SET_NEXT_STATE);    // computed based on state of neighbors
    },
    [types.GENERATE]({ commit }) {  // generate the next state
        commit(types.GENERATE);
    },
    [types.RESET]({ commit }) { // reset state to initial 
        commit(types.RESET);
    },
};

