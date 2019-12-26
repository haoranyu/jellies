<template>
  <el-input-number
    ref="inputNumber"
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :controls-position="isRightControls ? 'right' : ''"
    v-on:focus="$emit('focus')"
    v-on:blur="$emit('blur')"
  >
  </el-input-number>
</template>

<script>
import { InputNumber as ElInputNumber } from 'element-ui';
export default {
  name: 'JskInputNumber',
  inheritAttrs: false,
  components: {
    ElInputNumber
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
    vModel: Number,
    isRightControls: {
      type: Boolean,
      default: false
    }
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
