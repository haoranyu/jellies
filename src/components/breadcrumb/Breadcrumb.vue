<template>
  <el-breadcrumb
    :separator="breadcrumbSeparatorChar"
    :separator-class="breadcrumbSeparatorIconClass"
  >
    <slot>
    </slot>
  </el-breadcrumb>
</template>

<script>
import { Breadcrumb as ElBreadcrumb } from 'element-ui';
export default {
  name: 'JskBreadcrumb',
  props: {
    breadcrumbSeparatorChar: {
      type: String,
      default: '/'
    },
    breadcrumbSeparatorIconClass: {
      type: String,
      default: ''
    }
  },
  components: {
    ElBreadcrumb
  }
}
</script>
