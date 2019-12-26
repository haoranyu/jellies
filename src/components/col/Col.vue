<template>
  <el-col
    v-bind="trimAttrs($attrs)"
  >
    <slot></slot>
  </el-col>
</template>

<script>
import { Col as ElCol } from 'element-ui';
export default {
  name: 'JskCol',
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
  },
  components: {
    ElCol
  }
}
</script>
