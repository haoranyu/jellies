<template>
  <el-select
    ref="select"
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :allow-create="isAddingAllowed"
    :default-first-option="isFirstMatchingAllowed"
    :reserve-keyword="isKeywordReserved"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    @clear="$emit('clear')"
    @visible-change="visibleChange"
    @remove-tag="removeTag"
  >
    <template slot="prefix">
      <slot name="prefix" />
    </template>
    <template slot="empty">
      <slot name="empty" />
    </template>
    <slot />
  </el-select>
</template>

<script>
import { Select } from 'element-ui';
export default {
  name: 'JskSelect',
  components: {
    ElSelect: Select
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
  },
  props: {
    vModel: [String, Number, Boolean, Array],
    isAddingAllowed: {
      type: Boolean,
      default: false
    },
    isFirstMatchingAllowed: {
      type: Boolean,
      default: false
    },
    isKeywordReserved: {
      type: Boolean,
      default: false
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
        let prefixs = ['is-', 'has-', 'select-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    visibleChange: function(show) {
      this.$emit('visible-change', show);
    },
    removeTag: function(tag) {
      this.$emit('remove-tag', tag);
    },
    focus: function() {
      this.$refs.select.focus();
    },
    blur: function() {
      this.$refs.select.blur();
    }
  }
}
</script>
