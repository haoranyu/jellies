<template>
  <div>
    <header
      :style="{ height: headerHeight + 'px', background: headerBackgroundColor }"
      :class="isFixedTop ? 'header-fixed-top' : ''"
    >
      <jsk-container
        is-horizontal
        :has-bleed="hasBleed"
        :style="{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: width
        }"
      >
        <slot />
      </jsk-container>
    </header>
    <div
      v-if="isFixedTop"
      class="header-position"
      :style="{ height: headerHeight + 'px' }"
    />
  </div>
</template>


<script>
import JskContainer from '../container/Container';
export default {
  name: 'JskHeader',
  components: {
    JskContainer
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
    },
    hasBleed: {
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
  }
}
</script>

<style scoped>
header {
  width: 100%;
  box-shadow: 0 0 8px 0 rgba(139, 154, 174, 0.15);
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
