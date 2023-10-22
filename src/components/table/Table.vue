<script>
import { Table } from 'element-ui';
const TableWrapper = Table;
TableWrapper.name = 'JskTable';
export default TableWrapper;
</script>

<style lang="scss" scoped>
@import '../../plugins/theme-variables.scss';
.el-table {
  border-top: 2px solid #ddd;
  &::before {
    height: 2px;
    z-index: 5;
  }
  &.el-table--border {
    border-top: 1px solid #ddd;
  }
  &.el-table--border::before {
    height: 1px;
  }
  ::v-deep {
    .cell {
      line-height: 38px;
    }
  }
}
</style>
