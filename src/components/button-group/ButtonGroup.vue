<script>
import Vue from 'vue'
import { ButtonGroup } from 'element-ui';
export default Vue.extend({
  name: 'JskBreadcrumbItem',
  mixins: [ButtonGroup]
})
</script>

<style scoped>
.el-button-group + .el-button-group,
.el-button + .el-button-group  {
  margin-left: 12px;
}
.el-button-group > .el-button + .el-button {
  margin-left: 0;
}
</style>
