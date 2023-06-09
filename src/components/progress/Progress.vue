<template>
  <el-progress
    v-bind="trimAttrs($attrs)"
    :type="progressShape"
    :color="backgroundColorByType"
    :text-inside="isValueInside"
    :show-text="hasValue ? true : false"
    :width="progressDiameter"
    :stroke-width="progressStrokeWidth"
    :class="[
      progressType,
      {
        'is-narrow': progressStrokeWidth < 14
      }
    ]"
  >
    <slot />
  </el-progress>
</template>

<script>
import { Progress } from 'element-ui';
export default {
  name: 'JskProgress',
  components: {
    ElProgress: Progress
  },
  inheritAttrs: false,
  props: {
    progressShape: {
      type: String,
      default: 'line'
    },
    progressType: {
      type: String,
      default: ''
    },
    progressBarColor: {
      type: [String, Array],
      default: ''
    },
    progressDiameter: {
      type: Number,
      default: 126
    },
    progressStrokeWidth: {
      type: Number,
      default: 6
    },
    hasValue: {
      type: Boolean,
      default: false
    },
    isValueInside: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    backgroundColorByType: function() {
      if (this.progressBarColor !== '') {
        return this.progressBarColor;
      }
      switch (this.progressType) {
        case 'danger':
          return '#f33b29';
        case 'warning':
          return '#ffc300';
        case 'info':
          return '#a6b4c8';
        case 'success':
          return '#4ec53d';
        default:
          return '#4ec53d';
      }
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixes = ['is-', 'has-', 'progress-'];
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

<style>
.el-progress .el-progress-bar__outer {
  background: #F2F4F7 !important;
  box-shadow: inset 0 1px 1px 0 rgba(139, 154, 174, 0.3);
  overflow: hidden;
}
.el-progress .el-progress-bar__inner {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.el-progress.is-narrow .el-progress-bar__outer {
  overflow: visible;
  box-shadow: inset 0 1px 1px 0 rgba(139, 154, 174, 0.2);
}
.el-progress.is-narrow .el-progress-bar__innerText {
  height: 14px;
  line-height: 14px;
  padding: 0 4px;
  position: absolute;
  right: 0;
  margin: 0;
  border-radius: 5px;
  text-align: center;
  background: #41b146;
}
.el-progress.warning.is-narrow .el-progress-bar__innerText {
  background: #dd2e1d;
}
.el-progress.danger.is-narrow .el-progress-bar__innerText {
  background: #ffb020;
}
.el-progress.info.is-narrow .el-progress-bar__innerText {
  background: #97a5bc;
}
</style>
