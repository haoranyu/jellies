<template>
  <el-timeline-item
    v-bind="trimAttrs($attrs)"
    :hide-timestamp="isTimeHidden"
    :timestamp="timelineItemTime"
  >
    <slot />
  </el-timeline-item>
</template>

<script>
import { TimelineItem } from 'element-ui';
export default {
  name: 'JskTimelineItem',
  components: {
    ElTimelineItem: TimelineItem
  },
  inheritAttrs: false,
  props: {
    isTimeHidden: {
      type: Boolean,
      default: false
    },
    timelineItemTime: {
      type: String,
      default: ''
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'timeline-item-'];
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
