<template>
  <el-radio
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :class="[
      'radio-' + radioSize,
      {'full-width': isFullWidth}
    ]"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    @clear="$emit('clear')"
    @input="$emit('input')"
  >
    <slot />
  </el-radio>
</template>

<script>
import { Radio } from 'element-ui';
export default {
  name: 'JskRadio',
  components: {
    ElRadio: Radio
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
  },
  props: {
    vModel: [String, Number, Boolean],
    radioSize: {
      type: String,
      default: 'mini'
    },
    isFullWidth: {
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
        let prefixes = ['is-', 'has-', 'radio-'];
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
.el-radio__input {
  vertical-align: top !important;
  margin: 2px 0 2px 2px !important;
}
.el-radio__label {
  white-space: normal;
  display: inline-block;
  line-height: 19px;
}
.el-radio.radio-small.is-bordered {
  height: 42px;
}
.el-radio.radio-small .el-radio__label {
  font-size: 16px;
  line-height: 21px;
}
.el-radio.radio-small .el-radio__inner {
  width: 16px;
  height: 16px;
}
.el-radio.radio-small .el-radio__inner:after {
  width: 5px;
  height: 5px;
}
.el-radio.radio-medium.is-bordered {
  height: 44px;
}
.el-radio.radio-medium .el-radio__label {
  font-size: 18px;
  line-height: 23px;
}
.el-radio.radio-medium .el-radio__inner {
  width: 18px;
  height: 18px;
}
.el-radio.radio-medium .el-radio__inner:after {
  width: 6px;
  height: 6px;
}
.el-radio.radio-large.is-bordered {
  height: 46px;
}
.el-radio.radio-large .el-radio__label {
  font-size: 20px;
  line-height: 25px;
}
.el-radio.radio-large .el-radio__inner {
  width: 20px;
  height: 20px;
}
.el-radio.radio-large .el-radio__inner:after {
  width: 7px;
  height: 7px;
}
</style>
<style scoped>
.full-width {
  width: 100%;
  height: auto !important;
}
.el-radio.is-bordered {
  padding: 9px 20px 9px 10px !important;
}
</style>
