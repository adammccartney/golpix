<template>
  <div class="canvas">
    <Pixel isInCanvas v-for="(color, index) in $store.getters.pixels"
    :color="color" :key=index :index=index />
  </div>
</template>

<script>
import Pixel from './Pixel';

export default {
  name: 'Canvas',
  components: {
    Pixel
  },
}
</script>

<style scoped>
.canvas {
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
}
</style>

