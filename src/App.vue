<template>
  <div id="app">
      <ColorPicker :color=color />
      <Canvas :pixels=pixels />
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue';
import ColorPicker from './components/ColorPicker.vue';

const defaultcolor = "white";

export default {
  name: 'App',
  data: function() {
    return {
      color: defaultcolor,
      pixels: Array(30 * 30)
        .fill()
        .map(() => defaultcolor)
    }
  },
  components: {
    Canvas,
    ColorPicker
  },
  mounted() {
    this.$root.$on('updatecolor', color => {
      this.color = color;
    })
    this.$root.$on('clickedpixel', index => {
      this.pixels.splice(index, 1, this.color)
      })
  }
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
