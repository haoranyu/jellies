<template>
  <el-form
    ref="form"
    v-bind="trimAttrs($attrs)"
    v-on:validate="validate"
    :label-width="labelWidth"
    :hide-required-asterisk="!hasRequiredIndicator"
    :show-message="hasMessage"
    :inline-message="isMessageInline"
  >
    <slot></slot>
  </el-form>
</template>

<script>
export default {
  name: 'JskForm',
  inheritAttrs: false,
  props: {
    formLabelWidth: [
      Number,
      String
    ],
    hasRequiredIndicator: {
      type: Boolean,
      default: true
    },
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
      let formLabelWidth = this.formLabelWidth;
      if (typeof(formLabelWidth) === 'string') {
        return this.formLabelWidth;
      } else if (typeof(formLabelWidth) === 'number') {
        return this.formLabelWidth + 'px';
      }
      return '';
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'form-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    validate: function(func) {
      this.$refs.form.validate(func);
    },
    validateField: function(func) {
      this.$refs.form.validateField(func);
    },
    resetFields: function() {
      this.$refs.form.resetFields();
    },
    clearValidate: function(func) {
      this.$refs.form.clearValidate(func);
    }
  }
}
</script>