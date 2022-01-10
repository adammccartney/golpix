<template>
    <div>
      <form @submit.prevent="resetWorld">
        <button type="submit">Reset World</button>
      </form>
      <form @submit.prevent="generateNext">
        <button type="submit">Generate Next</button>
      </form>
    </div>
</template>

<script>
import * as types from '../store/mutation-types';

export default {
  name: 'Stepper',
  methods: {
    resetWorld: function () {
        this.$store.dispatch(types.RESET)
    },
    generateNext: function () {
        this.$store.dispatch(types.DETERMINE_NEXT);
        //this.$store.dispatch(types.GENERATE_NEXT);
    },
  }
}
</script>


