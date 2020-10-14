<template>
  <el-breadcrumb
    :separator="breadcrumbSeparatorChar"
    :separator-class="breadcrumbSeparatorIconClass"
  >
    <slot />
  </el-breadcrumb>
</template>

<script>
import { Breadcrumb } from 'element-ui';
export default {
  name: 'JskBreadcrumb',
  components: {
    ElBreadcrumb: Breadcrumb
  },
  props: {
    breadcrumbSeparatorChar: {
      type: String,
      default: '/'
    },
    breadcrumbSeparatorIconClass: {
      type: String,
      default: ''
    }
  }
}
</script>
