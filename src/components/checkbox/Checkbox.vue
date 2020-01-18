<template>
  <el-checkbox
    v-model="value"
    v-bind="trimAttrs($attrs)"
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
      value: ''
    };
  },
  created: function() {
    this.value = this.vModel;
  },
  props: {
    vModel: Boolean
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

<style>
.el-checkbox .el-checkbox__inner::after {
  left: 3px;
  top: 0;
}
.el-checkbox .el-checkbox__inner::before {
  top: 4px !important;
}
</style>
