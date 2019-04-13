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
  }
}
</script>
