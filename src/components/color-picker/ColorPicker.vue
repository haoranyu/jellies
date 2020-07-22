<template>
  <div class="jsk-color-picker">
    <el-input
      v-model="value"
      v-bind="trimAttrs($attrs)"
      v-on:focus="$emit('focus')"
      v-on:blur="$emit('blur')"
      v-on:clear="$emit('clear')"
      :size="colorPickerSize"
      :readonly="isPickerOnly"
    >
      <el-color-picker
        slot="prefix"
        v-model="value"
        :size="colorPickerSize"
        :show-alpha="hasAlpha"
        :color-format="colorPickerFormat"
        :popper-class="colorPickerPopperClass"
        :predefine="colorPickerPredefinedColors"
      ></el-color-picker>
    </el-input>
  </div>
</template>

<script>
import {
  Input,
  ColorPicker
} from 'element-ui';
export default {
  name: 'JskColorPicker',
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
    vModel: String,
    colorPickerSize: {
      type: String,
      default: ''
    },
    colorPickerFormat: {
      type: String,
      default: 'hex'
    },
    colorPickerPopperClass: {
      type: String,
      default: ''
    },
    colorPickerPredefinedColors: {
      type: Array,
      default: () => []
    },
    hasAlpha: {
      type: Boolean,
      default: false
    },
    isPickerOnly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'color-picker-'];
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
  components: {
    'ElInput': Input,
    'ElColorPicker': ColorPicker
  }
}
</script>

<style>
.el-color-picker .el-color-picker__color {
  border: none;
  border-radius: 0;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  overflow: hidden;
}
.el-color-picker .el-color-picker__trigger {
  border: none;
  padding: 2px;
  margin-left: -5px;
}
.jsk-color-picker .el-input .el-input__inner {
  padding-left: 46px;
}
.el-color-picker--small .el-color-picker__trigger {
  margin-left: -5px;
}
.jsk-color-picker .el-input--small .el-input__inner {
  padding-left: 36px;
}
.el-color-picker--medium .el-color-picker__trigger {
  margin-left: -5px;
}
.jsk-color-picker .el-input--medium .el-input__inner {
  padding-left: 40px;
}
.el-color-picker--mini .el-color-picker__trigger {
  margin-left: -5px;
}
.jsk-color-picker .el-input--mini .el-input__inner {
  padding-left: 30px;
}
button.el-color-dropdown__btn,
button.el-color-dropdown__btn:hover,
button.el-color-dropdown__btn:focus {
  color: #41B146 !important;
  border: none;
  font-weight: 600;
}
button.el-color-dropdown__link-btn,
button.el-color-dropdown__link-btn:hover,
button.el-color-dropdown__link-btn:focus {
  color: #555555;
}
</style>
