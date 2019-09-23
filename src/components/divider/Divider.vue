<template>
  <el-divider
    v-bind="trimAttrs($attrs)"
    :content-position="contentAlign">
    <slot></slot>
  </el-divider>
</template>
<script>
export default {
  name: 'JskDivider',
  inheritAttrs: false,
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'divider-'];
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
    contentAlign: {
      type: String,
      default: 'center'
    }
  }
}
</script>