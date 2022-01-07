<template>
      <form @submit.prevent="updateUniverse">
        <button type="submit">Next Generation</button>
      </form>
</template>

<script>
export default {
  name: 'Stepper',
  methods: {
    updateUniverse: function () {
        this.$store.commit('updateUniverse')
    }
  }
}
</script>


