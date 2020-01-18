<template>
  <el-container :style="{ maxWidth: width }" :class="['container', isCentered ? 'centered' : '', isFullScreen ? 'fullscreen' : '', hasBleed ? 'bleed' : '']" :direction="(isFullScreen || isHorizontal) ? 'horizontal' : 'vertical'">
    <slot></slot>
  </el-container>
</template>


<script>
import { Container } from 'element-ui';
export default {
  name: 'JskContainer',
  props: {
    containerWidth: {
      type: [String, Number],
      default: 1200
    },
    isCentered: {
      type: Boolean,
      default: false
    },
    isFullScreen: {
      type: Boolean,
      default: false
    },
    isHorizontal: {
      type: Boolean,
      default: false
    },
    hasBleed: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    width: function() {
      if (typeof(this.containerWidth) === 'string') {
        return this.containerWidth;
      }
      return this.containerWidth + 'px';
    }
  },
  components: {
    'ElContainer': Container
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
.bleed {
  padding-left: 12px;
  padding-right: 12px;
}
.centered {
  margin-left: auto;
  margin-right: auto;
}
.fullscreen {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
