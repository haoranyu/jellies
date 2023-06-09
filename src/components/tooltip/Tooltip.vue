<template>
  <el-tooltip
    :value="value"
    v-bind="trimAttrs($attrs)"
    :visible-arrow="isArrowVisible"
    :manual="isManual"
    :enterable="isMouseEnterable"
    :effect="tooltipTheme"
  >
    <template slot="content">
      <slot name="content" />
    </template>
    <slot />
  </el-tooltip>
</template>
<script>
import { Tooltip } from 'element-ui';
export default {
  name: 'JskTooltip',
  components: {
    ElTooltip: Tooltip
  },
  inheritAttrs: false,
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    isArrowVisible: {
      type: Boolean,
      default: true
    },
    isManual: {
      type: Boolean,
      default: false
    },
    isMouseEnterable: {
      type: Boolean,
      default: true
    },
    tooltipTheme: {
      type: String,
      default: 'dark'
    }
  },
  created: function() {
    this.value = this.isVisible;
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixes = ['is-', 'has-', 'tooltip-'];
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
.el-tooltip__popper.is-light {
  background: #E3E7EE !important;
  border: none !important;
}
.el-tooltip__popper.is-light .popper__arrow {
  border: none !important;
}
.el-tooltip__popper.is-light[x-placement^="right"] .popper__arrow::after {
  border-right-color: #E3E7EE !important;
}
.el-tooltip__popper.is-light[x-placement^="top"] .popper__arrow::after {
  border-top-color: #E3E7EE !important;
}
.el-tooltip__popper.is-light[x-placement^="left"] .popper__arrow::after {
  border-left-color: #E3E7EE !important;
}
.el-tooltip__popper.is-light[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #E3E7EE !important;
}
</style>
