<template>
  <el-radio
    v-model="value"
    v-bind="trimAttrs($attrs)"
    v-on:focus="$emit('focus')"
    v-on:blur="$emit('blur')"
    v-on:clear="$emit('clear')"
    :class="[
      'radio-' + radioSize,
      {'full-width': isFullWidth}
    ]"
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
    vModel: String,
    radioSize: {
      type: String,
      default: 'mini'
    },
    isFullWidth: {
      type: Boolean,
      default: false
    }
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

<style lang="scss">
.el-radio {
  &__input {
    vertical-align: top !important;
    margin: 2px 0 2px 2px !important;
  }
  &__label {
    white-space: normal;
    display: inline-block;
    line-height: 19px;
  }
  &.radio-small {
    &.is-bordered {
      height: 42px;
    }
    .el-radio {
      &__label {
        font-size: 16px;
        line-height: 21px;
      }
      &__inner {
        width: 16px;
        height: 16px;
        &:after {
          width: 5px;
          height: 5px;
        }
      }
    }
  }
  &.radio-medium {
    &.is-bordered {
      height: 44px;
    }
    .el-radio {
      &__label {
        font-size: 18px;
        line-height: 23px;
      }
      &__inner {
        width: 18px;
        height: 18px;
        &:after {
          width: 6px;
          height: 6px;
        }
      }
    }
  }
  &.radio-large {
    &.is-bordered {
      height: 46px;
    }
    .el-radio {
      &__label {
        font-size: 20px;
        line-height: 25px;
      }
      &__inner {
        width: 20px;
        height: 20px;
        &:after {
          width: 7px;
          height: 7px;
        }
      }
    }
  }
}
</style>
<style scoped>
.full-width {
  width: 100%;
  height: auto !important;
}
.el-radio.is-bordered {
  padding: 9px 20px 9px 10px !important;
}
</style>
