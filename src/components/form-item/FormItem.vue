<template>
  <el-form-item
    ref="formItem"
    v-bind="trimAttrs($attrs)"
    :label-width="labelWidth"
    :show-message="hasMessage"
    :inline-message="isMessageInline"
  >
    <template slot="label">
      <slot name="label"></slot>
    </template>
    <slot></slot>
  </el-form-item>
</template>

<script>
import { FormItem as ElFormItem } from 'element-ui';
export default {
  name: 'JskFormItem',
  inheritAttrs: false,
  components: {
    ElFormItem
  },
  props: {
    formItemLabelWidth: [
      Number,
      String
    ],
    hasMessage: {
      type: Boolean,
      default: true
    },
    isMessageInline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    labelWidth: function() {
      let itemLabelWidth = this.formItemLabelWidth;
      if (typeof(itemLabelWidth) == 'string') {
        return this.formItemLabelWidth;
      } else if (typeof(itemLabelWidth) == 'number') {
        return this.formItemLabelWidth + 'px';
      }
      return '';
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'form-item-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    resetFields: function() {
      this.$refs.formItem.resetFields();
    },
    clearValidate: function() {
      this.$refs.formItem.clearValidate();
    }
  }
}
</script>