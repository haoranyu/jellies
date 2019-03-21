<template>
  <div>
    <header :style="{ height: headerHeight, background: headerBackground }" :class="isFixedTop ? 'header-fixed-top' : ''">
      <jsk-container is-horizontal is-centered :style="{ width: headerCenterWidth }">
        <slot></slot>
      </jsk-container>
    </header>
    <div class="header-position" v-if="isFixedTop" :style="{ height: headerHeight }"></div>
  </div>
</template>


<script>
import JskContainer from './Container.vue'
export default {
  name: 'JskHeader',
  components: {
    JskContainer
  },
  props: {
    headerHeight: {
      type: String,
      default: '50px'
    },
    headerCenterWidth: {
      type: String,
      default: '1200px'
    },
    headerBackground: {
      type: String,
      default: '#41B146'
    },
    isFixedTop: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  box-shadow: 0 0 8px 0 rgba(139, 154, 174, 0.3);
}
.header-fixed-top {
  position: fixed;
  z-index: 1000;
}
.header-position {
  content: " ";
  display: block;
}
</style>
