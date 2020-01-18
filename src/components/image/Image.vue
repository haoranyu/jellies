<template>
  <el-image
    v-bind="trimAttrs($attrs)"
    :lazy="lazyload === 'on'"
    :scroll-container="imageContainer"
    :fit="objectFit"
    v-on:load="$emit('load')"
    v-on:error="$emit('error')"
  >
    <template slot="placeholder">
      <slot name="placeholder"></slot>
    </template>
    <template slot="error">
      <slot name="error"></slot>
    </template>
  </el-image>
</template>

<script>
import { Image } from 'element-ui';
export default {
  name: 'JskImage',
  inheritAttrs: false,
  components: {
    'ElImage': Image
  },
  props: {
    lazyload: {
      type: String,
      default: 'auto'
    },
    objectFit: {
      type: String,
      default: 'auto'
    },
    imageContainer: {}
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'image-'];
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
