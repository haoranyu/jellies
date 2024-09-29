<template>
  <el-container
    :style="{
      maxWidth: width,
      paddingLeft: bleedPaddingSize,
      paddingRight: bleedPaddingSize
    }"
    :class="[
      'container', isCentered ? 'centered' : '', 
      isFullScreen ? 'fullscreen' : ''
    ]"
    :direction="(isFullScreen || isHorizontal) ? 'horizontal' : 'vertical'"
  >
    <slot />
  </el-container>
</template>


<script>
import { Container } from 'element-ui';
export default {
  name: 'JskContainer',
  components: {
    ElContainer: Container
  },
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
    },
    bleedSize: {
      type: [String, Number],
      default: 12
    }
  },
  computed: {
    width: function() {
      if (typeof(this.containerWidth) === 'string') {
        return this.containerWidth;
      }
      return this.containerWidth + 'px';
    },
    bleedPaddingSize: function() {
      if (this.hasBleed) {
        if (typeof(this.bleedSize) === 'string') {
          return this.bleedSize;
        }
        return this.bleedSize + 'px';
      }
      return '0';
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
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
