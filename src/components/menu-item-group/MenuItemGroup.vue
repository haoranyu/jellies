<template>
  <el-menu-item-group
    v-bind="trimAttrs($attrs)"
  >
    <template slot="title">
      <slot name="title" />
    </template>
    <slot />
  </el-menu-item-group>
</template>

<script>
import { MenuItemGroup } from 'element-ui';
export default {
  name: 'JskMenuItemGroup',
  components: {
    ElMenuItemGroup: MenuItemGroup
  },
  inheritAttrs: false,
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
