<template>
  <el-rate
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :disabled="readonly"
    :allow-half="isHalfRatable"
    :colors="rateColors"
    :void-color="rateVoidColor"
    :disabled-void-color="rateReadonlyVoidColor"
    :disabled-void-icon-class="rateReadonlyVoidIconClass"
    :show-text="rateIndication === 'text'"
    :show-score="rateIndication === 'score'"
    :text-color="rateTextColor"
  />
</template>

<script>
import { Rate } from 'element-ui';
export default {
  name: 'JskRate',
  components: {
    ElRate: Rate
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
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
      type: [Array, Object],
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
    rateReadonlyVoidIconClass: {
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
        let prefixes = ['is-', 'has-', 'rate-'];
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
