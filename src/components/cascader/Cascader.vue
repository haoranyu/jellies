<template>
  <el-cascader
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :show-all-levels="!isUsingLeafNode"
    :debounce="cascaderDebounceTime"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    @visible-change="visibleChange"
    @expand-change="expandChange"
    @remove-tag="removeTag"
  >
    <template slot="prefix">
      <slot name="prefix" />
    </template>
    <template slot="empty">
      <slot name="empty" />
    </template>
    <slot />
  </el-cascader>
</template>

<script>
import { Cascader } from 'element-ui';
export default {
  name: 'JskCascader',
  components: {
    ElCascader: Cascader
  },
  inheritAttrs: false,
  model: {
    prop: 'vModel',
    event: 'change'
  },
  props: {
    vModel: [String, Array],
    isUsingLeafNode: {
      type: Boolean,
      default: false
    },
    cascaderDebounceTime: {
      type: Number,
      default: 300
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
        let prefixes = ['is-', 'has-', 'cascader-'];
        prefixes.forEach((prefix) => {
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
    expandChange: function(arr) {
      this.$emit('expand-change', arr);
    },
    removeTag: function(para) {
      this.$emit('remove-tag', para);
    }
  }
}
</script>
<style>
.el-cascader-menus {
  border-radius: 5px !important;
  overflow: hidden;
}
.el-cascader-menu .el-checkbox .el-checkbox__inner::after {
  left: 3px;
  top: 0;
}
.el-cascader-menu .el-checkbox .el-checkbox__inner::before {
  top: 4px !important;
}
</style>
