<template>
  <el-timeline
    v-bind="trimAttrs($attrs)"
    :reverse="isReversed"
  >
    <slot />
  </el-timeline>
</template>

<script>
import { Timeline } from 'element-ui';
export default {
  name: 'JskTimeline',
  components: {
    ElTimeline: Timeline
  },
  inheritAttrs: false,
  props: {
    isReversed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixes = ['is-', 'has-', 'timeline-'];
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
