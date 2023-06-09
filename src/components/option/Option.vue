<template>
  <el-option
    v-bind="trimAttrs($attrs)"
  >
    <slot />
  </el-option>
</template>

<script>
import { Option } from 'element-ui';
export default {
  name: 'JskOption',
  components: {
    ElOption: Option
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixes = ['is-', 'has-', 'option-'];
        prefixes.forEach((prefix) => {
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
