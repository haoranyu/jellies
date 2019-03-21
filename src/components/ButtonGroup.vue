<template>
  <el-button-group>
    <slot></slot>
  </el-button-group>
</template>


<script>
export default {
  name: 'JskButtonGroup',
}
</script>

<style scoped>
.el-button-group + .el-button-group,
.el-button + .el-button-group  {
  margin-left: 12px;
}
</style>