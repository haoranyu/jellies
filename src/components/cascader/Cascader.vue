<template>
  <el-cascader
    v-model="value"
    v-bind="trimAttrs($attrs)"
    :show-all-levels="!isUsingLeafNode"
    :debounce="cascaderDebounceTime"
    v-on:focus="$emit('focus')"
    v-on:blur="$emit('blur')"
    v-on:visible-change="visibleChange"
    v-on:expand-change="expandChange"
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
  </el-cascader>
</template>

<script>
import { Cascader as ElCascader } from 'element-ui';
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
  },
  components: {
    ElCascader
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