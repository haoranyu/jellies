<template>
  <el-table
    v-bind="$attrs"
    v-on="$listeners"
    :class="{ 'jsk-table--has-top-border': hasTopBorder }"
  >
    <slot />
  </el-table>
</template>

<script>
import { Table } from 'element-ui'
export default {
  name: 'JskTable',
  inheritAttrs: false,
  props: {
    hasTopBorder: {
      type: Boolean,
      default: true
    }
  },
  components: {
    ElTable: Table
  }
}
</script>

<style lang="scss" scoped>
@import '../../plugins/theme-variables.scss';
.el-table {
  border-top: none;
  &::before {
    display: none;
  }
  &.el-table--border {
    border-top: 1px solid #ddd;
    &::before {
      height: 1px;
      display: block;
    }
  }
  ::v-deep {
    .cell {
      line-height: 38px;
    }
  }
  &.jsk-table--has-top-border {
    border-top: 2px solid #ddd !important;
    &::before {
      height: 2px !important;
      display: block !important;
      z-index: 5;
    }
  }
}
</style>
