<template>
  <el-checkbox-group
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :text-color="checkboxButtonTextColor"
    :fill="checkboxButtonBackgroundColor"
  >
    <slot>
    </slot>
  </el-checkbox-group>
</template>

<script>
import { CheckboxGroup } from 'element-ui';
export default {
  name: 'JskCheckboxGroup',
  inheritAttrs: false,
  data: function() {
    return {
      value: []
    };
  },
  created: function() {
    this.value = this.vModel;
  },
  props: {
    vModel: Array,
    checkboxButtonTextColor: {
      type: String,
      default: '#FFFFFF'
    },
    checkboxButtonBackgroundColor: {
      type: String,
      default: '#41B146'
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'checkbox-group-'];
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
    'ElCheckboxGroup': CheckboxGroup
  }
}
</script>
<style>
.el-checkbox-group {
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  font-size: 0;
}
</style>
