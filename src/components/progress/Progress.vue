<template>
  <el-progress
    v-bind="trimAttrs($attrs)"
    :type="progressShape"
    :color="backgroundColorByType"
    :text-inside="isValueInside"
    :show-text="hasValue ? true : false"
    :width="progressDiameter"
  >
    <slot>
    </slot>
  </el-progress>
</template>

<script>
import { Progress } from 'element-ui';
export default {
  name: 'JskProgress',
  inheritAttrs: false,
  components: {
    'ElProgress': Progress
  },
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
          return '#DD2E1D';
        case 'warning':
          return '#FFB020';
        case 'info':
          return '#97A5BC';
        case 'success':
          return '#41B146';
        default:
          return '#41B146';
      }
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'progress-'];
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

<style>
.el-progress-bar .el-progress-bar__outer {
  background: #F2F4F7 !important;
  box-shadow: inset 0 1px 1px 0 rgba(139, 154, 174, 0.3);
}
.el-progress-bar .el-progress-bar__inner {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
</style>
