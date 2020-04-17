<template>
  <jsk-dialog
    dialog-width="530px"
    :has-close-button="false"
    :dialog-title="'\'' + closeConfirmFilename + '\' ' + closeConfirmContent.title"
    :visible.sync="visibleProp"
  >
    {{ closeConfirmContent.content }}
    <span slot="footer-left">
      <jsk-button
        button-type="info"
        @click="() => { this.$parent.$emit('close-confirm', 'abandon') }"
      >{{ closeConfirmContent.buttons[0] }}</jsk-button>
    </span>
    <span slot="footer-right">
      <jsk-button
        button-type="info"
        @click="() => { this.$parent.$emit('close-confirm', 'cancel') }"
      >{{ closeConfirmContent.buttons[1] }}</jsk-button>
      <jsk-button
        button-type="success"
        @click="() => { this.$parent.$emit('close-confirm', 'save') }"
      >{{ closeConfirmContent.buttons[2] }}</jsk-button>
    </span>
  </jsk-dialog>
</template>
<script>
import JskDialog from "../../dialog/Dialog";
import JskButton from "../../button/Button";
export default {
  name: "JskCodeEditorCloseConfirm",
  data: function() {
    return {
      visibleProp: false
    };
  },
  created: function() {
    this.visibleProp = this.visible;
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    closeConfirmFilename: {
      type: String,
      default: "The file"
    },
    closeConfirmContent: Object
  },
  watch: {
    visibleProp: function() {
      this.$emit("update:visible", this.visibleProp);
    },
    visible: function() {
      this.visibleProp = this.visible;
    }
  },
  components: {
    JskDialog,
    JskButton
  }
};
</script>
