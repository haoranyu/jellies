<template>
  <el-button
    :type="buttonType"
    :size="buttonSize"
    :circle="isCircular"
    :icon="buttonPrefixIcon + buttonIcon"
    :disabled="disabled"
    :native-type="type"
    :style="buttonStyle"
    @click="$emit('click')"
  >
    <slot />
    <i
      v-if="buttonSuffixIcon !== ''"
      :class="['el-icon--right', buttonSuffixIcon]"
    />
  </el-button>
</template>

<script>
import { Button } from 'element-ui';
export default {
  name: 'JskButton',
  components: {
    ElButton: Button
  },
  props: {
    buttonType: {
      type: String,
      default: 'info'
    },
    buttonBackgroundColor: {
      type: String,
      default: ''
    },
    buttonTextColor: {
      type: String,
      default: ''
    },
    buttonSize: {
      type: String,
      default: ''
    },
    buttonIcon: {
      type: String,
      default: ''
    },
    buttonPrefixIcon: {
      type: String,
      default: ''
    },
    buttonSuffixIcon: {
      type: String,
      default: ''
    },
    isCircular: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    buttonStyle: function() {
      let buttonStyleValue = {}
      if (this.buttonBackgroundColor !== '') {
        buttonStyleValue.background = this.buttonBackgroundColor;
        buttonStyleValue.borderColor = this.buttonBackgroundColor;
      }
      if (this.buttonTextColor !== '') {
        buttonStyleValue.color = this.buttonTextColor;
      }
      return buttonStyleValue;
    }
  }
}
</script>

<style scoped>
.el-button + .el-button,
.el-button-group + .el-button {
  margin-left: 12px;
}
.el-button-group > .el-button {
  border-left-width: 1px;
  border-right-width: 1px;
}
.el-button-group > .el-button:first-child {
  border-left-width: 2px;
}
.el-button-group > .el-button:last-child {
  border-right-width: 2px;
}
</style>
