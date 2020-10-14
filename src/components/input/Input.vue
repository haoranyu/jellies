<template>
  <el-input
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :class="isUnderline ? 'underline' : ''"
    :show-word-limit="hasLengthLimitHint"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    @clear="$emit('clear')"
  >
    <template slot="prepend">
      <slot name="prepend" />
    </template>
    <template slot="prefix">
      <slot name="prefix" />
    </template>
    <slot />
    <template slot="suffix">
      <slot name="suffix" />
    </template>
    <template slot="append">
      <slot name="append" />
    </template>
  </el-input>
</template>

<script>
import { Input } from 'element-ui';
export default {
  name: 'JskInput',
  components: {
    ElInput: Input
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
  },
  props: {
    vModel: String,
    isUnderline: {
      type: Boolean,
      default: false
    },
    hasLengthLimitHint: {
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
        let prefixs = ['is-', 'has-', 'input-'];
        prefixs.forEach((prefix) => {
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
.el-input.underline .el-input__inner {
  border-width: 0;
  border-bottom-width: 2px;
  border-radius: 0;
  text-align: center;
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
