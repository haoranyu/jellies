<template>
  <div>
    <el-time-select
      ref="timeSelect"
      v-model="value"
      v-bind="trimAttrs($attrs)"
      v-on:focus="$emit('focus')"
      v-on:blur="$emit('blur')"
      :align="timeSelectTextAlign"
      :picker-options="timeSelectOptions"
    >
      <slot>
      </slot>
    </el-time-select>
  </div>
</template>

<script>
import { TimeSelect } from 'element-ui';
export default {
  name: 'JskTimeSelect',
  inheritAttrs: false,
  components: {
    'ElTimeSelect': TimeSelect
  },
  data: function() {
    return {
      value: ''
    };
  },
  created: function() {
    this.value = this.vModel;
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
.time-select-item.selected:not(.disabled) {
  color: #333333 !important;
}
</style>
