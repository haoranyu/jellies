<template>
  <el-checkbox-button
    v-bind="trimAttrs($attrs)"
  >
    <slot />
  </el-checkbox-button>
</template>

<script>
import { CheckboxButton } from 'element-ui';
export default {
  name: 'JskCheckboxButton',
  components: {
    ElCheckboxButton: CheckboxButton
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'checkbox-button-'];
        prefixs.forEach((prefix) => {
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
.el-checkbox-button .el-checkbox-button__inner {
  border-right-width: 1px;
}
.el-checkbox-button:last-child .el-checkbox-button__inner {
  border-right-width: 2px;
}
.el-checkbox-button:not(.is-checked) .el-checkbox-button__inner:hover {
  color: #333;
}
.el-checkbox-button:not(.is-checked).is-focus  .el-checkbox-button__inner {
  border-color: #CFCFCF;
}
</style>
