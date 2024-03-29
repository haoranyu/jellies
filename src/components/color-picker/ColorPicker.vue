<template>
  <div class="jsk-color-picker">
    <el-input
      v-model="value"
      v-bind="trimAttrs($attrs)"
      :size="colorPickerSize"
      :readonly="isPickerOnly"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @clear="$emit('clear')"
    >
      <el-color-picker
        slot="prefix"
        v-model="value"
        :size="colorPickerSize"
        :show-alpha="hasAlpha"
        :color-format="colorPickerFormat"
        :popper-class="colorPickerPopperClass"
        :predefine="colorPickerPredefinedColors"
      />
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
  components: {
    ElInput: Input,
    ElColorPicker: ColorPicker
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
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
        let prefixes = ['is-', 'has-', 'color-picker-'];
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

<style lang="scss">
@import '../../plugins/theme-variables.scss';
.el-color-picker .el-color-picker__color {
  border: none;
  border-radius: 0;
  border-top-left-radius: $--border-radius-small;
  border-bottom-left-radius: $--border-radius-small;
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
  color: $--color-success-dark !important;
  border: none;
  font-weight: 600;
}
button.el-color-dropdown__link-btn,
button.el-color-dropdown__link-btn:hover,
button.el-color-dropdown__link-btn:focus {
  color: $--color-line-dark;
}
</style>
