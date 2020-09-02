<template>
  <el-dropdown-item
    v-bind="trimAttrs($attrs)"
    :divided="hasDividerAbove"
    :class="{
      active: isActive
    }"
  >
    <slot></slot>
  </el-dropdown-item>
</template>

<script>
import { DropdownItem } from 'element-ui';
export default {
  name: 'JskDropdownItem',
  inheritAttrs: false,
  components: {
    'ElDropdownItem': DropdownItem
  },
  props: {
    hasDividerAbove: {
      type: Boolean,
      default: false
    },
    isActive: {
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
.el-dropdown-menu__item.active {
  background: #EBEEF3;
  color: #333;
}
</style>

<style>
.el-dropdown .el-button-group .el-button:first-child {
  border-right: none;
}
</style>
