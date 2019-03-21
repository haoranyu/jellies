<template>
  <el-container :style="{ width: containerWidth }" :class="[isCentered ? 'centered' : '', isFullScreen ? 'fullscreen' : '', hasBleed ? 'bleed' : '']" :direction="(isFullScreen || isHorizontal) ? 'horizontal' : 'vertical'">
    <slot></slot>
  </el-container>
</template>


<script>
export default {
  name: 'JskContainer',
  props: {
    containerWidth: {
      type: String,
      default: '1200px'
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
  }
}
</script>

<style scoped>
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
