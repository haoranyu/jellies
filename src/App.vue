<template>
  <jsk-rate
    v-model="value"
    is-half-ratable
  />
</template>
<script>
  export default {
    data() {
      return {
        value: null
      }
    }
  }
</script>
