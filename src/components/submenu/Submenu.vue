<template>
  <el-submenu
    v-bind="trimAttrs($attrs)"
  >
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </el-submenu>
</template>

<script>
import { Submenu as ElSubmenu } from 'element-ui';
export default {
  name: 'JskSubmenu',
  inheritAttrs: false,
  components: {
    ElSubmenu
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'submenu-'];
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