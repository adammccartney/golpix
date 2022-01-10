export default {
    color(state) {
        return state.color;
    },
    pixels(state) {
        return state.pixels;
    },
    cells(state) {
        return state.cells;
    },
    cell(state, index) {
        return state.cells[index];
    },
    neighbors(state, index) {
        return state.cells[index].neighbors;
    },
    //cell_alive(state, index) {
    //    return state.cells[index].alive;
    //},
    //cell_coordinates(state, index) {
    //    const coords = [state.cells[index].x, state.cells[index].y];
    //    return coords;
    //},
    //neighboring_cells(state, index) {
    //    return state.cells[index].neighbors;
    //},
    //next_cell_state(state, index) {
    //    return state.cells[index].next_state;
    //},
    //current_world_state(state) {
    //    let alive = [];
    //    for (let i = 0; i < state.cells.length; i++) {
    //        alive.append(state.cells[i].alive);
    //    }
    //},
    //next_world_state(state) {
    //    let next_state = [];
    //    for (let i = 0; i < state.cells.length; i++) {
    //        next_state.append(state.cells[i].next_state);
    //    }
    //},
};
