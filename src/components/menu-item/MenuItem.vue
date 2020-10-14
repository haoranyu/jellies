<template>
  <el-menu-item
    v-bind="trimAttrs($attrs)"
  >
    <template slot="title">
      <slot name="title" />
    </template>
    <slot />
  </el-menu-item>
</template>

<script>
import { MenuItem } from 'element-ui';
export default {
  name: 'JskMenuItem',
  components: {
    ElMenuItem: MenuItem
  },
  inheritAttrs: false,
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'menu-item-'];
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
