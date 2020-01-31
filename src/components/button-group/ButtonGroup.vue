<script>
import { ButtonGroup } from "element-ui";
const ButtonGroupWrapper = ButtonGroup;
ButtonGroupWrapper.name = "JskButtonGroup";
export default ButtonGroupWrapper;
</script>

<style scoped>
.el-button-group + .el-button-group,
.el-button + .el-button-group {
  margin-left: 12px;
}
.el-button-group > .el-button + .el-button {
  margin-left: 0;
}
</style>
