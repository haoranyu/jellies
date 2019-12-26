<template>
  <el-avatar
    v-bind="trimAttrs($attrs)"
    :fit="objectFit"
    :src-set="srcset"
    :style="avatarStyle"
    v-on:error="$emit('error')"
  >
    <slot>
    </slot>
  </el-avatar>
</template>


<script>
import { Avatar as ElAvatar } from 'element-ui';
export default {
  name: 'JskAvatar',
  props: {
    avatarBackgroundColor: String,
    avatarTextColor: String,
    srcset: String,
    objectFit: String
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
    },
  },
  computed: {
    avatarStyle: function() {
      return {
        background: this.avatarBackgroundColor,
        color: this.avatarTextColor,
      };
    },
  },
  components: {
    ElAvatar
  }
}
</script>

<style scoped>
.el-avatar {
  overflow: hidden;
  box-shadow: 0 0 4px 0 rgba(139, 154, 174, 0.4);
}
</style>
