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
      this.$nextTick(() => {
        if (this.value !== this.vModel) {
          this.value = this.vModel;
        }
      });
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
<style>
.el-checkbox {
  line-height: 1;
}
.el-checkbox__input {
  vertical-align: top !important;
  margin: 2px 0 2px 2px !important;
}
.el-checkbox__input .el-checkbox__inner:hover {
  border-color: #afafaf;
}
.el-checkbox__input .el-checkbox__inner::before {
  top: 4px !important;
}
.el-checkbox__input.is-focus.is-checked .el-checkbox__inner {
  border-color: #399af4;
}
.el-checkbox__label {
  white-space: normal;
}
.el-checkbox.checkbox-mini .el-checkbox__inner:after {
  height: 7px;
  left: 3px;
  top: 0;
}
.el-checkbox.checkbox-small.is-bordered {
  height: 42px;
}
.el-checkbox.checkbox-small .el-checkbox__label {
  font-size: 16px;
  line-height: 21px;
}
.el-checkbox.checkbox-small .el-checkbox__inner {
  width: 16px;
  height: 16px;
}
.el-checkbox.checkbox-small .el-checkbox__inner:after {
  height: 8px;
  left: 4px;
  top: 0;
}
.el-checkbox.checkbox-medium.is-bordered {
  height: 44px;
}
.el-checkbox.checkbox-medium .el-checkbox__label {
  font-size: 18px;
  line-height: 23px;
}
.el-checkbox.checkbox-medium .el-checkbox__inner {
  width: 18px;
  height: 18px;
}
.el-checkbox.checkbox-medium .el-checkbox__inner:after {
  height: 9px;
  left: 5px;
  top: 1px;
}
.el-checkbox.checkbox-large.is-bordered {
  height: 46px;
}
.el-checkbox.checkbox-large .el-checkbox__label {
  font-size: 20px;
  line-height: 25px;
}
.el-checkbox.checkbox-large .el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.el-checkbox.checkbox-large .el-checkbox__inner:after {
  height: 10px;
  left: 6px;
  top: 1px;
}
</style>
<style scoped>
.full-width {
  width: 100%;
  height: auto !important;
}
</style>
