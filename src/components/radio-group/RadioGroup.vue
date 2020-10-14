<template>
  <el-radio-group
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :text-color="radioButtonTextColor"
    :fill="radioButtonBackgroundColor"
  >
    <slot />
  </el-radio-group>
</template>

<script>
import { RadioGroup } from 'element-ui';
export default {
  name: 'JskRadioGroup',
  components: {
    ElRadioGroup: RadioGroup
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
  },
  props: {
    vModel: String,
    radioButtonTextColor: {
      type: String,
      default: '#FFFFFF'
    },
    radioButtonBackgroundColor: {
      type: String,
      default: '#41B146'
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
        let prefixs = ['is-', 'has-', 'radio-group-'];
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
