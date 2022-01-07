import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

import { createCell } from '../modules/Cell.js';
import * as init_data from './init-data.js';

Vue.use(Vuex);

/* give me those global constants baby */
const DEFAULT_COLOR = "white";
const WIDTH = 30;
const HEIGHT = 30;

export default new Vuex.Store({
    state: {
        color: DEFAULT_COLOR,
        pixels: Array(WIDTH * HEIGHT)
                .fill()
                .map(() => DEFAULT_COLOR),
        cells: Array(WIDTH * HEIGHT)
               .fill()
               .map(() => createCell(init_data.CELL)),
    },
    actions,
    getters,
    mutations,
});
