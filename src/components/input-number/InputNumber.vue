<template>
  <el-input-number
    ref="inputNumber"
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :controls-position="isRightControls ? 'right' : ''"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
</template>

<script>
import { InputNumber } from 'element-ui';
export default {
  name: 'JskInputNumber',
  components: {
    ElInputNumber: InputNumber
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
  },
  props: {
    vModel: Number,
    isRightControls: {
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
        let prefixs = ['is-', 'has-', 'input-number-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    focus: function() {
      this.$refs.inputNumber.focus();
    },
    select: function() {
      this.$refs.inputNumber.select();
    }
  }
}
</script>

<style>
.el-input-number .el-input-number__decrease {
  border-right-width: 0;
  top: 2px;
  bottom: 2px;
  left: 2px;
  z-index: 101;
}
.el-input-number .el-input-number__increase {
  border-left-width: 0;
  top: 2px;
  bottom: 2px;
  right: 2px;
  z-index: 100;
}
.el-input-number .el-input-number__decrease:hover,
.el-input-number .el-input-number__increase:hover {
  color: #333;
  background: #EBEEF3;
}
.el-input-number.is-controls-right .el-input-number__decrease {
  border-left-width: 0 !important;
  right: 2px !important;
  bottom: 2px !important;
}
</style>
