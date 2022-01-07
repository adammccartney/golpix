<template>
  <div id="app">
      <ColorPicker :color=$store.getters.color />
      <Canvas :pixels=$store.getters.pixels />
      <Stepper />
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue';
import ColorPicker from './components/ColorPicker.vue';
import Stepper from './components/Stepper.vue';

export default {
  name: 'App',
  components: {
    Canvas,
    ColorPicker,
    Stepper
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
