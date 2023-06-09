<template>
  <el-checkbox-group
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :text-color="checkboxButtonTextColor"
    :fill="checkboxButtonBackgroundColor"
  >
    <slot />
  </el-checkbox-group>
</template>

<script>
import { CheckboxGroup } from 'element-ui';
export default {
  name: 'JskCheckboxGroup',
  components: {
    ElCheckboxGroup: CheckboxGroup
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
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
  data: function() {
    return {
      value: []
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
        let prefixes = ['is-', 'has-', 'checkbox-group-'];
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
.el-checkbox-group {
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  font-size: 0;
}
</style>
