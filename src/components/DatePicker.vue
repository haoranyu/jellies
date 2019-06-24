<template>
  <div>
    <el-date-picker
      ref="datePicker"
      v-model="value"
      v-bind="trimAttrs($attrs)"
      v-on:focus="$emit('focus')"
      v-on:blur="$emit('blur')"
      :arrow-control="hasArrowsInPanel"
      :align="datePickerTextAlign"
      :picker-options="datePickerOptions"
      :unlink-panels="!isPanelsLinked"
    >
      <slot>
      </slot>
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'JskDatePicker',
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
    vModel: Date,
    datePickerOptions: {
      type: Object
    },
    hasArrowsInPanel: {
      type: Boolean,
      default: false
    },
    timePickerTextAlign: {
      type: String,
      default: 'left'
    },
    isPanelsLinked: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'date-picker-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    focus: function() {
      this.$refs.datePicker.focus();
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
.el-picker-panel__sidebar {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.el-date-table td.today span {
  text-indent: -100px;
  width: 24px;
  overflow: hidden;
  color: #777777 !important;
}

.el-date-table td.today span::after {
  width: 24px;
  position: absolute;
  top: 0;
  left: 0;
  text-indent: 0;
  content: "今天";
}

.el-year-table td.today .cell,
.el-month-table td.today .cell {
  color: #777777 !important;
  font-weight: normal !important;
}

.el-date-table td.current:not(.disabled) span,
.el-month-table td.current:not(.disabled) .cell,
.el-year-table td.current:not(.disabled) .cell,
.el-date-table td.start-date span,
.el-date-table td.end-date span,
.el-date-table td.selected span,
.el-month-table td.start-date .cell, .el-month-table td.end-date .cell {
  background: #8B9AAE !important;
  color: #FFFFFF !important;
  border-radius: 18px;
}

.el-picker-panel__footer button.el-picker-panel__link-btn,
.el-picker-panel__footer button.el-picker-panel__link-btn:hover,
.el-picker-panel__footer button.el-picker-panel__link-btn:focus {
  color: #41B146;
  border: none;
  font-weight: 600;
}

.el-range-editor.is-active,
.el-range-editor.is-active:hover {
  border-color: #AFAFAF !important;
}
</style>
