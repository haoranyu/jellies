<template>
  <el-checkbox
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :class="[
      'checkbox-' + checkboxSize,
      {'full-width': isFullWidth}
    ]"
  >
    <slot></slot>
  </el-checkbox>
</template>

<script>
import { Checkbox } from 'element-ui';
export default {
  name: 'JskCheckbox',
  inheritAttrs: false,
  data: function() {
    return {
      value: false
    };
  },
  created: function() {
    this.value = this.vModel;
  },
  props: {
    vModel: Boolean,
    checkboxSize: {
      type: String,
      default: 'mini'
    },
    isFullWidth: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'checkbox-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    }
  },
  model: {
    prop: 'vModel',
    event: 'change'
  },
  watch: {
    value: function() {
      this.$emit('change', this.value);
    },
    vModel: function() {
      this.value = this.vModel;
    }
  },
  components: {
    'ElCheckbox': Checkbox
  }
}
</script>
<style lang="scss">
.el-checkbox {
  line-height: 1;
  &__input {
    vertical-align: top !important;
    margin: 2px 0 2px 2px !important;
    .el-checkbox__inner {
      &:hover {
        border-color: #AFAFAF;
      }
      &::before {
        top: 4px !important;
      }
    }
    &.is-focus.is-checked {
      .el-checkbox__inner {
        border-color: #399AF4;
      }
    }
  }
  &__label {
    white-space: normal;
  }
  &.checkbox-mini {
    .el-checkbox__inner:after {
      height: 7px;
      left: 3px;
      top: 0
    }
  }
  &.checkbox-small {
    &.is-bordered {
      height: 42px;
    }
    .el-checkbox {
      &__label {
        font-size: 16px;
        line-height: 21px;
      }
      &__inner {
        width: 16px;
        height: 16px;
        &:after {
          height: 8px;
          left: 4px;
          top: 0
        }
      }
    }
  }
  &.checkbox-medium {
    &.is-bordered {
      height: 44px;
    }
    .el-checkbox {
      &__label {
        font-size: 18px;
        line-height: 23px;
      }
      &__inner {
        width: 18px;
        height: 18px;
        &:after {
          height: 9px;
          left: 5px;
          top: 1px;
        }
      }
    }
  }
  &.checkbox-large {
    &.is-bordered {
      height: 46px;
    }
    .el-checkbox {
      &__label {
        font-size: 20px;
        line-height: 25px;
      }
      &__inner {
        width: 20px;
        height: 20px;
        &:after {
          height: 10px;
          left: 6px;
          top: 1px;
        }
      }
    }
  }
}
</style>
<style scoped>
.full-width {
  width: 100%;
  height: auto !important;
}
</style>
