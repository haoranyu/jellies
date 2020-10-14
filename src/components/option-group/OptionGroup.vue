<template>
  <el-option-group
    v-bind="trimAttrs($attrs)"
  >
    <slot />
  </el-option-group>
</template>

<script>
import { OptionGroup } from 'element-ui';
export default {
  name: 'JskOptionGroup',
  components: {
    ElOptionGroup: OptionGroup
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'option-group-'];
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
