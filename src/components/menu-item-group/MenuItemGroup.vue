<template>
  <el-menu-item-group
    v-bind="trimAttrs($attrs)"
  >
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </el-menu-item-group>
</template>

<script>
import { MenuItemGroup as ElMenuItemGroup } from 'element-ui';
export default {
  name: 'JskMenuItemGroup',
  inheritAttrs: false,
  components: {
    ElMenuItemGroup
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'menu-item-group-'];
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