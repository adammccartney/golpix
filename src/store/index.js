import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

import { initializeCells } from '../modules/Cell.js';

Vue.use(Vuex);

/* give me those global constants baby */
const DEFAULT_COLOR = "white";
const WIDTH = 3;
const HEIGHT = 3;

export default new Vuex.Store({
    state: {
        color: DEFAULT_COLOR,
        pixels: Array(WIDTH * HEIGHT)
                .fill()
                .map(() => DEFAULT_COLOR),
        cells: initializeCells(WIDTH * HEIGHT),
    },
    actions,
    getters,
    mutations,
});
