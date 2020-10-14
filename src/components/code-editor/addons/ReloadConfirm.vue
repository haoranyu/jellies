<template>
  <jsk-dialog
    dialog-width="530px"
    :has-close-button="false"
    :dialog-title="'\'' + reloadConfirmFilename + '\' ' + reloadConfirmContent.title"
    :visible.sync="visibleProp"
  >
    {{ reloadConfirmContent.content }}
    <span slot="footer">
      <jsk-button
        button-type="info"
        @click="() => { this.$parent.$emit('reload-confirm', 'cancel') }"
      >{{ reloadConfirmContent.buttons[0] }}</jsk-button>
      <jsk-button
        button-type="success"
        @click="() => { this.$parent.$emit('reload-confirm', 'reload') }"
      >{{ reloadConfirmContent.buttons[1] }}</jsk-button>
    </span>
  </jsk-dialog>
</template>
<script>
import JskDialog from '../../dialog/Dialog';
import JskButton from '../../button/Button';
export default {
  name: 'JskCodeEditorReloadConfirm',
  components: {
    JskDialog,
    JskButton
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    reloadConfirmFilename: {
      type: String,
      default: 'The file'
    },
    reloadConfirmContent: Object
  },
  data: function() {
    return {
      visibleProp: false
    };
  },
  watch: {
    visibleProp: function() {
      this.$emit('update:visible', this.visibleProp);
    },
    visible: function() {
      this.visibleProp = this.visible;
    }
  },
  created: function() {
    this.visibleProp = this.visible;
  }
};
</script>
