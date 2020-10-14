<template>
  <el-collapse-item
    v-bind="trimAttrs($attrs)"
  >
    <template slot="title">
      <slot name="title" />
    </template>
    <slot />
  </el-collapse-item>
</template>

<script>
import { CollapseItem } from 'element-ui';
export default {
  name: 'JskCollapseItem',
  components: {
    ElCollapseItem: CollapseItem
  },
  inheritAttrs: false,
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'collapse-item-'];
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
