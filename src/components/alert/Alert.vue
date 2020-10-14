<template>
  <el-alert
    v-bind="trimAttrs($attrs)"
    :show-icon="hasIcon"
    :effect="alertTheme"
    @close="$emit('close')"
  >
    <template slot="title">
      <slot name="title" />
    </template>
    <slot />
  </el-alert>
</template>
<script>
import { Alert } from 'element-ui';
export default {
  name: 'JskAlert',
  components: {
    ElAlert: Alert
  },
  inheritAttrs: false,
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
  }
}
</script>

<style>
.el-alert.is-light .el-alert__closebtn {
  color: #777 !important;
}
</style>
