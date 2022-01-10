<template>
  <div :class="['pixel', color, current ? 'current' : '']" @click="handleClick" ></div>
</template>

<script>
import * as types from '../store/mutation-types';

export default {
  name: 'Pixel',
  props: {
    color: String,
    current: Boolean,
    isInColorPicker: Boolean,
    isInCanvas: Boolean,
    index: Number
  },
  methods: {
    handleClick: function() {
    if (this.isInColorPicker) {
       this.$store.dispatch(types.UPDATE_COLOR, this.color);
    }
    if (this.isInCanvas) {
        // pixels have knowledge of their index
       this.$store.dispatch(types.CLICKED_PIXEL, this.index);
      }
    }
  }
}
</script>


<style scoped>
.pixel {
  border: 1px solid lightgray;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
}
.white {
  background-color: white;
}
.lightblue {
  background-color: rgb(0, 188, 212);
}
.blue {
  background-color: rgb(3, 169, 244);
}
.darkblue {
  background-color: rgb(33, 150, 243);
}
pixel.current {
  border: 4px solid yellow;
}
</style>
