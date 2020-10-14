<template>
  <div>
    <header
      :style="{ height: headerHeight + 'px', background: headerBackgroundColor }"
      :class="isFixedTop ? 'header-fixed-top' : ''"
    >
      <el-container
        direction="horizontal"
        :style="{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: width
        }"
      >
        <slot />
      </el-container>
    </header>
    <div
      v-if="isFixedTop"
      class="header-position"
      :style="{ height: headerHeight + 'px' }"
    />
  </div>
</template>


<script>
import { Container } from 'element-ui';
export default {
  name: 'JskHeader',
  components: {
    ElContainer: Container
  },
  props: {
    headerHeight: {
      type: Number,
      default: 50
    },
    headerCenterWidth: {
      type: [String, Number],
      default: 1200
    },
    headerBackgroundColor: {
      type: String,
      default: '#41B146'
    },
    isFixedTop: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    width: function() {
      if (typeof(this.headerCenterWidth) === 'string') {
        return this.headerCenterWidth;
      }
      return this.headerCenterWidth + 'px';
    }
  },
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
