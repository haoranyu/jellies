<template>
  <el-tag
    v-bind="trimAttrs($attrs)"
    :disable-transitions="!hasAnimation"
    :closable="isClearable"
    :hit="hasBorder"
    :color="tagBackgroundColor"
    :style="{color: tagTextColor}"
    @close="clearTag"
    @click="$emit('click')"
    @touchstart.prevent="$emit('click')"
  >
    <slot />
  </el-tag>
</template>

<script>
import { Tag } from 'element-ui';
export default {
  name: 'JskTag',
  components: {
    ElTag: Tag
  },
  inheritAttrs: false,
  props: {
    hasAnimation: {
      type: Boolean,
      default: true
    },
    isClearable: {
      type: Boolean,
      default: false
    },
    hasBorder: {
      type: Boolean,
      default: false
    },
    tagBackgroundColor: {
      type: String,
      default: ''
    },
    tagTextColor: {
      type: String,
      default: ''
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixes = ['is-', 'has-', 'tag-'];
        prefixes.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    },
    clearTag: function(tag) {
      this.$emit('clear-tag', tag);
    }
  }
}
</script>

<style scoped>
.el-tag.el-tag--small,
.el-tag.el-tag--mini {
  font-size: 12px;
}
</style>
