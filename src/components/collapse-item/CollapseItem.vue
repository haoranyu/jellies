<template>
  <el-collapse-item
    v-bind="trimAttrs($attrs)"
  >
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </el-collapse-item>
</template>

<script>
import { CollapseItem as ElCollapseItem } from 'element-ui';
export default {
  name: 'JskCollapseItem',
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
  },
  components: {
    ElCollapseItem
  }
}
</script>
