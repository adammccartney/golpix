import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './murations';

import Cell from '../modules/Cell.js';

Vue.use(Vuex);

const DEFAULT_COLOR = "white";
const WIDTH = 30;
const HEIGHT = 30;

const INIT_CELL_DATA = { x = 0, y = 0, alive = false, neighbors = null, next_state = null };

export default new Vuex.Store({
    state: {
        color: DEFAULT_COLOR,
        pixels: Array(WIDTH * HEIGHT)
                .fill()
                .map(() => DEFAULT_COLOR),
        cells: Array(WIDTH * HEIGHT)
               .fill()
               .map(() => createCell(INIT_CELL_DATA)),
    },
    actions,
    getters,
    mutations,
});
