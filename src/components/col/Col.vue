<template>
  <el-col
    v-bind="trimAttrs($attrs)"
  >
    <slot />
  </el-col>
</template>

<script>
import { Col } from 'element-ui';
export default {
  name: 'JskCol',
  components: {
    ElCol: Col
  },
  inheritAttrs: false,
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'col-'];
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
