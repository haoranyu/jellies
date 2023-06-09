<template>
  <el-badge v-bind="trimAttrs($attrs)">
    <slot />
  </el-badge>
</template>

<script>
import { Badge } from 'element-ui';
export default {
  name: 'JskBadge',
  components: {
    ElBadge: Badge
  },
  inheritAttrs: false,
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixes = ['is-', 'has-', 'badge-'];
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
