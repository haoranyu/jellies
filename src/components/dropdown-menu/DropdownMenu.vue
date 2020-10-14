<template>
  <el-dropdown-menu
    :visible-arrow="visibleArrow"
    :arrow-offset="arrowOffset"
  >
    <div class="dropdown-menu-outer">
      <div
        class="dropdown-menu-inner"
        :style="{
          maxHeight: maxHeight
        }"
      >
        <slot />
      </div>
    </div>
  </el-dropdown-menu>
</template>

<script>
import { DropdownMenu } from 'element-ui';
export default {
  name: 'JskDropdownMenu',
  components: {
    ElDropdownMenu: DropdownMenu
  },
  inheritAttrs: false,
  inject: ['dropdown'],
  provide: function () {
    return {
      dropdown: this.dropdown
    }
  },
  props: {
    dropdownMenuMaxHeight: {
      type: [String, Number],
      default: ''
    },
    visibleArrow: {
      type: Boolean,
      default: true
    },
    arrowOffset: {
      type: Number,
      default: 0
    }
  },
  computed: {
    maxHeight: function() {
      if (typeof(this.dropdownMenuMaxHeight) === 'string') {
        return this.dropdownMenuMaxHeight;
      }
      return this.dropdownMenuMaxHeight + 'px';
    }
  }
}
</script>

<style scoped>
.el-dropdown-menu {
  border: 1px solid #f0f0f0;
  padding: 0;
}
.dropdown-menu-outer {
  overflow: hidden;
  border-radius: 5px;
}
.dropdown-menu-inner {
  padding: 6px 0;
  overflow-y: auto;
}
</style>

