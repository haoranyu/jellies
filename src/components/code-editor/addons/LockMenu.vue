<template>
  <jsk-button-group
    v-if="lockMenuMode === 'lock'"
    class="lock-menu"
  >
    <jsk-button
      button-size="small"
      button-icon="el-icon-lock"
      is-circular
      @click="() => { this.$emit('lock') }"
    ></jsk-button>
    <jsk-button
      button-size="small"
      button-icon="el-icon-view"
      is-circular
      @click="() => { this.$emit('hide') }"
    ></jsk-button>
  </jsk-button-group>
  <jsk-button
    v-else
    class="lock-menu"
    button-size="small"
    button-icon="el-icon-unlock"
    is-circular
    @click="() => { this.$emit('unlock') }"
  ></jsk-button>
</template>
<script>
export default {
  name: 'JskCodeEditorLockMenu',
  props: {
    lockMenuMode: {
      type: String,
      default: 'lock'
    }
  }
}
</script>
<style scoped>
.lock-menu {
  position: fixed;
  z-index: 500;
  left: 0;
  top: 0;
}
</style>
