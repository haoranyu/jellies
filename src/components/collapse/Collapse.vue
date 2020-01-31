<template>
  <el-collapse
    v-model="value"
    v-bind="trimAttrs($attrs)"
  >
    <slot></slot>
  </el-collapse>
</template>

<script>
import { Collapse } from 'element-ui';
export default {
  name: 'JskCollapse',
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
    vModel: [String, Array]
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'collapse-'];
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
  },
  components: {
    'ElCollapse': Collapse
  }
}
</script>
