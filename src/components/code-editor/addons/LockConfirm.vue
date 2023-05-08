<template>
  <jsk-dialog
    dialog-width="530px"
    :has-close-button="false"
    :dialog-title="lockConfirmContent.title"
    :visible.sync="visibleProp"
  >
    {{ lockConfirmContent.content }}
    <template slot="footer">
      <div style="text-align: left">
        <jsk-button
          v-if="lockConfirmPositions.includes('start') && lockConfirmPositions.includes('end')"
          button-type="success"
          @click="() => { $parent.$emit('lock-confirm', 'both') }"
        >
          {{ lockConfirmContent.buttons[0] }}
        </jsk-button>
        <jsk-button
          v-if="lockConfirmPositions.includes('start')"
          button-type="success"
          @click="() => { $parent.$emit('lock-confirm', 'left') }"
        >
          {{ lockConfirmContent.buttons[1] }}
        </jsk-button>
        <jsk-button
          v-if="lockConfirmPositions.includes('end')"
          button-type="success"
          @click="() => { $parent.$emit('lock-confirm', 'right') }"
        >
          {{ lockConfirmContent.buttons[2] }}
        </jsk-button>
        <jsk-button
          button-type="success"
          @click="() => { $parent.$emit('lock-confirm', 'none') }"
        >
          {{ lockConfirmContent.buttons[3] }}
        </jsk-button>
      </div>
    </template>
  </jsk-dialog>
</template>
<script>
import JskDialog from '../../dialog/Dialog';
import JskButton from '../../button/Button';
export default {
  name: 'JskCodeEditorLockConfirm',
  components: {
    JskDialog,
    JskButton
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    lockConfirmPositions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    lockConfirmContent: Object
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
