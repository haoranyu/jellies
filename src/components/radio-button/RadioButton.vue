<template>
  <el-radio-button
    v-bind="trimAttrs($attrs)"
  >
    <slot />
  </el-radio-button>
</template>

<script>
import { RadioButton } from 'element-ui';
export default {
  name: 'JskRadioButton',
  components: {
    ElRadioButton: RadioButton
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixes = ['is-', 'has-', 'radio-button-'];
        prefixes.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    }
  }
}
</script>
<style>
.el-radio-button .el-radio-button__inner {
  border-right-width: 1px;
}
.el-radio-button:last-child .el-radio-button__inner {
  border-right-width: 2px;
}
.el-radio-button:not(.is-active) .el-radio-button__inner:hover {
  color: #333;
}
</style>
