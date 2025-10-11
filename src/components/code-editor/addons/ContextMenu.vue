<template>
  <jsk-button-group
    v-if="menuMode === 'lock' && hasMultipleButtons"
    class="context-menu"
  >
    <template v-if="hasLockControl">
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
    </template>
    <jsk-button
      v-if="hasPlaceholderControl"
      button-size="small"
      button-icon="el-icon-edit"
      is-circular
      @click="handlePlaceholderClick"
    />
  </jsk-button-group>
  <jsk-button
    v-else-if="menuMode === 'lock' && !hasMultipleButtons"
    class="context-menu"
    button-size="small"
    button-icon="el-icon-edit"
    is-circular
    @click="handlePlaceholderClick"
  />
  <jsk-button
    v-else-if="menuMode === 'unlock'"
    class="context-menu"
    button-size="small"
    button-icon="el-icon-j-unlock"
    is-circular
    @click="() => {
      $emit('unlock');
      $emit('lock-change');
    }"
  />
  <jsk-button
    v-else-if="menuMode === 'placeholder'"
    class="context-menu"
    button-size="small"
    button-icon="el-icon-delete"
    is-circular
    @click="$emit('remove-placeholder')"
  />
</template>

<script>
import JskButton from '../../button/Button';
import JskButtonGroup from '../../button-group/ButtonGroup';

export default {
  name: 'JskCodeEditorContextMenu',
  components: {
    JskButton,
    JskButtonGroup
  },
  props: {
    menuMode: {
      type: String,
      default: 'lock'
    },
    hasLockControl: {
      type: Boolean,
      default: false
    },
    hasPlaceholderControl: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasMultipleButtons() {
      return (this.hasLockControl && this.hasPlaceholderControl) || 
             (this.hasLockControl && !this.hasPlaceholderControl);
    }
  },
  methods: {
    handlePlaceholderClick() {
      this.$emit('add-placeholder');
    }
  }
};
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  z-index: 500;
  left: 0;
  top: 0;
  ::v-deep {
    .el-button {
      height: 34px !important;
    }
  }
}
</style>
