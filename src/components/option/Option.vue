<template>
  <el-option
    v-bind="trimAttrs($attrs)"
  >
    <slot>
    </slot>
  </el-option>
</template>

<script>
import { Option as ElOption } from 'element-ui';
export default {
  name: 'JskOption',
  components: {
    ElOption
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'option-'];
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
