<template>
  <el-select
    ref="select"
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :allow-create="isAddingAllowed"
    :default-first-option="isFirstMatchingAllowed"
    :reserve-keyword="isKeywordReserved"
    v-on:focus="$emit('focus')"
    v-on:blur="$emit('blur')"
    v-on:clear="$emit('clear')"
    v-on:visible-change="visibleChange"
    v-on:remove-tag="removeTag"
  >
    <template slot="prefix">
      <slot name="prefix"></slot>
    </template>
    <template slot="empty">
      <slot name="empty"></slot>
    </template>
    <slot>
    </slot>
  </el-select>
</template>

<script>
import { Select } from 'element-ui';
export default {
  name: 'JskSelect',
  inheritAttrs: false,
  components: {
    'ElSelect': Select
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
  },
  model: {
    prop: 'vModel',
    event: 'change'
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
  }
}
</script>
