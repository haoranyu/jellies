<template>
  <el-tooltip
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :visible-arrow="isArrowVisible"
    :manual="isManual"
    :enterable="isMouseEnterable"
    :effect="tooltipTheme">
    <template slot="content">
      <slot name="content"></slot>
    </template>
    <slot></slot>
  </el-tooltip>
</template>
<script>
export default {
  name: 'JskTooltip',
  inheritAttrs: false,
  data: function() {
    return {
      value: ''
    };
  },
  created: function() {
    this.value = this.vModel;
  },
  props: {
    vModel: {
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
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'tooltip-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    }
  },
  model: {
    prop: 'vModel',
    event: 'change'
  },
  watch: {
    value: function() {
      this.$emit('change', this.value);
    },
    vModel: function() {
      this.value = this.vModel;
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