import * as types from './mutation-types';

export default {
    [types.UPDATE_COLOR]({ commit }, color) {
        commit(types.UPDATE_COLOR, color);
    },
    [types.CLICKED_PIXEL]({ commit }, index) {
        commit(types.CLICKED_PIXEL, index);
    },
    [types.SPAWN]({ commit }) {  // cell alive becomes true
        commit(types.SPAWN);
    },
    [types.KILL]({ commit }) {  // cell alive becomes false 
        commit(types.KILL);
    },
    [types.UPDATE_NEIGHBORS]({ commit }) { // update the state of all neighbors
        // read through array and update everyone's neighbors state
    },
    [types.DETERMINE_NEXT]({ commit }) { // determine the next viable state of world
        commit(types.DETERMINE_NEXT);
    },
    [types.GENERATE_NEXT]({ commit }) {  // generate the next state
        commit(types.GENERATE_NEXT);
    },
    [types.RESET]({ commit }) { // reset state to initial 
        commit(types.RESET);
    },
};

