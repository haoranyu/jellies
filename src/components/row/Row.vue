<template>
  <el-row
    v-bind="trimAttrs($attrs)"
  >
    <slot />
  </el-row>
</template>

<script>
import { Row } from 'element-ui';
export default {
  name: 'JskRow',
  components: {
    ElRow: Row
  },
  inheritAttrs: false,
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'row-'];
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
