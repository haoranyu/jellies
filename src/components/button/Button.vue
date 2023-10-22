<template>
  <el-button
    ref="button"
    :type="buttonType"
    :size="buttonSize"
    :circle="isCircular"
    :icon="buttonPrefixIcon + buttonIcon"
    :disabled="disabled"
    :native-type="type"
    :style="buttonStyle"
    @click="$emit('click')"
    @mousedown.native="activeButton"
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
  data: function() {
    return {
      isActive: false
    }
  },
  computed: {
    buttonStyle: function() {
      let buttonStyleValue = {}
      if (this.buttonBackgroundColor !== '') {
        buttonStyleValue.background = this.buttonBackgroundColor;
        buttonStyleValue.borderColor = this.buttonBackgroundColor;
        buttonStyleValue.boxShadow = this.isActive ? 'none' : `0 3px 0 0 rgba(0, 0, 0, 0.12), 0 3px 0 0 ${this.buttonBackgroundColor}`;
      }
      if (this.buttonTextColor !== '') {
        buttonStyleValue.color = this.buttonTextColor;
      }
      return buttonStyleValue;
    }
  },
  methods: {
    activeButton: function() {
      this.isActive = true;
      const removeMouseUpListener = document.addEventListener('mouseup', () => {
        this.isActive = false;
        document.removeEventListener('mouseup', removeMouseUpListener);
      });
    }
  }
}
</script>

<style lang="scss">
@import '../../plugins/theme-variables.scss';
.el-button {
  transition: filter .2s,transform $--button-lip-size;
  transform: translateY(-$--button-lip-size);
  &--primary {
    box-shadow: 0 $--button-lip-size 0 0 rgba(0, 0, 0, 0.1);
  }
  &--success {
    box-shadow: 0 $--button-lip-size 0 0 $--color-success-dark;
  }
  &--warning {
    box-shadow: 0 $--button-lip-size 0 0 $--color-warning-dark;
  }
  &--danger {
    box-shadow: 0 $--button-lip-size 0 0 $--color-danger-dark;
  }
  &--info {
    box-shadow: 0 $--button-lip-size 0 0 $--color-face-darkest;
  }
  &:active {
    box-shadow: none;
    transform: translateY(0);
    &.is-circle {
      transform: scaleY(0.9);
    }
  }
  &.is-disabled {
    box-shadow: none;
    transform: translateY(0);
  }
  &.is-circle {
    transform: scaleY(0.9);
  }
}
</style>
<style scoped>
.el-button
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
