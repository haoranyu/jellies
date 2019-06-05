<template>
  <el-popover
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :trigger="triggerValue"
    :visible-arrow="isArrowVisible"
    v-on:show="$emit('show')"
    v-on:after-enter="$emit('after-enter')"
    v-on:hide="$emit('hide')"
    v-on:after-leave="$emit('after-leave')"
    >
    <template slot="reference">
      <slot name="reference"></slot>
    </template>
    <slot></slot>
  </el-popover>
</template>
<script>
export default {
  name: 'JskPopover',
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
    tooltipTrigger: {
      type: String,
      default: 'click'
    }
  },
  computed: {
    triggerValue: function() {
      if (this.isManual) {
        return 'manual';
      }
      return this.tooltipTrigger;
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'popover-'];
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