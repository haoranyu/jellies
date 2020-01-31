<template>
  <div>
    <el-time-picker
      ref="timePicker"
      v-model="value"
      v-bind="trimAttrs($attrs)"
      v-on:focus="$emit('focus')"
      v-on:blur="$emit('blur')"
      :is-range="isIntervalSelection"
      :arrow-control="hasArrowsInPanel"
      :align="timePickerTextAlign"
      :picker-options="timePickerOptions"
    >
      <slot>
      </slot>
    </el-time-picker>
  </div>
</template>

<script>
import { TimePicker } from 'element-ui';
export default {
  name: 'JskTimePicker',
  inheritAttrs: false,
  components: {
    'ElTimePicker': TimePicker
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
    vModel: [Date, String, Array],
    timePickerOptions: {
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
    timePickerTextAlign: {
      type: String,
      default: 'left'
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'time-picker-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    focus: function() {
      this.$refs.timePicker.focus();
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
.el-time-panel__content::before,
.el-time-panel__content::after {
  border: none !important;
}
.el-time-panel__content::before {
  background: #F2F4F7;
  margin-right: 0 !important;
  margin-left: 0 !important;
}
.el-time-spinner__arrow:hover {
  color: #41B146 !important;
}
.el-range-editor.is-active,
.el-range-editor.is-active:hover {
  border-color: #AFAFAF !important;
}
</style>
