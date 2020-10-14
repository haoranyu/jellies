<template>
  <div>
    <el-time-select
      ref="timeSelect"
      v-model="value"
      v-bind="trimAttrs($attrs)"
      :align="timeSelectTextAlign"
      :picker-options="timeSelectOptions"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    >
      <slot />
    </el-time-select>
  </div>
</template>

<script>
import { TimeSelect } from 'element-ui';
export default {
  name: 'JskTimeSelect',
  components: {
    ElTimeSelect: TimeSelect
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
  },
  props: {
    vModel: String,
    timeSelectOptions: {
      type: Object
    },
    isIntervalSelection: {
      type: Boolean,
      default: false
    },
    hasArrowsInPanel: {
      type: Boolean,
      default: false
    },
    timeSelectTextAlign: {
      type: String,
      default: 'left'
    }
  },
  data: function() {
    return {
      value: ''
    };
  },
  watch: {
    value: function() {
      this.$emit('change', this.value);
      this.$nextTick(() => {
        if (this.value !== this.vModel) {
          this.value = this.vModel;
        }
      });
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
        let prefixs = ['is-', 'has-', 'time-select-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    focus: function() {
      this.$refs.timeSelect.focus();
    }
  }
}
</script>
<style>
.time-select-item.selected:not(.disabled) {
  color: #333333 !important;
}
</style>
