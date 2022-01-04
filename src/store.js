import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexLocalStorage = new VuexPersist({

    key: 'pix',
    storage: window.localStorage
})

Vue.use(Vuex)

const defaultColor = "white";

export default new Vuex.Store({
    state: () => ({
        color: defaultColor,
        pixels: Array(30 * 30)
                .fill()
                .map(() => defaultColor)
    }),
    mutations: {
        updateColor(state, color) {
            state.color = color;
        },
        handleClick(state, index) {
            state.pixels.splice(index, 1, state.color);
        }
    },
    actions: {},
    getters: {
        pixels: state => state.pixels,
        color: state => state.color
    },
    plugins: [vuexLocalStorage.plugin]
})
