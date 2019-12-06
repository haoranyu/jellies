<template>
  <jsk-dialog
    dialog-width="460px"
    :has-close-button="false"
    :dialog-title="'\'' + reloadConfirmFilename + '\' ' + reloadConfirmContent.title"
    :visible.sync="visibleProp">
    {{ reloadConfirmContent.content }}
    <span slot="footer">
      <jsk-button
        button-type="info"
        @click="() => { this.$parent.$emit('reload-confirm', 'cancel') }">
        {{ reloadConfirmContent.buttons[0] }}
      </jsk-button>
      <jsk-button
        button-type="success"
        @click="() => { this.$parent.$emit('reload-confirm', 'reload') }">
        {{ reloadConfirmContent.buttons[1] }}
      </jsk-button>
    </span>
  </jsk-dialog>
</template>
<script>
export default {
  name: 'JskCodeEditorReloadConfirm',
  data: function() {
    return {
      visibleProp: false
    }
  },
  created: function() {
    this.visibleProp = this.visible;
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
  watch: {
    visibleProp: function() {
      this.$emit('update:visible', this.visibleProp);
    },
    visible: function() {
      this.visibleProp = this.visible;
    }
  }
}
</script>
