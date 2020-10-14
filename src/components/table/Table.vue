<script>
import { Table } from 'element-ui';
const TableWrapper = Table;
TableWrapper.name = 'JskTable';
export default TableWrapper;
</script>



<style scoped>
.el-table {
  border-top: 2px solid #ddd;
}
.el-table::before {
  height: 2px;
}
.el-table.el-table--border {
  border-top: 1px solid #ddd;
}
.el-table.el-table--border::before {
  height: 1px;
}
</style>
