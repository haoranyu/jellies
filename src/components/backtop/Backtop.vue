<template>
  <el-backtop
    v-bind="trimAttrs($attrs)"
    :right="backtopMarginRight"
    :bottom="backtopMarginBottom"
  >
    <slot />
  </el-backtop>
</template>
<script>
import { Backtop } from 'element-ui';
export default {
  name: 'JskBacktop',
  components: {
    ElBacktop: Backtop
  },
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
        let prefixes = ['is-', 'has-', 'backtop-'];
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
