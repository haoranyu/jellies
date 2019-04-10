<template>
  <el-dropdown-item
    v-bind="trimAttrs($attrs)"
    :divided="hasDividerAbove"
  >
    <slot></slot>
  </el-dropdown-item>
</template>

<script>
export default {
  name: 'JskDropdownItem',
  inheritAttrs: false,
  props: {
    hasDividerAbove: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'dropdown-item-'];
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

<style scoped>
.el-dropdown-menu__item:not(.is-disabled):hover,
.el-dropdown-menu__item:focus {
  background: #F2F4F7;
  color: #333;
}
</style>

<style>
.el-dropdown .el-button-group .el-button:first-child {
  border-right: none;
}
</style>