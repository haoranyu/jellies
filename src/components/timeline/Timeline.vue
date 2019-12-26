<template>
  <el-timeline
    v-bind="trimAttrs($attrs)"
    :reverse="isReversed"
  >
    <slot></slot>
  </el-timeline>
</template>

<script>
import { Timeline as ElTimeline } from 'element-ui';
export default {
  name: 'JskTimeline',
  inheritAttrs: false,
  components: {
    ElTimeline
  },
  props: {
    isReversed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'timeline-'];
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