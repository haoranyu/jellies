<template>
  <el-backtop
    v-bind="trimAttrs($attrs)"
    :right="backtopMarginRight"
    :bottom="backtopMarginBottom">
    <slot></slot>
  </el-backtop>
</template>
<script>
import { Backtop } from 'element-ui';
export default {
  name: 'JskBacktop',
  inheritAttrs: false,
  props: {
    backtopMarginRight: {
      type: Number,
      default: 40
    },
    backtopMarginBottom: {
      type: Number,
      default: 40
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'backtop-'];
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
    'ElBacktop': Backtop
  }
}
</script>
