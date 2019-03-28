<template>
  <el-input
    v-model="value"
    v-bind="trimAttrs($attrs)"
    v-on:focus="$emit('focus')"
    v-on:blur="$emit('blur')"
    v-on:clear="$emit('clear')"
    :class="[isUnderline ? 'underline' : '', inputType]"
  >
    <template slot="prepend">
      <slot name="prepend"></slot>
    </template>
    <template slot="prefix">
      <slot name="prefix"></slot>
    </template>
    <slot>
    </slot>
    <template slot="suffix">
      <slot name="suffix"></slot>
    </template>
    <template slot="append">
      <slot name="append"></slot>
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'JskInput',
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
    isUnderline: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: ''
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'input-'];
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
    },
    vModel: function() {
      this.value = this.vModel;
    }
  }
}
</script>

<style>
.el-input.underline .el-input__inner {
  border-width: 0;
  border-bottom-width: 2px;
  border-radius: 0;
  text-align: center;
}
.el-input.success .el-input__inner,
.el-textarea.success .el-textarea__inner {
  border-color: #41B146;
  color: #41B146;
}
.el-input.danger .el-input__inner,
.el-textarea.danger .el-textarea__inner  {
  border-color: #DD2E1D;
  color: #DD2E1D;
}
.el-input.warning .el-input__inner,
.el-textarea.warning .el-textarea__inner  {
  border-color: #FFB020;
  color: #FFB020;
}
.el-input-group input {
  border-right-width: 0;
}
.el-input-group .el-input-group__prepend + input {
  border-left-width: 0;
}
.el-input-group input:last-child {
  border-right-width: 2px;
}
</style>
