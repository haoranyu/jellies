<template>
  <el-carousel
    v-bind="trimAttrs($attrs)"
    :indicator-position="isOutsideIndicator ? 'outside' : 'none'"
    :type="isCard ? 'card' : ''"
    :direction="isVertical ? 'vertical' : 'horizontal'"
    :arrow="carouselShowArrow"
    @change="$emit('change')"
  >
    <slot />
  </el-carousel>
</template>

<script>
import { Carousel } from 'element-ui';
export default {
  name: 'JskCarousel',
  components: {
    ElCarousel: Carousel
  },
  inheritAttrs: false,
  props: {
    isOutsideIndicator: {
      type: Boolean,
      default: false
    },
    isCard: {
      type: Boolean,
      default: false
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    carouselShowArrow: {
      type: String,
      default: 'hover'
    }
  },
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixes = ['is-', 'has-', 'carousel-'];
        prefixes.forEach((prefix) => {
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
