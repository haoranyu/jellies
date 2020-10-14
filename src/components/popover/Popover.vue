<template>
  <el-popover
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :trigger="triggerValue"
    :visible-arrow="isArrowVisible"
    @show="$emit('show')"
    @after-enter="$emit('after-enter')"
    @hide="$emit('hide')"
    @after-leave="$emit('after-leave')"
  >
    <template slot="reference">
      <slot name="reference" />
    </template>
    <slot />
  </el-popover>
</template>
<script>
import { Popover } from 'element-ui';
export default {
  name: 'JskPopover',
  components: {
    ElPopover: Popover
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
  },
  props: {
    vModel: Boolean,
    isArrowVisible: {
      type: Boolean,
      default: true
    },
    isManual: {
      type: Boolean,
      default: false
    },
    popoverTrigger: {
      type: String,
      default: 'click'
    }
  },
  data: function() {
    return {
      value: ''
    };
  },
  computed: {
    triggerValue: function() {
      if (this.isManual) {
        return 'manual';
      }
      return this.popoverTrigger;
    }
  },
  watch: {
    value: function() {
      this.$emit('change', this.value);
      if (this.vModel) {
        this.$nextTick(() => {
          if (this.value !== this.vModel) {
            this.value = this.vModel;
          }
        });
      }
    },
    vModel: function() {
      this.value = this.vModel;
    }
  },
  created: function() {
    this.value = this.vModel;
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
  }
}
</script>
