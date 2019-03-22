<template>
  <el-select
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :allow-create="isAddingAllowed"
    :default-first-option="isFirstMatchingAllowed"
    :reserve-keyword="isKeywordReserved"
    v-on:focus="$emit('focus')"
    v-on:blur="$emit('blur')"
    v-on:clear="$emit('clear')"
    v-on:visible-change="$emit('visible-change')"
    v-on:remove-tag="$emit('remove-tag')"
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
export default {
  name: 'JskSelect',
  inheritAttrs: false,
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
