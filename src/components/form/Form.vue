<script>
import { Form } from 'element-ui';
const FormWrapper = Form;
FormWrapper.name = 'JskForm';
FormWrapper.props = {
  formModel: Object,
  formRules: Object,
  isInline: {
    type: Boolean,
    default: false
  },
  formLabelWidth: {
    type: [String, Number],
    default: 'auto'
  },
  formLabelPosition: {
    type: String,
    default: 'right'
  },
  formLabelSuffix: {
    type: String,
    default: ''
  },
  formSize: String,
  hasRequiredIndicator: {
    type: Boolean,
    default: false
  },
  hasMessage: {
    type: Boolean,
    default: true
  },
  hasStatusIcon: {
    type: Boolean,
    default: false
  },
  isMessageInline: {
    type: Boolean,
    default: false
  },
  hasValidateOnRuleChange: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
};
FormWrapper.computed = {
  model: function() {
    return this.formModel;
  },
  rules: function() {
    return this.formRules;
  },
  inline: function() {
    return this.isInline;
  },
  labelPosition: function() {
    return this.formLabelPosition;
  },
  labelWidth: function() {
    if (typeof this.formLabelWidth === 'string') {
      return this.formLabelWidth;
    }
    return this.formLabelWidth + 'px';
  },
  labelSuffix: function() {
    return this.formLabelSuffix;
  },
  hideRequiredAsterisk: function() {
    return !this.hasRequiredIndicator;
  },
  showMessage: function() {
    return this.hasMessage;
  },
  inlineMessage: function() {
    return this.isMessageInline;
  },
  statusIcon: function() {
    return this.hasStatusIcon;
  },
  validateOnRuleChange: function() {
    return this.hasValidateOnRuleChange;
  },
  size: function() {
    return this.formSize;
  }
};
export default FormWrapper;
</script>
