<template>
  <el-dropdown-item
    v-bind="trimAttrs($attrs)"
    :divided="hasDividerAbove"
    :class="{
      active: isActive,
      header: isHeader,
    }"
  >
    <slot />
  </el-dropdown-item>
</template>

<script>
import { DropdownItem } from 'element-ui';
export default {
  name: 'JskDropdownItem',
  components: {
    ElDropdownItem: DropdownItem
  },
  inheritAttrs: false,
  props: {
    hasDividerAbove: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isHeader: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixes = ['is-', 'has-', 'dropdown-item-'];
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
.el-dropdown-menu__item.header,
.el-dropdown-menu__item.header:not(.is-disabled):hover,
.el-dropdown-menu__item.header:focus,
.el-dropdown-menu__item.header.active {
  background: transparent;
  font-size: 0.8rem;
  color: #AFAFAF;
  cursor: default;
}
</style>

<style>
.el-dropdown .el-button-group .el-button:first-child {
  border-right: none;
}
</style>
