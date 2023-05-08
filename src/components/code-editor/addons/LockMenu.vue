<template>
  <jsk-button-group
    v-if="lockMenuMode === 'lock'"
    class="lock-menu"
  >
    <jsk-button
      button-size="small"
      button-icon="el-icon-j-lock"
      is-circular
      @click="() => {
        $emit('lock');
        $emit('lock-change');
      }"
    />
    <jsk-button
      button-size="small"
      button-icon="el-icon-view"
      is-circular
      @click="() => {
        $emit('hide');
        $emit('lock-change');
      }"
    />
  </jsk-button-group>
  <jsk-button
    v-else
    class="lock-menu"
    button-size="small"
    button-icon="el-icon-j-unlock"
    is-circular
    @click="() => {
      $emit('unlock');
      $emit('lock-change');
    }"
  />
</template>
<script>
import JskButton from '../../button/Button';
import JskButtonGroup from '../../button-group/ButtonGroup';
export default {
  name: 'JskCodeEditorLockMenu',
  components: {
    JskButton,
    JskButtonGroup
  },
  props: {
    lockMenuMode: {
      type: String,
      default: 'lock'
    }
  }
};
</script>
<style scoped>
.lock-menu {
  position: fixed;
  z-index: 500;
  left: 0;
  top: 0;
}
</style>
