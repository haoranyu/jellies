<template>
  <el-option-group
    v-bind="trimAttrs($attrs)"
  >
    <slot>
    </slot>
  </el-option-group>
</template>

<script>
export default {
  name: 'JskOptionGroup',
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'option-']
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key]
          }
        })
      })
      return attrs
    }
  }
}
</script>
