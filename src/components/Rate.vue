<template>
  <rate
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :disabled="readonly"
    :allow-half="isHalfRatable"
    :colors="rateColors"
    :void-color="rateVoidColor"
    :disabled-void-color="rateReadonlyVoidColor"
    :disabled-void-icon-class="rateReadonlyVoidClass"
    :show-text="rateIndication === 'text'"
    :show-score="rateIndication === 'score'"
    :text-color="rateTextColor"
  >
  </rate>
</template>

<script>
import { Rate } from 'element-ui';

// 这个问题将在 element 之后的发版(2.8)中被解决，解决后可以移除这部分的植入
// https://github.com/ElemeFE/element/issues/15033
Rate.computed.decimalStyle = function() {
  let width = '';
  if (this.rateDisabled) {
    width = `${ this.valueDecimal }%`;
  } else if (this.allowHalf) {
    width = '50%';
  }
  return {
    color: this.activeColor,
    width
  };
}

export default {
  name: 'JskRate',
  inheritAttrs: false,
  components: {
    Rate
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
    vModel: Number,
    readonly: {
      type: Boolean,
      default: false
    },
    isHalfRatable: {
      type: Boolean,
      default: false
    },
    rateColors: {
      type: Array,
      default: () => ['#FFB020', '#FFB020', '#FFB020']
    },
    rateVoidColor: {
      type: String,
      default: '#D1D8E4'
    },
    rateReadonlyVoidColor: {
      type: String,
      default: '#E3E7EE'
    },
    rateReadonlyVoidClass: {
      type: String,
      default: 'el-icon-star-on'
    },
    rateIndication: {
      type: String,
      default: ''
    },
    rateTextColor: {
      type: String,
      default: '#FFB020'
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'rate-'];
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
