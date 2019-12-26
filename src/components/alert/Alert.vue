<template>
  <el-alert
    v-bind="trimAttrs($attrs)"
    v-on:close="$emit('close')"
    :show-icon="hasIcon"
    :effect="alertTheme">
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </el-alert>
</template>
<script>
import { Alert as ElAlert } from 'element-ui';
export default {
  name: 'JskAlert',
  inheritAttrs: false,
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'alert-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    }
  },
  props: {
    hasIcon: {
      type: Boolean,
      default: true
    },
    alertTheme: {
      type: String,
      default: 'light'
    }
  },
  components: {
    ElAlert
  }
}
</script>

<style>
.el-alert.is-light .el-alert__closebtn {
  color: #777 !important;
}
</style>