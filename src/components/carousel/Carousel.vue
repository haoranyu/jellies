<template>
  <el-carousel
    v-bind="trimAttrs($attrs)"
    :indicator-position="isOutsideIndicator ? 'outside' : 'none'"
    :type="isCard ? 'card' : ''"
    :direction="isVertical ? 'vertical' : 'horizontal'"
    :arrow="carouselShowArrow"
    v-on:change="$emit('change')">
    <slot></slot>
  </el-carousel>
</template>

<script>
import { Carousel } from 'element-ui';
export default {
  name: 'JskCarousel',
  inheritAttrs: false,
  methods: {
    trimAttrs: function(attrs) {
      Object.keys(attrs).forEach((key) => {
        let prefixs = ['is-', 'has-', 'carousel-'];
        prefixs.forEach((prefix) => {
          if (key.substr(0, prefix.length) === prefix) {
            attrs[key.substr(prefix.length)] = attrs[key];
          }
        })
      })
      return attrs;
    }
  },
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
  components: {
    'ElCarousel' : Carousel
  }
}
</script>
