<template>
  <el-avatar
    v-bind="trimAttrs($attrs)"
    :fit="objectFit"
    :src-set="srcset"
    :style="avatarStyle"
    @error="$emit('error')"
  >
    <slot />
  </el-avatar>
</template>


<script>
import { Avatar } from 'element-ui';
export default {
  name: 'JskAvatar',
  components: {
    ElAvatar: Avatar
  },
  props: {
    avatarBackgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    avatarTextColor: {
      type: String,
      default: '#333333'
    },
    srcset: {
      type: String,
      default: ''
    },
    objectFit: {
      type: String,
      default: 'cover'
    }
  },
  computed: {
    avatarStyle: function() {
      return {
        background: this.avatarBackgroundColor,
        color: this.avatarTextColor
      };
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'avatar-'];
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

<style scoped>
.el-avatar {
  overflow: hidden;
  box-shadow: 0 0 4px 0 rgba(139, 154, 174, 0.4);
}
</style>
