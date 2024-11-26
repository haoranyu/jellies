<template>
  <div
    :class="[{
      'jsk-table--has-top-border': hasTopBorder
    }, $attrs.class]"
    :style="$attrs.style"
    v-bind="$attrs"
  >
    <el-table v-bind="$attrs" v-on="$listeners">
      <slot />
    </el-table>
  </div>
</template>

<script>
import { Table } from 'element-ui';

export default {
  name: 'JskTable',
  components: {
    ElTable: Table
  },
  inheritAttrs: false,
  props: {
    hasTopBorder: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../plugins/theme-variables.scss';

.jsk-table--has-top-border {
  ::v-deep .el-table {
    border-top: 2px solid #ddd !important;
    &::before {
      height: 2px !important;
      display: block !important;
      z-index: 5;
    }
  }
}

::v-deep .el-table {
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
  
  .cell {
    line-height: 38px;
  }
}
</style>
