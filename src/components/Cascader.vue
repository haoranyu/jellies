<template>
  <el-cascader
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :show-all-levels="!isUsingLeafNode"
    :change-on-select="isAnyNodeSelectable"
    :debounce="cascaderDebounceTime"
    v-on:focus="$emit('focus')"
    v-on:blur="$emit('blur')"
    v-on:visible-change="$emit('visible-change')"
  >
    <template slot="prefix">
      <slot name="prefix"></slot>
    </template>
    <template slot="empty">
      <slot name="empty"></slot>
    </template>
    <slot>
    </slot>
  </el-cascader>
</template>

<script>
export default {
  name: 'JskCascader',
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
    isUsingLeafNode: {
      type: Boolean,
      default: false
    },
    isAnyNodeSelectable: {
      type: Boolean,
      default: false
    },
    cascaderDebounceTime: {
      type: Number,
      default: 300
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'cascader-'];
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
<style>
.el-cascader-menus {
  border-radius: 5px !important;
  overflow: hidden;
}
</style>