<template>
  <el-radio
    v-model="value"
    v-bind="trimAttrs($attrs)"
    v-on:focus="$emit('focus')"
    v-on:blur="$emit('blur')"
    v-on:clear="$emit('clear')"
  >
    <slot></slot>
  </el-radio>
</template>

<script>
import { Radio } from 'element-ui';
export default {
  name: 'JskRadio',
  inheritAttrs: false,
  components: {
    'ElRadio': Radio
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
    vModel: String
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'radio-'];
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
.el-radio.is-bordered:hover {
  border-color: #AFAFAF;
}
</style>
