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
        this.$store.dispatch(types.GENERATE_NEXT);
    },
  }
}
</script>


<style scoped>
input,
textarea {
  border: 1px solid #ccc;
  padding: 20px;
  vertical-align: middle;
}

label {
  vertical-align: middle;
  padding-right: 10px;
}

div {
  display: block;
  padding: 50px;
  font-size: 1.5rem;
}

.button {
  background-color: #2c3e50;
  color: white;
  font-size: 1.5rem;
  width: 50%;
}
</style>
