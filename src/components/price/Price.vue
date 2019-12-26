<template>
  <div class="price">
    <del class="original-number" v-if="priceOriginal !== ''">{{ priceOriginal }}</del>
    <span class="number" v-if="priceCurrent !== ''">{{ priceCurrent }}</span>
    <span class="unit">{{ hasUnit ? '/ ' + priceUnit : '' }}</span>
  </div>
</template>

<script>
export default {
  name: 'JskPrice',
  props: {
    priceOriginal: {
      type: String,
      default: ''
    },
    priceCurrent: {
      type: String,
      default: ''
    },
    hasUnit: {
      type: Boolean,
      default: true
    },
    priceUnit: {
      type: String,
      default: '课时'
    }
  }
}
</script>

<style scoped>
.price {
  color: #777;
  height: 40px;
}
.price > .original-number {
  margin-right: 6px;
}
.price > .original-number::before {
  content: "¥ ";
}
.price > .number {
  color: #DD2E1D;
  font-size: 32px;
  font-weight: 500;
  line-height: 40px;
}
.price > .number::before {
  content: "¥ ";
  font-size: 18px;
}
.price > .unit {
  margin-left: 6px;
  font-size: 14px;
}
</style>
